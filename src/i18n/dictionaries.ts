import type { Locale } from '../../i18n-config';

export type { Locale };

// We know each JSON import gives us an object (not just strings)
// src/i18n/dictionaries.ts
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

    passwordResetConfirmHeading: string;
    passwordResetConfirmButton: string;
    passwordResetConfirmSuccess: string;

    activationInvalidMessage: string;
    activationSuccessTitle: string;
    activationSuccessMessage: string;
    accountActivated: string;
    registrationSuccessful: string;
  };
  register: {
    headerTitle: string;
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
  };
  errors: {
    invalidOrExpiredToken: string;
    genericError: string;
  };
  misc: {
    back: string;
    continue: string;
    loading: string;
    notFound: string;
    notFoundMessage: string;
    serverError: string;
    serverErrorMessage: string;
    goBack: string;
    goToHome: string;
    goToDashboard: string;
    goToLogin: string;
    goToRegister: string;
    goToProfile: string;
    homepage: string;
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
