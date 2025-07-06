// src/i18n/dictionaries.ts
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
    freeProfileAlready: string;
    register: string;
    executors: string;
    companies: string;
    login: string;
    successTitle: string;
    successMessage: string;
    goToDashboard: string;

    passwordResetRequestHeading: string;
    passwordResetRequestInfo: string;
    passwordResetRequestEmail: string;
    passwordResetRequestEmailPlaceholder: string;
    passwordResetRequestButton: string;
    passwordResetRequestSuccessTitle: string;
    passwordResetRequestSuccessMessage: string;

    passwordResetHeading: string;
    passwordResetButton: string;
    passwordResetSuccess: string;
    passwordResetDescription: string;

    passwordResetConfirmHeading: string;
    passwordResetConfirmButton: string;
    passwordResetConfirmSuccess: string;
    passwordResetConfirmInvalidTitle: string;
    passwordResetConfirmInvalidMessage: string;

    activationInvalidMessage: string;
    activationSuccessTitle: string;
    activationSuccessMessage: string;
    accountActivated: string;
    registrationSuccessful: string;
  };
  register: {
    headerTitle: string;
    headerSubtitleStep1: string;
    headerSubtitleStep2: string;
    headerSubtitleStep3: string;
    step1Title: string;
    step1Heading: string;
    email: string;
    emailPlaceholder: string;
    executorOptionLabel: string;
    executorOptionDescription: string;
    companyOptionLabel: string;
    companyOptionDescription: string;
    nextButton: string;
    haveProfileAlready: string;
    step2Title: string;
    step2Heading: string;
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    step3Title: string;
    step3Heading: string;
    password: string;
    passwordPlaceholder: string;
    emailInvalidText: string;
    passwordInvalidText: string;
    marketingOptOut: string;
    dataConsent: string;
    dataConsentLink: string;
    termsText: string;
    termsLinkText: string;
    finishButton: string;
    verifyEmailHeading: string;
    verificationMailSent: string;
    step1Subheading: string;
    alreadyHaveAccount: string;
    loginLink: string;
  };
  errors: {
    invalidOrExpiredToken: string;
    genericError: string;
  };
  misc: {
    loading: string;
    submit: string;
    cancel: string;
    back: string;
    next: string;
    save: string;
    edit: string;
    delete: string;
    confirm: string;
    close: string;
    search: string;
    noResultsFound: string;
    yes: string;
    no: string;
    homepage: string;
  };
};

export const dictionaries: Record<Locale, () => Promise<Translations>> = {
  en: () =>
    import('./locales/en/common.json').then(
      (module) => module.default as Translations
    ),
  bg: () =>
    import('./locales/bg/common.json').then(
      (module) => module.default as Translations
    ),
};

export async function getDictionary(locale: Locale): Promise<Translations> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}
