// src/app/[lang]/components/Header.tsx
'use client';

import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Translations } from '../../../../i18n/dictionaries';

interface HeaderProps {
  dict: Translations;
  showBack?: boolean;
  title?: string;
  /** override the second line under the greeting */
  subtitle?: string;
}

export default function Header({
  dict,
  showBack = false,
  title,
  subtitle,
}: HeaderProps) {
  const router = useRouter();
  const bigTitle = title ?? dict.login.greeting;
  const smallTitle = subtitle ?? dict.login.welcomeMessage;

  return (
    <Box
      sx={{
        px: 2,
        pt: 4,
        pb: 6,
        background: 'linear-gradient(180deg, #F2FFB7 0%, #D2E960 100%)',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: showBack ? 'space-between' : 'center',
        }}>
        {showBack && (
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1, textAlign: showBack ? 'center' : 'center' }}>
          <Image
            src='/logo.png'
            width={146}
            height={31}
            alt='SkillNet'
            priority
          />
        </Box>
      </Box>

      <Typography
        variant='h4'
        fontWeight='bold'
        color='text.primary'
        mt={3}
        textAlign='left'
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        {bigTitle}
      </Typography>
      <Typography color='text.primary' textAlign='left' sx={{ mt: 1, mb: 2 }}>
        {smallTitle}
      </Typography>
    </Box>
  );
}
