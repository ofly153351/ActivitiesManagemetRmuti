'use client'
import Nav from '../Components/Headnav/Nav'
import React, { useState } from 'react';
import Footter from '../Components/Footter/Footter';
import SearchIcon from '@mui/icons-material/Search';
import Activity from '../Components/Activity/Activity';
function Page() {
    const [selected, setSelected] = useState('highTolow');

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <>
            <Nav />
            <div className='flex'>
                <div className='w-screen ml-40 border-l-2 border-[#0067B3] border-l-2xl'>
                    <div className="px-10 py-16 mt-20">
                        <span className='font-sans text-[45px]'>กิจกรรมที่สามารถลงทะเบียนได้</span>
                    </div>
                    <div className='border-b-2 p-4 mx-4'>
                        <form className="flex justify-end items-center mr-[60px] gap-3">
                            <div className='flex ' >
                                <button className="border-b-[1px] border-l-[1px] border-t-[1px] w-10 rounded-tl-xl rounded-bl-xl hover:bg-gray-100">
                                    <SearchIcon fontSize='' />
                                </button>
                                <input type="text" className='w-[400px] border-[1px]  rounded-br-xl rounded-tr-xl' />
                            </div>
                            <label className='font-inter text-[20px]'>เรียงตาม : </label>
                            <select value={selected} onChange={handleChange} className="w-[160px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="highTolow">หน่วยกิต มาก - น้อย</option>
                                <option value="lowTohigh">หน่วยกิต น้อย - มาก</option>
                            </select>
                        </form>
                    </div>
                    <Activity />
                </div>
            </div>
            <Footter />
        </>
    );
}

export default Page;