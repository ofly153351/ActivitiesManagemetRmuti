import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function BasicButtons({ name ,onClick}) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={onClick} >{name}</Button>
    </Stack>
  )
}

export default BasicButtons
