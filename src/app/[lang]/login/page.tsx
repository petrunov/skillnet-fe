// src/app/[lang]/login/page.tsx
import LoginForm from '../components/LoginForm';
import { getDictionary, Locale } from '../../../i18n/dictionaries';

interface Props {
  // params is now async in Next.js 15+
  params: Promise<{ lang: Locale }>;
}

export default async function LoginPage({ params }: Props) {
  // await the params API before using it
  const { lang } = await params;

  // now load your dictionary
  const dict = await getDictionary(lang);

  return <LoginForm dict={dict} />;
}
