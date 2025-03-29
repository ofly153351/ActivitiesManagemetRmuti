import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function BasicButtons({ color, hover, label, onClick, height = 50, width = 120, type = 'text', diasble = false }) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        disabled={diasble}
        variant="contained"
        onClick={onClick}
        sx={{
          '&:hover': {
            backgroundColor: hover
          },
          background: color,
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