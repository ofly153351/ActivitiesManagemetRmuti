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
  readOnly = false // เพิ่ม props readOnly พร้อมค่าเริ่มต้นเป็น false
}) {
  // handleChange ส่งค่า value ไปคืน props.onChange
  const handleChange = (event) => {
    if (!readOnly) { // ถ้า readOnly เป็น true จะไม่เรียก onChange
      onChange(event.target.value);
    }
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
          disabled={readOnly} // ใช้ disabled เมื่อ readOnly เป็น true
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <MenuItem
                sx={{ fontFamily: 'Kanit, sans-serif' }}
                key={index}
                value={option[field]} // ใช้ field เพื่อเข้าถึง property ที่ต้องการ
              >
                {option[field]} {/* แสดงค่าจาก field */}
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