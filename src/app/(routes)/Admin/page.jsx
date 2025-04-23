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
import { adminDashboard } from '@/app/Utils/api';
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
    const router = useRouter()


    useEffect(() => {
        initUserRoleHash()
    }, [userRoleHash])

    useEffect(() => {
        if (userRoleHash === 'teacher') {
            router.push('/')
        }
        try {
            const fetchData = async () => {
                const respon = await adminDashboard(selectedYear)
                setCountofDashBoard(respon.data.message)
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }, [selectedYear])

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
            title: 'จำนวนนักศึกษาที่มีในระบบ', value: countofDashBoard.count_std
        },
        {
            title: 'จำนวนกิจกรรมทั้งหมดที่มีในระบบ', value: countofDashBoard.count_event
        },
        {
            title: 'จำนวนกิจกรรมที่เปิดอยู่ตอน', value: countofDashBoard.count_eventallow
        },
        {
            title: 'จำนวนนักศึกษาที่ผ่านการตรวจสอบจากผู้ดูแลคณะ', value: countofDashBoard.count_done
        }
    ]
    const closeActivitiesData = [
        { eventName: 'กิจกรรม 1', date: Date.now() + 1 * 24 * 60 * 60 * 1000, location: 'วัด', detail: 'มาดิ', space: 1, status: true },
        { eventName: 'กิจกรรม 2', date: Date.now() + 2 * 24 * 60 * 60 * 1000, location: 'วัด', detail: 'มาดิ', space: 2, status: false },
        { eventName: 'กิจกรรม 3', date: Date.now() + 3 * 24 * 60 * 60 * 1000, location: 'วัด', detail: 'มาดิ', space: 3, status: true },
        { eventName: 'กิจกรรม 4', date: Date.now() + 4 * 24 * 60 * 60 * 1000, location: 'วัด', detail: 'มาดิ', space: 4, status: false },
        { eventName: 'กิจกรรม 5', date: Date.now() + 5 * 24 * 60 * 60 * 1000, location: 'วัด', detail: 'มาดิ', space: 5, status: true },
    ];


    const toThaiDate = (timestamp) => {
        return dayjs(timestamp).locale('th').add(543, 'year').format('ddddที่ D MMMM YYYY');
    }

    const sortedCloseActivities = [...closeActivitiesData]
        .filter(item => item.date >= Date.now()) // เอาเฉพาะกิจกรรมในอนาคต
        .sort((a, b) => a.date - b.date); // เรียงจากน้อยไปมาก (ใกล้ขึ้นก่อน)

    console.log(sortedCloseActivities);


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

                    <div className='flex flex-col lg:flex-row-2 justify-center items-stretch p-4 gap-5'>
                        {/* Card Group */}
                        <div className='md:flex xs:grid' >
                            <div className='p-2 w-full md:w-[30%] lg:w-[20%] bg-slate-50 flex flex-wrap lg:flex-col gap-2 shadow-lg rounded-md'>
                                {sumCardTitle.map((item, index) => (
                                    <div key={index} className='w-full'>
                                        <SumCard title={item.title} value={item.value} />
                                    </div>
                                ))}
                            </div>

                            {/* Chart Section */}
                            <div className='p-2 w-full lg:w-[80%] bg-slate-50 flex flex-col gap-4 shadow-lg rounded-md'>
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
                                <div className='flex w-[100%] ' >
                                    <div className='w-[50%]' >
                                        <span className='px-3' >กิจกรรมภายในมหาวิทยาลัย</span>
                                        <BarChartBasic />
                                    </div>
                                    <div className='w-[50%]' >
                                        <span className='px-3' >กิจกรรมภายนอกมหาวิทยาลัย</span>
                                        <BarChartBasic />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full lg:w-full bg-slate-50 shadow-lg rounded-md'>
                            <span className='px-3 text-xl'>กิจกรรมที่ไกล้ถึง</span>
                            <div className='p-2 grid gap-2 md:flex md:overflow-x-auto'>
                                {sortedCloseActivities.map((item, idx) => (
                                    <CloseActivitiesCard
                                        key={idx}
                                        eventName={item.eventName}
                                        thaiDate={toThaiDate(item.date)}
                                        location={item.location}
                                        detail={item.detail}
                                        space={item.space}
                                        status={item.status}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    );
}

export default Page;