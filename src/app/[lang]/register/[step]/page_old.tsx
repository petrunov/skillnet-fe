import React from 'react';
import type { Translations } from '../../../../i18n/dictionaries';
import { getDictionary, Locale } from '../../../../i18n/dictionaries';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Props {
  params: { lang: Locale; step: string };
}

export default async function RegisterStepPage({ params }: Props) {
  const { lang, step } = params;
  const dict: Translations = await getDictionary(lang);

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        {(() => {
          const headingKey = `${step}Heading` as keyof typeof dict.register;
          return dict.register[headingKey];
        })()}
      </Typography>

      {/* Render appropriate fields for each step */}
      {step === 'step1' && (
        <TextField
          label={dict.register.email}
          placeholder={dict.register.emailPlaceholder}
          fullWidth
          margin='normal'
        />
      )}
      {step === 'step2' && (
        <TextField
          label={dict.register.password}
          placeholder={dict.register.passwordPlaceholder}
          type='password'
          fullWidth
          margin='normal'
        />
      )}

      <Box mt={3}>
        <Button variant='contained' fullWidth>
          {(dict.register as unknown)[`${step}NextButton`]}
        </Button>
      </Box>
    </Box>
  );
}
