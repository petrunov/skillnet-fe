'use client';

import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('common');

  return <h1>{t('hello')}</h1>;
}
// This is a simple Next.js page that uses the `useTranslation` hook from `react-i18next`
