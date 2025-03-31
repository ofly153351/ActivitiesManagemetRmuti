import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomTextfield from './Textfield';
import DatePickerValue from './DatePickerValue';
import BasicTimeField from './BasicTimeField';
import { Item } from '@radix-ui/react-select';
import { Padding } from '@mui/icons-material';
import Customselect from './Customselect';
import { fontFamily } from '../Utils/font';



export default function CustomDialog({
    title,
    isOpen,
    isClose,
    data,
    onClick,
    handleTimeChange,
}) {
    const [open, setOpen] = useState(isOpen); // กำหนดให้ใช้ props isOpen

    // ฟังก์ชันที่จะถูกเรียกเมื่อ dialog ปิด
    const handleClose = () => {
        isClose(false); // ส่ง false กลับไปให้ parent เพื่อปิด dialog
        setOpen(false); // ตั้งค่า open เป็น false เพื่อปิด dialog
        console.log('Dialog closed');
    };





    return (
        <>
            <Dialog
                onClose={handleClose}
                open={open} // ใช้ค่า open จาก useState เพื่อควบคุมการเปิด/ปิด dialog
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
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
                <DialogContent dividers>
                    {data.map((item, index) => (
                        <div key={index} className='' >
                            {item.label === 'วันที่เริ่มกิจกรรม' ? (
                                <div className='pt-1' >
                                    <DatePickerValue label={item.label} onChange={item.function} />
                                    {item.error && <p className='p-1.5 ' style={{ color: "red", fontSize: "14px" }}>{item.error}</p>}

                                </div>
                            ) : item.label === 'เวลา' ? (
                                <div className='' >
                                    <BasicTimeField label={item.label} onChange={handleTimeChange} />
                                    {item.error && <p className='px-2' style={{ color: "red", fontSize: "14px" }}>{item.error}</p>}

                                </div>
                            ) : item.label === 'ชั่วโมงกิจกรรม' ? (
                                <>
                                    <CustomTextfield label={item.label} onChange={item.function} value={item.value} type="number" />
                                    {item.error && <p className='px-2' style={{ color: "red", fontSize: "14px" }}>{item.error}</p>}
                                </>

                            ) : (item.label === 'ปีการศึกษา') ? (
                                <>
                                    <Customselect
                                        label={item.label}
                                        options={item.options}
                                        onChange={item.function}
                                        value={item?.value || ""}
                                        field='label'
                                    />
                                    {item.error && <p className='px-2' style={{ color: "red", fontSize: "14px" }}>{item.error}</p>}

                                </>
                            ) : (
                                <>
                                    <CustomTextfield label={item.label} onChange={item.function} value={item.value} />
                                    {item.error && <p className='px-2' style={{ color: "red", fontSize: "14px" }}>{item.error}</p>}
                                </>
                            )}
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontFamily: fontFamily.Kanit }} autoFocus onClick={onClick}>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
}