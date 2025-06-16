// src/app/[lang]/login/password-reset/confirm/[uid]/[token]/PasswordResetConfirmClient.tsx
'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type {
  Translations,
  Locale,
} from '../../../../../../../../i18n/dictionaries';
import {
  passwordResetConfirm,
  ApiError,
} from '../../../../../../../../lib/accountService';

const PasswordSchema = z.object({
  password: z.string().min(8, { message: 'Minimum 8 characters' }),
});
type FormValues = z.infer<typeof PasswordSchema>;

interface Props {
  dict: Translations;
  lang: Locale;
  uid: string;
  token: string;
}

export default function PasswordResetConfirmClient({
  dict,
  lang,
  uid,
  token,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(PasswordSchema),
    mode: 'onChange',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setLoading(true);
    try {
      await passwordResetConfirm(uid, token, { password: data.password });
      setSuccess(true);
    } catch (err: unknown) {
      console.error('Password reset confirm error:', err);
      if (err instanceof ApiError || err instanceof Error) {
        setError(err.message);
      } else {
        setError(dict.errors.genericError);
      }
    } finally {
      setLoading(false);
    }
  };

  // If we've successfully reset, hide the form and show only the success message + link
  if (success) {
    return (
      <Container maxWidth='sm' sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant='h6' gutterBottom>
          {dict.login.passwordResetConfirmSuccess}
        </Typography>
        <Button
          variant='contained'
          component={NextLink}
          href={`/${lang}/login`}>
          {dict.login.login}
        </Button>
      </Container>
    );
  }

  // Otherwise render the heading, any error alert, and the form
  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Typography variant='h6' gutterBottom>
        {dict.login.passwordResetConfirmHeading}
      </Typography>

      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={dict.register.password}
          placeholder={dict.register.passwordPlaceholder}
          type='password'
          fullWidth
          margin='normal'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={!isValid || loading}
          sx={{ mt: 2 }}>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            dict.login.passwordResetConfirmButton
          )}
        </Button>
      </Box>
    </Container>
  );
}
