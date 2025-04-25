'use client'
'use client'
import React, { useEffect } from 'react';
import Nav from '@/app/Components/Nav';
import SumCard from '@/app/Components/Dashbord/SumCard';
import BarChartBasic from '@/app/Components/Dashbord/BarChartBasic';
import Customselect from '@/app/Components/Customselect';
import { useState } from 'react';
import CloseActivitiesCard from '@/app/Components/Dashbord/CloseActivitiesCard';
import dayjs from 'dayjs'
import 'dayjs/locale/th' // โหลด locale ภาษาไทย
import { adminDashboard, closedEvent } from '@/app/Utils/api';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

function Page() {
    const d = new Date();
    let year = d.getFullYear();
    dayjs.locale('th')
    const yearOption = [
        { label: year + 543, value: year + 543 },
        { label: year + 542, value: year + 542 },
        { label: year + 541, value: year + 541 },

    ]
    const [selectedYear, setSelectedYear] = useState(yearOption[0].label)
    const [countofDashBoard, setCountofDashBoard] = useState([])
    const { userRoleHash, initUserRoleHash } = useStore()
    const [insideCount, setInsideCount] = useState([])
    const [outsideCount, setOutsideCount] = useState([])
    const [closedEvents, setClosedEvents] = useState([])

    const router = useRouter()


    useEffect(() => {
        initUserRoleHash()
    }, [userRoleHash])

    useEffect(() => {
        if (userRoleHash === 'teacher' || userRoleHash === 'student') {
            router.push('/');
            return; // หยุดการทำงานต่อถ้าไม่ใช่ admin
        }

        const fetchData = async () => {
            try {
                const respon = await adminDashboard(selectedYear);
                setCountofDashBoard(respon?.data?.all_count || []);
                setInsideCount(respon?.data?.inside_counts || []);
                setOutsideCount(respon?.data?.outside_counts || []);

                const closeEventData = await closedEvent();
                console.log(closeEventData?.data?.event_7day || []);

                setClosedEvents(closeEventData?.data?.event_7day || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedYear]);
    console.log(countofDashBoard);

    //     จำนวนกิจกรรมทั้หมดที่มีในระบบ  = 
    // จำนวนกิจกรรมที่เปิดอยู่ตอนนี้ (ยังไม่หมดเขต) =
    // จำนวนกิจกรรมที่มีคนเข้าร่วมแล้ว  =
    // จำนวนนักศึกษาที่ผ่านแล้ว (ที่ teahcher กด ผ่าน มาให้)  =

    const handleOnChangYears = (newValue) => {
        console.log(newValue);
        setSelectedYear(newValue)
    }



    const sumCardTitle = [
        {
            title: 'จำนวนนักศึกษาที่มีในระบบ', value: countofDashBoard.count_std || 0
        },
        {
            title: 'จำนวนกิจกรรมทั้งหมดที่มีในระบบ', value: countofDashBoard.count_event || 0
        },
        {
            title: 'จำนวนกิจกรรมที่เปิดอยู่ตอน', value: countofDashBoard.count_eventallow || 0
        },
        {
            title: 'จำนวนนักศึกษาที่ผ่านการตรวจสอบจากผู้ดูแลคณะ', value: countofDashBoard.count_done || 0
        }
    ]





    return (
        <>
            <Nav />
            <div className='bg-slate-50 min-h-screen' >
                <div className='h-screen  '>
                    <div className='flex justify-start items-center p-4 
                    xs:h-10 sm:h-16 md:h-20   
                    bg-slate-75 rounded-lg shadow-lg m-4 xs:text-md sm:text-xl md:text-2xl '
                    >
                        Dashboard
                    </div>

                    <div className='flex flex-col lg:flex-row-2 justify-center items-stretch p-4 gap-5 bg-slate-50 '>
                        {/* Card Group */}
                        <div className='md:flex xs:grid bg-slate-50' >
                            <div className='p-2 w-full xs:h-full md:w-[30%] lg:w-[20%] bg-slate-50 flex flex-wrap lg:flex-col gap-2 shadow-lg rounded-md'>
                                {sumCardTitle.map((item, index) => (
                                    <div key={index} className='w-full'>
                                        <SumCard title={item.title} value={item.value} />
                                    </div>
                                ))}
                            </div>

                            {/* Chart Section */}
                            <div className='p-2 w-full lg:w-[80%] bg-slate-50 flex flex-col  shadow-lg rounded-md'>
                                <div className='px-2 flex flex-wrap md:flex-nowrap items-center gap-2 text-lg'>
                                    <span>จำนวนกิจกรรมประจำปี:</span>
                                    <Customselect
                                        high='40px'
                                        width='10ch'
                                        options={yearOption}
                                        label={'ปี'}
                                        field='label'
                                        value={selectedYear}
                                        onChange={(newValue) => handleOnChangYears(newValue)}
                                    />
                                </div>
                                <div className='flex flex-col lg:flex-row w-full gap-4'>
                                    <div className='w-full lg:w-1/2 overflow-x-auto'>
                                        <span className='px-3 block font-semibold mb-2'>กิจกรรมภายในมหาวิทยาลัย</span>
                                        <div className='xs:min-w-[500px] md:min-w-[500px]'>
                                            <BarChartBasic insideCounts={insideCount} />
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-1/2 overflow-x-auto'>
                                        <span className='px-3 block font-semibold mb-2'>กิจกรรมภายนอกมหาวิทยาลัย</span>
                                        <div className='xs:min-w-[500px] md:min-w-[500px]'>

                                            <BarChartBasic insideCounts={outsideCount} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full lg:w-full bg-slate-50 shadow-lg rounded-md'>
                            <span className='px-3 text-xl'>กิจกรรมที่ไกล้ถึง</span>
                            <div className='p-2 grid gap-2 md:flex md:overflow-x-auto'>
                                {closedEvents ? (
                                    
                                    closedEvents.map((item, idx) => (
                                        <CloseActivitiesCard
                                            key={idx}
                                            eventName={item.event_name}
                                            thaiDate={item.start_date}
                                            time={item.start_time}
                                            location={item.location}
                                            detail={item.detail}
                                            space={item.limit - item.free_space}
                                            status={item.status}
                                        />
                                    ))
                                ) : ((!closedEvents || closedEvents === null) &&
                                    <div className='h-36 flex justify-center items-center w-full text-slate-600' >ไม่พบกิจกรรมที่ไกล้จะถึง</div>
                                )}

                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    );
}

export default Page;