// src/components/LoginForm.tsx
'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { Translations } from '../../../i18n/dictionaries';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;

interface LoginFormProps {
  dict: Translations;
}

export default function LoginForm({ dict }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log('Login data:', data);
  };

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Box textAlign='center' mb={4}>
        <Typography variant='h4' gutterBottom>
          {dict.login.greeting}
        </Typography>
        <Typography>{dict.login.welcomeMessage}</Typography>
      </Box>

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
                  onClick={() => setShowPassword((prev) => !prev)}
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
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box textAlign='center'>
        <Typography gutterBottom>{dict.login.freeProfile}</Typography>
        <Button variant='outlined'>{dict.login.register}</Button>
      </Box>

      <Tabs value={2} centered sx={{ mt: 4 }}>
        <Tab label={dict.login.executors} />
        <Tab label={dict.login.companies} />
        <Tab label={dict.login.login} />
      </Tabs>
    </Container>
  );
}
