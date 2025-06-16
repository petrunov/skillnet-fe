import React, { Suspense } from 'react';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import Step3Client from './Step3Client';
import { Container, Box, CircularProgress } from '@mui/material';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function Step3Page({ params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <AppShell dict={dict} showBack={true}>
      <Container maxWidth='sm'>
        <Suspense
          fallback={
            <Box textAlign='center' sx={{ py: 4 }}>
              <CircularProgress />
            </Box>
          }>
          <Step3Client dict={dict} lang={lang} />
        </Suspense>
      </Container>
    </AppShell>
  );
}
