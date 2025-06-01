// src/app/[lang]/components/AppShell.tsx
'use client';

import React, { ReactNode } from 'react';
import Header from './Header';
import { Box, CssBaseline, Paper } from '@mui/material';
import type { Translations } from '../../../i18n/dictionaries';

interface AppShellProps {
  dict: Translations;
  showBack?: boolean;
  children: ReactNode;
  subtitle?: string;
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

      <Box component='main'>
        {/* Mobile: overlapping rounded‐corner card */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Paper
            elevation={3}
            sx={{
              mt: -4, // pull up over header
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              pt: 4, // inner top padding
              px: 0, // inner horizontal padding
              height: 'calc(100vh - 220px)', // adjust based on header/footer heights
              overflowY: 'auto',
              boxShadow: 0,
            }}>
            {children}
          </Paper>
        </Box>

        {/* Desktop: normal padded container */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            px: 4,
            py: 4,
          }}>
          {children}
        </Box>
      </Box>

      {/* <Footer dict={dict} /> */}
    </>
  );
}
