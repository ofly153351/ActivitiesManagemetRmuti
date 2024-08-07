'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profilemanu from './Profilemanu';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function Nav() {
    const pathName = usePathname() || " ";
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            try {
                const decodedJwt = jwtDecode(token);
                setUser(decodedJwt);
            } catch (error) {
                console.error('Error decoding JWT:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    return (
        <div className="w-screen h-[80px] bg-white border-b-2 border-[#0067B3] shadow-md flex justify-between items-center fixed z-10">
            <span className="ml-[50px] font-bold text-2xl">LOGO</span>
            <div className="gap-5 flex mr-[50px]">
                {pathName === '/Login' ? (
                    <>
                        <div>
                            <Link href='/Register' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black transition duration-100">
                                <span className="drop-shadow-2xl">ลงทะเบียน</span>
                            </Link>
                        </div>
                        <div>
                            <Link href='/Home' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black transition duration-100">
                                <span className="drop-shadow-2xl">รายชื่อกิจกรรม</span>
                            </Link>
                        </div>

                    </>

                ) : pathName === '/Register' ? (
                    <>
                        <div>
                            <Link href='/Login' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black transition duration-100">
                                <span className="drop-shadow-2xl">เข้าสู่ระบบ</span>
                            </Link>
                        </div>
                        <div>
                            <Link href='/Home' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black transition duration-100">
                                <span className="drop-shadow-2xl">รายชื่อกิจกรรม</span>
                            </Link>
                        </div>
                    </>
                ) : pathName === '/Home' && user?.role === 'user' ? (
                    <>
                        <div className="mr-20 flex gap-10">
                            <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                <Link href="/">
                                    <span>ขอเพิ่มกิจกรรมนอกสถานที่ </span>
                                </Link>
                            </div>
                            <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                <Link href="/">
                                    <span>dwakdhwuah</span>
                                </Link>
                            </div>
                            <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold">
                                <Link href="/">
                                    <span>dwakdhwuah</span>
                                </Link>
                            </div>
                        </div>
                        <Profilemanu /> {/* ส่ง user เป็น prop ให้กับ Profilemanu */}
                    </>
                ) : pathName === '/Home' && user == null ? (
                    <>
                        <div>
                            <Link href='/Register' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black transition duration-300">
                                <span className="drop-shadow-2xl">ลงทะเบียน</span>
                            </Link>
                        </div>
                        <div>
                            <Link href='/Login' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black transition duration-300">
                                <span className="drop-shadow-2xl">เข้าสู่ระบบ</span>
                            </Link>
                        </div>
                    </>
                ) : pathName === '/Admin' ? (
                    <>
                        <div className="mr-20 flex gap-10">
                            <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3]
                                hover:font-semibold transition duration-300 hover:transform hover:-translate-y-1">
                                <Link href="/">
                                    <span>แสดงรายชื่อนักศึกษาทั้งหมด</span>
                                </Link>
                            </div>
                            <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3] hover:font-semibold
                                transition duration-300 hover:transform hover:-translate-y-1">
                                <Link href="/">
                                    <span>แสดงกิจกรรมทั้งหมด</span>
                                </Link>
                            </div>
                            <div className="p-2 flex justify-center items-center gap-4 hover:border-b-2 border-[#0067B3]
                                hover:font-semibold transition duration-300 hover:transform hover:-translate-y-1">
                                <Link href="/">
                                    <span>เพิ่มกิจกรรม</span>
                                </Link>
                            </div>
                        </div>
                        <Profilemanu /> {/* ส่ง user เป็น prop ให้กับ Profilemanu */}
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default Nav;