import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';
import { useStore } from '@/store/useStore';
import MailNotification from './MailNotification';
function ProfileMenu() {
    const { user, clearAll, userRole, setUser, setUserRole } = useStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // ✅ ให้ React เรียก useEffect เสมอ
    useEffect(() => {
        if (user && userRole) {
            // console.log(user);
        }
    }, [user, userRole]);

    const handleClick = (event) => {
        // if (window.innerWidth <= 430) return;
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleMenuItemClick = (route) => {
        if (route === '/logout') {
            logOut();
        } else {
            router.push(route);
        }
        handleClose();
    };

    const logOut = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            clearAll(null);
            Cookies.remove('token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            router.push('/Login');
            setIsLoggingOut(false);
        }, 100);
    };

    const mailClick = () => {
        let count = 0;
        console.log('click', count);
        count++;
    }

    // ✅ ให้ return UI ด้านล่าง แต่แสดงสถานะการโหลด
    let content;
    if (isLoggingOut) {
        content = (
            <div className="flex justify-center items-center h-screen">
                <span className="text-gray-500 text-lg font-kanit">กำลังออกจากระบบ...</span>
            </div>
        );
    } else if (!user) {
        content = (
            <div className="flex justify-center items-center h-screen">
                <span className="text-gray-500 text-lg font-kanit">กำลังโหลดข้อมูล...</span>
            </div>
        );
    } else {
        content = (
            <div className="xs:flex xs:items-center xs:gap-2 xs:mr-5">
                <div className='mx-5' >
                    <button type="button" onClick={mailClick} >
                        <MailNotification />
                    </button>
                </div>

                <div className="relative flex justify-center items-center rounded-full border border-gray">
                    <span className="text-gray-500 px-3 py-1 text-md font-kanit hover:underline">
                        {user.first_name} {user.last_name} ({userRole?.role || 'ไม่มีข้อมูล'})
                    </span>
                    <div className="ml-1 rounded-full flex items-center justify-center">
                        <Button
                            id="profile-menu-button"
                            aria-controls={open ? 'profile-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className="rounded-full hover:bg-transparent"
                        >
                            <AccountCircleIcon fontSize="large" />
                        </Button>
                    </div>
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'profile-menu-button',
                        }}
                    >
                        {userRole ? (
                            ['teacher', 'admin'].includes(userRole.role) ? (
                                <div className="font-kanit">
                                    <MenuItem onClick={() => handleMenuItemClick('/Admin')}>
                                        <p className='font-kanit' >Dashboard</p>

                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('/Infomation')}>
                                        <p className='font-kanit' >แก้ไขข้อมูลส่วนตัว</p>

                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('/logout')}>
                                        <p className='font-kanit' >Logout</p>
                                    </MenuItem>
                                </div>
                            ) : userRole.role === 'student' ? (
                                <div className="font-kanit">
                                    <MenuItem onClick={() => handleMenuItemClick('/Infomation')}>
                                        <p className='font-kanit' >
                                            แก้ไขข้อมูลส่วนตัว
                                        </p>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('/Information/MyEvent')}>
                                        <p className='font-kanit' >กิจกรรมของฉัน</p>

                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('/logout')}>
                                        <p className='font-kanit' >Logout</p>
                                    </MenuItem>
                                </div>
                            ) : null
                        ) : (
                            <div className="font-kanit">
                                <MenuItem onClick={() => handleMenuItemClick('/Register')}>
                                    <p className='font-kanit' >สมัครสมาชิก</p>

                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/Login')}>
                                    <p className='font-kanit' >เข้าสู่ระบบ</p>

                                </MenuItem>
                            </div>
                        )}
                    </Menu>
                </div>
            </div >
        );
    }

    return content;
}

export default ProfileMenu;