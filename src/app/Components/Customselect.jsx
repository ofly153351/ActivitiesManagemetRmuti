import React from 'react';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Customselect({
  high = '50px',
  width = '25ch',
  label,
  value = '',
  onChange,
  options = [],
  field = '',
  margin = 1,
  readOnly = false
}) {
  const handleChange = (event) => {
    if (!readOnly) {
      onChange(event.target.value);
    }
  };

  return (
    <Box
      sx={{
        width: {
          xs: '23ch', // เต็มจอบนมือถือ
          sm: '23ch',
          md: '23ch',
          lg: width  // ใช้ค่าที่ส่งมาหรือ default
        },
        margin: margin,
        background: 'white',
      }}
    >
      <FormControl fullWidth sx={{ background: 'white' }}>
        <InputLabel
          id="custom-select-label"
          sx={{ fontFamily: 'Kanit, sans-serif' }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          label={label}
          onChange={handleChange}
          disabled={readOnly}
          sx={{
            fontFamily: 'Kanit, sans-serif',
          }}
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <MenuItem
                key={index}
                value={option[field]}
                sx={{ fontFamily: 'Kanit, sans-serif' }}
              >
                {option[field]}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}