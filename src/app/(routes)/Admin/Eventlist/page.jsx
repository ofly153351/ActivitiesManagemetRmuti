'use client';
import CustomTable from '@/app/Components/CustomTable';
import Loading from '@/app/Components/Loading';
import { getAllevent, getAllowedEvent, getCurrentEvent } from '@/app/Utils/api';
import React, { useEffect, useState } from 'react';
import Nav from '@/app/Components/Nav';
import EditPopup from '@/app/Components/editPopup';
import { useStore } from '@/store/useStore';
import { blockNulluser } from '@/app/Utils/block';
import { checkSessionTimeout } from '@/app/Utils/session';
import Footer from '@/app/Components/Footer';

function Page() {
    const title = 'รายชื่อกิจกรรม';
    const [allEvent, setAllEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alignment, setAlignment] = useState('web');
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [allEventList, setAllEventList] = useState([]);
    const [AllowedEvent, setAllowedEvent] = useState([]);
    const [CurrentEvent, setCurrentEvent] = useState([]);
    const [selectedEditEvent, setSelectedEditEvent] = useState(null); // ใช้ null แทนการใช้ [] 
    const { user } = useStore()

    const fields = [
        { name: 'event_name', label: 'ชื่อกิจกรรม', placeholder: 'กรุณากรอกชื่อกิจกรรม' },
        { name: 'start_date', label: 'วันที่เริ่มกิจกรรม', placeholder: 'กรุณากรอกวันที่เริ่มกิจกรรม' },
        { name: 'start_time', label: 'เวลา', placeholder: 'กรุณากรอกเวลา' },
        { name: 'free_space', label: 'จำนวนที่ว่าง', placeholder: 'กรุณากรอกจำนวนที่ว่าง' },
        { name: 'limit', label: 'จำนวนที่รับ', placeholder: 'กรุณากรอกจำนวนที่รับ' },
        { name: 'location', label: 'สถานที่', placeholder: 'กรุณากรอกสถานที่' },
    ];

    const changeState = (event, newAlignment) => {
        setAlignment(newAlignment);

        if (newAlignment === 'allEvent') {
            if (!allEventList || allEventList.length <= 0) {
                const fetchData = async () => {
                    try {
                        const response = await getAllevent();
                        setSelectedEvent(response.data);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchData();
            }
        } else if (newAlignment === 'AllowedEvent') {
            if (!AllowedEvent || AllowedEvent.length <= 0) {
                const fetchData = async () => {
                    try {
                        const response = await getAllowedEvent();
                        setSelectedEvent(response.data);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchData();
            }
        } else if (newAlignment === 'CurrentEvent') {
            if (!CurrentEvent || CurrentEvent.length <= 0) {
                const fetchData = async () => {
                    try {
                        const response = await getCurrentEvent();
                        setSelectedEvent(response.data);
                        console.log(response.data);

                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchData();
            }
        }
    };

    useEffect(() => {
        // blockNulluser(user)
        checkSessionTimeout()
        const fetchData = async () => {
            try {
                const response = await getAllevent();
                setSelectedEvent(response.data);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    // console.log(selectedEvent , 'dwadwa');

    const columns = [
        { headerName: 'ชื่อกิจกรรม', field: 'event_name' },
        { headerName: 'วันที่เริ่มกิจกรรม', field: 'start_date' },
        { headerName: 'เวลา', field: 'start_time' },
        { headerName: 'จำนวนที่ว่าง', field: 'free_space' },
        { headerName: 'จำนวนที่รับ', field: 'limit' },
        {
            headerName: 'ปิด/เปิด รับสมัคร', field: 'status',
            renderCell: (params) => {
                return String(params.value) ? 'เปิด' : 'ปิด';
            }
        }

    ];

    const handleEdit = (item) => {
        setSelectedEditEvent(item); // เลือกกิจกรรมที่ต้องการแก้ไข
    };

    function parseThaiDate(thaiDateStr) {
        const months = {
            'มกราคม': 0, 'กุมภาพันธ์': 1, 'มีนาคม': 2, 'เมษายน': 3,
            'พฤษภาคม': 4, 'มิถุนายน': 5, 'กรกฎาคม': 6, 'สิงหาคม': 7,
            'กันยายน': 8, 'ตุลาคม': 9, 'พฤศจิกายน': 10, 'ธันวาคม': 11
        };

        const [day, monthThai, yearThai] = thaiDateStr.split(' ');
        const year = parseInt(yearThai, 10) - 543; // แปลง พ.ศ. → ค.ศ.
        const month = months[monthThai];
        const date = parseInt(day, 10);

        return new Date(year, month, date).getTime(); // ใช้ getTime() เพื่อเปรียบเทียบง่าย
    }

    selectedEvent.sort((a, b) => {
        // เรียงให้ status true มาก่อน
        if (a.status !== b.status) {
            return b.status - a.status; // true (1) มาก่อน false (0)
        }

        // ถ้า status เท่ากัน ให้เรียงตามวันที่ (เก่า → ใหม่)
        const dateA = parseThaiDate(a.start_date);
        const dateB = parseThaiDate(b.start_date);
        return dateA - dateB;
    });


    return (
        <div className='bg-gray-50'>
            <Nav />
            <div className=" bg-gray-50 flex justify-center items-center mt-20">

                <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50">
                    <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                        <h1 className="min-w-full  text-[52px] text-shadow-md p-10">{title}</h1>
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="mt-40 px-10 h-[400px]">
                                    <Loading />
                                </div>
                            </div>
                        ) : (
                            <CustomTable
                                columns={columns}
                                rows={selectedEvent}
                                entity="กิจกรรม"
                                ToggleButtonState={changeState}
                                alignment={alignment}
                                onEdit={handleEdit}
                            />
                        )}
                    </div>
                </div>

                {/* แสดง EditPopup เฉพาะเมื่อ selectedEditEvent มีค่า */}
                {selectedEditEvent && (
                    <EditPopup
                        closeModal={() => setSelectedEditEvent(null)} // ปิดเมื่อคลิกปุ่ม
                        fields={fields}
                        selectedEditItem={selectedEditEvent} // ส่งข้อมูลกิจกรรมที่เลือกไปยัง EditPopup
                    />
                )}
            </div>
            <div className="mt-10">
                <Footer />

            </div>
        </div>


    );
}

export default Page;