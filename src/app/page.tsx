'use client';

import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('common');

  return <h1>{t('hello')}</h1>;
}
