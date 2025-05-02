import type { Translations, Locale } from '../../../../i18n/dictionaries';
import { getDictionary } from '../../../../i18n/dictionaries';
import StepClient from './StepClient';

interface Props {
  params: { lang: Locale; step: string };
}

export default async function RegisterStepPage({ params }: Props) {
  const { lang, step } = params;
  const dict: Translations = await getDictionary(lang);
  return <StepClient dict={dict} lang={lang} step={step} />;
}
