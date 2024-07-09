'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Nav() {

    const pathName = usePathname() || "";
    // console.log(pathName);

    return (
        <>
            <div className="w-screen h-[80px] flex justify-between items-center">
                <span className="ml-[50px] font-bold text-2xl ">LOGO</span>
                <div className="gap-5 flex mr-[50px]">
                    {pathName === '/Login' ? (
                        <div>
                            <Link href='/Register' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                        hover:bg-gray-200 hover:text-black"><span className="drop-shadow-2xl" >Register</span></Link>
                        </div>
                    ) : pathName === '/Register' ? (
                        <div>
                            <Link href='/Login' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black"><span className="drop-shadow-2xl" >Login</span></Link>
                        </div>
                    ) : pathName === '/Home' ? (
                        <div className="flex justify-center items-center gap-4 ">
                            <span>Email : *****@rmuti.ac.th</span>
                            <Link href="/" >
                                <AccountCircleIcon fontSize="large" />
                            </Link>
                        </div>
                    ) : null }
                </div>
            </div>
            <hr className="h-[3px] bg-[#0067B3] shadow-md" />
        </>
    )
}

export default Nav