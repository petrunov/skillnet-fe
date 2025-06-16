// src/app/[lang]/login/layout.tsx

import React from 'react';
import type { ReactNode } from 'react';
import AppShell from '../components/appShell';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  getDictionary,
  Locale,
  Translations,
} from '../../../../i18n/dictionaries';

interface Props {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function LoginLayout({ children, params }: Props) {
  const { lang } = await params;
  const dict: Translations = await getDictionary(lang);

  return (
    <AppShell dict={dict} showBack={true}>
      {/* 
        Everything inside this Container will have the same horizontal padding & maxWidth="sm"
        on all screen sizes, just like LoginForm did before. 
        The <AppShell> header itself is outside of this Container, 
        so it remains full‐width with no side padding.
      */}
      <Container maxWidth='sm'>
        {/* Mobile: overlapping Paper card */}
        <Box
          component='div'
          sx={{
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
              overflowY: 'auto',
            }}>
            {children}
          </Paper>
        </Box>

        {/* Desktop: just render children normally inside the padded Container */}
        <Box
          component='div'
          sx={{
            display: { xs: 'none', md: 'block' },
          }}>
          {children}
        </Box>
      </Container>
    </AppShell>
  );
}
