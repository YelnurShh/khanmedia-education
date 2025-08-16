import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { verifyPassword, generateToken } from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Валидация
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email және құпия сөзді енгізіңіз' },
        { status: 400 }
      );
    }

    // Пайдаланушыны табу
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Жарамсыз email немесе құпия сөз' },
        { status: 401 }
      );
    }

    // Құпия сөзді тексеру
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Жарамсыз email немесе құпия сөз' },
        { status: 401 }
      );
    }

    // JWT токен жасау
    const token = generateToken(user.id);

    // Пайдаланушы ақпаратын қайтару (құпия сөзсіз)
    const userWithoutPassword = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    };

    // Cookie орнату
    const response = NextResponse.json({
      message: 'Кіру сәтті',
      user: userWithoutPassword,
      token
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 күн
    });

    return response;

  } catch (error) {
    console.error('Кіру қатесі:', error);
    return NextResponse.json(
      { error: 'Сервер қатесі' },
      { status: 500 }
    );
  }
}
