'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useStore from '@/store/useStore';
import { getUserbyClaim } from '../Utils/api';
import { jwtDecodeToken } from '../Utils/function';

function Profilemanu() {
    const { user, setUser } = useStore();
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(true); // เพิ่มสถานะการโหลด
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    setLoading(false); // ข้อมูลโหลดเสร็จ แต่ไม่มี Token
                    return;
                }

                const jwtToken = jwtDecodeToken(token);
                if (jwtToken) setUserRole(jwtToken);

                const [userResponse] = await Promise.all([
                    getUserbyClaim(),
                ]);

                setUser({
                    role: jwtToken?.role || '',
                    user_id: userResponse.data.user_id,
                    title_name: userResponse.data.title_name,
                    first_name: userResponse.data.first_name,
                    last_name: userResponse.data.last_name,
                    phone: userResponse.data.phone,
                    code: userResponse.data.code,
                    branch: userResponse.data.branch || '',
                    email: userResponse.data.email || '',
                    year: userResponse.data.year || '',
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // ข้อมูลโหลดเสร็จ
            }
        };

        fetchData();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const logOut = () => {
        setUser(null);
        setUserRole(null);
    };

    const handleMenuItemClick = (route) => {
        if (route === '/logout') {
            Cookies.remove('token');
            logOut();
            router.push('/Login');
        } else {
            router.push(route);
        }
        handleClose();
    };

    if (loading) {
        // ข้อมูลกำลังโหลด
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-gray-500 text-lg">กำลังโหลดข้อมูล...</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 ">
            <div className='relative flex justify-center items-center rounded-full border-[1px] border-gray '>
                {user && (
                    <span className="text-gray-500 px-3 py-1 text-md font-kanit hover:underline w-full">
                        userID: {user.user_id} Role: ({userRole.role})
                    </span>
                )}
                <div className='ml-1 rounded-full flex items-center justify-center '>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        style={{ borderRadius: '100px' }}
                        sx={{
                            "&:hover": {
                                background: 'none'
                            }
                        }}
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
                    {userRole ? (
                        userRole.role === 'teacher' ? (
                            <div className='font-kanit'>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/Admin')}>Dashboard</MenuItem>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/Home/Infomation')}>แก้ไขข้อมูลส่วนตัว</MenuItem>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/logout')}>Logout</MenuItem>
                            </div>
                        ) : userRole.role === 'student' ? (
                            <div>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/Home/Infomation')}>แก้ไขข้อมูลส่วนตัว</MenuItem>
                                <MenuItem style={{ fontFamily: 'kanit' }} onClick={() => handleMenuItemClick('/logout')}>Logout</MenuItem>
                            </div>
                        ) : null
                    ) : (
                        <div className='font-kanit'>
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