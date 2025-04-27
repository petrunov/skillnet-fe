import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'bg' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: 'en' | 'bg' }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
