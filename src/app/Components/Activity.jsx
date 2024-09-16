// Activity.js
import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { filterActivities, handleDetails } from '../Utils/handler';

function Activity({ searchQuery }) {
    const activities = [
        { id: 1, name: 'Activity One', location: 'Location One' },
        { id: 2, name: 'Activity Two', location: 'Location Two' },
        { id: 3, name: 'Activity Three', location: 'Location Three' },
        { id: 4, name: 'Activity Four', location: 'Location Four' },
        { id: 5, name: 'Activity Five', location: 'Location Five' },
        { id: 6, name: 'Activity Six', location: 'Location Six' },
        { id: 7, name: 'Activity Seven', location: 'Location Seven' },
        { id: 8, name: 'Activity Eight', location: 'Location Eight' },
    ];
    const [selectedDetail, setSelectedDetail] = useState(null);

    const filteredActivities = filterActivities(activities, searchQuery);

    return (
        <div>
            {filteredActivities.map((activity, index) => (
                <div key={activity.id} className={`mx-4 p-4 items-center hover:bg-stone-100 ${selectedDetail === index ? 'h-[300px]' : 'h-[180px]'}`}>
                    <div className='flex justify-between'>
                        <div>
                            <div>
                                <span className='text-2xl font-kanit'>
                                    ชื่อ: {activity.name}
                                </span>
                            </div>
                            <div className='px-4 py-2 font-kanit'>
                                <span>
                                    สถานที่: {activity.location}
                                </span>
                            </div>
                            <div className='px-4 py-2 font-kanit'>
                                <span>
                                    หน่วยกิต: 
                                </span>
                            </div>
                            <div className='px-4 py-2 font-kanit'>
                                <span className='font-kanit pr-2'>รายละเอียดกิจกรรม</span>
                                {/* เพิ่มพารามิเตอร์ที่จำเป็นในการเรียกใช้ฟังก์ชัน handleDetails */}
                                <button onClick={() => handleDetails(index, selectedDetail, setSelectedDetail)}
                                    className='rounded-full hover:bg-blue-100'>
                                    <div className='rotate-90'>
                                        <KeyboardArrowRightIcon fontSize='medium' />
                                    </div>
                                </button>
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
                                <p>รายละเอียดกิจกรรมเพิ่มเติมสำหรับ {activity.name}</p>
                            </div>
                            {/* การเรียกใช้ handleDetails ในปุ่มนี้ถูกต้องแล้ว */}
                            <button onClick={() => handleDetails(index, selectedDetail, setSelectedDetail)} 
                            type="button" className='p-3 bg-blue-500 rounded-2xl text-white shadow-xl
                             hover:bg-blue-700 font-kanit '>ลงทะเบียนกิจกรรม</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Activity;