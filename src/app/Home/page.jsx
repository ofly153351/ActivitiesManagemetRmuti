'use client'
import Nav from '../Components/Headnav/Nav'
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
function page() {
    const [selected, setSelected] = useState('highTolow')

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const activity = [1, 2, 3, 4, 5, 6, 7, 8]

    console.log(selected);

    return (
        <>
            <Nav />
            <div className='flex'>
                <div className='w-screen ml-40 border-l-2 border-[#0067B3] border-l-2xl'>
                    <div className="px-10 py-16 mt-20">
                        <span className='font-sans text-[45px]'>กิจกรรมที่สามารถลงทะเบียนได้</span>
                    </div>
                    <div className='border-b-2 p-4 mx-4' >
                        <form className="flex justify-end items-center mr-[60px] gap-3">
                            <label className='font-inter text-[20px]'>เรียงตาม : </label>
                            <select value={selected} onChange={handleChange} className="w-[160px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="highTolow">หน่วยกิต มาก - น้อย</option>
                                <option value="lowTohigh">หน่วยกิต น้อย - มาก</option>
                            </select>
                        </form>
                    </div>
                    {activity.map((index) => (
                        <div className=' mx-4 h-[180px] hover:bg-stone-100 p-4  items-center' >
                            <div className='flex justify-between' >
                                <div>
                                    <div>
                                        <span className='font-bold text-2xl '>
                                            ชื่อ: กิจกรรม {index}
                                        </span>
                                    </div>
                                    <div className='px-4 py-2' >
                                        <span>
                                            สถานที่
                                        </span>
                                    </div>
                                    <div className='px-4 py-2'>
                                        <span>รายระเอียดกิจกรรม <KeyboardArrowRightIcon fontSize='medium' /></span>
                                    </div>
                                </div>
                                <div className='items-center' >
                                    <ImageIcon fontSize='large' style={{ fontSize: 180 }} />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default page