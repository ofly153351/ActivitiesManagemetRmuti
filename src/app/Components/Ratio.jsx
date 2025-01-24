import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Ratio({ label }) {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                {label.map(() => (
                    <FormControlLabel value={label.value} control={<Radio />} label={label.name} />

                ))}
                <FormControlLabel
                    value="disabled"
                    disabled
                    control={<Radio />}
                    label="other"
                />
            </RadioGroup>
        </FormControl>
    );
}