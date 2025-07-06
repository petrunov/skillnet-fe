// src/app/[lang]/register/step1/page.tsx

import React, { Suspense } from 'react';
import type { Locale, Translations } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import Container from '@mui/material/Container';
import Step1Client from './Step1Client';
import { Box, CircularProgress } from '@mui/material';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function Step1Page({ params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <AppShell
      dict={dict}
      showBack={true}
      title={dict.register.headerTitle}
      subtitle={dict.register.headerSubtitle}>
      <Container maxWidth='sm'>
        <Suspense
          fallback={
            <Box textAlign='center' sx={{ py: 4 }}>
              <CircularProgress />
            </Box>
          }>
          <Step1Client dict={dict} lang={lang} />
        </Suspense>
      </Container>
    </AppShell>
  );
}
