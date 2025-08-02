// app/(protected)/[lang]/layout.tsx
import type { ReactNode } from 'react';
import type { Locale } from '../../../../i18n-config';

export function generateStaticParams(): { lang: Locale }[] {
  return [{ lang: 'en' }, { lang: 'bg' }];
}

interface Props {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default function ProtectedLangLayout({ children }: Props) {
  // middleware handles all redirects now
  return <>{children}</>;
}
