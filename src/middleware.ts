// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  // 1. Extract lang from the first path segment
  //    e.g. "/bg/dashboard" → ["", "bg", "dashboard"] → lang="bg"
  const segments = pathname.split('/');
  const lang = segments[1]; // will be "en" or "bg"

  // Only run on /en/* and /bg/*
  if (lang !== 'en' && lang !== 'bg') {
    return;
  }

  const token = req.cookies.get('token')?.value;

  // 2. Skip static files, data fetches, favicon, and our auth APIs
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/_next/data') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/api/accounts/login') ||
    pathname.startsWith('/api/accounts/logout')
  ) {
    return;
  }

  // 3. Define which paths under /[lang]/* are public:
  const publicPrefixes = [
    `/${lang}/login`,
    `/${lang}/login/success`,
    `/${lang}/login/password-reset`,
    `/${lang}/register/step1`,
    `/${lang}/register/step2`,
    `/${lang}/register/step3`,
    `/${lang}/register/activate`,
    `/${lang}/register/verify-email`,
  ];
  const isPublic = publicPrefixes.some((p) => pathname.startsWith(p));

  // 4a. Unauthenticated + NOT public → send to /[lang]/login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
  }

  // 4b. Authenticated + public → send to /[lang]/dashboard
  if (token && isPublic) {
    return NextResponse.redirect(new URL(`/${lang}/dashboard`, req.url));
  }

  // Otherwise let the request pass through
}

export const config = {
  matcher: ['/:lang(en|bg)/:path*'],
};
