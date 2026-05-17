'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

export default function GoogleOAuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    // In development, we might not have the ID yet, so we can just render children.
    // Ideally this should log a warning or be handled more gracefully.
    console.warn('Google Client ID not found in environment variables.');
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
