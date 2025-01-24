import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'
import ViewTable from './ViewTable';
import { getUserInEvent } from '../Utils/api';
import { useStore } from '@/store/useStore';
import ViewPDF from './ViewPDF';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function ShowDialogTable({ isOpen, onClose, id }) {

    const [userListInEvent, setUserListInEvent] = useState([])
    const EventID = id
    const { user } = useStore()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserInEvent(user.role, Number(EventID))
                setUserListInEvent(response.data)

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [])

    console.log(userListInEvent);

    const colums = [
        { headerName: 'รหัสนักศึกษา', field: 'code' },
        { headerName: 'ชื่อจริง', field: 'first_name' },
        { headerName: 'นามสกุล', field: 'last_name' },
        { headerName: 'สถานะ', field: 'status' },
        { headerName: 'ตรวจสอบหลักฐาน', field: 'file_pdf' }
    ]


    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen} // ใช้ isOpen แทน open
                maxWidth="md" // กำหนดความกว้างสูงสุดเป็นขนาดกลาง
                fullWidth // เปิดการขยาย Dialog ให้เต็มความกว้างที่สามารถ
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    รายชื่อนักศึกษาที่เข้าร่วมกิจกรรม
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <ViewTable columns={colums} rows={userListInEvent} />
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default ShowDialogTable