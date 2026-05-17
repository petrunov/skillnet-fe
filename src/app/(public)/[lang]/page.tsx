import type { Translations } from '../../../i18n/dictionaries';
import { getDictionary, Locale } from '../../../i18n/dictionaries';

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>
          {dict.HomePage.title}
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              {dict.HomePage.authentication}
            </h2>
            <ul className='space-y-2'>
              <li>
                <a
                  href={`/${lang}/login`}
                  className='text-blue-600 hover:text-blue-800 font-medium'>
                  {dict.HomePage.login}
                </a>
              </li>
              <li>
                <a
                  href={`/${lang}/register/step1`}
                  className='text-blue-600 hover:text-blue-800 font-medium'>
                  {dict.HomePage.register}
                </a>
              </li>
              <li>
                <a
                  href={`/${lang}/login/password-reset`}
                  className='text-blue-600 hover:text-blue-800 font-medium'>
                  {dict.HomePage.passwordReset}
                </a>
              </li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              {dict.HomePage.account}
            </h2>
            <ul className='space-y-2'>
              <li>
                <a
                  href={`/${lang}/consent`}
                  className='text-blue-600 hover:text-blue-800 font-medium'>
                  {dict.HomePage.consent}
                </a>
              </li>
              <li>
                <a
                  href={`/${lang}/register/verify-email`}
                  className='text-blue-600 hover:text-blue-800 font-medium'>
                  {dict.HomePage.verifyEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
