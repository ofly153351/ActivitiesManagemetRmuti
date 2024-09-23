import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function viewPopup({ selectedUser, closeModal }) {

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
    const open = !!selectedUser; // ใช้ selectedUser ในการควบคุมเปิด/ปิด
    const user = selectedUser
    console.log(selectedUser);

    const handleClose = () => {
        closeModal(); // เรียกใช้งาน closeModal ที่รับมาจาก props
    };
    return (
        <Modal
            open={open} // ใช้ open เพื่อควบคุมสถานะ
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div id="modal-modal-title" sx={{ fontFamily: 'Kanit' }} variant="h5" component="h2">
                    ข้อมูลผู้ใช้
                </div>
                <div id="modal-modal-description" sx={{ mt: 2, fontFamily: 'Kanit' }}>
                    {user ? `${user.firstName} ${user.lastname}` : 'ไม่มีข้อมูล'}
                </div>
            </Box>
        </Modal>
    )
}

export default viewPopup
