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
    const [selectedFirstName, setSelectedFirstName] = useState('')
    const [selectedLastName, setSelectedLastName] = useState('')
    const [selectedStatus, setSelectedStatus] = useState(Boolean)

    const handleSelectedFile = (filePath, eventID, userID, status, first_name, last_name) => {
        console.log(userID);
        setSelectedUser(userID)
        setSelectedStatus(status)
        setSelectedFile(filePath);
        setSelectedEvent(eventID)
        setSelectedFirstName(first_name)
        setSelectedLastName(last_name)
        setOpenDialog(true);  // เปิด dialog เมื่อเลือกไฟล์
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);  // ปิด dialog
        setSelectedFile('');  // รีเซ็ตไฟล์ที่เลือก
        setSelectedEvent('')
    };

    useEffect(() => {
        // if (selectedFile) {
        //     console.log(`Selected file: ${selectedFile}`);
        // }
    }, [selectedFile]); // ทำงานเมื่อ selectedFile เปลี่ยนค่า

    return (
        <TableContainer component={Paper}>
            {(!rows || rows.length === 0) ? (
                // ถ้าไม่มีข้อมูล แสดงข้อความ "ยังไม่มีผู้สมัคร"
                <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Kanit, sans-serif' }}>
                    ยังไม่มีผู้สมัคร
                </div>
            ) : (
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ fontFamily: 'Kanit, sans-serif' }}>
                            {/* Render the table headers dynamically */}
                            {columns.map((column, index) => (
                                <TableCell sx={{ fontFamily: fontFamily.Kanit }} key={index} align="center">
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {columns.map((column, colIndex) => {
                                    const value = row[column.field]; // ค่าของเซลล์
                                    if (column.field === 'status') {
                                        return (
                                            <TableCell sx={{ fontFamily: fontFamily.Kanit }} key={colIndex} align="center">
                                                {value ? (
                                                    <span className="p-1 bg-green-500 rounded-md text-white">ผ่านกิจกรรม</span>
                                                ) : (
                                                    <span className="p-1 bg-red-500 rounded-md text-white">ไม่ผ่าน</span>
                                                )}
                                            </TableCell>
                                        );
                                    }

                                    if (column.field === 'file_pdf') {
                                        return (
                                            <TableCell sx={{ fontFamily: fontFamily.Kanit }} key={colIndex} align="center">
                                                {value && row['status'] === false ? (
                                                    <button
                                                        className="p-1 bg-[#f6df78] rounded-md text-black hover:underline"
                                                        onClick={() => handleSelectedFile(
                                                            row['file_pdf'],
                                                            row['event_id'],
                                                            row['user_id'],
                                                            row['status'],
                                                            row['first_name'],
                                                            row['last_name']
                                                        )}
                                                    >
                                                        ตรวจสอบไฟล์
                                                    </button>
                                                ) : row['status'] === true ? (

                                                    <button
                                                        className="p-1 bg-green-500 rounded-md text-white hover:underline"
                                                        onClick={() => handleSelectedFile(
                                                            row['file_pdf'],
                                                            row['event_id'],
                                                            row['user_id'],
                                                            row['status'],
                                                            row['first_name'],
                                                            row['last_name']
                                                        )}
                                                    >
                                                        ตรวจสอบแล้ว
                                                    </button>
                                                ) : (
                                                    <span className="p-1 bg-red-500 rounded-md text-white">ยังไม่ส่งเอกสาร</span>
                                                )}
                                            </TableCell>
                                        );
                                    }

                                    return (
                                        <TableCell sx={{ fontFamily: fontFamily.Kanit }} key={colIndex} align="center">
                                            {value ?? '-'}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
            }

            {
                openDialog && (
                    <ViewPDFdialog open={open} onClose={handleCloseDialog}
                        filePath={selectedFile}
                        userID={selectedUser}
                        eventID={selectedEvent}
                        firstName={selectedFirstName}
                        lastName={selectedLastName}
                        status={selectedStatus}
                    />
                )
            }
        </TableContainer >
    )
}
export default ViewTable;