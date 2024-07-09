'use client'
import Nav from '../Components/Headnav/Nav'
import React, { useEffect, useState } from 'react';
function page() {
    const [selected ,setSelected] = useState('highTolow')

    const handleChange = (event) => {
        setSelected(event.target.value);
    } ;

    console.log(selected);

    return (
        <>
            <Nav />
            <div className='flex'>
                <div className="ml-[133px] w-[3px] h-screen bg-[#0067B3] drop-shadow-2xl"></div>
                <div className='w-screen'>
                    <div className="px-10 py-16">
                        <span className='font-sans text-[45px]'>กิจกรรมที่สามารถลงทะเบียนได้</span>
                    </div>
                    <form className="flex justify-end items-center mr-[60px] gap-3">
                        <label className='font-sans text-[20px]'>เรียงตาม : </label>
                        <select  value={selected} onChange={handleChange}  className="w-[160px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="highTolow">หน่วยกิต มาก - น้อย</option>
                            <option value="lowTohigh">หน่วยกิต น้อย - มาก</option>
                        </select>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page