'use client'
import React, { useState } from "react";
import Nav from "../Components/Headnav/Nav";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from "next/link";
// import Leftlogin from "../Components/Headnav/Leftlogin";

function page() {


  return (
    <div className="">
      <Nav />
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="">
          <div className="flex mt-16 bg-blue-300 w-[960px] h-[500px] rounded-[12px] shadow-2xl">
            <div className="left flex justify-center items-center w-[480px]">
              <img className="p-6" src="https://www.studentloan.or.th/th/system/files/files/knowledgemedia/%E0%B8%81%E0%B8%A2%E0%B8%A8-01.png" />
            </div>
            <div className="right bg-slate-100 rounded-r-[12px] shadow-2xl w-[480px] gap-7 ">
              <form className="p-4 h-full flex flex-col justify-center items-center relative">
                <div className="text-[35px] text-center font-mono font-bold py-7 text-gray-700">
                  Sign In!
                </div>
                <div className="flex justify-center items-center gap-7">
                  <Box
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      placeholder="Email Address"
                      variant="outlined"
                      type="email"
                    />
                  </Box>
                </div>
                <div className="w-fit">
                  <div className="flex flex-col items-center">
                    <Box
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                      />
                    </Box>
                  </div>
                </div>

                <div className="flex justify-center items-center mt-5">
                  <button
                    className="py-2 px-6 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition duration-300"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
                <div className="absolute bottom-4 right-4 text-gray-700 hover:text-blue-500">
                  <Link href='/'>ลืมรหัสผ่าน ?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
