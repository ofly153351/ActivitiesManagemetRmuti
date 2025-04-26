import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CustomselectTrans({ label, options, value }) {

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    console.log(options);


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={value}
                    onChange={handleChange}
                >
                    {options.map(() => (

                        <MenuItem value={value}>{options.faculty_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}