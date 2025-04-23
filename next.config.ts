import type { NextConfig } from 'next';
import type { I18NConfig } from 'next/dist/server/config-shared';
import i18nConfig from './next-i18next.config';

const nextConfig: NextConfig = {
  i18n: i18nConfig.i18n as I18NConfig,
  // other config options here
};

export default nextConfig;
