// src/app/(public)/[lang]/layout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import type { Locale } from '../../../../i18n-config';
import PublicLayoutClient from '../PublicLayoutClient';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'bg' }] as const;
}

interface Props {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function PublicLangLayout({ children, params }: Props) {
  const { lang } = await params;
  return <PublicLayoutClient lang={lang}>{children}</PublicLayoutClient>;
}
