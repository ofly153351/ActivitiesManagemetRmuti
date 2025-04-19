import React from 'react';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function TeacherSelect({
  high = '50px',
  width = '25ch',
  label,
  value = '',
  onChange,
  options = [],
  field = '',
  displayField = field, // เพิ่มฟิลด์สำหรับการแสดงผล
  margin = 1,
  readOnly = false
}) {
  const handleChange = (event) => {
    if (!readOnly) {
      onChange(event.target.value);
    }
  };

  // สร้างฟังก์ชันสำหรับแสดงผลชื่อบน MenuItem
  const getDisplayText = (option) => {
    if (displayField === 'full_name') {
      return `${option.first_name} ${option.last_name}`;
    }
    return option[displayField];
  };

  return (
    <Box sx={{ height: high, width: width, margin: margin, background: 'white' }}>
      <FormControl fullWidth sx={{ background: 'white' }}>
        <InputLabel sx={{ fontFamily: 'Kanit, sans-serif' }} id="custom-select-label">{label}</InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          label={label}
          onChange={handleChange}
          sx={{ fontFamily: 'Kanit, sans-serif' }}
          disabled={readOnly}
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <MenuItem
                sx={{ fontFamily: 'Kanit, sans-serif' }}
                key={index}
                value={option[field]} // value เป็น ID
              >
                {getDisplayText(option)} {/* แสดงชื่อเต็ม */}
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