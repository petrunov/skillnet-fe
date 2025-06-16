import React from 'react';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import SuccessClient from './SuccessClient';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function SuccessPage({ params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);
  return <SuccessClient dict={dict} lang={lang} />;
}
