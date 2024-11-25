import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function CustomTextfield({ label, width = '25ch', readOnly = false, value, type = 'text' }) {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: width,
                    fontFamily: 'Kanit, sans-serif',
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                label={label}
                variant="outlined"
                value={value}
                InputProps={{
                    readOnly: readOnly,
                    style: { fontFamily: 'Kanit, sans-serif' },
                    type: type,
                }}
            />
        </Box>
    );
}

export default CustomTextfield;