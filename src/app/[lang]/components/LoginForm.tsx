'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Translations } from '../../../i18n/dictionaries';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;

interface LoginFormProps {
  dict: Translations;
  isMobile?: boolean;
}

export default function LoginForm({ dict, isMobile = false }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log('Login data:', data);
  };

  return (
    <Container maxWidth='sm' sx={{ py: isMobile ? 0 : 4 }}>
      <Typography variant='h6' gutterBottom>
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

        <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
          {dict.login.submit}
        </Button>

        <Box mt={2} textAlign='right'>
          <Button size='small'>{dict.login.forgotPassword}</Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Free profile + Register button */}
        <Box>
          <Typography
            gutterBottom
            sx={{
              textAlign: { xs: 'left', sm: 'center' },
            }}>
            {dict.login.freeProfile}
          </Typography>
          <Container
            maxWidth='sm'
            disableGutters={isMobile}
            sx={{ py: isMobile ? 0 : 4, px: 0 }}>
            {/* … */}
            <Button variant='outlined' color='primary' fullWidth sx={{ mb: 2 }}>
              {dict.login.register}
            </Button>
          </Container>
        </Box>
      </Box>
    </Container>
  );
}
