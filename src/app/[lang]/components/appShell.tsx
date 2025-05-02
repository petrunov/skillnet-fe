'use client';

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, CssBaseline } from '@mui/material';
import type { Translations } from '../../../i18n/dictionaries';

interface AppShellProps {
  dict: Translations;
  showBack?: boolean;
  children: ReactNode;
}

export default function AppShell({
  dict,
  showBack = false,
  children,
}: AppShellProps) {
  return (
    <>
      <CssBaseline />
      <Header dict={dict} showBack={showBack} />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          px: { xs: 0, md: 4 },
          py: { xs: 2, md: 4 },
          pb: { xs: '56px', md: 0 },
        }}>
        {children}
      </Box>
      <Footer dict={dict} />
    </>
  );
}
