'use client';

import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import type { Translations } from '../../../i18n/dictionaries';

interface FooterProps {
  dict: Translations;
}

export default function Footer({ dict }: FooterProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isMobile) {
    return null;
  }

  return (
    <BottomNavigation
      showLabels
      value={window.location.pathname.includes('/login') ? 2 : 0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
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
      <BottomNavigationAction label={dict.login.login} icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
