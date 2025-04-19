import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Kanit } from 'next/font/google';

export default function BasicTable({ column, insideEvents, outsideEvent, showViewPDF }) {

    console.log(outsideEvent);

    const totalOutsideWorkingHour = outsideEvent.reduce((sum, item) => sum + item.working_hour, 0);
    const totalInsideWorkingHour = insideEvents.reduce((sum, item) => sum + item.working_hour, 0);

    return (
        <TableContainer sx={{ fontFamily: 'kanit ', }} component={Paper}>
            <div className="flex justify-between items-center w-full">
                <div className="text-lg p-2 border-t border-[#e0e0e0] w-full">
                    กิจกรรมภายในมหาวิทยาลัย
                </div>
                <div className="text-lg p-2 border-t border-[#e0e0e0] px-4 w-full text-right">
                    รวมชั่วโมงกิจกรรม : {totalInsideWorkingHour}
                </div>
            </div>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {column.map((item, index) => (
                            <TableCell key={index} align="center" sx={{ fontFamily: 'kanit ', borderTop: 1, borderColor: '#e0e0e0' }} >{item.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {insideEvents && insideEvents.length > 0 ? (
                        insideEvents.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontFamily: 'kanit ' }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {item.event_name}
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'kanit ', }} align="center">{item.location}</TableCell>
                                <TableCell sx={{ fontFamily: 'kanit ', }} align="center">{item.working_hour}</TableCell>
                                <TableCell sx={{ fontFamily: 'kanit ', }} align="center">{item.status ? <p className='text-green-500' >ผ่าน</p> : <p className='text-red-500' >ไม่ผ่าน</p>}</TableCell>
                                <TableCell align="center" onClick={(e) => showViewPDF(item.file)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: '#1976d2',
                                        },
                                        fontFamily: 'kanit ',
                                    }} >{item?.file ? <p>เรียกดูเอกสาร</p> : <p>ไม่พบเอกสาร</p>}</TableCell>

                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell align="center" sx={{ fontFamily: 'kanit ', }} colSpan={column.length}>
                                ไม่พบข้อมูลกิจกรรม
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center w-full">
                <div className="text-lg p-2 border-t border-[#e0e0e0] w-full">
                    กิจกรรมภายในมหาวิทยาลัย
                </div>
                <div className="text-lg p-2 border-t border-[#e0e0e0] px-4 w-full text-right">
                    รวมชั่วโมงกิจกรรม : {totalOutsideWorkingHour}
                </div>
            </div>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {column.map((item, index) =>
                            item.value === 'status' ? null : (
                                <TableCell
                                    key={index}
                                    align="center"
                                    sx={{
                                        fontFamily: 'Kanit',
                                        borderTop: 1,
                                        borderColor: '#e0e0e0'
                                    }}
                                >
                                    {item.label}
                                </TableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {outsideEvent && outsideEvent.length > 0 ? (
                        outsideEvent.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontFamily: 'kanit ' }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {item.event_name}
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'kanit ', }} align="center">{item.location}</TableCell>
                                <TableCell sx={{ fontFamily: 'kanit ', }} align="center">{item.working_hour}</TableCell>
                                <TableCell align="center" onClick={(e) => showViewPDF(item.file)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: '#1976d2',
                                        },
                                        fontFamily: 'kanit ',
                                    }} >{item?.file ? <p>เรียกดูเอกสาร</p> : <p>ไม่พบเอกสาร</p>}</TableCell>

                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell align="center" sx={{ fontFamily: 'kanit ' }} colSpan={column.length}>
                                ไม่พบข้อมูลกิจกรรม
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    );
}