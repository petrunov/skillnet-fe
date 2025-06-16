// src/app/[lang]/register/step3/Step3Client.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';

interface Props {
  dict: Translations;
  lang: Locale;
}

export default function Step3Client({ dict, lang }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Step 1/2 params
  const userType = searchParams.get('userType') || '';
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const company = searchParams.get('company') || '';

  // Redirect to step1 if required params missing
  useEffect(() => {
    if (!userType || !firstName || !lastName || !company) {
      router.replace(`/${lang}/register/step1`);
    }
  }, [userType, firstName, lastName, company, lang, router]);

  // Initial form state from URL
  const initialEmail = searchParams.get('email') ?? '';
  const initialOptOut = searchParams.get('optOut') === 'true';
  const initialDataConsent = searchParams.get('dataConsent') === 'true';
  const initialTerms = searchParams.get('terms') === 'true';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [optOut, setOptOut] = useState(initialOptOut);
  const [dataConsent, setDataConsent] = useState(initialDataConsent);
  const [terms, setTerms] = useState(initialTerms);

  // Whenever form state changes, rewrite the URL—*without* the password
  useEffect(() => {
    const qp = new URLSearchParams();
    qp.set('userType', userType);
    qp.set('firstName', firstName);
    qp.set('lastName', lastName);
    qp.set('company', company);
    qp.set('email', email);
    qp.set('optOut', String(optOut));
    qp.set('dataConsent', String(dataConsent));
    qp.set('terms', String(terms));

    router.replace(`/${lang}/register/step3?${qp.toString()}`, {
      scroll: false,
    });
  }, [
    email,
    optOut,
    dataConsent,
    terms,
    userType,
    firstName,
    lastName,
    company,
    lang,
    router,
  ]);

  // Build the consent‐screen URLs, carrying current query params (which now exclude password)
  const qpString = searchParams.toString();
  const dataConsentUrl = `/${lang}/consent?screen=dataConsent&${qpString}`;
  const termsUrl = `/${lang}/consent?screen=termsOfUse&${qpString}`;

  // Loading & error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validations
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 8;
  const formValid = emailValid && passwordValid && dataConsent && terms;

  // Helper for checkboxes with inline links
  function renderLabeledCheckbox(
    text: string,
    linkText: string,
    hrefUrl: string,
    checked: boolean,
    onChange: (v: boolean) => void
  ) {
    const [before, after] = text.split(linkText);
    return (
      <FormControlLabel
        key={linkText}
        sx={{ my: 2 }}
        control={
          <Checkbox checked={checked} onChange={(_, v) => onChange(v)} />
        }
        label={
          <Typography variant='body2'>
            {before}
            <MuiLink
              component='button'
              underline='always'
              onClick={() => router.push(hrefUrl)}>
              {linkText}
            </MuiLink>
            {after}
          </Typography>
        }
      />
    );
  }

  const handleNext = async () => {
    setError(null);
    if (!formValid) return;
    setLoading(true);

    try {
      const payload = {
        email: email.trim(),
        password,
        account_type: userType,
        full_name: `${firstName.trim()} ${lastName.trim()}`,
        company_name: company,
        opt_out_marketing: optOut,
        data_consent: dataConsent,
        accept_terms: terms,
      };

      const res = await fetch('/api/accounts/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get('content-type') || '';
      let data: unknown = null;
      if (ct.includes('application/json')) {
        data = await res.json().catch(() => null);
      }

      if (!res.ok) {
        if (data && typeof data === 'object') {
          const parts: string[] = [];
          Object.entries(data as Record<string, unknown>).forEach(([k, v]) => {
            if (Array.isArray(v))
              (v as string[]).forEach((m) => parts.push(`${k}: ${m}`));
          });
          if (parts.length) throw new Error(parts.join(' — '));
        }
        throw new Error(res.statusText || `Error ${res.status}`);
      }

      router.push(`/${lang}/register/verify-email?${qpString}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unexpected error. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
          error={email !== '' && !emailValid}
          helperText={
            email !== '' && !emailValid
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
          error={password !== '' && !passwordValid}
          helperText={
            password !== '' && !passwordValid
              ? dict.register.passwordInvalidText
              : undefined
          }
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={optOut}
            onChange={(_, v) => setOptOut(v)}
            sx={{ mb: 2 }}
          />
        }
        label={
          <Typography variant='body2'>
            {dict.register.marketingOptOut}
          </Typography>
        }
      />

      {renderLabeledCheckbox(
        dict.register.dataConsent,
        dict.register.dataConsentLink,
        dataConsentUrl,
        dataConsent,
        setDataConsent
      )}

      {renderLabeledCheckbox(
        dict.register.termsText,
        dict.register.termsLinkText,
        termsUrl,
        terms,
        setTerms
      )}

      <Box mt={2}>
        <Button
          variant='contained'
          fullWidth
          disabled={!formValid || loading}
          onClick={handleNext}
          sx={{ height: 48 }}>
          {loading ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            dict.register.finishButton
          )}
        </Button>
      </Box>
    </Box>
  );
}
