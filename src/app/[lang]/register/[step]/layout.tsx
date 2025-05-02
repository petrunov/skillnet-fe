import type { ReactNode } from 'react';
import AppShell from '../../components/appShell';
import type { Translations } from '../../../../i18n/dictionaries';
import { getDictionary, Locale } from '../../../../i18n/dictionaries';

interface Props {
  children: ReactNode;
  params: { lang: Locale; step: string };
}

export default async function RegisterStepLayout({ children, params }: Props) {
  const { lang, step } = params;
  const dict: Translations = await getDictionary(lang);

  // Derive title and back-button logic from `step`
  const titleKey = `${step}Title` as keyof typeof dict.register;
  const title = dict.register[titleKey];
  const showBack = step !== 'step1';

  return (
    <AppShell dict={dict} title={title} showBack={showBack}>
      {children}
    </AppShell>
  );
}
