'use client';

import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { Translations, Locale } from '../../../../i18n/dictionaries';

interface Props {
  dict: Translations;
  lang: Locale;
}

export default function Step1Client({ dict, lang }: Props) {
  const [selected, setSelected] = useState<'executor' | 'company' | null>(null);
  const router = useRouter();

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        {dict.register.step1Heading}
      </Typography>

      <Box display='flex' flexDirection='column' gap={2} mb={3}>
        <Card
          variant='outlined'
          onClick={() => setSelected('executor')}
          sx={{
            borderColor: selected === 'executor' ? 'primary.main' : 'divider',
            borderWidth: 2,
            cursor: 'pointer',
          }}>
          <CardContent>
            <Typography variant='subtitle1'>
              {dict.register.executorOptionLabel}
            </Typography>
            <Typography variant='body2'>
              {dict.register.executorOptionDescription}
            </Typography>
          </CardContent>
        </Card>

        <Card
          variant='outlined'
          onClick={() => setSelected('company')}
          sx={{
            borderColor: selected === 'company' ? 'primary.main' : 'divider',
            borderWidth: 2,
            cursor: 'pointer',
          }}>
          <CardContent>
            <Typography variant='subtitle1'>
              {dict.register.companyOptionLabel}
            </Typography>
            <Typography variant='body2'>
              {dict.register.companyOptionDescription}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Button
        variant='contained'
        fullWidth
        disabled={!selected}
        onClick={() =>
          router.push(`/${lang}/register/step2?userType=${selected}`)
        }>
        {dict.register.nextButton}
      </Button>
    </Box>
  );
}
