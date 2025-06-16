// src/app/(public)/[lang]/layout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import type { Locale } from '../../../../i18n-config';
import PublicLayoutClient from '../PublicLayoutClient';

export function generateStaticParams(): { lang: Locale }[] {
  return [{ lang: 'en' }, { lang: 'bg' }];
}

interface Props {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function PublicLangLayout({ children, params }: Props) {
  const { lang } = await params;
  return <PublicLayoutClient lang={lang}>{children}</PublicLayoutClient>;
}
