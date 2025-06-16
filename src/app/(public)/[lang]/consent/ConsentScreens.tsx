// src/app/[lang]/consent/ConsentScreens.tsx
'use client';

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';

interface Props {
  dict: Translations;
  lang: Locale;
}

export function PersonalDataScreen({ dict, lang }: Props) {
  const qp = useSearchParams().toString();
  const backTo = `/${lang}/register/step3?${qp}`;

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      {/* Back button above */}
      <Box mb={2}>
        <Button component={NextLink} href={backTo} variant='contained'>
          BACK
        </Button>
      </Box>

      <Typography variant='h6' gutterBottom>
        {dict.register.dataConsent}
      </Typography>
      <Typography variant='body1' gutterBottom>
        We will use your data to improve your experience and communicate
        important updates. Your data will be handled according to our privacy
        policy.
      </Typography>

      {/* Back button below */}
      <Box mt={2}>
        <Button component={NextLink} href={backTo} variant='contained'>
          BACK
        </Button>
      </Box>
    </Container>
  );
}

export function TermsOfUseScreen({ dict, lang }: Props) {
  const qp = useSearchParams().toString();
  const backTo = `/${lang}/register/step3?${qp}`;

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      {/* Back button above */}
      <Box mb={2}>
        <Button component={NextLink} href={backTo} variant='contained'>
          BACK
        </Button>
      </Box>

      <Typography variant='h6' gutterBottom>
        {dict.register.termsLinkText}
      </Typography>
      <Typography
        variant='body2'
        component='div'
        sx={{
          whiteSpace: 'pre-line',
          maxHeight: 400,
          overflowY: 'auto',
          mb: 2,
        }}>
        {/* Your full Terms of Use content goes here */}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor...
      </Typography>

      {/* Back button below */}
      <Box>
        <Button component={NextLink} href={backTo} variant='contained'>
          BACK
        </Button>
      </Box>
    </Container>
  );
}
