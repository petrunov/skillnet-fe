import React from 'react';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import PasswordResetClient from './PasswordResetClient';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function PasswordResetPage({ params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);
  return <PasswordResetClient dict={dict} />;
}
