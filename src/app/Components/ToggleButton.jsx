import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';


function CustomToggleButton({ label, selected, onToggle }) {


    return (
        <ToggleButton
            value={label}
            selected={selected}
            onChange={onToggle}
            className={`p-2 ${selected ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
            {label}
        </ToggleButton>
    );
}

export default CustomToggleButton