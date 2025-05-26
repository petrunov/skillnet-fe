'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
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
import type { Translations, Locale } from '../../../i18n/dictionaries';
import { login, ApiError, LoginPayload } from '../../../lib/accountService';
import { z } from 'zod';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';

// reuse the same Zod schema for form validation
const schema = z.object({
  username: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
type FormValues = z.infer<typeof schema>;

interface LoginFormProps {
  dict: Translations;
  lang: Locale;
  isMobile?: boolean;
}

export default function LoginForm({
  dict,
  lang,
  isMobile = false,
}: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setLoading(true);
    try {
      const payload: LoginPayload = {
        username: data.username,
        password: data.password,
      };
      const response = await login(payload);

      // store tokens securely
      localStorage.setItem('token', response.access);
      localStorage.setItem('refreshToken', response.refresh);

      // redirect to verify email page
      router.push(`/${lang}/login/verify-email`);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unexpected error. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth='sm'
      disableGutters={isMobile}
      sx={{ py: isMobile ? 0 : 4 }}>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant='h6' gutterBottom>
        {dict.login.formTitle}
      </Typography>

      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} mb={2}>
        <TextField
          label={dict.login.email}
          placeholder={dict.login.emailPlaceholder}
          fullWidth
          margin='normal'
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
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

        <Box mt={2} textAlign='left'>
          <Button size='small'>{dict.login.forgotPassword}</Button>
        </Box>

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}>
          {loading ? <CircularProgress size={24} /> : dict.login.submit}
        </Button>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography
            gutterBottom
            sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
            {dict.login.freeProfile}
          </Typography>

          <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
            <MuiLink
              component={Link}
              href={`/${lang}/register/step1`}
              underline='none'
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
    </Container>
  );
}
