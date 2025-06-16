// src/app/[lang]/consent/page.tsx
import React from 'react';
import { redirect } from 'next/navigation';
import type { Translations, Locale } from '../../../../i18n/dictionaries';
import { getDictionary } from '../../../../i18n/dictionaries';
import AppShell from '../components/appShell';
import { Container } from '@mui/material';
import { PersonalDataScreen, TermsOfUseScreen } from './ConsentScreens';

interface Props {
  params: { lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ConsentPage({ params, searchParams }: Props) {
  const { lang } = params;
  const dict: Translations = await getDictionary(lang);

  // pick out the "screen" flag
  const screen = Array.isArray(searchParams.screen)
    ? searchParams.screen[0]
    : searchParams.screen;

  // rebuild the rest of the query-string, minus "screen"
  const qpEntries = Object.entries(searchParams)
    .filter(([key]) => key !== 'screen')
    .flatMap(([key, val]) => {
      if (Array.isArray(val))
        return val.map((v) => [key, v] as [string, string]);
      if (typeof val === 'string') return [[key, val] as [string, string]];
      return [];
    });
  const qp = new URLSearchParams(qpEntries).toString();

  // redirect back to step3 if they hit /consent without screen=…
  if (!screen) {
    redirect(`/${lang}/register/step3?${qp}`);
  }

  const ScreenComponent =
    screen === 'termsOfUse' ? TermsOfUseScreen : PersonalDataScreen;

  return (
    <AppShell dict={dict} showBack>
      <Container maxWidth='sm'>
        <ScreenComponent dict={dict} lang={lang} />
      </Container>
    </AppShell>
  );
}
