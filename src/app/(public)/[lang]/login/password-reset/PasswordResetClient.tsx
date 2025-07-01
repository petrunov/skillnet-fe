// src/app/[lang]/login/password-reset/PasswordResetClient.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Translations } from '../../../../../i18n/dictionaries';
import { passwordReset, ApiError } from '../../../../../lib/accountService';
import { z } from 'zod';

const EmailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
type FormValues = z.infer<typeof EmailSchema>;

interface Props {
  dict: Translations;
}

export default function PasswordResetClient({ dict }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(EmailSchema),
    mode: 'onChange',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setLoading(true);
    try {
      await passwordReset({ email: data.email });
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(dict.errors.genericError);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container maxWidth='sm' sx={{ py: 4 }}>
        <Alert severity='success'>{dict.login.passwordResetSuccess}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Typography variant='h6' gutterBottom>
        {dict.login.passwordResetHeading}
      </Typography>

      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography gutterBottom>
        {dict.login.passwordResetDescription}
      </Typography>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mb: 2 }}>
        <TextField
          label={dict.login.email}
          placeholder={dict.login.emailPlaceholder}
          margin='normal'
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
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
            dict.login.passwordResetButton
          )}
        </Button>
      </Box>
    </Container>
  );
}
