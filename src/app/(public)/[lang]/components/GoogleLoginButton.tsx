'use client';

import React, { useState } from 'react';
import { Button, Alert, CircularProgress } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import type { Locale } from '../../../../i18n/dictionaries';

interface GoogleLoginButtonProps {
  lang: Locale;
}

export default function GoogleLoginButton({ lang }: GoogleLoginButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/accounts/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });

        if (!res.ok) {
          throw new Error('Google login failed');
        }

        // Backend will redirect appropriately (dashboard or account setup)
        window.location.href = `/${lang}/dashboard`;
      } catch (err) {
        console.error(err);
        setError('Failed to log in with Google. Please try again.');
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google login was cancelled or failed. Please try again.');
    },
  });

  return (
    <>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        variant='outlined'
        fullWidth
        startIcon={loading ? <CircularProgress size={20} /> : <GoogleIcon />}
        onClick={() => login()}
        disabled={loading}
        sx={{
          mt: 1,
          textTransform: 'none',
          borderColor: '#dadce0',
          color: '#3c4043',
          fontWeight: 500,
          '&:hover': {
            borderColor: '#d2e3fc',
            backgroundColor: 'rgba(66, 133, 244, 0.04)',
          },
        }}>
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </Button>
    </>
  );
}

