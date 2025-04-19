'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { EditBranchbyID, editEventById, editFacultybyID, getAllteacher, getFaculties } from '../Utils/api';
import Customselect from './Customselect';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';
import CustomTextfield from './Textfield';



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

export default function EditPopup({ selectedEditItem, closeModal, onSave, fields }) {
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState(false); // เพิ่มสถานะสำหรับ error
    const [formData, setFormData] = useState({});
    const [facultiesList, setFacultiesList] = useState([]);
    const path = usePathname();
    const { user } = useStore();

    useEffect(() => {
        if (selectedEditItem) {
            setFormData(selectedEditItem);
        }

    }, [selectedEditItem, path]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const updatedData = { ...formData };

            if (path === '/Admin/Facultylist') {
                await editFacultybyID(Number(updatedData.faculty_id), {
                    faculty_code: updatedData.faculty_code,
                    faculty_name: updatedData.faculty_name,
                });
            } else if (path === '/Admin/Branchlist') {
                await EditBranchbyID(updatedData.faculty_id, {
                    faculty_id: updatedData.faculty_id,
                    branch_code: updatedData.branch_code,
                    branch_name: updatedData.branch_name,
                });
            } else if (path === '/Admin/MyEvent') {
                const formattedStartDate = `${updatedData.start_date} ${updatedData.start_time}`;
                await editEventById(user.role, Number(updatedData.event_id), {
                    event_name: updatedData.event_name,
                    start_date: formattedStartDate,
                    free_space: updatedData.free_space,
                    limit: updatedData.limit,
                    location: updatedData.location,
                });
            }

            onSave(updatedData);
            setUpdated(true);
            setError(false); // ปิด error
            setTimeout(() => setUpdated(false), 2000);
            closeModal();
        } catch (error) {
            console.error('Error updating data:', error);
            setUpdated(false);
            setError(true); // แสดง error
            setTimeout(() => setError(false), 2000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal
            open={!!selectedEditItem}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center items-center">
                        <span className="font-kanit text-xl text-center">แก้ไขข้อมูล</span>
                    </div>
                    <div className="grid gap-4">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label>{field.label}</label>
                                <input
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    className="w-full border p-4 mt-2"
                                    name={field.name}
                                />
                            </div>

                        ))}
                       
                    </div>
                    <div className="flex justify-end items-center mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg font-kanit bg-blue-400 text-white hover:bg-blue-600 duration-100"
                        >
                            แก้ไข
                        </button>
                    </div>
                </form>
                {updated && (
                    <Alert
                        icon={<CheckIcon fontSize="inherit" />}
                        severity="success"
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            zIndex: 9999,
                            width: 'auto',
                        }}
                    >
                        ข้อมูลถูกอัปเดตสำเร็จ
                    </Alert>
                )}
                {error && (
                    <Alert
                        icon={<ErrorIcon fontSize="inherit" />}
                        severity="error"
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            zIndex: 9999,
                            width: 'auto',
                        }}
                    >
                        การอัปเดตข้อมูลล้มเหลว
                    </Alert>
                )}
            </Box>
        </Modal>
    );
}