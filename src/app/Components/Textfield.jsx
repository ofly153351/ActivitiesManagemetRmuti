import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// Wrap the component with React.forwardRef to handle refs
const CustomTextfield = React.forwardRef(({ label, width = '25ch', readOnly = false, type = 'text' , id = ''}, ref) => {
    return (
        <Box
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: width,
                    fontFamily: 'Kanit, sans-serif',
                },
            }}
            noValidate
            autoComplete="on"
        >
            <TextField
                id={id}
                label={label}
                variant="outlined"
                ref={ref} // Forward the ref to the TextField component
                InputProps={{
                    readOnly: readOnly,
                    style: { fontFamily: 'Kanit, sans-serif' },
                    type: type,
                }}
            />
        </Box>
    );
});

// Optional: Add displayName for better debugging in React DevTools
CustomTextfield.displayName = 'CustomTextfield';

export default CustomTextfield;