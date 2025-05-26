// src/app/[lang]/components/AppShell.tsx
'use client';

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, CssBaseline, Paper } from '@mui/material';
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
              px: 2, // inner horizontal padding
              pb: '56px', // leave space for footer
              height: 'calc(100vh - 200px)', // adjust based on header/footer heights
              overflowY: 'auto',
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

      <Footer dict={dict} />
    </>
  );
}
