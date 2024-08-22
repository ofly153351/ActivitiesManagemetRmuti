'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profilemanu from './Profilemanu';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // ใช้ jwtDecode แทน jwtDecode
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Nav() {
    const pathName = usePathname() || " ";
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('access_token');

        if (token) {
            try {
                const decodedJwt = jwtDecode(token);
                setUser(decodedJwt);
                console.log('Decoded JWT:', decodedJwt);
            } catch (error) {
                console.error('Error decoding JWT:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false); // เปลี่ยนเป็น false หลังจากโหลดเสร็จ
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

    const authLinks = [
        { href: '/Register', label: 'ลงทะเบียน' },
        { href: '/Login', label: 'เข้าสู่ระบบ' }
    ];

    const userLinks = [
        { href: '/', label: 'ขอเพิ่มกิจกรรมนอกสถานที่' },
        { href: '/', label: 'dwakdhwuah' },
        { href: '/', label: 'dwakdhwuah' }
    ];

    const adminLinks = [
        { href: '/Admin/Userlist', label: 'แสดงรายชื่อนักศึกษาทั้งหมด' },
        { href: '/Admin/Eventlist', label: 'แสดงกิจกรรมทั้งหมด' },
        { href: '/', label: 'เพิ่มกิจกรรม' }
    ];

    return (
        <div className="w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex justify-between items-center fixed z-10">
            <span className="ml-[50px] font-kanit text-2xl">LOGO</span>
            <div className="gap-5 flex mr-[50px]">
                {pathName === '/Login' && (
                    <>
                        {authLinks.map((link, index) => (
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
                    </>
                )}
                {pathName === '/Register' && (
                    <>
                        {authLinks.map((link, index) => (
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
                    </>
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
                    <>
                        {authLinks.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-300">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                        {commonLinks.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-300">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                    </>
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