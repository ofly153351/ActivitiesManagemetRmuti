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
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { SuccessAlert, ErrorAlert } from './Alert';
import { deleteEventByAdmin, deleteEventByTeacher, editStatusEvent, getBranches } from '../Utils/api';
import { useStore } from '@/store/useStore';
import AccordionBranchList from './AccordionBranch';
import SwitchOnOff from './SwitchOnOff';
import { Item } from '@radix-ui/react-select';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { button } from '@material-tailwind/react';
import { blue } from '@mui/material/colors';
import ShowDialogTable from './ShowDialogTable';

function CustomTable({ rows = [], columns = [], entity, onEdit, onDelete, ToggleButtonState, alignment }) {
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [tableRows, setTableRows] = useState(rows);
    const [alertOpen, setAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [rowsPerPage, setRowperpage] = useState(10);
    const { branches, setBranches } = useStore()
    const path = usePathname();
    const pathName = usePathname()
    const { user } = useStore()
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [viewUserInEvent, setViewUserInEvent] = useState(false)
    const [selectedEventId, setSelectedEventId] = React.useState(null);
    // ฟังก์ชันสำหรับเปลี่ยนสถานะของ Switch
    const handleStatusChange = async (itemId, field, newStatus) => {
        try {
            // เรียก API เพื่ออัพเดทสถานะ
            console.log(itemId, field, newStatus);

            await editStatusEvent(user.role, itemId);

            // อัพเดท state ของ table data
            setTableData(prevData =>
                prevData.map(item =>
                    item.id === itemId
                        ? { ...item, [field]: newStatus }
                        : item
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
            // อาจจะแสดง error message ให้ user ทราบ
        }
    };

    useEffect(() => {
        if (pathName === '/Admin/EventList' && branches <= 0 || branches === null) {
            const fetchData = async () => {
                try {
                    const response = await getBranches()
                    setBranches(response.data)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        }
        setTableRows(rows);

    }, [rows]);

    const handleOpenUserInEvent = (eventId) => {

        setSelectedEventId(eventId); // เก็บ event_id ของแถวที่กด
        console.log(selectedEventId);

        setViewUserInEvent(true);   // เปิด Dialog
    };

    const handleCloseUserInEvent = () => {
        setSelectedEventId(null); // ล้างค่า event_id เมื่อปิด
        setViewUserInEvent(false); // ปิด Dialog
    };



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



    const filteredRows = (tableRows || []).filter((row) =>
        (columns || []).some((column) => {
            // เข้าถึงค่าของคอลัมน์โดยตรวจสอบว่าใช้ valueGetter หรือไม่
            const cellValue = column.valueGetter
                ? column.valueGetter({ data: row }) // ใช้ valueGetter หากมี
                : getValueFromPath(row, column.field); // เข้าถึงค่าโดยตรงหากไม่มี valueGetter

            return cellValue?.toString().toLowerCase().includes((inputValue || "").toLowerCase());
        })
    );
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

    // const handleDelete = () => {
    //     if (selectedItem) {
    //         // อัพเดท tableRows หลังจากลบ
    //         setTableRows((prevRows) => prevRows.filter((item) => item !== selectedItem));
    //         onDelete(selectedItem);  // เรียกฟังก์ชัน onDelete ที่ส่งมาเพื่อทำการลบข้อมูลจริงในที่อื่น

    //         setAlertOpen(false);
    //     }
    // };

    const handleAlertClose = () => {
        setAlertOpen(false);
        setSelectedItem(null);
    };

    const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
    const [selectedRowDetails, setSelectedRowDetails] = useState(null);

    const handleViewDetails = (row) => {
        setSelectedRowDetails(row); // เก็บข้อมูลของแถวที่เลือก
        setViewDetailsOpen(true); // เปิด Dialog
    };

    // const handleViewEditEvent = (row) => {
    //     setSelectedRowDetails(row)

    // }

    const handleCloseDetails = () => {
        setViewDetailsOpen(false); // ปิด Dialog
        setSelectedRowDetails(null); // ล้างข้อมูล
    };
    const handleDeleteItem = async () => {
        if (selectedItem) {
            try {
                // ลบข้อมูลจากฐานข้อมูล
                let response;
                if (user.role === 'admin') {
                    response = await deleteEventByAdmin(selectedItem.event_id);
                } else if (user.role === 'teacher') {
                    response = await deleteEventByTeacher(selectedItem.event_id);
                }

                if (response) {
                    setAlertMessage('ลบข้อมูลสำเร็จ');
                    setAlertType('success'); // ตั้ง alert เป็น success
                    setAlertOpen(false)
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
                setAlertMessage('การลบข้อมูลล้มเหลว');
                setAlertType('error'); // ตั้ง alert เป็น error
            }
        }
    };


    return (
        <div>
            <div className='flex justify-end items-center w-[100%] gap-4 p-2'>
                <div>
                    {pathName === '/Admin/EventList' && (
                        <div className='flex gap-2' >
                            <ToggleButtonGroup
                                sx={{ fontFamily: 'Kanit, sans-serif', }}
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={ToggleButtonState}
                                aria-label="Platform"
                            >
                                <ToggleButton sx={{ fontFamily: 'Kanit, sans-serif', }} value="allEvent">กิจกรรทั้งหมด</ToggleButton>
                                <ToggleButton sx={{ fontFamily: 'Kanit, sans-serif', }} value="AllowedEvent">กิจกรรมในช่วงเวลานี้</ToggleButton>
                                <ToggleButton sx={{ fontFamily: 'Kanit, sans-serif', }} value="CurrentEvent">กิจกรรมที่ยังเปิดรับสมัคร</ToggleButton>
                            </ToggleButtonGroup>
                        </div>

                    )}
                </div>
                <Searchbox label={'รหัส,ชื่อ'} value={inputValue} onChange={handleSearch} />
                <div>
                    {pathName === '/Admin/Userlist' || 'Admin/TeacherList' ? (
                        null
                    ) : (
                        <BasicButtons
                            label={`เพิ่ม${entity}`}
                            width={'64'}
                            onClick={handleClick}
                        />
                    )}
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
                            {pathName === '/Admin/EventList' ? (
                                <th className='p-4 border-x-[1px] border-slate-200'>เรียกดู</th>
                            ) : (
                                <th className='p-4 border-x-[1px] border-slate-200'>การจัดการ</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 ? (
                            currentRows.map((item, index) => (
                                <tr key={index}>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className='p-2 border-x-[1px] border-slate-100 hover:bg-[#f5f5f5] duration-50'>
                                            {column.field === 'status' ? (
                                                <div className="flex justify-center">
                                                    {pathName === '/Admin/MyEvent' ? (
                                                        // ถ้าอยู่ใน path '/Admin/MyEvent' ให้แสดงปกติ
                                                        item[column.field] !== undefined ? (
                                                            <SwitchOnOff
                                                                status={item[column.field]}
                                                                onStatusChange={(itemId, newStatus) => handleStatusChange(item.event_id, column.field, newStatus)}
                                                                itemId={item.event_id}
                                                                pathName={pathName}
                                                            />
                                                        ) : null
                                                    ) : (
                                                        // ถ้าไม่ใช่ '/Admin/MyEvent' ให้ทำให้ปุ่มล็อค (disabled)
                                                        item[column.field] !== undefined ? (
                                                            <SwitchOnOff
                                                                status={item[column.field]}
                                                                onStatusChange={(itemId, newStatus) => handleStatusChange(item.event_id, column.field, newStatus)}
                                                                itemId={item.event_id}
                                                                disabled={true} // ทำให้ปุ่มล็อค
                                                                pathName={pathName}

                                                            />
                                                        ) : null
                                                    )}
                                                </div>
                                            ) : (
                                                column.valueGetter ? column.valueGetter({ data: item }) : item[column.field]
                                            )}
                                            {column.field === 'userList' && (
                                                <div className='flex justify-center items-center' >
                                                    <button onClick={(e) => handleOpenUserInEvent(item.event_id)} ><RecentActorsIcon sx={{ fontSize: 35, color: blue[800] }} /></button>
                                                    {viewUserInEvent && (
                                                        <ShowDialogTable
                                                            isOpen={viewUserInEvent}
                                                            onClose={handleCloseUserInEvent}
                                                            id={selectedEventId} // Send event_id
                                                        />
                                                    )}
                                                </div>

                                            )}
                                        </td>
                                    ))}
                                    <td className='p-2 border-x-[1px] border-slate-200'>
                                        <div className='flex justify-center items-center gap-4 p-2'>
                                            {(pathName === '/Admin/EventList' || pathName === '/Admin/MyEvent') && (
                                                <div>
                                                    <button onClick={() => handleViewDetails(item)
                                                    }>
                                                        <PageviewIcon
                                                            sx={{
                                                                color: '#1976D2',
                                                                "&:hover": { color: '#1565c0' },
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => onEdit(item)}
                                                style={{ display: path === '/Admin/EventList' ? 'none' : 'block' }}
                                            >
                                                <EditIcon
                                                    sx={{
                                                        color: '#32CD32',
                                                        "&:hover": { color: 'green' },
                                                    }}
                                                />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedItem(item); // Set the item to be deleted
                                                    setAlertOpen(true); // Open the alert confirmation
                                                }}
                                                className={path === '/Admin/EventList' ? 'hidden' : 'block'} // Hide the button in EventList path
                                            >
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

            {
                selectedItem && (
                    <AlertDelete
                        isOpen={alertOpen}
                        onClose={handleAlertClose}
                        onAgree={handleDeleteItem}
                        label={`ต้องการยืนยันการลบหรือไม่${pathName === '/Admin/MyEvent'
                            ? `กิจกรรม ${selectedItem?.[columns[0].field]}`
                            : selectedItem?.[columns[1].field]
                            } ?`}

                    />
                )
            }


            <Dialog sx={{}} open={viewDetailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
                <DialogTitle
                    sx={{
                        fontSize: '240px', // ขนาดฟอนต์เป็น 32px (ตัวอย่าง)
                        textAlign: 'center', // จัดให้อยู่กลาง
                        fontWeight: 'bold', // ตัวหนา
                        color: 'primary.main', // ใช้สีหลักของธีม
                    }}
                >
                    <p className='text-[40px]' >
                        ข้อมูลเพิ่มเติม
                    </p>
                </DialogTitle>
                <DialogContent>
                    {selectedRowDetails ? (
                        <div className='grid justify-center items-center' >
                            <div className=' justify-around text-[20px] px-4 py-2 flex gap-10' >
                                <p>ชื่ออกิจกรรม: {selectedRowDetails.event_name}</p>
                                <p>วันที่เริ่ม: {selectedRowDetails.start_date}</p>

                            </div>
                            <div className=' text-[20px] px-4 py-1 flex gap-10' >
                                <p>เวลา: {selectedRowDetails.start_time}</p>
                                <p>จำนวน: {selectedRowDetails.free_space} / {selectedRowDetails.limit}</p>

                            </div>
                            <div className=' text-[20px] px-4 py-1 flex gap-10' >
                                <p>สถานที่: {selectedRowDetails.location}</p>
                            </div>
                            <p className='text-[20px] px-4 py-1 flex gap-10' >รายละเอียด: {selectedRowDetails.detail}</p>

                            <p className='text-[20px] px-4 py-1 flex gap-10' >ปีการศึกษาที่รับ: {selectedRowDetails.years.join(', ')}</p>
                            <div className='text-[20px] px-4 py-1 flex gap-5'>
                                <AccordionBranchList selectedRowDetails={selectedRowDetails} branches={branches} />
                            </div>
                            <div className='px-4 py-1 flex gap-10 text-[20px] ' >สถานะ: {selectedRowDetails.status ? (
                                <p className=' text-green-400 pl-2' >เปิด</p>
                            ) : (
                                <p className=' text-red-500 pl-2' >ปิด</p>

                            )}</div>
                        </div>
                    ) : (
                        <p>ไม่มีข้อมูล</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails} color="primary">ปิด</Button>
                </DialogActions>
            </Dialog>

            {
                alertMessage && (
                    alertType === 'success' ? (
                        <div className='absolute bottom-2 right-4' >
                            <SuccessAlert label={alertMessage} />

                        </div>
                    ) : (
                        <div className='absolute bottom-4 left-4' >
                            <ErrorAlert label={alertMessage} />
                        </div>

                    )
                )
            }
        </div >
    );
}

export default CustomTable;