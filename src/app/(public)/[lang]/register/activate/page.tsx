// src/app/(public)/[lang]/register/activate/page.tsx
import React from 'react';
import { redirect } from 'next/navigation';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import { Container, Box, Typography } from '@mui/material';

interface Props {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ActivateRootPage({
  params,
  searchParams,
}: Props) {
  const { lang } = await params;
  const sp = await searchParams;
  const dict: Translations = await getDictionary(lang);

  // Handle both string and array cases
  const uid = Array.isArray(sp.uid) ? sp.uid[0] : sp.uid;
  const token = Array.isArray(sp.token) ? sp.token[0] : sp.token;

  // If missing UID or token, show generic “invalid link” screen
  if (!uid || !token) {
    return (
      <AppShell dict={dict} showBack subtitle={dict.register.headerTitle}>
        <Container maxWidth='sm' sx={{ py: 4 }}>
          <Box textAlign='center'>
            <Typography variant='h6' gutterBottom>
              {dict.register.headerTitle}
            </Typography>
            <Typography>{dict.login.activationInvalidMessage}</Typography>
          </Box>
        </Container>
      </AppShell>
    );
  }

  // Otherwise redirect to the dynamic activation route
  redirect(`/${lang}/register/activate/${uid}/${token}`);
}
