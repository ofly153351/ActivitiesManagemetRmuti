'use client'
import React, { useState } from "react";
import Nav from "../Components/Headnav/Nav";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
const page = () => {

  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  }

  return (

    <div>
      <Nav />
      <div className="flex justify-center items-center">
        <div className="mt-40 bg-slate-100 w-[480px] h-[500px] shadow-2xl rounded-xl ">
          <div className="flex justify-center items-center">
            <img className="ml-4 p-2 w-[120px]" src="https://www.studentloan.or.th/th/system/files/files/knowledgemedia/%E0%B8%81%E0%B8%A2%E0%B8%A8-01.png" />
            <span className=" font-mono text-[35px] font-bold text-gray-700 text-shadow-xl">
              Sign Up
            </span>
          </div>
          <form action="">
            <div className="items-center  m-2" >
              <div className=" flex justify-center items-center m-2">
                <div className="">
                  <FormControl sx={{ marginRight: 1, minWidth: 100 }} size="small">
                    <InputLabel id="demo-select-small-label" sx={{ fontSize: '0.900rem' }}>คำนำหน้า</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={gender}
                      label="คำนำหน้า"
                      onChange={handleChange}
                      sx={{ fontSize: '0.900rem' }}
                    >
                      <MenuItem value='Mister'>นาย</MenuItem>
                      <MenuItem value="Missus}">นาง</MenuItem>
                      <MenuItem value="Miss">นางสาว</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="flex gap-2" >
                  <div className="w-[150px] h-10 ">
                    <input placeholder="ชื่อ" className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md focus:shadow-xl duration duration-100 
                     placeholder-gray-550 hover:border-[1px] hover:border-blue-600" type="text" />
                  </div>
                  <div className="w-[150px] h-10 ">
                    <input placeholder="นามกสุล" className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600
                     placeholder-gray-550 " type="text" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mx-6 h-10 gap-2 ">
                <div className="w-full ">
                  <input className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600 " type="text" placeholder="รหัสนักศึกษา" />
                </div>
                <div className="w-full">
                  <input className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600 " type="Email" placeholder="Email" />
                </div>
                <div className="w-full">
                  <input className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600 " type="password" placeholder="รหัสผ่าน" />
                </div>
                <div className="w-full">
                  <input className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600 " type="password" placeholder="ยืนยันรหัสผ่าน" />
                </div>
                <div className="p-4">
                  <button className="px-6 py-4 border-[1px] bg-[#0067B3]  text-white font-mono font-semibold
                  rounded-lg shadow-xl hover:bg-blue-600 duration duration-300 " type="submit">
                    Sign Up!
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;


