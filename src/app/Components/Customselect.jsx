import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Customselect({ high = '50px', width = '25ch', label, value = '', onChange, options = [] }) {
  const handleChange = (event) => {
    onChange(event.target.value); // ส่งค่าที่เลือกกลับไปยัง parent component
    
  };

  return (
    <Box sx={{ height: high, width: width, margin: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="custom-select-label">{label}</InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          label={label}
          onChange={handleChange}
          sx={{fontFamily : 'Kanit, sans-serif'}}
        >
          {options.map((option, index) => (
            <MenuItem sx={{fontFamily: 'Kanit, sans-serif'}} key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}