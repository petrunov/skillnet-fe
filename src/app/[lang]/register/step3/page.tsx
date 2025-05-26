import React from 'react';
import type { Translations, Locale } from '../../../../i18n/dictionaries';
import { getDictionary } from '../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import Step3Client from './Step3Client';

interface Props {
  params: { lang: Locale };
}

export default async function Step3Page({ params }: Props) {
  const dict: Translations = await getDictionary(params.lang);

  return (
    <AppShell dict={dict} showBack={true}>
      <Step3Client dict={dict} lang={params.lang} />
    </AppShell>
  );
}
