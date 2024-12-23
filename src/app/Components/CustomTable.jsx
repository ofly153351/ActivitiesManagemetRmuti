import React, { useState, useEffect } from 'react';
import BasicButtons from './BasicButtons';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Searchbox from './Searchbox';
import Pagination from './CustomPagination';
import Creatfaculty from './Createfaculty';
import { usePathname } from 'next/navigation';
import AlertDelete from './AlertDelete';
import CreatBranch from './CreateBranch';

function CustomTable({ rows = [], columns = [], entity, onEdit, onDelete }) {
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [tableRows, setTableRows] = useState(rows);
    const [alertOpen, setAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [rowsPerPage, setRowperpage] = useState(10);
    const path = usePathname();

    useEffect(() => {
        setTableRows(rows);
    }, [rows]);

    const handleSearch = (e) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenCreateDialog(false);
    };

    const handleSave = (newFaculty) => {
        setTableRows((prevRows) => [...prevRows, newFaculty]);
        handleCloseDialog();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // ฟังก์ชันช่วยสำหรับเข้าถึงค่าจาก path ซ้อนลึก
    const getValueFromPath = (obj, path) => {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
    };

    const filteredRows = tableRows.filter((row) =>
        columns.some((column) => {
            // เข้าถึงค่าของคอลัมน์โดยตรวจสอบว่าใช้ valueGetter หรือไม่
            const cellValue = column.valueGetter
                ? column.valueGetter({ data: row }) // ใช้ valueGetter หากมี
                : getValueFromPath(row, column.field); // เข้าถึงค่าโดยตรงหากไม่มี valueGetter

            return cellValue?.toString().toLowerCase().includes(inputValue.toLowerCase());
        })
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

    const handleDelete = () => {
        if (selectedItem) {
            // อัพเดท tableRows หลังจากลบ
            setTableRows((prevRows) => prevRows.filter((item) => item !== selectedItem));
            onDelete(selectedItem);  // เรียกฟังก์ชัน onDelete ที่ส่งมาเพื่อทำการลบข้อมูลจริงในที่อื่น
            
            setAlertOpen(false);
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <div className='flex justify-end items-center gap-4 p-2'>
                <Searchbox label={'รหัส,ชื่อ'} value={inputValue} onChange={handleSearch} />
                <div>
                    <BasicButtons
                        label={`เพิ่ม${entity}`}
                        width={'64'}
                        onClick={handleClick}
                    />
                </div>
                {openCreateDialog && path === '/Admin/Facultylist' ? (
                    <Creatfaculty
                        openDialog={openCreateDialog}
                        handleCloseDialog={handleCloseDialog}
                        onSave={handleSave}
                    />
                ) : openCreateDialog && path === '/Admin/Branchlist' ? (
                    <CreatBranch
                        openDialog={openCreateDialog}
                        handleCloseDialog={handleCloseDialog}
                    />
                ) : null}
            </div>

            <div className='flex justify-center items-center w-full h-[full] rounded-b-md'>
                <table className='w-full rounded-2 border-[1px] rounded-xl border-slate-200'>
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
                        {currentRows.length > 0 ? (
                            currentRows.map((item, index) => (
                                <tr key={index}>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className='p-2 border-x-[1px] border-slate-100 hover:bg-[#f5f5f5] duration-50'>
                                            {column.valueGetter ? column.valueGetter({ data: item }) : item[column.field]}
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
                                            <button onClick={() => {
                                                setSelectedItem(item); // Set the item to be deleted
                                                setAlertOpen(true); // Open the alert confirmation
                                            }}>
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className='text-center p-4'>
                                    ไม่มีข้อมูล
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-end items-center bg-transparent'>
                <div className='flex justify-center items-center ' >
                    <div className='flex justify-end items-center w-52 gap-2' >
                        <label htmlFor="" className='' >ข้อมูลที่แสดง</label>
                        <input
                            type="text"
                            value={rowsPerPage}
                            className='p-2 w-10 border-[1px] border-gray-200 rounded-md'
                            onChange={(e) => {
                                // Only update if the input is a valid number
                                if (!isNaN(e.target.value) && e.target.value.trim() !== '') {
                                    setRowperpage(Number(e.target.value));
                                }
                            }}
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                    </div>
                    <Pagination
                        totalPages={Math.ceil(filteredRows.length / rowsPerPage)}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {selectedItem && (
                <AlertDelete
                    isOpen={alertOpen}
                    onClose={handleAlertClose}
                    onAgree={handleDelete}
                    label={`ต้องการยืนยันการลบ ${selectedItem?.[columns[1].field]} ?`}
                />
            )}
        </div>
    );
}

export default CustomTable;