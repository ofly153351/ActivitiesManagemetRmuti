import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import BasicTable from './BasicTable';
import BasicTabs from './BasicTabs';
import CustomTextfield from '../Textfield';
import BasicButtons from '../BasicButtons';
import { updatedStatusDonestudent } from '@/app/Utils/api';
import { PlaylistAddOutlined } from '@mui/icons-material';
import { SuccessAlert } from '../AlertShow';
import { usePathname } from 'next/navigation';
usePathname

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EvidancedDialog({ open, setOpen, userID, years, setOpenAlert }) {
    const [comment, setComment] = React.useState('');
    const pathName = usePathname();


    console.log(years);

    console.log(pathName);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeComment = (e) => {
        setComment(e.target.value);

    }

    const handleSubmit = (status) => {
        if (!userID) return;
        console.log(status);

        const Payload = {
            status: status,
            comment: comment
        }

        console.log(Payload);

        try {
            const FetchData = async () => {
                const response = await updatedStatusDonestudent(userID, Payload);
                console.log(response.data);
                if (response.status === 200) {
                    setOpen(false);
                    setOpenAlert({ status: true, message: 'บันทึกข้อมูลเรียบร้อยแล้ว' })
                }
            }
            FetchData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <p className='text-[30px]' >ข้อมูลกิจกรรมของนักศึกษา</p>
                </DialogTitle>
                <BasicTabs
                    studentYears={years}
                    userID={userID}
                />
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                {pathName !== '/Admin/AllDonesEvidence' ? (
                    <DialogActions>
                        <CustomTextfield
                            label="ความคิดเห็น"
                            value={comment}
                            onChange={handleChangeComment} // ✅ ส่ง handler ตรงนี้
                        />
                        <BasicButtons color={'#e53935'} hover={'#c62828'} label={'ไม่อนุมัติ'} onClick={() => handleSubmit(false)} />
                        <BasicButtons label={'อนุมัติ'} onClick={() => handleSubmit(true)} />

                    </DialogActions>

                ) : null}
            </BootstrapDialog>
        </>
    );
}