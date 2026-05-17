import type { Translations } from '../../../../i18n/dictionaries';
import { getDictionary, Locale } from '../../../../i18n/dictionaries';
import LoginPageClient from './LoginPageClient';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function LoginPage({ params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);

  return <LoginPageClient dict={dict} lang={lang} />;
}
