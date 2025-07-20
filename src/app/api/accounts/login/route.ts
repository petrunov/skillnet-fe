// app/api/accounts/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Call Django REST API to get tokens
  const res = await fetch(`${process.env.BACKEND_URL}/api/accounts/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    return new NextResponse(errorBody, { status: res.status });
  }

  const { access, refresh } = await res.json();

  // Set tokens as secure HttpOnly cookies
  const response = NextResponse.json({ success: true });

  const isProd = process.env.NODE_ENV === 'production';

  response.cookies.set('token', access, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 15, // 15 mins
  });

  response.cookies.set('refreshToken', refresh, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
