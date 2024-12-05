'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profilemanu from './Profilemanu';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { jwtDecodeToken } from '../Utils/function';
import Sidebar from './sidebar';
import LogoDevIcon from '@mui/icons-material/LogoDev';

function Nav() {
    const pathName = usePathname() || " ";
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const jwtDecoded = jwtDecodeToken(token);
            setUser(jwtDecoded);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []); 

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
    ];

    const registerPath = [
        { href: '/Login', label: 'เข้าสู่ระบบ' }
    ];

    const authLinks = [
        { href: '/Register', label: 'ลงทะเบียน' }
    ];

    const userLinks = [
        { href: '/', label: 'ขอเพิ่มกิจกรรมนอกสถานที่' },
        { href: '/', label: '-' },
        { href: '/', label: '-' }
    ];


    return (
        <div className="w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex justify-between items-center z-10">
            {(user?.role === 'teacher' || user?.role === 'admin') && (
                <div className='flex justify-between items-center ml-20 w-screen'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='flex justify-center items-center'>
                            <Link href="/Home" className='hover:bg-stone-50'>
                                <LogoDevIcon style={{
                                    fontSize: "50px",
                                    color: "#0067B3"
                                }} />
                            </Link>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className="w-[230px]">
                            <Profilemanu user={user} />
                        </div>
                        <Sidebar  />
                    </div>
                </div>
            )}

            {user?.role !== 'teacher' && user?.role !== 'admin' && (
                <Link href="/Home">
                    <span className="ml-[50px] font-kanit text-2xl">LOGO</span>
                </Link>
            )}

            <div className="gap-2 flex mr-[50px]">
                {pathName === '/Login' && (
                    <div className='flex gap-5'>
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

                {pathName === '/Register/Student' || pathName === '/Register/Teacher' && (
                    <div className='flex gap-5'>
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

                {pathName === '/Home' && !user && (
                    <div className='flex gap-5'>
                        {commonLinks.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-100">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                        {authLinks.map((link, index) => (
                            <div key={index}>
                                <Link href={link.href} className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-100">
                                    <span className="drop-shadow-2xl">{link.label}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;