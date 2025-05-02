import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();

  return (
    <Box sx={{ textAlign: 'center', mt: 4, px: 2 }}>
      <Typography variant='h6' gutterBottom>
        Check your inbox
      </Typography>
      <Typography>
        We’ve sent a link to your email. Please check your inbox.
      </Typography>
      <Button onClick={() => router.push('/')} sx={{ mt: 2 }}>
        Back to Home
      </Button>
    </Box>
  );
}
