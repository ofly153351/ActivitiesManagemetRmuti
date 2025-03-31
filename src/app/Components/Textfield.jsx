import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const CustomTextfield = React.forwardRef(

  (
    {
      value = '',
      label = '',
      width = '25ch',
      readOnly = null,
      type = 'text',
      id = '',
      placeholder = '',
      onChange = () => { }, // เพิ่ม onChange เพื่อรองรับ callback
      disabled = false
    },
    ref

  ) => {

    return (
      <Box
        sx={{
          fontFamily: 'Kanit, sans-serif',
          '& > :not(style)': {
            m: 1,
            width: { xs: '20ch', sm: '25ch', lg: width },
          },
        }}
      >
        <TextField
          sx={{
            background: 'white',
          }}
          disabled={disabled}
          value={value}
          id={id}
          label={label}
          placeholder={placeholder} // รองรับ placeholder
          variant="outlined"
          ref={ref} // Forward the ref to the TextField component
          onChange={onChange} // รองรับ onChange callback
          InputProps={{
            readOnly: readOnly,
            type: type,
            style: { fontFamily: 'Kanit, sans-serif' }, // ฟอนต์สำหรับข้อความที่ป้อน
          }}
          InputLabelProps={{
            style: { fontFamily: 'Kanit, sans-serif' }, // ฟอนต์สำหรับ Label
          }}
        />
      </Box>
    );
  }
);

CustomTextfield.displayName = 'CustomTextfield';

export default CustomTextfield;