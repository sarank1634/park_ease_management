import { NextResponse } from 'next/server';
import { signToken } from "@/libray/signIn";
import { cookies } from 'next/headers';

// Replace this with your actual authentication logic
async function authenticateUser(email: string, password: string) {
  // Example: Query your database to verify credentials
  // const user = await db.user.findUnique({ where: { email } });
  // if (user && await verifyPassword(password, user.password)) {
  //   return user;
  // }
  // return null;
  
  // For demo purposes - remove this in production
  if (email === 'admin@example.com' && password === 'password') {
    return {
      id: '1',
      email: 'admin@example.com',
      role: 'admin'
    };
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Here you would typically validate the credentials against your database
    // For now, this is a placeholder - replace with your actual authentication logic
    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({ 
      id: user.id, 
      role: user.role, 
      email: user.email 
    });

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
