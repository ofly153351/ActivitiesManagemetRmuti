import Link from "next/link"
import React from 'react'

function Nav() {
    return (
        <>
            <div className="w-screen h-[80px] flex justify-between items-center">
                <span className="ml-[50px] font-bold text-2xl ">LOGO</span>
                <div className="gap-5 flex mr-[50px]">
                    <div>
                        <Link href='/login' className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black"><span className="drop-shadow-2xl" >Login</span></Link>
                    </div>
                    <div>
                        <Link href='/register'className="drop-shadow-2xl px-10 py-3 bg-[#0067B3] rounded-md text-[#ffffff] font-bold 
                            hover:bg-gray-200 hover:text-black"><span className="drop-shadow-2xl" >Register</span></Link>
                    </div>
                </div>
            </div>
            <hr className="h-[3px] bg-[#0067B3] shadow-md" />
        </>
    )
}

export default Nav