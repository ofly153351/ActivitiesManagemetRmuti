import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';
import { useStore } from '@/store/useStore';

function ProfileMenu() {
    const { user, clearAll, userRole, setUser, setUserRole } = useStore();

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // เช็คว่า user และ userRole มีการเปลี่ยนแปลงจริงก่อน
    useEffect(() => {
        if (user && userRole) {
            console.log(user); // เมื่อ user และ userRole มีการเปลี่ยนแปลง จะแสดงผลข้อมูล
        }
    }, [user, userRole]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const logOut = () => {
        if (user || userRole) {
            clearAll(null);
            // รีเซ็ตข้อมูลผู้ใช้ใน Zustand store        // รีเซ็ตข้อมูล role ใน Zustand store
        }
        Cookies.remove('token');    // ลบ token ออกจาก cookies
        localStorage.removeItem('user');  // ลบข้อมูล user ถ้าเก็บใน localStorage
        sessionStorage.removeItem('user'); // ลบข้อมูล user ถ้าเก็บใน sessionStorage
        router.push('/Login');        // นำทางไปที่หน้า login
    };

    const handleMenuItemClick = (route) => {
        if (route === '/logout') {
            logOut();
        } else {
            router.push(route);
        }
        handleClose();
    };

    // หากยังไม่มี user ให้แสดงสถานะกำลังโหลด
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-gray-500 text-lg font-kanit">กำลังโหลดข้อมูล...</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
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
                                    Dashboard
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/Infomation')}>
                                    แก้ไขข้อมูลส่วนตัว
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/logout')}>
                                    Logout
                                </MenuItem>
                            </div>
                        ) : userRole.role === 'student' ? (
                            <div className="font-kanit">
                                <MenuItem onClick={() => handleMenuItemClick('/Infomation')}>
                                    แก้ไขข้อมูลส่วนตัว
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/Information/MyEvent')}>
                                    กิจกรรมของฉัน
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/logout')}>
                                    Logout
                                </MenuItem>
                            </div>
                        ) : null
                    ) : (
                        <div className="font-kanit">
                            <MenuItem onClick={() => handleMenuItemClick('/Register')}>
                                สมัครสมาชิก
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('/Login')}>
                                เข้าสู่ระบบ
                            </MenuItem>
                        </div>
                    )}
                </Menu>
            </div>
        </div>
    );
}

export default ProfileMenu;