'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Translations, Locale } from '../../../../i18n/dictionaries';
import Link from 'next/link';

interface Props {
  dict: Translations;
  lang: Locale;
  step: string;
}

export default function StepClient({ dict, lang, step }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // if they came back from step2, preserve userType in state
  const initial = searchParams.get('userType') as 'executor' | 'company' | null;
  const [selected, setSelected] = useState<'executor' | 'company' | null>(
    initial
  );

  // when step changes (e.g. from URL nav), reset selection unless it's in query
  useEffect(() => {
    setSelected(initial);
  }, [step, initial]);

  const isFirst = step === '1';
  const nextStep = isFirst ? '2' : /* for more steps: e.g.  */ '2';

  const handleNext = () => {
    if (!selected) return;
    router.push(`/${lang}/register/${nextStep}?userType=${selected}`);
  };

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        {dict.register[`${step}Heading` as keyof typeof dict.register]}
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
        onClick={handleNext}>
        {dict.register.nextButton}
      </Button>

      <Divider sx={{ my: 3 }} />

      <Box textAlign='center'>
        <Typography variant='body2' component='span' mr={1}>
          {dict.register.haveProfileAlready}
        </Typography>

        <Link href={`/${lang}/login`} passHref prefetch>
          <Button variant='outlined' color='primary' fullWidth sx={{ mb: 2 }}>
            {dict.login.login}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
