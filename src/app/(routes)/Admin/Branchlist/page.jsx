'use client'
import { ErrorAlert, SuccessAlert } from '@/app/Components/AlertShow';
import CreatBranch from '@/app/Components/CreateBranch';
import CustomTable from '@/app/Components/CustomTable';
import EditPopup from '@/app/Components/editPopup';
import Footer from '@/app/Components/Footer';
import Nav from '@/app/Components/Nav'
import { DeleteBranchbyID, getBranches, getFaculties } from '@/app/Utils/api';
import { blockNulluser } from '@/app/Utils/block';
import { checkSessionTimeout } from '@/app/Utils/session';
import { useStore } from '@/store/useStore';
import React, { useEffect, useState } from 'react'


function page() {
  const [brancheslist, setBrancheslist] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");
  const [facultiesList, setFacultiesList] = useState([]);
  const { user } = useStore()

  const columns = [
    { headerName: 'รหัสสาขา', field: 'branch_code' },
    { headerName: 'ชื่อสาขา', field: 'branch_name' },
    {
      headerName: 'คณะ',
      field: 'faculty.faculty_name',
      valueGetter: (params) => params.data.faculty?.faculty_name || ''
    },
  ];

  const fields = [
    { name: 'branch_name', label: 'ชื่อสาขา', placeholder: 'กรุณากรอกชื่อสาขา' },
    { name: 'branch_code', label: 'รหัสสาขา', placeholder: 'กรุณากรอกรหัสสาขา' },

  ];

  const title = 'รายชื่อสาขาทั้งหมด'



  useEffect(() => {
    // blockNulluser(user)
    checkSessionTimeout()

    const fetchData = async () => {
      try {
        const response = await getBranches();
        console.log('Fetched data:', response.data || []); // ตรวจสอบข้อมูลที่ได้รับจาก API
        if (response.status === 200) {
          setBrancheslist(response.data);

        }
        const faculties = await getFaculties();
        if (faculties.status === 200) {
          setFacultiesList(faculties.data || []);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // ปิด Alert อัตโนมัติหลัง 3 วินาที
  };

  const handleEdit = (item) => {
    setSelectedItem(item);

  };

  const handleSaveEdit = (updatedItem) => {
    const updatedData = brancheslist.map((item) =>
      item.branch_id === updatedItem.branch_id ? updatedItem : item
    );
    setBrancheslist(updatedData);
    setSelectedItem(null);
    showAlert("แก้ไขสาขาสำเร็จ!", "success");
    console.log("updatedData", updatedData);

  };


  const handleDelete = async (item) => {
    console.log("item", item);
    try {
      const response = await DeleteBranchbyID(item.branch_id);
      console.log("handleDeleteBranch :", response.status);

      if (response.status === 200) {
        setFacultiesList((prevRows) =>
          prevRows.filter((row) => row.faculty_code !== item.faculty_code)
        );
        showAlert("ลบสาขาสำเร็จ!", "success");
      } else {
        showAlert("ไม่สามารถลบสาขาได้", "error");
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      showAlert("เกิดข้อผิดพลาดในการลบสาขา", "error");
    }
  };

  brancheslist?.sort((a, b) => a.branch_code.localeCompare(b.branch_code));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Nav />
      {alertMessage && (
        <div className="fixed bottom-4 right-[142px] z-50 w-[300px] duration-150">
          {alertType === "success" ? (
            <SuccessAlert label={alertMessage} />
          ) : (
            <ErrorAlert label={alertMessage} />
          )}
        </div>
      )}
      <div className="flex-grow flex justify-center items-start mt-32">
        <div className="w-[80%] bg-white rounded-md font-kanit shadow-md">
          <h1 className="text-[52px] text-shadow-md p-10">{title}</h1>
          <CustomTable
            rows={brancheslist}
            columns={columns}
            entity="รายชื่อสาขา"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClick={() => setOpenCreateDialog(true)}
          />
          <EditPopup
            selectedEditItem={selectedItem}
            closeModal={() => setSelectedItem(null)}
            onSave={handleSaveEdit}
            fields={fields}
            options={brancheslist}
            field={'branch_name'}
          />
          {openCreateDialog && (
            <CreatBranch
              openDialog={openCreateDialog}
              handleCloseDialog={() => setOpenCreateDialog(false)}
              showAlert={showAlert}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default page