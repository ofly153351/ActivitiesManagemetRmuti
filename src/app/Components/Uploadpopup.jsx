'use client'

import { fontFamily } from '../Utils/font';
import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { uploadFileMyEvent } from '../Utils/api';

export default function UploadPopup({ isOpen, onClose, eventName, eventID }) {
    const [open, setOpen] = useState(isOpen);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    console.log(eventID, eventName);

    // อัปเดตค่า open เมื่อ isOpen เปลี่ยนแปลง
    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    // ฟังก์ชันเลือกไฟล์
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // ฟังก์ชันอัปโหลดไฟล์
    const handleUpload = async () => {
        if (!file) {
            alert("กรุณาเลือกไฟล์ PDF ก่อนอัปโหลด");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("event_id", eventID); // ส่ง event_id ไปด้วย

        try {
            setUploading(true);
            const response = await uploadFileMyEvent(eventID, formData)
            console.log(response.status);

            alert("อัปโหลดสำเร็จ: " + response.data.filePath);
            setFile(null);
            onClose(); // ปิด popup เมื่ออัปโหลดเสร็จ
            window.location.reload()
        } catch (error) {
            console.error("Upload error:", error);
            alert("อัปโหลดล้มเหลว");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="upload-dialog-title">
            <div className='flex justify-center items-center' >
                <DialogTitle sx={{ padding: 2 }} id="upload-dialog-title">อัปโหลดไฟล์ PDF</DialogTitle>

            </div>
            <DialogContent>
                <p className='p-1' >อัปโหลดไฟล์สำหรับกิจกรรม: <strong>{eventName}</strong></p>
                <input className='p-1' type="file" accept=".pdf" onChange={handleFileChange} />
                {/* {file && <p>ไฟล์ที่เลือก: {file.name}</p>} */}
            </DialogContent>
            <DialogActions>
                <Button sx={{ fontFamily: fontFamily.Kanit }} onClick={onClose} disabled={uploading}>ปิด</Button>
                <Button sx={{ fontFamily: fontFamily.Kanit }} onClick={handleUpload} disabled={uploading}>
                    {uploading ? "กำลังอัปโหลด..." : "อัปโหลด"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}