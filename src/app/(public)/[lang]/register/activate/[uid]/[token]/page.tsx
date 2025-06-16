// src/app/[lang]/register/activate/[uid]/[token]/page.tsx
import React from 'react';
import type {
  Translations,
  Locale,
} from '../../../../../../../i18n/dictionaries';
import { getDictionary } from '../../../../../../../i18n/dictionaries';
import ActivateAccountClient from './ActivateAccountClient';
import AppShell from '../../../../components/appShell';

interface Props {
  params: { lang: Locale; uid: string; token: string };
}

export default async function ActivateAccountPage({ params }: Props) {
  const { lang, uid, token } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <AppShell dict={dict} showBack={true} subtitle={dict.register.headerTitle}>
      <ActivateAccountClient dict={dict} lang={lang} uid={uid} token={token} />
    </AppShell>
  );
}
