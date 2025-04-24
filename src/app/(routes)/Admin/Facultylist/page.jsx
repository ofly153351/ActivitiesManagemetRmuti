'use client'
import { useState, useEffect } from "react";
import CustomTable from "@/app/Components/CustomTable";
import Nav from "@/app/Components/Nav";
import EditPopup from "@/app/Components/editPopup";
import Creatfaculty from "@/app/Components/Createfaculty";
import { deleteFacultybtID, getAllteacher, getFaculties } from "@/app/Utils/api";
import { SuccessAlert, ErrorAlert } from '@/app/Components/AlertShow';
import { useStore } from "@/store/useStore";
import { usePathname } from "next/navigation";
import { blockNulluser } from "@/app/Utils/block";




function Page() {
    const [facultiesList, setFacultiesList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState("success");
    const [allteacher, setAllTeacehr] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, userRoleHash, initUserRoleHash } = useStore()
    const path = usePathname();



    const title = 'รายชื่อคณะทั้งหมด';

    useEffect(() => {
        initUserRoleHash();
    }, [userRoleHash])

    // โหลดข้อมูลจาก API 
    useEffect(() => {
        blockNulluser(user)

        const fetchData = async () => {
            try {
                setLoading(true); // เริ่มโหลด
                const response = await getFaculties();
                const dataWithId = response.data.map((faculty) => ({
                    ...faculty,
                    id: faculty.faculty_id,
                }));
                setFacultiesList(dataWithId);

                if (path === '/Admin/Facultylist' && userRoleHash === 'admin') {
                    const teacherResponse = await getAllteacher();
                    setAllTeacehr(teacherResponse.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // จบการโหลด ไม่ว่าจะสำเร็จหรือ error
            }
        };
        fetchData();
    }, []);

    console.log(facultiesList);
    console.log(allteacher);





    const columns = [
        { headerName: 'รหัสคณะ', field: 'faculty_code' },
        { headerName: 'ชื่อคณะ', field: 'faculty_name' },
        {
            headerName: 'เจ้าหน้าที่ประจำคณะ',
            valueGetter: (params) => {
                const teacher = params.data.teacher;
                return teacher ? `${teacher.first_name} ${teacher.last_name}` : '-';
            },
            field: 'teacher',
        },
    ];

    const fields = [
        { name: 'faculty_name', label: 'ชื่อคณะ', placeholder: 'กรุณากรอกชื่อคณะ' },
        { name: 'faculty_code', label: 'รหัสคณะ', placeholder: 'กรุณากรอกรหัสคณะ' },
    ];

    const showAlert = (message, type = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage(null);
        }, 3000); // ปิด Alert อัตโนมัติหลัง 3 วินาที
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

    const handleDelete = async (item) => {
        try {
            const response = await deleteFacultybtID(item.faculty_id);
            console.log("handleDeleteFaculty:", response.data);

            if (response.status === 200) {
                // ลบรายการออกจาก facultiesList โดยตรง
                setFacultiesList((prevList) =>
                    prevList.filter((faculty) => faculty.faculty_id !== item.faculty_id)
                );
                console.log(facultiesList);

                showAlert("ลบคณะสำเร็จ!", "success");
            } else {
                showAlert("ไม่สามารถลบคณะได้", "error");
            }
        } catch (error) {
            console.error("Failed to delete:", error);
            showAlert("เกิดข้อผิดพลาดในการลบคณะ", "error");
        }
    };

    const sortedRows = (facultiesList?.length > 0)
        ? facultiesList.sort((a, b) => a.faculty_code.localeCompare(b.code))
        : [];




    return (
        <div className='min-h-screen bg-gray-50'>
            <Nav />
            {alertMessage && (
                <div className="fixed bottom-4 right-[142px]  z-50 w-[300px] duration-150">
                    {alertType === "success" ? (
                        <SuccessAlert label={alertMessage} />
                    ) : (
                        <ErrorAlert label={alertMessage} />
                    )}
                </div>
            )}
            <div className='flex justify-center items-center bg-gray-50 min-h-screen'>
                <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                    <h1 className='text-[52px] text-shadow-md p-10'>{title}</h1>
                    <CustomTable
                        rows={sortedRows}
                        columns={columns}
                        entity="รายชื่อคณะ"
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onClick={() => setOpenCreateDialog(true)}
                        teacherList={allteacher}
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
                            showAlert={showAlert} // ตรวจสอบว่าส่งมาอย่างถูกต้อง
                            handleCloseDialog={() => setOpenCreateDialog(false)}
                            onSave={(newFaculty) => {
                                showAlert("เพิ่มคณะสำเร็จ!", "success");
                                console.log('ddddd');
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;