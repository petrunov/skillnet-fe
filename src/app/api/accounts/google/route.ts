// app/api/accounts/google/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log('Received body:', body);

  // Call Django REST API to get tokens using the Google access token
  // Assumes backend endpoint: /api/accounts/google/
  const res = await fetch(`${process.env.BACKEND_URL}/api/accounts/google/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  console.log('Backend response status:', res.status);

  if (!res.ok) {
    const errorBody = await res.text();
    console.log('Backend error response:', errorBody);
    return new NextResponse(errorBody, { status: res.status });
  }

  const data = await res.json();

  // The backend returns access and refresh tokens
  const access = data.access;
  const refresh = data.refresh;

  console.log('Tokens received:', { access, refresh });

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
