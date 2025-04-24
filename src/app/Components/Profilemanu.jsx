import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';
import { useStore } from '@/store/useStore';
import MailNotification from './MailNotification';
import { getNews, handlelogOut, readNews, } from '../Utils/api';
import { set } from 'react-hook-form';

function ProfileMenu() {
    const { user, clearAll, userRoleHash, initUserRoleHash } = useStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [openMail, setOpenMail] = useState(false);
    const [news, setNews] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)

    // ✅ ให้ React เรียก useEffect เสมอ
    useEffect(() => {
        initUserRoleHash()
    }, [userRoleHash])



    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const response = await getNews();
                    setNews(response.data);
                    const unread = (response?.data ?? []).filter(n => !n.is_read).length;
                    setUnreadCount(unread);
                } catch (error) {
                    console.error('Error fetching news:', error);
                }
            };
            fetchData();
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
            logOutUser();
        } else {
            router.push(route);
        }
        handleClose();
    };

    const handleReadnews = (header, eventID) => {

        console.log(header, eventID);
        const replaceHeader = header.split(' ');

        const readNewsData = async () => {
            try {
                const response = await readNews(eventID);
                console.log(response.data);
                if (header === 'กิจกรรมที่ต้องตรวจสอบ') {
                    router.push('/Admin/MyEvent');
                }
                if (replaceHeader[0] === 'เอกสารกิจกรรม') {
                    router.push('/Information/MyEvent');
                }
                if (header === 'กิจกรรมใหม่') {
                    router.push('/');
                }
            } catch (error) {
                console.log(error.message);

            }
        }
        readNewsData()

    }

    const logOutUser = async () => {
        const logoutUser = await handlelogOut(); // ✅ เรียกฟังก์ชันจาก API จริงๆ
        console.log(logoutUser);
        setIsLoggingOut(true);
        setTimeout(() => {
            clearAll(null);
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            // router.push('/Login');
            window.location.reload();
            setIsLoggingOut(false);
        }, 100);
    };

    const mailClick = () => {
        setOpenMail((prev) => !prev)
    }

    const parseMessage = (msg) => {
        const newEventRegex = /กิจกรรม'(.*?)'\s+'(.*?)'\s+'(.*?)'/;
        const newMatch = msg.match(newEventRegex);

        const deleteEventRegex = /กิจกรรม\s+'(.*?)'\s+ที่คุณเข้าร่วมถูกลบแล้ว/;
        const deleteMatch = msg.match(deleteEventRegex);

        const editEventRegex = /กิจกรรม\s+'(.*?)'\s+ที่คุณเข้าร่วมมีการแก้ไขรายละเอียด./;
        const editMatch = msg.match(editEventRegex);

        const checkEventRegex = /กิจกรรม\s+'(.*?)'\s+ที่คุณต้องตรวจสอบ./;
        const checkMatch = msg.match(checkEventRegex);

        const alreadyCheckRegex = /เอกสารกิจกรรม\s+'(.*?)'(?:\s+'(.*?)')?/;
        const alreadyCheckMatch = msg.match(alreadyCheckRegex); // ✅ ใช้ msg

        const finalDoneAll = /เอกสารของคุณถูกประเมินว่า\s+'(.*?)'(?:\s+'(.*?)')?/;
        const finalDoneAllMatch = msg.match(finalDoneAll); // ✅ ใช้ msg

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
            const [, name] = deleteMatch;
            return (
                <>
                    กิจกรรม: <span className="font-kanit text-red-500">{name}</span><br />
                    สถานะ: <span className="font-kanit text-red-500">ถูกยกเลิก</span>
                </>
            );
        }

        if (editMatch) {
            const [, name] = editMatch;
            return (
                <>
                    กิจกรรม: <span className="font-kanit text-red-500">{name}</span><br />
                </>
            );
        }

        if (checkMatch) {
            const [, name] = checkMatch;
            return (
                <>
                    กิจกรรม: <span className="font-kanit text-orange-500">{name}</span><br />
                </>
            );
        }

        if (finalDoneAllMatch) {
            const [, status, name] = finalDoneAllMatch;

            return (
                <>
                    {name && (
                        <>
                            กิจกรรม: <span className="font-kanit text-red-500">{name}</span><br />
                        </>
                    )}
                    <span className="font-kanit">
                        สถานะ: <span className={status === 'ไม่ผ่าน' ? 'text-red-500' : 'text-green-500'}>
                            {status}
                        </span>
                    </span>
                </>
            );
        }
        if (finalDoneAllMatch) {
            const [, name, status] = finalDoneAllMatch;
            return (
                <>
                    กิจกรรม: <span className="font-kanit text-red-500">{name}</span><br />
                    {status && status === 'ไม่ผ่าน' ? (
                        <>
                            สถานะ: <span className="font-kanit text-red-500">{status}</span>
                        </>
                    ) : (
                        <>
                            สถานะ: <span className="font-kanit text-green-500">{status}</span>
                        </>
                    )}
                </>
            );
        }

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
                        <MailNotification newCount={unreadCount} />
                    </button>
                    {openMail && (
                        <div className="mt-3 absolute z-50 translate-y-2 duration-300">
                            {/* Triangle Arrow */}
                            <div className="mx-2 w-0 h-0 
      border-l-[10px] border-l-transparent
      border-b-[12px] border-b-gray-200
      border-r-[12px] border-r-transparent"
                            ></div>

                            {/* Dropdown Box */}
                            <div className="absolute xs:w-52 lg:w-72 bg-white border border-gray-200 shadow-md rounded-lg z-50">
                                <h4 className="text-lg font-kanit px-1 mt-2 mb-2">แจ้งเตือน</h4>
                                <div className="p-2 max-h-56 overflow-y-auto">
                                    <div>
                                        {news?.length > 0 ? (
                                            news.map((item, index) => {
                                                const bgClass = item.is_read
                                                    ? 'bg-gray-100 hover:bg-gray-200'
                                                    : 'bg-blue-100 hover:bg-blue-200';

                                                return (
                                                    <button
                                                        onClick={() => handleReadnews(item.title, item.news_id)}
                                                        key={index}
                                                        className={`w-full py-1 rounded-sm px-1 m-[1px] text-start ${bgClass}`}
                                                    >
                                                        <p className="text-sm font-kanit">
                                                            {item.title.replace(/'/g, '')}
                                                        </p>
                                                        <p className="text-sm font-kanit">
                                                            {parseMessage(item.message)}
                                                        </p>
                                                    </button>
                                                );
                                            })
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
                        {user.first_name} {user.last_name}
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
                            ['teacher', 'admin', 'superadmin'].includes(userRoleHash) ? (
                                <div className="font-kanit">

                                    <MenuItem onClick={() => handleMenuItemClick('/Information')}>
                                        <p className='font-kanit' >แก้ไขข้อมูลส่วนตัว</p>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('/logout')}>
                                        <p className='font-kanit' >Logout</p>
                                    </MenuItem>
                                </div>
                            ) : userRoleHash === 'student' ? (
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