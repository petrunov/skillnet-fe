import React from 'react';
import ProtectedLayoutClient from '../ProtectedLayoutClient';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'bg' }];
}

export default async function ProtectedLangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: 'en' | 'bg' };
}) {
  const { lang } = await params;
  return <ProtectedLayoutClient lang={lang}>{children}</ProtectedLayoutClient>;
}
