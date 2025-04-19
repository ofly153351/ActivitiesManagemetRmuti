'use client'
import CustomTable from '@/app/Components/CustomTable';
import EditPopup from '@/app/Components/editPopup';
import Loading from '@/app/Components/Loading';
import Nav from '@/app/Components/Nav';
import SwitchOnOff from '@/app/Components/SwitchOnOff';
import { getMyEventTeacher, getMyEventAdmin } from '@/app/Utils/api';
import { useStore } from '@/store/useStore';
import React, { useEffect, useState } from 'react';

function page() {
    const [loading, setLoading] = useState(false);
    const [myEvent, setMyEvent] = useState([]);
    const { user } = useStore();
    const [selectedRow, setSelectedRow] = useState(null); // Update the state to selectedRow
    const [EditPopupOpen, setEditPopupOpen] = useState(false);

    const handleEdit = (item) => {
        console.log(item); // For debugging
        setEditPopupOpen(true); // Open the popup
        setSelectedRow(item); // Store the selected item for editing
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                if (user?.role === 'admin') {
                    const response = await getMyEventTeacher();
                    setMyEvent(response.data);
                } else if (user?.role === 'teacher') {
                    const response = await getMyEventTeacher();
                    setMyEvent(response.data);
                }
            } catch (error) {
                console.log(error);  // You can add a more specific error handling logic if needed
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

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
        { headerName: 'จำนวนที่ว่าง', field: 'free_space' },
        { headerName: 'จำนวนที่รับ', field: 'limit' },
        {
            headerName: 'สถานะ', field: 'status',
            renderCell: (params) => {
                return String(params.value) ? <SwitchOnOff /> : 'ปิด';
            }
        },
        { headerName: 'ผู้ที่สมัครเข้าร่วม', field: 'userList' },

    ];



    const title = 'รายชื่อกิจกรรมของฉัน';

    return (
        <div className="bg-gray-50 h-screen">
            <Nav />
            <div className="flex justify-center items-center bg-gray-50 min-h-screen">
                <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                    <h1 className="text-[52px] text-shadow-md p-10">{title}</h1>
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
        </div>
    );
}

export default page;