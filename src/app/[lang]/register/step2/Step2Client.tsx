'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Translations, Locale } from '../../../../i18n/dictionaries';

interface Props {
  dict: Translations;
  lang: Locale;
}

export default function Step2Client({ dict, lang }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') as
    | 'executor'
    | 'company'
    | null;

  // field values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');

  // touched flags
  const [touchedFirst, setTouchedFirst] = useState(false);
  const [touchedLast, setTouchedLast] = useState(false);
  const [touchedComp, setTouchedComp] = useState(false);

  // redirect if no userType
  useEffect(() => {
    if (!userType) {
      router.replace(`/${lang}/register/step1`);
    }
  }, [userType, lang, router]);

  const isValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    company.trim() !== '' &&
    !!userType;

  const handleNext = () => {
    if (isValid && userType) {
      router.push(
        `/${lang}/register/step3` +
          `?userType=${userType}` +
          `&firstName=${encodeURIComponent(firstName)}` +
          `&lastName=${encodeURIComponent(lastName)}` +
          `&company=${encodeURIComponent(company)}`
      );
    }
  };

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        {dict.register.step2Heading}
      </Typography>

      <Box mb={3}>
        <TextField
          label={dict.register.firstName}
          placeholder={dict.register.firstNamePlaceholder}
          fullWidth
          margin='normal'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={() => setTouchedFirst(true)}
          error={touchedFirst && firstName.trim() === ''}
          helperText={
            touchedFirst && firstName.trim() === '' ? 'Required' : undefined
          }
        />

        <TextField
          label={dict.register.lastName}
          placeholder={dict.register.lastNamePlaceholder}
          fullWidth
          margin='normal'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onBlur={() => setTouchedLast(true)}
          error={touchedLast && lastName.trim() === ''}
          helperText={
            touchedLast && lastName.trim() === '' ? 'Required' : undefined
          }
        />

        <TextField
          label={dict.register.company}
          placeholder={dict.register.companyPlaceholder}
          fullWidth
          margin='normal'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onBlur={() => setTouchedComp(true)}
          error={touchedComp && company.trim() === ''}
          helperText={
            touchedComp && company.trim() === '' ? 'Required' : undefined
          }
        />
      </Box>

      <Button
        variant='contained'
        fullWidth
        disabled={!isValid}
        onClick={handleNext}>
        {dict.register.nextButton}
      </Button>
    </Box>
  );
}
