import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fontFamily } from '../Utils/font';
import ViewPDFdialog from './ViewPDFdialog';

function ViewTable({ columns, rows }) {
    const [selectedFile, setSelectedFile] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('')
    const [selectedUser, setSelectedUser] = useState('')
    const handleSelectedFile = (filePath, eventID, userID) => {
        console.log(userID);
        setSelectedUser(userID)
        setSelectedFile(filePath);
        setSelectedEvent(eventID)
        setOpenDialog(true);  // เปิด dialog เมื่อเลือกไฟล์
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);  // ปิด dialog
        setSelectedFile('');  // รีเซ็ตไฟล์ที่เลือก
        setSelectedEvent('')
    };

    useEffect(() => {
        if (selectedFile) {
            console.log(`Selected file: ${selectedFile}`);
        }
    }, [selectedFile]); // ทำงานเมื่อ selectedFile เปลี่ยนค่า

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ fontFamily: 'Kanit, sans-serif' }} >
                        {/* Render the table headers dynamically */}
                        {columns.map((column, index) => (
                            <TableCell sx={{ fontFamily: fontFamily.Kanit }} key={index} align="center">{column.headerName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex} // Unique key for each row
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {columns.map((column, colIndex) => (
                                <TableCell sx={{ fontFamily: fontFamily.Kanit }} key={colIndex} align="center">
                                    {column.field === 'status' ? (
                                        row['status'] ? (
                                            <span className="p-1 bg-green-500 rounded-md text-white">ผ่านกิจกรรมแล้ว</span>
                                        ) : (
                                            <span className="p-1 bg-red-500 rounded-md text-white">ยังไม่ผ่าน</span>
                                        )
                                    ) : column.field === 'file_pdf' ? (
                                        row['file_pdf'] ? (
                                            <button
                                                className="p-1 bg-[#e6cc59] rounded-md text-black hover:underline"
                                                onClick={() => handleSelectedFile(row['file_pdf'], row['event_id'], row['user_id'])}
                                            >
                                                ตรวจสอบไฟล์
                                            </button>
                                        ) : (
                                            <span className="p-1 bg-red-500 rounded-md text-white">ยังไม่ส่งเอกสาร</span>
                                        )
                                    ) : (
                                        row[column.field] // แสดงข้อมูลสำหรับฟิลด์อื่นๆ ปกติ
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {openDialog && (
                <ViewPDFdialog open={open} onClose={handleCloseDialog}
                    filePath={selectedFile}
                    userID={selectedUser}
                    eventID={selectedEvent} />
            )}
        </TableContainer>
    );
}

export default ViewTable;