import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'popular';

    // Фильтрлерді құру
    const where: any = {};
    
    if (category && category !== 'all') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // Сұрыптау
    let orderBy: any = {};
    switch (sortBy) {
      case 'popular':
        orderBy.students = 'desc';
        break;
      case 'rating':
        orderBy.rating = 'desc';
        break;
      case 'newest':
        orderBy.createdAt = 'desc';
        break;
      case 'price':
        orderBy.price = 'asc';
        break;
      default:
        orderBy.students = 'desc';
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: {
            enrollments: true,
            reviews: true,
          }
        }
      }
    });

    return NextResponse.json(courses);

  } catch (error) {
    console.error('Курстарды алу қатесі:', error);
    return NextResponse.json(
      { error: 'Сервер қатесі' },
      { status: 500 }
    );
  }
}
