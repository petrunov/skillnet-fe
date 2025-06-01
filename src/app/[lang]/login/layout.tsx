// src/app/[lang]/login/layout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import AppShell from '../components/appShell';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {
  getDictionary,
  Locale,
  Translations,
} from '../../../i18n/dictionaries';

interface Props {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function LoginLayout({ children, params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <AppShell dict={dict} showBack={false}>
      <Box
        component='div'
        sx={{
          // Mobile: show overlapping card
          display: { xs: 'block', md: 'none' },
        }}>
        <Paper
          elevation={3}
          sx={{
            boxShadow: 'none',
            mt: -4,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            pt: 4,
            px: 2,
            // allow inner scroll
            overflowY: 'auto',
          }}>
          {children}
        </Paper>
      </Box>

      <Box
        component='div'
        sx={{
          // Desktop: just show the form normally
          display: { xs: 'none', md: 'block' },
        }}>
        {children}
      </Box>
    </AppShell>
  );
}
