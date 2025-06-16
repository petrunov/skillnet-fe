import React from 'react';
import type { ReactNode } from 'react';
import type { Locale } from '../../../../i18n-config';
import ProtectedLayoutClient from '../ProtectedLayoutClient';

export function generateStaticParams(): { lang: Locale }[] {
  return [{ lang: 'en' }, { lang: 'bg' }];
}

interface Props {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ProtectedLangLayout({ children, params }: Props) {
  const { lang } = await params;
  return <ProtectedLayoutClient lang={lang}>{children}</ProtectedLayoutClient>;
}
