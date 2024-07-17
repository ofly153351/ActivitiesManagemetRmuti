'use client'
import React , { useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Activity() {
    const activity = [1, 2, 3, 4, 5, 6, 7, 8];
    const [selectedDetail, setSelectedDetail] = useState(null);
    
    const handleDetails = (index) => {
        setSelectedDetail(selectedDetail === index ? null : index);
    };
  return (
    <div>
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
                                    <div className='flex justify-evenly items-center'>
                                        <div className='px-4 py-2 border-2 h-32 w-[1000px]'>
                                            <p>รายละเอียดกิจกรรมเพิ่มเติมสำหรับกิจกรรม {index}</p>
                                        </div>
                                        <button type="button" className='p-3 bg-blue-500 rounded-2xl text-white shadow-xl hover:bg-blue-700'>ลงทเบียนกิจกรรม</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
  )
}

export default Activity