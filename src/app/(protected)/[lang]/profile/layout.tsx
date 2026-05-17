import React from 'react';
import type { ReactNode } from 'react';
import type { Translations, Locale } from '../../../../i18n/dictionaries';
import AppShell from '../../../(public)/[lang]/components/appShell';

interface ProfileLayoutProps {
  dict: Translations;
  lang: Promise<{ lang: Locale }>;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function ProfileLayout({
  dict,
  lang,
  title,
  subtitle,
  children,
}: ProfileLayoutProps) {
  return (
    <AppShell
      dict={dict}
      showBack
      title={title}
      subtitle={subtitle}
      lang={lang}>
      {children}
    </AppShell>
  );
}
