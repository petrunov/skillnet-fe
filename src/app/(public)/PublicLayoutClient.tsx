'use client';

import React, { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
  lang: 'en' | 'bg';
}

export default function PublicLayoutClient({ children, lang }: Props) {
  const router = useRouter();

  useEffect(() => {
    // If the user is already logged in (token in localStorage), send them to /[lang]/dashboard
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.replace(`/${lang}/dashboard`);
      }
    }
  }, [lang, router]);

  return <>{children}</>;
}
