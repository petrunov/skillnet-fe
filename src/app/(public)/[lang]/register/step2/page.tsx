import React, { Suspense } from 'react';
import type { Locale, Translations } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import Step2Client from './Step2Client';
import { Box, CircularProgress, Container } from '@mui/material';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function Step2Page({ params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <AppShell dict={dict} showBack={true} subtitle={dict.register.headerTitle}>
      <Container maxWidth='sm'>
        <Suspense
          fallback={
            <Box textAlign='center' sx={{ py: 4 }}>
              <CircularProgress />
            </Box>
          }>
          <Step2Client dict={dict} lang={lang} />
        </Suspense>
      </Container>
    </AppShell>
  );
}
