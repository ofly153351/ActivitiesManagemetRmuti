'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { fontFamily } from '../Utils/font';
import { useRouter } from 'next/navigation';



function StudentNavmenu({ buttonName, menu = [] }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (href) => {
        setAnchorEl(null);
    };

    // console.log(menu);

    return (
        <div >
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ fontFamily: fontFamily.Kanit }}
            >
                {buttonName}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ fontFamily: fontFamily.Kanit }}

            >
                {Array.isArray(menu) &&
                    (menu).map((item, index) => (
                        <MenuItem key={index} sx={{ fontFamily: fontFamily.Kanit }} onClick={() => item.function && item.function()}>
                            {item.label}
                        </MenuItem>
                    ))}
            </Menu>
        </div>
    )
}

export default StudentNavmenu