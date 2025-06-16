'use client';

import React, { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
  lang: 'en' | 'bg';
}

export default function ProtectedLayoutClient({ children, lang }: Props) {
  const router = useRouter();

  useEffect(() => {
    // If the user is NOT logged in, redirect to /[lang]/login
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace(`/${lang}/login`);
      }
    }
  }, [lang, router]);

  return <>{children}</>;
}
