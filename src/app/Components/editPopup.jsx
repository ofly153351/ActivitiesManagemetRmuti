import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { editFacultybyID } from '../Utils/api';
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
    const open = !!selectedEditItem; 
    const [updated, setUpdated] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (selectedEditItem) {
            setFormData(selectedEditItem); 
        }
    }, [selectedEditItem]);

    
    const handleSubmit = (event) => {
        event.preventDefault(); // ป้องกันการรีเฟรชหน้า
        const updatedData = { ...formData };
        console.log(updatedData);
        onSave(updatedData); // ส่งข้อมูลที่แก้ไขไปยัง parent
        setUpdated(true); // แสดงการแจ้งเตือนเมื่อมีการส่งข้อมูล
        console.log(updatedData);
        
        editFacultybyID()
        closeModal(); // ปิดโมดัลหลังจากส่งข้อมูล
     
        // รีเซ็ตสถานะหลังจาก 2 วินาที
        setTimeout(() => {
            setUpdated(false);
        }, 2000);
    };

    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClose = () => {
        closeModal(); // เรียกใช้ closeModal เมื่อปิดโมดัล
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
                    <div id='info'>
                        {fields.map((field) => (
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
                        ))}
                    </div>
                    <div className='mt-4'>
                        <button
                            type="submit"
                            className='px-4 py-2 rounded-lg font-kanit bg-blue-400 text-white hover:bg-blue-600 duration-100'
                        >
                            แก้ไข
                        </button>
                    </div>
                </form>
                {updated && (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ mt: 2 }}>
                        ข้อมูลถูกอัปเดตสำเร็จ
                    </Alert>
                )}
            </Box>
        </Modal>
    );
}