'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const locales = ['en', 'bg'];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const changeLanguage = (locale: string) => {
    if (locale === i18n.language) return;
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}>
      {locales.map((lng) => (
        <option key={lng} value={lng}>
          {lng.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
