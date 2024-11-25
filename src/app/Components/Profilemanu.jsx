'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { jwtDecode } from "jwt-decode";
import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Profilemanu() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const pathName = usePathname() || " ";

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            try {
                const decodedJwt = jwtDecode(token);
                setUser(decodedJwt);
            } catch (error) {
                console.error('Error decoding JWT:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []); // Dependency array is empty, so this effect runs once on mount

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleMenuItemClick = (route) => {
        if (route === '/logout') {
            Cookies.remove('access_token');
            setUser(null);
            router.push('/Login');
        } else {
            router.push(route);
        }
        handleClose();
    };

    return (
        <div className="flex items-center gap-2 ">
            <div className='relative flex justity-center items-center '>
                {/* Add the user's name here */}
                {user && (
                <span className=" text-gray-500  text-md font-kanit hover:underline ">{user.email} ({user.role})</span>
                )}
                <div className='ml-1 rounded-full flex items-center justify-center p-0'>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        style={{ borderRadius: '100px' }}
                    >
                        <AccountCircleIcon fontSize="large" />
                    </Button>
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {user ? (
                        user.role === 'admin' ? (
                            <div className='font-kanit' >
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/Admin')}>Admin</MenuItem>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/Home/Profile')}>แก้ไขข้อมูลส่วนตัว</MenuItem>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/logout')}>Logout</MenuItem>
                            </div>
                        ) : user.role === 'user' ? (
                            <div>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/profile')}>ประวัติส่วนตัว</MenuItem>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/account')}>My account</MenuItem>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/logout')}>Logout</MenuItem>
                            </div>
                        ) : null
                    ) : (
                        <div className='font-kanit' >
                            <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/Register')}>สมัครสมาชิก</MenuItem>
                            <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/Login')}>เข้าสู่ระบบ</MenuItem>
                        </div>
                    )}
                </Menu>
            </div>
        </div>
    );
}

export default Profilemanu;