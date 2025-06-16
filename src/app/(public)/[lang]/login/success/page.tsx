import React from 'react';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import SuccessClient from './SuccessClient';

interface Props {
  params: { lang: Locale };
}

export default async function SuccessPage({ params }: Props) {
  const dict: Translations = await getDictionary(params.lang);
  return <SuccessClient dict={dict} lang={params.lang} />;
}
