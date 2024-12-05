import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function BasicButtons({ label, onClick, height = 50, width = 120 , type = 'text'}) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          height: height,
          width: width,
          fontFamily: 'Kanit, sans-serif',
        }}
        type={type}
      >
        {label}
      </Button>
    </Stack>
  );
}

export default BasicButtons;