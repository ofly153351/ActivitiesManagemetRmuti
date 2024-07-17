'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Nav() {

    const pathName = usePathname() || " ";
    const [isMenuhidden, setIsMenuhidden] = useState(false);
    // console.log(pathName);
    const IconMenu = () => {
        setIsMenuhidden(!isMenuhidden);
    };

    return (
        <>
            <div className="w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex justify-between items-center fixed z-10">
                <span className="ml-[50px] font-bold text-2xl ">LOGO</span>
                <div className="gap-5 flex mr-[50px]">
                    {pathName === '/Login' ? (
                        <div>
                            <Link href='/Register' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                        hover:bg-gray-200 hover:text-black"><span className="drop-shadow-2xl " >Sign Up</span></Link>
                        </div>
                    ) : pathName === '/Register' ? (
                        <div>
                            <Link href='/Login' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black"><span className="drop-shadow-2xl" >Sign In</span></Link>
                        </div>
                    ) : pathName === '/Home' ? (
                        <>
                            <div className="mr-20 flex gap-10" >
                                <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                    <Link href="/">
                                        <span className="" >
                                            ขอเพิ่มกิจกรรมนอกสถานที่
                                        </span>
                                    </Link>
                                </div>
                                <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                    <Link href='/' >
                                        <span className="" >
                                            dwakdhwuah
                                        </span>
                                    </Link>
                                </div>
                                <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                    <Link href='/' >
                                        <span className="" >
                                            dwakdhwuah
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-4">
                                <span>Email : *****@rmuti.ac.th</span>
                                <div>
                                    <button className="rounded-full focus:ring focus:border-slate-500" onClick={IconMenu} >
                                        <AccountCircleIcon fontSize="large" />
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    <div className={`  absolute w-24 bg-[#2980B9] right-8 top-[65px] rounded-md shadow-2xl
                                    ${isMenuhidden ? '' : 'hidden'}`}>
                                        <div className="flex flex-col gap-2 text-center ">
                                            <span className="text-white hover:text-black hover:bg-stone-100 ease-in-out duration-300 rounded-md ">
                                                <Link href='/' >info</Link>
                                            </span>
                                            <span className="text-white hover:text-black hover:bg-stone-100 ease-in-out duration-300 rounded-sm" >
                                                <Link href='/' >activity</Link>
                                            </span>
                                            <span className="text-white hover:text-black hover:bg-stone-100 ease-in-out duration-300 rounded-md">
                                                <Link href='/' className="" >Logout</Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : pathName === '/Admin' ? (
                        <>
                            <div className="mr-20 flex gap-10" >
                                <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                    <Link href="/">
                                        <span className="" >
                                            แสดงรายชื่อนักศึกษาทั้งหมด
                                        </span>
                                    </Link>
                                </div>
                                <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                    <Link href='/' >
                                        <span className="" >
                                            แสดงกิจกรรมทั้งหมด
                                        </span>
                                    </Link>
                                </div>
                                <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                    <Link href='/' >
                                        <span className="" >
                                            เพิ่มกิจกรรม
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-4">
                                <span>Email : *****@rmuti.ac.th</span>
                                <div>
                                    <button className="rounded-full focus:ring focus:border-slate-500" onClick={IconMenu} >
                                        <AccountCircleIcon fontSize="large" />
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    <div className={`  absolute w-24 bg-[#2980B9] right-8 top-[65px] rounded-md shadow-2xl
                                    ${isMenuhidden ? '' : 'hidden'}`}>
                                        <div className="flex flex-col gap-2 text-center ">
                                            <span className="text-white hover:text-black hover:bg-stone-100 ease-in-out duration-300 rounded-md ">
                                                <Link href='/' >info</Link>
                                            </span>
                                            <span className="text-white hover:text-black hover:bg-stone-100 ease-in-out duration-300 rounded-sm" >
                                                <Link href='/' >activity</Link>
                                            </span>
                                            <span className="text-white hover:text-black hover:bg-stone-100 ease-in-out duration-300 rounded-md">
                                                <Link href='/' className="" >Logout</Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Nav