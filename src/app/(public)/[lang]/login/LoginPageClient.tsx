'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginForm from '../components/LoginForm';
import type { Translations, Locale } from '../../../../i18n/dictionaries';
import { useState, useEffect } from 'react';

interface LoginPageClientProps {
  dict: Translations;
  lang: Locale;
}

export default function LoginPageClient({ dict, lang }: LoginPageClientProps) {
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy-client-id';

  // Only determine showGoogleLogin on client after hydration
  useEffect(() => {
    setShowGoogleLogin(!!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginForm dict={dict} lang={lang} showGoogleLogin={showGoogleLogin} />
    </GoogleOAuthProvider>
  );
}
