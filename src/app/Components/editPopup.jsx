'use client'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { EditBranchbyID, editFacultybyID, getFaculties } from '../Utils/api';
import Customselect from './Customselect';
import { usePathname } from 'next/navigation';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f5f5f5',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
};

export default function EditPopup({ selectedEditItem, closeModal, onSave, fields, }) {
    const open = !!selectedEditItem;
    const [updated, setUpdated] = useState(false);
    const [formData, setFormData] = useState({});
    const [facultiesList, setFacultiesList] = useState([]);
    const path = usePathname();

    useEffect(() => {
        if (selectedEditItem) {
            setFormData(selectedEditItem);
        }
        try {
            const FetchData = async () => {
                const respones = await getFaculties();
                setFacultiesList(respones.data);
            };
            FetchData();
        } catch (error) {
            console.log(error);
        }
    }, [selectedEditItem]);

    const handleSubmit = (event) => {
        event.preventDefault(); // หยุดการส่งฟอร์ม

        const updatedData = { ...formData }; // Copy ข้อมูลจาก formData

        if (path === '/Admin/Facultylist') {
            const payload = {
                faculty_code: updatedData.faculty_code,
                faculty_name: updatedData.faculty_name,
            };
            editFacultybyID(Number(updatedData.faculty_id), payload);
            setUpdated(true);
            onSave(updatedData); // เรียกฟังก์ชัน onSave เพื่อนำข้อมูลที่แก้ไขส่งไปยัง CustomTable
            setTimeout(() => setUpdated(false), 2000);
            closeModal();
        } else if (path === '/Admin/Branchlist') {
            const payload = {
                faculty_id: updatedData.faculty_id,
                branch_code: updatedData.branch_code,
                branch_name: updatedData.branch_name,
            };
            EditBranchbyID(payload.faculty_id, payload);
            onSave(updatedData); // เรียกฟังก์ชัน onSave เพื่อนำข้อมูลที่แก้ไขส่งไปยัง CustomTable
            closeModal();
            setUpdated(true);
            setTimeout(() => setUpdated(false), 2000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // ตรวจสอบให้ "รหัสคณะ" เป็นตัวเลข และมีความยาวไม่เกิน 4 ตัว
        if (name === 'faculty_code' && !isNaN(value) && value.length <= 4 ||
            name === 'branch_code' && !isNaN(value) && value.length <= 4) {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else if (name !== 'faculty_code' || name === 'branch_code') {
            // ถ้าไม่ใช่ "รหัสคณะ" ให้บันทึกข้อมูลปกติ
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleClose = () => {
        closeModal();
    };

    return (
        <Modal
            open={open} // ใช้ open เพื่อควบคุมสถานะ
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-center items-center'>
                        <span className='font-kanit text-xl text-center'>
                            แก้ไขข้อมูล
                        </span>
                    </div>
                    {path === '/Admin/Branchlist' ? (
                        <div id='info' className='grid justify-center items-center' >
                            <div className='my-2' >
                                <Customselect
                                    margin={0}
                                    width="100%"
                                    high="50px"
                                    label="คณะที่ต้องการ"
                                    value={formData.faculty?.faculty_name || ''}
                                    onChange={(newValue) => {
                                        const faculty = facultiesList.find((option) => option.faculty_name === newValue);
                                        if (faculty) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                faculty_id: faculty.faculty_id,
                                            }));
                                        }
                                    }}
                                    options={facultiesList}
                                    field="faculty_name" />
                            </div>

                            {
                                fields.map((field) => (
                                    <div key={field.name}>
                                        <label>{field.label}</label>
                                        <input
                                            type="text"
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className="w-full border p-2 mt-2"
                                            name={field.name}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div id='info'>
                            {
                                fields.map((field) => (
                                    <div key={field.name}>
                                        <label>{field.label}</label>
                                        <input
                                            type="text"
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className="w-full border p-2 mt-2"
                                            name={field.name}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    )}
                    <div className='flex justify-end items-center mr-10 mt-4'>
                        <button
                            type="submit"
                            className=' px-4 py-2 rounded-lg font-kanit bg-blue-400 text-white hover:bg-blue-600 duration-100'
                        >
                            แก้ไข
                        </button>
                    </div>
                </form>

                {/* Show Alert in Bottom Right Corner */}
                {updated && (
                    <Alert
                        icon={<CheckIcon fontSize="inherit" />}
                        severity="success"
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            zIndex: 9999,
                            mt: 0,
                            mb: 0,
                            width: 'auto',
                        }}
                    >
                        ข้อมูลถูกอัปเดตสำเร็จ
                    </Alert>
                )}
            </Box>
        </Modal>
    );
}