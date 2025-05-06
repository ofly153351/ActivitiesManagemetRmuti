'use client'
import ActivityAccordion from '@/app/Components/Acordion'
import { ErrorAlert, SuccessAlert } from '@/app/Components/AlertShow'
import BasicButtons from '@/app/Components/BasicButtons'
import Customselect from '@/app/Components/Customselect'
import HorizontalCard from '@/app/Components/HorizontalCard'
import Loading from '@/app/Components/Loading'
import Nav from '@/app/Components/Nav'
import ShowDialogTable from '@/app/Components/ShowDialogTable'
import { getMyEventStudent, sendSummaryToTeacher } from '@/app/Utils/api'
import { blockNulluser } from '@/app/Utils/block'
import { checkSessionTimeout } from '@/app/Utils/session'
import { useStore } from '@/store/useStore'
import { Value } from '@radix-ui/react-select'
import React, { use, useState, useEffect, useMemo } from 'react'



function page() {
    const title = 'รายชื่อกิจกรรม'
    const [loading, setLoading] = useState(false)
    const [myEvent, setMyEvent] = useState([])
    const [insideEvents, setInsideEvents] = useState([])
    const [outSideEvents, setOutsideEvents] = useState([])
    const [showAlert, setShowAlert] = useState({ status: null, message: '' })
    const { user } = useStore()

    const d = new Date()
    let year = d.getFullYear()
    let currentThaiYear = year + 543
    const [selectedValue, setSelectedValue] = useState(currentThaiYear)


    useEffect(() => {
        blockNulluser(user)
        checkSessionTimeout()
        const fetchData = async () => {
            setLoading(true);
            try {

                const response = await getMyEventStudent(String(selectedValue));
                setMyEvent(response?.data);

                setInsideEvents(response.data.inside_events || []);  // อัปเดตค่าใหม่ทุกครั้ง
                setOutsideEvents(response.data.outside_events || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedValue]); // จะรันทุกครั้งที่ค่า selectedValue เปลี่ยน

    const handleOnchange = (value) => {
        setSelectedValue(value);  // อัปเดตปีที่เลือก
    };

    console.log(myEvent);




    const options = [
        { label: currentThaiYear, Value: currentThaiYear },
        { label: currentThaiYear + 1, Value: currentThaiYear + 1 },
        { label: currentThaiYear - 1, Value: currentThaiYear - 1 },
    ]



    const totalInsideWorkingHours = useMemo(() => {
        return (insideEvents || [])
            .filter(event => event.status === true) // กรองเฉพาะ event ที่มี status เป็น true
            .reduce((sum, event) => sum + (event.working_hour || 0), 0); // รวมค่า working_hour
    }, [insideEvents]);

    const totalOutsideWorkingHours = useMemo(() => {
        return (outSideEvents || [])
            .filter(event => event.file !== null || '') // กรองเฉพาะ event ที่มี status เป็น true
            .reduce((sum, event) => sum + (event.working_hour || 0), 0); // รวมค่า working_hour
    }, [outSideEvents]);

    const handleSubmit = async () => {
        let year = selectedValue
        console.log(year);

        try {
            const response = await sendSummaryToTeacher(year);
            console.log(response);
            setShowAlert({ status: 'success', message: "ส่งผลรวมกิจกรรมเรียบร้อย" });
            setTimeout(() => {
                setShowAlert({ status: null, message: '' });
                window.location.reload()
            }
                , 1200);
        } catch (error) {
            console.error('Error sending summary:', error);
            showAlert({ status: 'error', message: "ไม่สามารถส่งผลรวมกิจกรรมได้" });
            setTimeout(() => {
                setShowAlert({ status: null, message: '' });
            }
                , 1200);
        }
    }


    return (
        <div className="">
            <Nav />
            <div className="bg-gray-50 min-h-screen flex justify-center items-center ">
                <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md ">
                    <h1 className="text-[52px] text-shadow-md  p-10">{title}</h1>
                    <div className='flex justify-end items-center' >
                        <Customselect
                            onChange={(e) => handleOnchange(e)}
                            label={"ประจำปีการศึกษา"}
                            field='label'
                            options={options}
                            value={selectedValue}
                            width='12ch'
                        />
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="mt-40 px-10 h-[400px]">
                                <Loading />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className=' px-4' >
                                <div className=' border-b-2 border-slate-200 ' >
                                    <p className=' text-2xl py-2 border-b-1 ' >กิจกรรมภายในมหาวิทยาลัย :</p>
                                </div>
                                <HorizontalCard eventsInside={insideEvents} />
                            </div>
                            <div className='w-full px-4' >
                                <div className=' border-b-2 border-slate-200 ' >
                                    <p className=' text-2xl py-2 border-b-1' >กิจกรรมภายนอกมหาวิทยาลัย :</p>
                                </div>
                                <HorizontalCard eventOutside={outSideEvents} />
                            </div>
                            <div className='flex justify-end items-center text-lg px-4 py-2  ' >
                                ชั่วโมงกิจกรรมที่มีสะสม : ภายใน: {totalInsideWorkingHours}/18 ชั่วโมง , ภายนอก: {totalOutsideWorkingHours} ชั่วโมง
                                (รวมต้องมากกว่าหรือเท่ากับ 36 ชั่วโมง)
                            </div>
                        </>
                    )}
                    {myEvent?.dones !== null && !myEvent?.dones?.status && myEvent?.dones?.comment !== '' ? (
                        <div className='flex justify-center items-center' >
                            <span>
                                ไม่ผ่านการอยุมัตืเนื่องจาก : {myEvent?.dones?.comment}
                            </span>
                            <BasicButtons
                                label={"ส่งผลรวมกิจกรรมอีกครั้ง"}
                                onClick={() => handleSubmit()}
                                width={'23ch'}
                            />
                        </div>
                    ) : myEvent?.dones !== null && !myEvent?.dones?.status ? (
                        <div className='flex justify-end items-center px-4 py-2' >
                            <BasicButtons
                                diasble
                                label={"รอตรวจสอบผลรวมกิจกรรม"}
                                width={'14ch'}
                            />
                        </div>
                    ) : myEvent?.dones !== null && myEvent?.dones?.status ? (
                        <div className='flex justify-end items-center px-4 py-2' >
                            <span className='w-fit bg-green-500 text-white font-kanit p-2 flex justify-center items-center' >
                                ผ่านการตวจสอบแล้ว
                            </span>
                        </div>
                    ) : (totalInsideWorkingHours >= 18 && totalInsideWorkingHours + totalOutsideWorkingHours >= 36) ? (
                        <div className='flex justify-end items-center px-4 py-2' >
                            <BasicButtons
                                label={"ส่งผลรวมกิจกรรม"}
                                onClick={() => handleSubmit()}
                                width={'20ch'}
                            />
                        </div>
                    ) : (
                        <div className='flex justify-end items-center px-4 py-2' >
                            <BasicButtons
                                diasble
                                label={"ส่งผลรวมกิจกรรม"}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showAlert.status && (
                <div className="fixed bottom-4 right-4 z-50 w-fit duration-300  ">
                    {showAlert.status === "success" ? (
                        <SuccessAlert label={showAlert.message} />
                    ) : (
                        <ErrorAlert label={showAlert.message} />
                    )}
                </div>
            )}
        </div>


    )
}
export default page