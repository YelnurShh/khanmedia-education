import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { hashPassword } from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    // Валидация
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Барлық өрістерді толтырыңыз' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Құпия сөз кемінде 8 таңба болуы керек' },
        { status: 400 }
      );
    }

    // Email форматын тексеру
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Жарамды email енгізіңіз' },
        { status: 400 }
      );
    }

    // Email бұрын тіркелген ба екенін тексеру
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Бұл email бұрын тіркелген' },
        { status: 400 }
      );
    }

    // Құпия сөзді хештеу
    const hashedPassword = await hashPassword(password);

    // Жаңа пайдаланушыны жасау
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      }
    });

    return NextResponse.json({
      message: 'Тіркелу сәтті аяқталды',
      user
    }, { status: 201 });

  } catch (error) {
    console.error('Тіркелу қатесі:', error);
    return NextResponse.json(
      { error: 'Сервер қатесі' },
      { status: 500 }
    );
  }
}
