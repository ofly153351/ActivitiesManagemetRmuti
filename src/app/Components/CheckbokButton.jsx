import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckboxButtonLabel({ label, selected, onChange }) {
    return (
        <FormControlLabel
            control={<Checkbox checked={selected} onChange={() => onChange(label)} />}
            label={label}
        />
    );
}
