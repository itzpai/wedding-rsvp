import { NextResponse } from 'next/server';
import { adminCookieName, makeAdminToken } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const data = await request.formData();
  const password = data.get('password');
  if (typeof password !== 'string' || !process.env.DASHBOARD_PASSWORD || password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.redirect(new URL('/dashboard?error=1', request.url), 303);
  }

  const response = NextResponse.redirect(new URL('/dashboard', request.url), 303);
  response.cookies.set(adminCookieName, makeAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
