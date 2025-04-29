'use client';

import React from 'react';
import Image from 'next/image';
import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  CssBaseline,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import LoginForm from '../components/LoginForm';
import type { Translations } from '../../../i18n/dictionaries';

interface Props {
  dict: Translations;
}

export default function LoginClient({ dict }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isMobile) {
    // Desktop: render the form unchanged
    return <LoginForm dict={dict} />;
  }

  // Mobile: full-screen gradient header + overlapping rounded card + bottom nav
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh', // exactly viewport height
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // no outer scrollbar
        }}>
        {/* 1) Gradient header */}
        <Box
          sx={{
            px: 2,
            pt: 4,
            pb: 6,
            background: 'linear-gradient(180deg, #F2FFB7 0%, #D2E960 100%)',
          }}>
          <Image
            src='/logo.svg'
            width={120}
            height={40}
            alt='SkillNet'
            style={{ display: 'block', margin: '0 auto' }}
          />
          <Box mt={2}>
            <Box
              component='h4'
              sx={{
                m: 0,
                fontSize: '1.6rem',
                fontWeight: 'bold',
              }}>
              {dict.login.greeting}
            </Box>
            <Box component='p' sx={{ m: 0 }}>
              {dict.login.welcomeMessage}
            </Box>
          </Box>
        </Box>

        {/* 2) Overlapping “card” */}
        <Paper
          component='main'
          elevation={3}
          sx={{
            flexGrow: 1,
            mt: -4, // pull card up over header
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            pt: 4,
            px: 2,
            overflowY: 'auto', // scroll inside if needed
          }}>
          <LoginForm dict={dict} isMobile />
        </Paper>

        {/* 3) Bottom navigation */}
        <BottomNavigation
          showLabels
          value={2}
          sx={{
            backgroundColor: '#E9EBEA',
          }}>
          <BottomNavigationAction
            label={dict.login.executors}
            icon={<GroupIcon />}
          />
          <BottomNavigationAction
            label={dict.login.companies}
            icon={<BusinessIcon />}
          />
          <BottomNavigationAction
            label={dict.login.login}
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Box>
    </>
  );
}
