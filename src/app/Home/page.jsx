'use client'
import Nav from '../Components/Headnav/Nav'
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Activity from '../Components/Activity/Activity';


function Page() {
    const [selected, setSelected] = useState('highTolow');
    const [searchQuery, setSearchQuery] = useState(''); // เพิ่ม state สำหรับคำค้นหา
    
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <>
            <Nav />
            <div className='flex'>
                <div className='w-full  m-20 '>
                    <div className="px-10 py-16 mt-20">
                        <span className='font-sans text-[45px]'>กิจกรรมที่สามารถลงทะเบียนได้</span>
                    </div>
                    <div className='border-b-2 p-4 mx-4'>
                        <form className="flex justify-end items-center mr-[60px] gap-3">
                            <div className='flex     ' >
                                <button className="border-b-[1px] border-l-[1px] border-t-[1px] w-10 rounded-tl-2xl rounded-bl-2xl hover:bg-gray-100">
                                    <SearchIcon fontSize='' />
                                </button>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    onChange={(e) => setSearchQuery(e.target.value)} // จัดการการเปลี่ยนแปลงคำค้นหา
                                    placeholder='ค้าหาชื่อกิจกรรม'
                                    className='w-[400px] border-[1px] p-1.5  rounded-br-2xl rounded-tr-2xl' />
                            </div>
                            <label className='font-inter text-[20px]'>เรียงตาม : </label>
                            <select value={selected} onChange={handleChange} className="p-2 rounded-lg text-sm w-[160px] bg-gray-50 border border-gray-300">
                                <option value="highTolow">หน่วยกิต มาก - น้อย</option>
                                <option value="lowTohigh">หน่วยกิต น้อย - มาก</option>
                            </select>
                        </form>
                    </div>
                    <Activity searchQuery={searchQuery} /> {/* ส่ง searchQuery ไปยัง Activity */}
                </div>
            </div>
            {/* <Footter /> */}
        </>
    );
}

export default Page;