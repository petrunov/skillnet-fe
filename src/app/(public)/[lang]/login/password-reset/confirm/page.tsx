import React from 'react';
import type { Translations, Locale } from '../../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../../i18n/dictionaries';
import { Container, Box, Typography } from '@mui/material';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function PasswordResetConfirmRoot({ params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Box textAlign='center'>
        <Typography variant='h6' gutterBottom>
          {dict.login.passwordResetConfirmInvalidTitle}
        </Typography>
        <Typography>{dict.login.passwordResetConfirmInvalidMessage}</Typography>
      </Box>
    </Container>
  );
}
