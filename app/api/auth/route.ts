import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;
    // check if user exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'User already exists',
        },
        { status: 409 },
      );
    }

    const newUser = await db.user.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      {
        user: newUser,
        message: 'User created successfully',
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
  }
}
