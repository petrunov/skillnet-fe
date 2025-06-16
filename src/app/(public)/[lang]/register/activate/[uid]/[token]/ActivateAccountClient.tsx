'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import NextLink from 'next/link';
import type {
  Translations,
  Locale,
} from '../../../../../../../i18n/dictionaries';
import {
  activateAccount,
  ApiError,
} from '../../../../../../../lib/accountService';

interface Props {
  dict: Translations;
  lang: Locale;
  uid: string;
  token: string;
}

export default function ActivateAccountClient({
  dict,
  lang,
  uid,
  token,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // pull errors map out so we can
  // reference it and use it in the deps
  const { errors: errorMap } = dict;

  useEffect(() => {
    activateAccount(uid, token)
      .then(() => setSuccess(true))
      .catch((err: unknown) => {
        let message: string;
        if (err instanceof ApiError) {
          const code = err.message;
          const key = Object.prototype.hasOwnProperty.call(errorMap, code)
            ? (code as keyof typeof errorMap)
            : 'genericError';
          message = errorMap[key];
        } else if (err instanceof Error) {
          message = err.message;
        } else {
          message = errorMap.genericError;
        }
        setError(message);
      })
      .finally(() => setLoading(false));
  }, [uid, token, errorMap]); // ← now includes errorMap, satisfying the linter

  if (loading) {
    return (
      <Container maxWidth='sm' sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth='sm' sx={{ py: 4 }}>
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Box textAlign='center'>
          <Button
            component={NextLink}
            href={`/${lang}/login`}
            fullWidth
            variant='contained'>
            {dict.login.formTitle}
          </Button>
        </Box>
      </Container>
    );
  }

  if (success) {
    return (
      <Container maxWidth='sm' sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant='h6' gutterBottom>
          {dict.login.activationSuccessTitle}
        </Typography>
        <Typography gutterBottom>
          {dict.login.activationSuccessMessage}
        </Typography>
        <Button
          variant='contained'
          component={NextLink}
          fullWidth
          href={`/${lang}/login`}>
          {dict.login.login}
        </Button>
      </Container>
    );
  }

  return null;
}
