import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export function SuccessAlert({ label = '' }) {
  return (
    <Stack sx={{ width: '100%' , animationDuration: '100' }} spacing={2}>
      <Alert severity="success">{label}</Alert>
    </Stack>
  );
}

export function ErrorAlert({ label = '' }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{label}</Alert>
    </Stack>
  );
}