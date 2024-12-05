'use client'
import { useState, useEffect } from "react";
import CustomTable from "@/app/Components/CustomTable";
import Nav from "@/app/Components/Nav";
import EditPopup from "@/app/Components/editPopup";
import Creatfaculty from "@/app/Components/Creatfaculty";
import { deleteFacultybtID, creatFaculties, getFaculties } from "@/app/Utils/api";
import { SuccessAlert, ErrorAlert } from '@/app/Components/Alert';

function Page() {
    const [facultiesList, setFacultiesList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null); // ข้อความ Alert
    const [alertType, setAlertType] = useState("success"); // ประเภท Alert
    const title = 'รายชื่อคณะทั้งหมด';

    // โหลดข้อมูลจาก API 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFaculties();
                const dataWithId = response.data.map((faculty) => ({
                    ...faculty,
                    id: faculty.faculty_id,
                }));
                setFacultiesList(dataWithId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const showAlert = (message, type = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage(null);
        }, 3000); // ปิด Alert อัตโนมัติหลัง 3 วินาที
    };

    const columns = [
        { headerName: 'รหัสคณะ', field: 'faculty_id' },
        { headerName: 'ชื่อคณะ', field: 'faculty_name' },
    ];

    const fields = [
        { name: 'faculty_name', label: 'ชื่อคณะ', placeholder: 'กรุณากรอกชื่อคณะ' },
        { name: 'faculty_id', label: 'รหัสคณะ', placeholder: 'กรุณากรอกรหัสคณะ' },
    ];

    // ฟังก์ชันเพิ่มคณะ
    const handleAddFaculty = async (newFaculty) => {
        console.log('dwadwa');

        try {
            const response = await creatFaculties(newFaculty);
            console.log(response.status);

            if (response.status === 201) {
                const createdFaculty = response.data;
                setFacultiesList((prevList) => [...prevList, createdFaculty]);
                setOpenCreateDialog(false);
                showAlert("เพิ่มคณะสำเร็จ!", "success");
            }
        } catch (error) {
            console.error("Error adding faculty:", error);
            showAlert("เกิดข้อผิดพลาดในการเพิ่มคณะ", "error");
        }
    };

    // ฟังก์ชันแก้ไขคณะ
    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleSaveEdit = (updatedItem) => {
        const updatedData = facultiesList.map((item) =>
            item.faculty_id === updatedItem.faculty_id ? updatedItem : item
        );
        setFacultiesList(updatedData);
        setSelectedItem(null);
        showAlert("แก้ไขข้อมูลสำเร็จ!", "success");
    };

    // ฟังก์ชันลบคณะ
    const handleDelete = async (item) => {
        try {
            const response = await deleteFacultybtID(Number(item.faculty_id));
            console.log(response.status);

            if (response.status === 200) {
                setFacultiesList((prevRows) =>
                    prevRows.filter((row) => row.faculty_id !== item.faculty_id)
                );
                showAlert("ลบคณะสำเร็จ!", "success");
            } else {
                showAlert("ไม่สามารถลบคณะได้", "error");
            }
        } catch (error) {
            console.error("Failed to delete:", error);
            showAlert("เกิดข้อผิดพลาดในการลบคณะ", "error");
        }
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <Nav />
            {/* แสดง Alert ที่ด้านบน */}
            {alertMessage && (
                <div className="fixed bottom-4 right-[142px]  z-50 w-[300px] duration-150">
                    {alertType === "success" ? (
                        <SuccessAlert label={alertMessage} />
                    ) : (
                        <ErrorAlert label={alertMessage} />
                    )}
                </div>
            )}
            <div className='flex justify-center items-center bg-gray-50 '>
                <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                    <h1 className='text-[52px] text-shadow-md p-10'>{title}</h1>
                    <CustomTable
                        rows={facultiesList}
                        columns={columns}
                        entity="รายชื่อคณะ"
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onClick={() => setOpenCreateDialog(true)}
                    />
                    <EditPopup
                        selectedEditItem={selectedItem}
                        closeModal={() => setSelectedItem(null)}
                        onSave={handleSaveEdit}
                        fields={fields}
                    />
                    {openCreateDialog && (
                        <Creatfaculty
                            openDialog={openCreateDialog}
                            handleCloseDialog={() => setOpenCreateDialog(false)}
                            onSave={handleAddFaculty}
                            showAlert={showAlert} // ส่งฟังก์ชัน showAlert
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;