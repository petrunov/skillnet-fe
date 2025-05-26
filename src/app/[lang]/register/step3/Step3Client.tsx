'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
} from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Translations, Locale } from '../../../../i18n/dictionaries';

interface Props {
  dict: Translations;
  lang: Locale;
}

export default function Step3Client({ dict, lang }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ensure they came from step1/2
  const userType = searchParams.get('userType');
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const company = searchParams.get('company');

  useEffect(() => {
    if (!userType || !firstName || !lastName || !company) {
      router.replace(`/${lang}/register/step1`);
    }
  }, [userType, firstName, lastName, company, lang, router]);

  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  // checkboxes
  const [optOut, setOptOut] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [terms, setTerms] = useState(false);

  // validations
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 8;
  const formValid = emailValid && passwordValid && dataConsent && terms;

  const handleNext = () => {
    if (formValid) {
      // next step (or submit to your API)
      router.push(`/${lang}/login/verify-email`);
    }
  };

  // helper for rendering the linked text in a single label
  function renderLabeledCheckbox(
    text: string,
    linkText: string,
    href: string,
    checked: boolean,
    onChange: (v: boolean) => void
  ) {
    const [before, after] = text.split(linkText);
    return (
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={(_, v) => onChange(v)} />
        }
        label={
          <Typography variant='body2'>
            {before}
            <MuiLink href={href} target='_blank'>
              {linkText}
            </MuiLink>
            {after}
          </Typography>
        }
      />
    );
  }

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        {dict.register.step3Heading}
      </Typography>

      <Box mb={3}>
        <TextField
          label={dict.register.email}
          placeholder={dict.register.emailPlaceholder}
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          onBlur={() => setTouchedEmail(true)}
          error={touchedEmail && !emailValid}
          helperText={
            touchedEmail && !emailValid
              ? dict.register.emailInvalidText
              : undefined
          }
        />

        <TextField
          label={dict.register.password}
          placeholder={dict.register.passwordPlaceholder}
          type='password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          onBlur={() => setTouchedPassword(true)}
          error={touchedPassword && !passwordValid}
          helperText={
            touchedPassword && !passwordValid
              ? dict.register.passwordInvalidText
              : undefined
          }
        />
      </Box>

      {/* optional marketing opt-out */}
      <FormControlLabel
        control={
          <Checkbox checked={optOut} onChange={(_, val) => setOptOut(val)} />
        }
        label={dict.register.marketingOptOut}
      />

      {/* required data consent */}
      {renderLabeledCheckbox(
        dict.register.dataConsent,
        dict.register.dataConsentLink,
        '/privacy',
        dataConsent,
        setDataConsent
      )}

      {/* required terms of use */}
      {renderLabeledCheckbox(
        dict.register.termsText,
        dict.register.termsLinkText,
        '/terms',
        terms,
        setTerms
      )}

      <Box mt={2}>
        <Button
          variant='contained'
          fullWidth
          disabled={!formValid}
          onClick={handleNext}>
          {dict.register.finishButton}
        </Button>
      </Box>
    </Box>
  );
}
