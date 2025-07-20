// src/app/[lang]/dashboard/page.tsx
'use client';

import React from 'react';
import { Box, Button, Typography, Container, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logout } from '../../../../lib/accountService';

export default function DashboardPage() {
  const BACKGROUND_IMAGE = '/dashboard-bg.jpg'; // put your image in public/
  const LOGO = '/logo.png'; // put your logo in public/

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/bg/login'); // or `/en/login` based on lang
  };

  return (
    <Box>
      {/* HERO SECTION */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 500, md: 600 },
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: '#fff',
        }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1,
          }}
        />

        <Container
          maxWidth='md'
          sx={{
            position: 'relative',
            zIndex: 2,
            pb: { xs: 4, md: 8 },
          }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 } }}>
            <Image src={LOGO} width={146} height={31} alt='SkillNet' priority />
          </Box>

          <Typography
            variant='h3'
            component='h1'
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2,
            }}>
            Открии талантливи изпълнители
          </Typography>

          <Typography
            variant='h6'
            component='p'
            sx={{
              color: '#fff',
              textAlign: { xs: 'center', md: 'left' },
              mt: 1,
              mb: 3,
            }}>
            Търсиш в каталог от топ таланти
          </Typography>

          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Button
              variant='contained'
              size='large'
              onClick={handleLogout}
              sx={{
                backgroundColor: '#39FF99',
                color: '#002A4E',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#2FEF8A',
                },
              }}>
              <Box
                component='span'
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  mr: 1,
                }}></Box>
              Изход
            </Button>

            <br />
            <br />

            <Button
              variant='contained'
              size='large'
              onClick={() => {
                /* router.push(`/${lang}/search`) */
              }}
              sx={{
                backgroundColor: '#39FF99',
                color: '#002A4E',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#2FEF8A',
                },
              }}>
              <Box
                component='span'
                sx={{ display: 'inline-flex', alignItems: 'center', mr: 1 }}>
                🔍
              </Box>
              ТЪРСИ
            </Button>
          </Box>
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Box
        sx={{
          backgroundColor: '#002A4E',
          color: '#fff',
          py: { xs: 4, md: 6 },
        }}>
        <Container maxWidth='md'>
          <Stack
            direction='column'
            spacing={2}
            sx={{
              '& .featureItem': { display: 'flex', alignItems: 'center' },
              '& .featureIcon': {
                color: '#39FF99',
                mr: 1.5,
                fontSize: '1.5rem',
              },
              '& .featureText': { fontSize: { xs: '1rem', md: '1.125rem' } },
            }}>
            <Box className='featureItem'>
              <CheckCircleIcon className='featureIcon' />
              <Typography className='featureText'>
                Свържи се с топ таланти в бранша
              </Typography>
            </Box>

            <Box className='featureItem'>
              <CheckCircleIcon className='featureIcon' />
              <Typography className='featureText'>
                Предлагаш работа в бранша
              </Typography>
            </Box>

            <Box className='featureItem'>
              <CheckCircleIcon className='featureIcon' />
              <Typography className='featureText'>
                Направи профил на фирмата
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
