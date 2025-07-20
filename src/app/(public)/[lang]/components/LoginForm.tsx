'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Translations, Locale } from '../../../../i18n/dictionaries';
import { login, ApiError } from '../../../../lib/accountService';
import { z } from 'zod';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
type FormValues = z.infer<typeof schema>;

interface LoginFormProps {
  dict: Translations;
  lang: Locale;
}

export default function LoginForm({ dict, lang }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setLoading(true);

    try {
      // call your proxy login — it sets the HTTP-only cookie
      await login({ email: data.email, password: data.password });

      // full-page redirect so the cookie is sent on the next request
      window.location.href = `/${lang}/dashboard`;
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(dict.errors.genericError);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant='h6' gutterBottom fontWeight={600}>
        {dict.login.formTitle}
      </Typography>

      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} mb={2}>
        <TextField
          label={dict.login.email}
          placeholder={dict.login.emailPlaceholder}
          fullWidth
          margin='normal'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label={dict.login.password}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin='normal'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={loading || !isValid}
          sx={{ mt: 2 }}>
          {loading ? <CircularProgress size={24} /> : dict.login.submit}
        </Button>

        <Box mt={2} textAlign='left'>
          <MuiLink component={Link} href={`/${lang}/login/password-reset`}>
            {dict.login.forgotPassword}
          </MuiLink>
        </Box>

        <Divider sx={{ mt: 3, mb: 6 }} />

        <Box>
          <Typography
            gutterBottom
            sx={{ textAlign: { xs: 'left', sm: 'center' }, fontSize: 20 }}>
            {dict.login.freeProfile}
          </Typography>

          <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
            <MuiLink
              component={Link}
              href={`/${lang}/register/step1`}
              sx={{
                display: 'inline-block',
                fontSize: '1rem',
                fontWeight: 500,
              }}>
              {dict.login.register}
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </>
  );
}
