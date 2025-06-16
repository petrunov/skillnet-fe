import React from 'react';
import { redirect } from 'next/navigation';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import { Container, Box, Typography, Button } from '@mui/material';
import NextLink from 'next/link';
import AppShell from '../../components/appShell';

interface Props {
  params: { lang: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ActivateRootPage({
  params,
  searchParams,
}: Props) {
  const { lang } = params;
  const dict: Translations = await getDictionary(lang);

  // If someone hits /activate without uid/token, redirect or show invalid
  const screenUid = searchParams.uid;
  const screenToken = searchParams.token;
  if (!screenUid || !screenToken) {
    return (
      <AppShell
        dict={dict}
        showBack={true}
        subtitle={dict.register.headerTitle}>
        <Container maxWidth='sm' sx={{ py: 4 }}>
          <Box textAlign='center'>
            <Typography variant='h6' gutterBottom>
              {dict.login.login}
            </Typography>
            <Typography>{dict.login.activationInvalidMessage}</Typography>
            <Box mt={2}>
              <Button
                component={NextLink}
                href={`/${lang}/login`}
                variant='contained'>
                {dict.login.formTitle}
              </Button>
            </Box>
          </Box>
        </Container>
      </AppShell>
    );
  }

  // Otherwise redirect into the dynamic route
  redirect(`/${lang}/register/activate/${screenUid}/${screenToken}`);
}
