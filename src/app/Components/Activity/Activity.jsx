import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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

    const handleDetails = (index) => {
        setSelectedDetail(selectedDetail === index ? null : index);
    };

    const filteredActivities = activities.filter(activity =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {filteredActivities.map((activity, index) => (
                <div key={activity.id} className={`mx-4 p-4 items-center hover:bg-stone-100 ${selectedDetail === index ? 'h-[300px]' : 'h-[180px]'}`}>
                    <div className='flex justify-between'>
                        <div>
                            <div>
                                <span className='font-bold text-2xl'>
                                    ชื่อ: {activity.name}
                                </span>
                            </div>
                            <div className='px-4 py-2'>
                                <span>
                                    สถานที่: {activity.location}
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
                                <p>รายละเอียดกิจกรรมเพิ่มเติมสำหรับ {activity.name}</p>
                            </div>
                            <button type="button" className='p-3 bg-blue-500 rounded-2xl text-white shadow-xl hover:bg-blue-700'>ลงทเบียนกิจกรรม</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Activity;