import React from 'react';
import type { Locale, Translations } from '../../../../i18n/dictionaries';
import { getDictionary } from '../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import Step1Client from './Step1Client';

interface Props {
  params: { lang: Locale };
}

export default async function Step1Page({ params }: Props) {
  const dict: Translations = await getDictionary(params.lang);

  return (
    <AppShell dict={dict} showBack={true} subtitle={dict.register.headerTitle}>
      <Step1Client dict={dict} lang={params.lang} />
    </AppShell>
  );
}
