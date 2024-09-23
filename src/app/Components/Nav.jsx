'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profilemanu from './Profilemanu';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { jwtDecodeToken } from '../Utils/function'
import Sidebar from './sidebar';
function Nav() {
    const pathName = usePathname() || " ";
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('access_token');
        // console.log(token);
        if (token) {
            const jwtDecoded = jwtDecodeToken(token);
            setUser(jwtDecoded);
            // console.log(jwtDecoded);
            setLoading(false);
        } else {
            setLoading(false)
        }
    }, []); // ควรใช้ [] เป็น dependencies เพื่อให้ useEffect ทำงานเพียงครั้งเดียว

    if (loading) {
        return (
            <div className="w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex justify-end px-10 items-center fixed z-10">
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        );
    }

    const commonLinks = [
        { href: '/Home', label: 'รายชื่อกิจกรรม' }
    ];

    const loginPath = [
        { href: '/Register', label: 'ลงทะเบียน' }
    ]

    const registerPath = [
        // { href: '/Register', label: 'ลงทะเบียน' },
        { href: '/Login', label: 'เข้าสู่ระบบ' }
    ];

    const authLinks = [
        { href: '/Register', label: 'ลงทะเบียน' }
    ]

    const userLinks = [
        { href: '/', label: 'ขอเพิ่มกิจกรรมนอกสถานที่' },
        { href: '/', label: '-' },
        { href: '/', label: '-' }
    ];

    const adminLinks = [
        { href: '/Admin/Userlist', label: 'แสดงรายชื่อนักศึกษาทั้งหมด' },
        { href: '/Admin/Eventlist', label: 'แสดงกิจกรรมทั้งหมด' },
        { href: '/', label: 'เพิ่มกิจกรรม' }
    ];

    return (
        <div className="w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex justify-between items-center fixed z-10">
            {user?.role === 'admin' ? (
                <div className='flex justify-center items-center ml-2' >
                    <Link href="/Home" >
                        <img className='w-20 h-20' src="https://www.studentloan.or.th/sites/default/files/styles/medium/public/images/knowledgemedia/%E0%B8%81%E0%B8%A2%E0%B8%A8-01_0.png?itok=H5QWXx37" alt="" srcset="" />
                    </Link>
                    <Sidebar />
                </div>
            ) : (
                <Link href="/Home" >
                    <span className="ml-[50px] font-kanit text-2xl">LOGO</span>
                </Link>
            )}

            <div className="gap-5 flex mr-[50px]">
                {pathName === '/Login' && (
                    <div>
                        {loginPath.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-100">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                        {commonLinks.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-100">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                {pathName === '/Register' && (
                    <div>
                        {registerPath.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-100">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                        {commonLinks.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-100">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                {pathName === '/Home' && user?.role === 'user' && (
                    <div className="mr-20 flex gap-10">
                        {userLinks.map((link, index) => (
                            <div key={index} className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] font-kanit">
                                <Link href={link.href}>
                                    <span>{link.label}</span>
                                </Link>
                            </div>
                        ))}
                        <Profilemanu user={user} />
                    </div>
                )}
                {pathName === '/Home' && user == null && (
                    <div>

                        {commonLinks.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-300">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                        {authLinks.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-300">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                {user?.role === 'admin' && (
                    <div className="mr-20 flex gap-10">
                        {adminLinks.map((link, index) => (
                            <div key={index} className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] font-kanit transition duration-300 hover:transform hover:-translate-y-1">
                                <Link href={link.href}>
                                    <span>{link.label}</span>
                                </Link>
                            </div>
                        ))}
                        <Profilemanu user={user} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;