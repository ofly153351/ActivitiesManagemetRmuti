'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Profilemanu from './Profilemanu';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Sidebar from './sidebar';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import CustomMenu from './CustomManu';
import BasicButtons from './BasicButtons';
import useStore from '@/store/useStore';
import StudentNavmenu from './StudentNavmenu';
import CreateEventOutside from './Outside/CreateEventOutside';


function Nav() {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false)
    const [creatEventoutSide, setCreatEventOutside] = useState(true)
    const { user } = useStore();



    useEffect(() => {

        if (user) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    const commonLinks = [
        { href: '/Home', label: 'รายชื่อกิจกรรม' }
    ];


    const registerPath = [
        { href: '/Login', label: 'เข้าสู่ระบบ' }
    ];

    const userLinks = [
        { function: () => setOpenDialog(true), label: 'สร้างแปบฟอร์มกิจกรรมภายนอก' },
        { function: null, label: '-' },
        { function: null, label: '-' }
    ];

    const isRegistrationPage = pathname === '/Register/Student' || pathname === '/Register/Teacher';

    const handleDialogClose = (value) => {
        setOpenDialog(value); // เปลี่ยนค่า openDialog ให้เป็น false เมื่อ dialog ถูกปิด
        setCreatEventOutside(value)
    };



    if (loading) {
        return (
            <div className=" xs:w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex justify-end px-10 items-center fixed z-10">
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        );
    }



    return (

        <div className="w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex  lg:justify-between xs:justify-end  xs:items-center z-10  top-0">
            {(user?.role === 'teacher' || user?.role === 'admin' || user?.role === 'superadmin') && (
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
                    <div className="min-w-fit">
                        <Profilemanu user={user} />
                    </div>
                </div>
            )}

            {!user?.role && (
                <Link href="/Home" className='ml-[50px]  justify-center items-center lg:flex xs:hidden' >
                    <span className=" font-kanit text-2xl">LOGO</span>
                </Link>
            )}
            {user?.role === 'student' && (
                <Link href="/Home" className='ml-[50px]  justify-center items-center lg:flex ' >
                    <span className="ml-[50px] font-kanit text-2xl xs:hidden lg:flex ">LOGO</span>
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
                <div className=" flex  justify-between">
                    <div className='flex ' >
                        {userLinks.map((link, index) => (
                            <div key={index} className="p-2 flex xs:hidden lg:flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] font-kanit">
                                <button onClick={link.function}>
                                    <span>{link.label}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center lg:hidden' >
                        <StudentNavmenu buttonName="เมนู" menu={userLinks} onClick={(e) => console.log('11')} />
                    </div>
                    <div className="min-w-fit lg:mr-20">
                        <Profilemanu user={user} />
                    </div>
                </div>

            )}

            {openDialog ? (
                <CreateEventOutside isOpen={openDialog} isClose={handleDialogClose} />
            ) : null}

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