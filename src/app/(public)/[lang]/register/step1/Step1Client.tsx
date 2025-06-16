'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { PersonRegular, BuildingRegular } from '@fluentui/react-icons';
import type { Translations, Locale } from '../../../../../i18n/dictionaries';

interface Props {
  dict: Translations;
  lang: Locale;
}

export default function Step1Client({ dict, lang }: Props) {
  const [selected, setSelected] = useState<'executor' | 'company' | null>(null);
  const router = useRouter();

  const cardBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 2,
    boxShadow: 1,
    cursor: 'pointer',
    borderWidth: 2,
    transition: 'border-color 0.2s, box-shadow 0.2s',
    '&:hover': {
      boxShadow: 3,
    },
  };

  const iconStyles = {
    fontSize: 32,
    color: 'primary.main',
    mr: 2,
  };

  return (
    <Box>
      {/* Step Heading */}
      <Typography variant='h6' gutterBottom>
        {dict.register.step1Heading}
      </Typography>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        {dict.register.step1Subheading}
      </Typography>

      {/* Option Cards */}
      <Box display='flex' flexDirection='column' gap={2} mb={3}>
        <Card
          variant='outlined'
          onClick={() => setSelected('executor')}
          sx={{
            ...cardBaseStyles,
            borderColor: selected === 'executor' ? 'primary.main' : 'divider',
          }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <PersonRegular style={iconStyles} />
            <Box>
              <Typography variant='subtitle1'>
                {dict.register.executorOptionLabel}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {dict.register.executorOptionDescription}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card
          variant='outlined'
          onClick={() => setSelected('company')}
          sx={{
            ...cardBaseStyles,
            borderColor: selected === 'company' ? 'primary.main' : 'divider',
          }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <BuildingRegular style={iconStyles} />
            <Box>
              <Typography variant='subtitle1'>
                {dict.register.companyOptionLabel}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {dict.register.companyOptionDescription}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Next Button */}
      <Button
        variant='contained'
        fullWidth
        disabled={!selected}
        onClick={() =>
          router.push(`/${lang}/register/step2?userType=${selected}`)
        }
        sx={{ mb: 3, py: 1.5 }}>
        {dict.register.nextButton}
      </Button>

      {/* Separator */}
      <Divider sx={{ my: 3 }} />

      {/* Footer Link */}
      <Box textAlign='center'>
        <Typography variant='body2' color='text.secondary'>
          {dict.register.alreadyHaveAccount}
        </Typography>
        <Button
          variant='text'
          onClick={() => router.push(`/${lang}/login`)}
          sx={{ mt: 1, textTransform: 'none' }}>
          {dict.register.loginLink}
        </Button>
      </Box>
    </Box>
  );
}
