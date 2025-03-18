import React, { useEffect, useState } from 'react';
import { filterActivities } from '../Utils/handler';
import Accordion from './Acordion';
import { getAllevent, getBranches, joinEvent } from '../Utils/api';
import dayjs from 'dayjs';
import 'dayjs/locale/th';  // นำเข้า locale ภาษาไทย
import BasicButtons from './BasicButtons';
import width from '../Utils/textfieldWidth';
import { ErrorAlert, SuccessAlert } from './Alert';
import { useStore } from '@/store/useStore';

function Activity({ searchQuery }) {
    const [activities, setActivities] = useState([]);
    const { branchesList, setbranchesList } = useStore();
    const { user } = useStore()
    const [errorMessage, setErrorMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    // console.log("branchesList", branchesList);

    dayjs.locale('th');

    useEffect(() => {

        const fetchData = async () => {
            const response = await getAllevent();
            setActivities(response.data);
            if (branchesList.length <= 0 && branchesList === null) {
                const branchResponse = await getBranches();
                setbranchesList(branchResponse.data);
            };

        };
        fetchData();

    }, []);

    // ฟังก์ชันในการดึงชื่อสาขาจาก ID ที่มี
    const getBranchNames = (branchIds) => {
        if (!Array.isArray(branchIds) || !Array.isArray(branchesList)) {
            return '';  // คืนค่าว่างถ้าไม่ใช่อาร์เรย์
        }

        // ตรวจสอบและแปลง branchIds เป็นชื่อสาขา
        return branchIds
            .map(id => {
                const branch = branchesList.find(b => b.branch_id === id);  // หาสาขาที่มี branch_id ตรง
                return branch ? branch.branch_name : null;  // คืนค่า name ถ้ามี ถ้าไม่มีคืน null
            })
            .filter(name => name !== null)  // กรองค่าที่เป็น null ออก
            .join(', ');  // แปลงอาร์เรย์ให้เป็นสตริงที่คั่นด้วย comma
    };

    const handleSubmit = async (activityId) => {
        try {
            const response = await joinEvent(Number(activityId)); // เรียก joinEvent พร้อมกับ activityId
            console.log(response); // แสดงผลการตอบกลับจาก API
            setTimeout(() => {
                setSuccessMessage('ส่งคำขอเข้าร่วมกิจกรรมเรียบร้อยแล้ว');
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000); // ซ่อนข้อความหลัง 3 วินาที
            }, 0); // แสดงข้อความทันที
            // หากต้องการคืนค่าจาก handleSubmit
            return response;
        } catch (error) {
            if (error.status === 500) {
                setErrorMessage('ไม่สามารถส่งคำขอเข้าร่วมกิจกรรมได้ เนื่องจากคุณได้เข้าร่วมไปแล้ว');
                setTimeout(() => {
                    setErrorMessage('ไม่สามารถส่งคำขอเข้าร่วมกิจกรรมได้ เนื่องจากคุณได้เข้าร่วมแล้ว');
                    setTimeout(() => {
                        setErrorMessage(false);
                    }, 3000); // ซ่อนข้อความหลัง 3 วินาที
                }, 0); // แสดงข้อความทันที
            }
            console.error('Error joining event:', error.status); // จัดการ error
            // setTimeout(() => {
            //     setErrorMessage('ไม่สามารถส่งคำขอเข้าร่วมกิจกรรมได้');
            //     setTimeout(() => {
            //         setErrorMessage(false);
            //     }, 3000); // ซ่อนข้อความหลัง 3 วินาที
            // }, 0); // แสดงข้อความทันที

            throw error;
        }
    };

    const filteredActivities = filterActivities(activities, searchQuery);

    // console.log(activities);

    return (
        <div>
            {filteredActivities.length === 0 ? (
                <div className="h-12 flex justify-center items-center text-center text-gray-500">
                    <div>
                        ยังไมมีกิจกรรมที่เปิดลงทะเบียน
                    </div>
                </div>
            ) : (
                filteredActivities.map((activity, index) => (
                    <div
                        key={activity.id || index}  // Use index as fallback if activity.id is missing
                        className="lg:mx-4 p-4 items-center hover:bg-stone-100 border-b border-gray-200"
                    >
                        <div className="flex w-full xs:w-[350px] ">
                            <div className="flex-grow"> {/* ใช้ flex-grow เพื่อให้พื้นที่ขยายเต็ม */}
                                <div className="text-xl flex justify-between font-kanit">
                                    <div>
                                        ชื่อกิจกรรม: <span className='font-thin'>{activity.event_name}</span>
                                    </div>
                                    <div>
                                        จำนวนที่รับ: <span className='font-thin'>{activity.free_space} คน</span>
                                    </div>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    สถานที่: <span className='font-thin'>{activity.location}</span>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    จำนวนชั่วโมงกิจกรรมที่จะได้รับ: <span className='font-thin'>{activity.working_hour}</span> ชั่วโมง
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    วันที่เริ่มกิจกรรม : <span className='font-thin'>{activity.start_date} เวลา: {activity.start_time}</span>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    ชันปีที่เปิดรับ : <span className='font-thin'>
                                        {activity.years === null ? 'สามารถเข้าร่วมได้ทุกชั้นปี' : `${activity.years.join(', ')}`}
                                    </span>
                                </div>
                                <div className='flex gap-2 justify-between items-center w-full px-4 py-2 font-kanit'>
                                    <div>
                                        {activity.branches === null ? (
                                            <div>

                                                สาขาที่เปิดรับ : <span className='font-thin'> สามารถเข้าร่วมได้ทุกสาขา </span>
                                            </div>
                                        ) : (
                                            <div>
                                                สาขาที่เปิดรับ : <span className='font-thin'>
                                                    {getBranchNames(activity.branches)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {user?.role === 'student' && (
                                        <div>
                                            <BasicButtons
                                                label={'ขอเข้าร่วมกิจกรรม'}
                                                width={width.sm}
                                                onClick={() => handleSubmit(activity.event_id)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* แสดง Accordion */}
                        <Accordion activity={activity} />
                    </div>
                ))
            )
            }
            {successMessage ? (
                <div className="fixed bottom-4 right-4 w-64">
                    <SuccessAlert label={successMessage} />
                </div>
            ) : errorMessage ? (
                <div className="fixed bottom-4 right-4 w-64">
                    <ErrorAlert label={errorMessage} />
                </div>
            ) : null}
        </div >
    );
}

export default Activity;