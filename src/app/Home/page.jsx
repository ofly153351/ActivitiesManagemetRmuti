'use client'
import Nav from '../Components/Headnav/Nav'
import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Footter from '../Components/Footter/Footter';

function Page() {
    const activity = [1, 2, 3, 4, 5, 6, 7, 8];
    const [selected, setSelected] = useState('highTolow');
    const [selectedDetail, setSelectedDetail] = useState(null);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const handleDetails = (index) => {
        setSelectedDetail(selectedDetail === index ? null : index);
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
                            <label className='font-inter text-[20px]'>เรียงตาม : </label>
                            <select value={selected} onChange={handleChange} className="w-[160px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="highTolow">หน่วยกิต มาก - น้อย</option>
                                <option value="lowTohigh">หน่วยกิต น้อย - มาก</option>
                            </select>
                        </form>
                    </div>
                    {activity.map((index) => (
                        <div key={index} className={`mx-4 p-4 items-center hover:bg-stone-100 ${selectedDetail === index ? 'h-[300px]' : 'h-[180px]'}`}>
                            <div className='flex justify-between'>
                                <div>
                                    <div>
                                        <span className='font-bold text-2xl'>
                                            ชื่อ: กิจกรรม {index}
                                        </span>
                                    </div>
                                    <div className='px-4 py-2'>
                                        <span>
                                            สถานที่
                                        </span>
                                    </div>
                                    <div className='px-4 py-2'>
                                        <span>รายระเอียดกิจกรรม
                                            <button onClick={() => handleDetails(index)}
                                                className='rounded-full hover:bg-blue-100'>
                                                <KeyboardArrowRightIcon fontSize='medium' />
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className='items-center'>
                                    <div className="images w-[200px] h-[150px] border flex justify-center items-center">
                                        200x150
                                    </div>
                                </div>
                            </div>
                            {selectedDetail === index && (
                                <div className='px-4 py-2 border-2 h-32 w-[1000px]'>
                                    {/* รายละเอียดเพิ่มเติม */}
                                    <p>รายละเอียดกิจกรรมเพิ่มเติมสำหรับกิจกรรม {index}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footter />
        </>
    );
}

export default Page;