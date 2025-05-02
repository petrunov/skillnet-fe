'use client';

import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Translations } from '../../../i18n/dictionaries';

interface HeaderProps {
  dict: Translations;
  showBack?: boolean;
}

export default function Header({ dict, showBack = false }: HeaderProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        px: 2,
        pt: 4,
        pb: 6,
        background: 'linear-gradient(180deg, #F2FFB7 0%, #D2E960 100%)',
      }}>
      {showBack && (
        <IconButton onClick={() => router.back()} sx={{ mb: 1 }}>
          <ArrowBackIcon />
        </IconButton>
      )}

      {/* logo stays centered */}
      <Box sx={{ textAlign: 'center' }}>
        <Image
          src='/logo.svg'
          width={120}
          height={40}
          alt='SkillNet'
          priority
        />
      </Box>

      {/* greeting & welcome are now left‐aligned and pure black */}
      <Typography
        variant='h4'
        fontWeight='bold'
        color='text.primary'
        mt={2}
        textAlign='left'>
        {dict.login.greeting}
      </Typography>
      <Typography color='text.primary' textAlign='left' sx={{ mt: 1 }}>
        {dict.login.welcomeMessage}
      </Typography>
    </Box>
  );
}
