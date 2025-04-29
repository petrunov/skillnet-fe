// src/app/[lang]/login/page.tsx
import type { Translations } from '../../../i18n/dictionaries';
import { getDictionary, Locale } from '../../../i18n/dictionaries';
import LoginClient from './LoginClient';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function LoginPage({ params }: Props) {
  // 1. await params (Server Component)
  const { lang } = await params;

  // 2. load your locale dictionary
  const dict: Translations = await getDictionary(lang);

  // 3. render your client-side UI
  return <LoginClient dict={dict} />;
}
