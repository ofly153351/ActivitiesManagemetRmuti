import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

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

export default function ViewPopup({ selectedEditUser, closeModal }) {
    const open = !!selectedEditUser; // ใช้ selectedUser ในการควบคุมเปิด/ปิด
    const [updated, setUpdated] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault(); // ป้องกันการรีเฟรชหน้า
        const formData = new FormData(event.currentTarget);
        const updatedData = Object.fromEntries(formData);
        console.log(updatedData);
        setUpdated(true); // แสดงการแจ้งเตือนเมื่อมีการส่งข้อมูล
        closeModal(); // ปิดโมดัลหลังจากส่งข้อมูล

        // รีเซ็ตสถานะหลังจาก 2 วินาที
        setTimeout(() => {
            setUpdated(false);
        }, 2000);
    };
    const handleClose = () => {
        closeModal(); // เรียกใช้ closeModal เมื่อปิดโมดัล
    };

    useEffect(() => {
        if (updated) {
            const timer = setTimeout(() => {
                setUpdated(false);
            }, 2000);
            return () => clearTimeout(timer); // เคลียร์ timer เมื่อ unmount
        }
    }, [updated]);

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
                        <span className='font-kanit text-xl'>
                            แก้ไขข้อมูลของ {selectedEditUser?.firstName} {selectedEditUser?.lastname}
                        </span>
                    </div>
                    <div id='info'>
                        <div>
                            <input
                                type="text"
                                placeholder="ชื่อ"
                                defaultValue={selectedEditUser?.firstName || ''}
                                className="w-full border p-2 mt-2"
                                name='firstName'
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="นามสกุล"
                                defaultValue={selectedEditUser?.lastname || ''}
                                className="w-full border p-2 mt-2"
                                name='lastName'
                            />
                        </div>
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
                        Here is a gentle confirmation that your action was successful.
                    </Alert>
                )}
            </Box>
        </Modal>
    );
}