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
import Link from 'next/link';
import MuiLink from '@mui/material/Link';

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
    borderRadius: 4,
    boxShadow: '0.1px 3px 5px 0.1px #ccc',
    cursor: 'pointer',
    borderWidth: 1,
    transition: 'border-color 0.2s, box-shadow 0.2s',
    marginBottom: 1,
  };

  const iconStyles = {
    fontSize: 66,
    color: 'primary.main',
    mr: 2,
  };

  return (
    <Box>
      {/* Step Heading */}
      <Typography variant='h6' sx={{ mb: 3 }}>
        {dict.register.step1Heading}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {dict.register.step1Subheading}
      </Typography>

      {/* Option Cards */}
      <Box display='flex' flexDirection='column' gap={2} mb={3}>
        <Card
          variant='outlined'
          onClick={() => setSelected('executor')}
          sx={{
            ...cardBaseStyles,
            // borderColor: selected === 'executor' ? 'primary.main' : 'divider',
            backgroundColor: selected === 'executor' ? '#D6E8FC' : 'white',
          }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <PersonRegular style={iconStyles} />
            <Box sx={{ py: 1, px: 2 }}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {dict.register.executorOptionLabel}
              </Typography>
              <Typography>{dict.register.executorOptionDescription}</Typography>
            </Box>
          </CardContent>
        </Card>

        <Card
          variant='outlined'
          onClick={() => setSelected('company')}
          sx={{
            ...cardBaseStyles,
            // borderColor: selected === 'company' ? 'primary.main' : 'divider',
            backgroundColor: selected === 'company' ? '#D6E8FC' : 'white',
          }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <BuildingRegular style={iconStyles} />
            <Box sx={{ py: 1, px: 2 }}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {dict.register.companyOptionLabel}
              </Typography>
              <Typography>{dict.register.companyOptionDescription}</Typography>
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
      <Box textAlign='left'>
        <Typography>{dict.register.haveProfileAlready}</Typography>
        <MuiLink
          component={Link}
          href={`/${lang}/login`}
          sx={{
            display: 'inline-block',
            fontSize: '1rem',
            fontWeight: 500,
            mt: 4,
          }}>
          {dict.login.login}
        </MuiLink>
      </Box>
    </Box>
  );
}
