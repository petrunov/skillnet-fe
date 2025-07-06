'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../i18n/dictionaries';
import AppShell from '../../components/appShell';
import { CheckmarkCircle48Filled } from '@fluentui/react-icons';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default function VerifyEmailPage({ params }: Props) {
  const router = useRouter();
  const [lang, setLang] = React.useState<Locale | null>(null);
  const [dict, setDict] = React.useState<Translations | null>(null);

  React.useEffect(() => {
    params.then(({ lang }) => setLang(lang));
  }, [params]);

  React.useEffect(() => {
    if (lang) {
      getDictionary(lang).then(setDict);
    }
  }, [lang]);

  if (!lang || !dict) {
    return null; // or a loading spinner
  }

  return (
    <AppShell dict={dict} showBack title={dict.register.headerTitle}>
      <Box sx={{ mt: 4, px: 2 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            m: 0,
            typography: 'h5',
          }}>
          <Typography sx={{ my: 2 }} variant='h5' gutterBottom>
            {dict.register.verifyEmailHeading}
          </Typography>
          <CheckmarkCircle48Filled
            style={{ color: '#B3D50D', fontSize: 48, marginLeft: 8 }}
          />
        </Box>

        <Typography>{dict.register.verificationMailSent}</Typography>
        <Button
          variant='contained'
          fullWidth
          sx={{ mt: 10 }}
          onClick={() => router.push(`/${lang}/login`)}>
          {dict.misc.homepage}
        </Button>
      </Box>
    </AppShell>
  );
}
