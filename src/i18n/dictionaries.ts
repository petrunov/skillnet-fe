import 'server-only';
import type { Locale } from '../../i18n-config';

export type { Locale };

// We know each JSON import gives us an object (not just strings)
export type Translations = {
  login: {
    greeting: string;
    welcomeMessage: string;
    formTitle: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    submit: string;
    forgotPassword: string;
    freeProfile: string;
    register: string;
    executors: string;
    companies: string;
    login: string;
  };
};

export const dictionaries: Record<Locale, () => Promise<Translations>> = {
  en: () => import('./locales/en/common.json').then((module) => module.default),
  bg: () => import('./locales/bg/common.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Translations> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}
