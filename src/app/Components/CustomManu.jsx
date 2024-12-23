'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { colorsCode } from '../Utils/color';
import { useRouter } from 'next/navigation';

export default function CustomMenu() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (route) => {
        setAnchorEl(null);
        router.push(route);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                variant='contained'
                id="registration-menu-button"
                aria-controls={open ? 'registration-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ 
                    height: 50, 
                    width: 120, 
                    fontFamily: 'Kanit, sans-serif', 
                    background: colorsCode.blue,
                    '&:hover': {
                        background: colorsCode.blue,
                        opacity: 0.9
                    }
                }}
            >
                สมัครสมาชิก
            </Button>
            <Menu
                id="registration-menu"
                aria-labelledby="registration-menu-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiMenuItem-root': {
                        fontFamily: 'Kanit, sans-serif'
                    }
                }}
            >
                <MenuItem onClick={() => handleMenuClick('/Register/Student')}>
                    สำหรับนักศึกษา
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('/Register/Teacher')}>
                    สำหรับอาจารย์
                </MenuItem>
            </Menu>
        </div>
    );
}