// src/app/[lang]/register/step1/page.tsx

import React from 'react';
import type { Locale, Translations } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import Container from '@mui/material/Container';
import Step1Client from './Step1Client';

interface Props {
  params: { lang: Locale };
}

export default async function Step1Page({ params }: Props) {
  const dict: Translations = await getDictionary(params.lang);

  return (
    <AppShell dict={dict} showBack={true} subtitle={dict.register.headerTitle}>
      <Container maxWidth='sm'>
        <Step1Client dict={dict} lang={params.lang} />
      </Container>
    </AppShell>
  );
}
