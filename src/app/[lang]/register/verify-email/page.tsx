'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Locale } from '../../../../i18n/dictionaries';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default function VerifyEmailPage({ params }: Props) {
  const router = useRouter();

  const [lang, setLang] = React.useState<Locale | null>(null);

  React.useEffect(() => {
    params.then(({ lang }) => setLang(lang));
  }, [params]);

  if (!lang) {
    return null; // or a loading spinner
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 4, px: 2 }}>
      <Typography variant='h6' gutterBottom>
        Check your inbox
      </Typography>
      <Typography>
        We’ve sent a link to your email. Please check your inbox.
      </Typography>
      <Button onClick={() => router.push(`/${lang}/login`)} sx={{ mt: 2 }}>
        Back to Home
      </Button>
    </Box>
  );
}
