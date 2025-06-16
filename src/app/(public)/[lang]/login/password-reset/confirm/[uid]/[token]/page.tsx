import React from 'react';
import type {
  Translations,
  Locale,
} from '../../../../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../../../../i18n/dictionaries';
import PasswordResetConfirmClient from './PasswordResetConfirmClient';

interface Props {
  params: Promise<{ lang: Locale; uid: string; token: string }>;
}

export default async function PasswordResetConfirmPage({ params }: Props) {
  const { lang, uid, token } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <PasswordResetConfirmClient
      dict={dict}
      lang={lang}
      uid={uid}
      token={token}
    />
  );
}
