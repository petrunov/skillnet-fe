'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { Translations } from '../../../i18n/dictionaries';

export default function MobileHeader({ dict }: { dict: Translations }) {
  return (
    <Box
      sx={{
        px: 2,
        pt: 4,
        pb: 6,
        background: 'linear-gradient(180deg, #d4ff00 0%, #ffffff 100%)',
      }}>
      <Image
        src='/logo.svg'
        width={120}
        height={40}
        alt='SkillNet'
        style={{ display: 'block', margin: '0 auto' }}
      />
      <Typography variant='h4' fontWeight='bold' color='primary.dark' mt={2}>
        {dict.login.greeting}
      </Typography>
      <Typography color='primary.dark'>{dict.login.welcomeMessage}</Typography>
    </Box>
  );
}
