'use client';

import React, { useState } from 'react';
import { Alert, Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import type { Locale } from '../../../../i18n/dictionaries';

interface GoogleLoginButtonProps {
  lang: Locale;
}

export default function GoogleLoginButton({ lang }: GoogleLoginButtonProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      setError('Google did not return an ID token. Please try again.');
      return;
    }

    setError(null);

    try {
      const res = await fetch('/api/accounts/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: idToken,
          id_token: idToken,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Google login error:', errorData);
        throw new Error(
          errorData.detail || errorData.message || 'Google login failed',
        );
      }

      window.location.href = `/${lang}/dashboard`;
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to log in with Google. Please try again.',
      );
    }
  };

  return (
    <>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            setError('Google login was cancelled or failed. Please try again.');
          }}
          width='100%'
        />
      </Box>
    </>
  );
}
