'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Profilemanu from './Profilemanu';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { jwtDecodeToken } from '../Utils/function';
import Sidebar from './sidebar';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import CustomMenu from './CustomManu';
import BasicButtons from './BasicButtons';
import useStore from '@/store/useStore';

function Nav() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const { userData } = useStore();
    // console.log(userData);

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
            <div className=" xs:w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex justify-end px-10 items-center fixed z-10">
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

    const isRegistrationPage = pathname === '/Register/Student' || pathname === '/Register/Teacher';

    return (
        <div className="w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex lg:justify-between lg:items-center z-10 fixed top-0">
            {(user?.role === 'teacher' || user?.role === 'admin') && (
                <div className='flex justify-between items-center  lg:mx-20 w-screen'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='flex justify-center items-center'>
                            <Sidebar />

                            <Link href="/Home" className='hover:bg-stone-50 xs:hidden lg:block md:block'>
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
                    </div>
                </div>
            )}

            {!user?.role && (
                <Link href="/Home" className='ml-[50px]  justify-center items-center  lg:flex  xs:hidden' >
                    <span className=" font-kanit text-2xl">LOGO</span>
                </Link>
            )}
            {user?.role === 'student' && (
                <Link href="/Home">
                    <span className="ml-[50px] font-kanit text-2xl">LOGO</span>
                </Link>
            )}

            {pathname === '/Login' && (
                <div className="xs:w-screen xs:flex  xs:justify-end xs:items-center xs:mr-2 lg:mr-10  md:justify-end">

                    <div className='xs:grid xs:grid-cols-2 lg:flex justify-center items-center gap-5 xs:mr-5'>
                        <CustomMenu />
                        <BasicButtons
                            label={'กิจกรรม'}
                            onClick={() => router.push('/Home')}
                        />
                    </div>
                </div>
            )}

            {isRegistrationPage && (
                <div className='flex gap-5 xs:mr-5'>
                    {registerPath.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-100"
                        >
                            <span className="drop-shadow-2xl">{link.label}</span>
                        </Link>
                    ))}
                    {commonLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-kanit hover:bg-gray-200 hover:text-black transition duration-100"
                        >
                            <span className="drop-shadow-2xl">{link.label}</span>
                        </Link>
                    ))}
                </div>
            )}

            {/* Home page navigation for user role */}
            {user?.role === 'student' && (

                <div className=" flex gap-10 justify-between">
                    <div className='flex' >
                        {userLinks.map((link, index) => (
                            <div key={index} className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] font-kanit">
                                <Link href={link.href}>
                                    <span>{link.label}</span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div>
                        <Profilemanu user={user} />
                    </div>
                </div>

            )}

            {pathname === '/Home' && !user && (
                <div className='flex gap-5 xs:mr-5'>
                    <CustomMenu />
                    <BasicButtons label={'เข้าสู่ระบบ'} onClick={(e) => {
                        router.push('/Login')
                    }} />
                </div>
            )}
        </div>
    );
}

export default Nav;