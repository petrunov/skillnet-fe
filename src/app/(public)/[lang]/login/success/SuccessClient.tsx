// src/app/[lang]/login/success/SuccessClient.tsx
'use client';

import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';

interface Props {
  dict: Translations;
  lang: Locale;
}

export default function SuccessClient({ dict, lang }: Props) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace(`/${lang}/login`);
    }
  }, [lang, router]);

  return (
    <Box textAlign='center' mt={4} px={2}>
      <Typography variant='h5' gutterBottom>
        {dict.login.successTitle}
      </Typography>
      <Typography mb={3}>{dict.login.successMessage}</Typography>
      <Button
        variant='contained'
        onClick={() => router.push(`/${lang}/dashboard`)}>
        {dict.login.goToDashboard}
      </Button>
    </Box>
  );
}
