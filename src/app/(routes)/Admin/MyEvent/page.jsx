'use client'
import CustomTable from '@/app/Components/CustomTable';
import EditPopup from '@/app/Components/editPopup';
import Loading from '@/app/Components/Loading';
import Nav from '@/app/Components/Nav';
import SwitchOnOff from '@/app/Components/SwitchOnOff';
import { getMyEventTeacher, getMyEventAdmin } from '@/app/Utils/api';
import { blockNulluser } from '@/app/Utils/block';
import { useStore } from '@/store/useStore';
import React, { useEffect, useState } from 'react';
import { checkSessionTimeout } from '@/app/Utils/session';
import Footer from '@/app/Components/Footer';

function page() {
    const [loading, setLoading] = useState(false);
    const [myEvent, setMyEvent] = useState([]);
    const { user } = useStore();
    const [selectedRow, setSelectedRow] = useState(null); // Update the state to selectedRow
    const [EditPopupOpen, setEditPopupOpen] = useState(false);
    const { userRoleHash, initUserRoleHash } = useStore()
    // ตรวจสอบว่าเราอยู่ในฝั่ง client



    useEffect(() => {
        initUserRoleHash()
    }, [userRoleHash])



    const handleEdit = (item) => {
        console.log(item); // For debugging
        setEditPopupOpen(true); // Open the popup
        setSelectedRow(item); // Store the selected item for editing
    };

    useEffect(() => {
        // blockNulluser(userRoleHash)
        checkSessionTimeout()
        const fetchData = async () => {
            setLoading(true);
            try {
                if (userRoleHash === 'admin') {
                    const response = await getMyEventAdmin();
                    setMyEvent(response.data || []);
                } else if (userRoleHash === 'teacher') {
                    const response = await getMyEventTeacher();
                    setMyEvent(response.data || []);
                }
            } catch (error) {
                console.log(error);  // You can add a more specific error handling logic if needed
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userRoleHash]);


    console.log(myEvent);


    const fields = [
        { name: 'event_name', label: 'ชื่อกิจกรรม', placeholder: 'กรุณากรอกชื่อกิจกรรม' },
        { name: 'start_date', label: 'วันที่เริ่มกิจกรรม', placeholder: 'กรุณากรอกวันที่เริ่มกิจกรรม' },
        { name: 'start_time', label: 'เวลา', placeholder: 'กรุณากรอกเวลา' },
        { name: 'free_space', label: 'จำนวนที่ว่าง', placeholder: 'กรุณากรอกจำนวนที่ว่าง' },
        { name: 'limit', label: 'จำนวนที่รับ', placeholder: 'กรุณากรอกจำนวนที่รับ' },
        { name: 'location', label: 'สถานที่', placeholder: 'กรุณากรอกสถานที่' },
    ];

    const columns = [
        { headerName: 'ชื่อกิจกรรม', field: 'event_name' },
        { headerName: 'วันที่เริ่มกิจกรรม', field: 'start_date' },
        { headerName: 'เวลา', field: 'start_time' },
        { headerName: 'จำนวนที่ว่าง (คน)', field: 'free_space' },
        { headerName: 'จำนวนที่รับ (คน)', field: 'limit' },
        {
            headerName: 'ปิด/เปิด รับสมัคร', field: 'status',
            renderCell: (params) => {
                return String(params.value) ? <SwitchOnOff /> : 'ปิด';
            }
        },
        { headerName: 'ผู้ที่สมัครเข้าร่วม', field: 'userList' },

    ];

    const thaiMonths = {
        'มกราคม': '01', 'กุมภาพันธ์': '02', 'มีนาคม': '03', 'เมษายน': '04',
        'พฤษภาคม': '05', 'มิถุนายน': '06', 'กรกฎาคม': '07', 'สิงหาคม': '08',
        'กันยายน': '09', 'ตุลาคม': '10', 'พฤศจิกายน': '11', 'ธันวาคม': '12'
    };

    function parseThaiDate(thaiDate) {
        const [day, monthThai, yearThai] = thaiDate.split(' ');
        const month = thaiMonths[monthThai];
        const year = parseInt(yearThai) - 543; // แปลง พ.ศ. -> ค.ศ.
        return new Date(`${year}-${month}-${day}`);
    }

    myEvent.sort((a, b) => {
        const dateA = parseThaiDate(b.start_date);
        const dateB = parseThaiDate(a.start_date);
        return dateB - dateA;
    });



    const title = 'รายชื่อกิจกรรมที่ต้องตรวจสอบ';

    return (
        <div className="bg-gray-50 h-screen">
            <Nav />
            <div className="flex justify-center items-center bg-gray-50 min-h-screen mt-20 ">
                <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                    <h1 className="lg:text-[52px] xs:text-[36px] text-shadow-md p-10 ">{title}</h1>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="mt-40 px-10 h-[400px]">
                                <Loading />
                            </div>
                        </div>
                    ) : (
                        <CustomTable
                            rows={myEvent}
                            columns={columns}
                            entity="กิจกรรม"
                            onEdit={handleEdit}
                        />
                    )}
                </div>
            </div>
            {EditPopupOpen && (
                <EditPopup
                    closeModal={() => setEditPopupOpen(false)}
                    fields={fields}
                    selectedEditItem={selectedRow}
                />
            )}
            <Footer />
        </div>
    );
}

export default page;