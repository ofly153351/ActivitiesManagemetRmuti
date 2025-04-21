import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';
import { useStore } from '@/store/useStore';
import MailNotification from './MailNotification';
import { getNews, logOut as logOutUser } from '../Utils/api';

function ProfileMenu() {
    const { user, clearAll, userRole, setUser } = useStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [openMail, setOpenMail] = useState(false);
    const [news, setNews] = useState([])

    // ✅ ให้ React เรียก useEffect เสมอ
    useEffect(() => {
        if (user) {
            try {
                const fetchData = async () => {
                    const response = await getNews();
                    setNews(response.data)
                    console.log(response.data);
                }
                fetchData();
            } catch (error) {
                console.log(error);

            }
        }
    }, [user]);

    console.log(news);


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

    const logOut = async () => {
        const logoutUser = await logOutUser(); // ✅ เรียกฟังก์ชันจาก API จริงๆ
        console.log(logoutUser);
        setIsLoggingOut(true);
        setTimeout(() => {
            clearAll(null);
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            router.push('/Login');
            setIsLoggingOut(false);
        }, 100);
    };

    const mailClick = () => {
        setOpenMail((prev) => !prev)
    }
    const parseMessage = (msg) => {
        // กิจกรรมใหม่ เช่น "กิจกรรม'testMail' '19 เมษายน 2568' '10:22'"
        const newEventRegex = /กิจกรรม'(.*?)'\s+'(.*?)'\s+'(.*?)'/;
        const newMatch = msg.match(newEventRegex);

        // กิจกรรมที่ถูกลบ เช่น "กิจกรรม 'testmail' ที่คุณเข้าร่วมถูกลบแล้ว."
        const deleteEventRegex = /กิจกรรม\s+'(.*?)'\s+ที่คุณเข้าร่วมถูกลบแล้ว/;
        const deleteMatch = msg.match(deleteEventRegex);

        if (newMatch) {
            const [, name, date, time] = newMatch;
            return (
                <>
                    กิจกรรม: <span className="font-kanit text-green-500">{name}</span><br />
                    วันที่: <span className="font-kanit text-green-500">{date}</span><br />
                    เวลา: <span className="font-kanit text-green-500">{time}</span>
                </>
            );
        }

        if (deleteMatch) {
            const [_, name] = deleteMatch;
            return (
                <>
                    กิจกรรม: <span className="font-kanit text-red-500">{name}</span><br />
                    สถานะ: <span className="font-kanit text-red-500">ถูกยกเลิก</span>
                </>
            );
        }

        // ถ้าไม่ตรง format ให้คืนข้อความปกติ
        return <>{msg}</>;
    };
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
                        <MailNotification newCount={news?.length || []} />
                    </button>
                    {openMail && (
                        <div className='mt-3 absolute z-50 translate-y-2 duration-300' >
                            <div class=" mx-2 w-0 h-0 
                                border-l-[10px] border-l-transparent
                                border-b-[12px] border-b-gray-200
                                border-r-[12px] border-r-transparent">
                            </div>
                            <div className="absolute xs:w-52 lg:w-80 bg-white border border-gray-200 shadow-md rounded-lg z-50">
                                <div className="p-2">
                                    <h4 className="text-lg font-kanit px-1">แจ้งเตือน</h4>
                                    <div>
                                        {news?.length > 0 ? (
                                            news.map((item, index) => (
                                                <div key={index} className="py-1 rounded-sm px-1 border-y-1  border-gray-200 hover:bg-gray-100 ">
                                                    <p className="text-sm font-kanit">{item.title}</p>
                                                    <p className="text-sm font-kanit">{parseMessage(item.message)}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2">
                                                <p className="text-sm font-kanit">ไม่มีการแจ้งเตือนใหม่</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                </div>

                <div className="relative flex justify-center items-center rounded-full border border-gray">
                    <span className="text-gray-500 px-3 py-1 text-md font-kanit hover:underline">
                        {user.first_name} {user.last_name} ({user?.role || 'ไม่มีข้อมูล'})
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
                        {user ? (
                            ['teacher', 'admin', 'superadmin'].includes(user.role) ? (
                                <div className="font-kanit">
                                    <MenuItem onClick={() => handleMenuItemClick('/Admin')}>
                                        <p className='font-kanit' >Dashboard</p>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('/Information')}>
                                        <p className='font-kanit' >แก้ไขข้อมูลส่วนตัว</p>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('/logout')}>
                                        <p className='font-kanit' >Logout</p>
                                    </MenuItem>
                                </div>
                            ) : user.role === 'student' ? (
                                <div className="font-kanit">
                                    <MenuItem onClick={() => handleMenuItemClick('/Information')}>
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