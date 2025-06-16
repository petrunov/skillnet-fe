import React from 'react';
import type { Locale, Translations } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import Step2Client from './Step2Client';
import { Container } from '@mui/material';

interface Props {
  params: { lang: Locale };
}

export default async function Step2Page({ params }: Props) {
  const dict: Translations = await getDictionary(params.lang);

  return (
    <AppShell dict={dict} showBack={true} subtitle={dict.register.headerTitle}>
      <Container maxWidth='sm'>
        <Step2Client dict={dict} lang={params.lang} />
      </Container>
    </AppShell>
  );
}
