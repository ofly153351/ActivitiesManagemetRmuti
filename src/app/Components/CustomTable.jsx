import React, { useState, useEffect } from 'react';
import BasicButtons from './BasicButtons';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Searchbox from './Searchbox';
import Pagination from './CustomPagination';
import Creatfaculty from './Creatfaculty';
import { usePathname } from 'next/navigation';

function CustomTable({ rows = [], columns = [], entity, onEdit, onDelete }) {
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false); // state สำหรับควบคุม Dialog
    const [tableRows, setTableRows] = useState(rows); // เก็บข้อมูลตารางใน state

    const rowsPerPage = 10;

    const path = usePathname();

    // ใช้ useEffect อัปเดตข้อมูลเมื่อ props rows มีการเปลี่ยนแปลง
    useEffect(() => {
        setTableRows(rows); // อัปเดต tableRows ตามข้อมูลที่ได้รับจาก props
    }, [rows]);

    const handleSearch = (e) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {
        setOpenCreateDialog(true); // เปิด Dialog
    };

    const handleCloseDialog = () => {
        setOpenCreateDialog(false); // ปิด Dialog
    };

    const handleSave = (newFaculty) => {

        setTableRows((prevRows) => {
            // เพิ่มข้อมูลใหม่เข้าไปใน tableRows โดยไม่ต้องรีเฟรชหน้า
            const updatedRows = [...prevRows, newFaculty];
            return updatedRows;
        });
        handleCloseDialog(); // ปิด Dialog หลังจากบันทึกข้อมูล
    };
    const filteredRows = tableRows.filter(row =>
        columns.some(column =>
            row[column.field]?.toString().toLowerCase().includes(inputValue.toLowerCase())
        )
    );


    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className='flex justify-end items-center gap-4 p-2'>
                <Searchbox
                    label={'รหัสคณะ,ชื่อคณะ'}
                    value={inputValue}
                    onChange={handleSearch}
                />
                <div>
                    <BasicButtons
                        label={`เพิ่ม${entity}`}
                        width={'64'}
                        onClick={handleClick} // กำหนดฟังก์ชันเปิด Dialog
                    />
                </div>
                {openCreateDialog && path === '/Admin/Facultylist' && (
                    <Creatfaculty
                        openDialog={openCreateDialog} // ส่ง prop openDialog
                        handleCloseDialog={handleCloseDialog} // ส่ง prop handleCloseDialog
                        onSave={handleSave} // ฟังก์ชันบันทึกข้อมูล
                    />
                )}
            </div>

            <div className="flex justify-center items-center w-full h-[full] rounded-b-md ">
                <table className="w-full rounded-2 border-[1px]  rounded-xl border-slate-200">
                    <thead className='w-fit p-4 bg-[#F5F5F5] shadow-t-xl rounded-xl'>
                        <tr className='font-kanit'>
                            {columns.map((item, index) => (
                                <th className='p-4 border-x-[1px] border-slate-200' key={index}>
                                    {item.headerName}
                                </th>
                            ))}
                            <th className='p-4 border-x-[1px] border-slate-200'>การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item, index) => (
                            <tr key={index}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className='p-2 border-x-[1px] 
                                    border-slate-100 hover:bg-[#f5f5f5] duration-50'>
                                        {item[column.field]}
                                    </td>
                                ))}
                                <td className='p-2 border-x-[1px] border-slate-200'>
                                    <div className='flex justify-center items-center gap-4 p-2'>
                                        <button onClick={() => onEdit(item)}>
                                            <EditIcon
                                                sx={{
                                                    color: '#32CD32',
                                                    "&:hover": { color: 'green' },
                                                }}
                                            />
                                        </button>
                                        <button onClick={() => onDelete(item)}>
                                            <DeleteIcon
                                                sx={{
                                                    color: '#FA8072',
                                                    "&:hover": { color: 'red' },
                                                }}
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-end items-center  bg-transparent '>
                <Pagination
                    totalPages={Math.ceil(filteredRows.length / rowsPerPage)}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default CustomTable;