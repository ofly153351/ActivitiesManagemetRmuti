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
import { SuccessAlert, ErrorAlert } from './AlertShow';
import { deleteEventByAdmin, deleteEventByTeacher, editStatusEvent, getBranches } from '../Utils/api';
import { useStore } from '@/store/useStore';
import AccordionBranchList from './AccordionBranch';
import SwitchOnOff from './SwitchOnOff';
import { Item } from '@radix-ui/react-select';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { button } from '@material-tailwind/react';
import { blue } from '@mui/material/colors';
import ShowDialogTable from './ShowDialogTable';
import Loading from './Loading';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadPopup from './Uploadpopup';
import { fontFamily } from '../Utils/font';


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
    const currentThaiYear = new Date().getFullYear() + 543;
    const [loading, setLoading] = useState(true);
    const [isUpload, setIsUpload] = useState(false);
    const [eventUploadName, setEventUploadName] = useState('')
    const [eventUploadID, setEventUploadID] = useState('')


    // ฟังก์ชันสำหรับเปลี่ยนสถานะของ Switch
    const handleStatusChange = async (itemId, field, newStatus) => {
        try {
            // เรียก API เพื่ออัพเดทสถานะ
            // console.log(itemId, field, newStatus);

            // สมมติว่า editStatusEvent ทำการอัพเดทสถานะให้ใน backend
            const response = await editStatusEvent(user.role, itemId, newStatus);

            if (response && response.status === 200) {
                // อัพเดท state ของ table data
                setTableRows((prevData) =>
                    prevData.map((item) =>
                        item.event_id === itemId // ตรวจสอบว่า event_id ตรงกับที่เราเลือก
                            ? { ...item, [field]: newStatus } // อัพเดท status
                            : item
                    )
                );
            }


        } catch (error) {
            console.error('Error updating status:', error);
            // อาจจะแสดง error message ให้ user ทราบ
        }
    };

    // console.log(tableRows);
    useEffect(() => {
        if (user.role) {
            setLoading(false);
        }

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
        // console.log(selectedEventId);

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


    const handleOpenUpload = (eventName, eventID) => {
        setEventUploadName(eventName)
        setEventUploadID(eventID)
        setIsUpload(true);

    };

    const handleCloseUpload = () => {
        setIsUpload(false);
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
        if (!selectedItem) return;

        // console.log("selectedItem", selectedItem);

        try {
            let response;
            if (user.role === 'admin') {
                response = await deleteEventByAdmin(selectedItem.event_id);
            } else if (user.role === 'teacher') {
                response = await deleteEventByTeacher(selectedItem.event_id);
            }

            if (response && response.status === 200) {
                // ลบข้อมูลจาก tableRows หลังจากลบสำเร็จ
                setTableRows(prevData =>
                    prevData.filter(item => item.event_id !== selectedItem.event_id)
                );
                setAlertMessage('ลบข้อมูลสำเร็จ');
                setAlertType('success');
                setAlertOpen(true);

                setTimeout(() => {
                    setAlertMessage('');
                    setAlertType('');
                    // ปิด Alert หลัง 3 วินาที
                }, 3000);
                setAlertOpen(false);
            }
        } catch (error) {
            console.error("❌ API Error:", error.response?.data || error.message);

            if (error.response?.status === 400) {
                setAlertMessage('การลบข้อมูลล้มเหลว เนื่องจากมีผู้อยู่ในกิจกรรมแล้ว');
                setAlertOpen(false);
                setTimeout(() => {
                    setAlertMessage('');

                }, 3000)
            } else {
                setAlertMessage('การลบข้อมูลล้มเหลว');
            }

            setAlertType('error');
            // setAlertOpen(true); // ✅ ให้ Alert แสดงขึ้น

            setTimeout(() => {
                setAlertOpen(false); // ✅ ปิด Alert หลัง 3 วินาที
            }, 3000);
        }
    };




    if (loading) {
        return (
            <div className=' flex justify-center items-center p-10 h-[500px]' >
                <Loading />
            </div>
        )

    }

    return (
        <div className='' >
            <div className=' flex justify-end items-center  gap-4 p-2 overflow-auto'>
                <div>
                    {pathName === '/Admin/EventList' ? (
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
                                <ToggleButton sx={{ fontFamily: 'Kanit, sans-serif', }} value="AllowedEvent">กิจกรรมที่ยังเปิดรับสมัคร</ToggleButton>
                                <ToggleButton sx={{ fontFamily: 'Kanit, sans-serif', }} value="CurrentEvent">กิจกรรมในช่วงเวลา</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    ) : null}
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

            <div className='flex justify-center items-center w-full h-[full] rounded-b-md overflow-auto'>
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
                            ) : user?.role !== 'student' ? (
                                <th className='p-4 border-x-[1px] border-slate-200'>การจัดการ</th>
                            ) : null}
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
                                                    {item[column.field] !== undefined ? (
                                                        <SwitchOnOff
                                                            status={item[column.field]}
                                                            onStatusChange={(itemId, newStatus) => handleStatusChange(item.event_id, column.field, newStatus)}
                                                            itemId={item.event_id}
                                                            disabled={pathName !== '/Admin/MyEvent'} // ✅ ล็อคปุ่มถ้าไม่ใช่ '/Admin/MyEvent'
                                                            pathName={pathName}
                                                        />
                                                    ) : null}
                                                </div>
                                            ) : column.field === 'userList' ? (
                                                <div className='flex justify-center items-center'>
                                                    <button onClick={() => handleOpenUserInEvent(item.event_id)}>
                                                        <RecentActorsIcon sx={{ fontSize: 35, color: blue[800] }} />
                                                    </button>
                                                    {viewUserInEvent && selectedEventId === item.event_id && (
                                                        <ShowDialogTable
                                                            isOpen={viewUserInEvent}
                                                            onClose={handleCloseUserInEvent}
                                                            id={selectedEventId} // Send event_id
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                column.valueGetter ? column.valueGetter({ data: item }) : item[column.field]
                                            )}
                                        </td>
                                    ))}

                                    {(pathName === '/Admin/EventList' || pathName === '/Admin/MyEvent') && (
                                        <td className='p-2 border-x-[1px] border-slate-200'>
                                            <div className='flex justify-center items-center gap-4 p-2'>
                                                <button onClick={() => handleViewDetails(item)}>
                                                    <PageviewIcon
                                                        sx={{
                                                            color: '#1976D2',
                                                            "&:hover": { color: '#1565c0' },
                                                        }}
                                                    />
                                                </button>

                                                {!(path === '/Admin/EventList' || path === '/Information/MyEvent') && (
                                                    <button onClick={() => onEdit(item)}>
                                                        <EditIcon
                                                            sx={{
                                                                color: '#32CD32',
                                                                "&:hover": { color: 'green' },
                                                            }}
                                                        />
                                                    </button>
                                                )}

                                                {!(path === '/Admin/EventList' || path === '/Information/MyEvent') && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedItem(item);
                                                            setAlertOpen(true);
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            sx={{
                                                                color: '#FA8072',
                                                                "&:hover": { color: 'red' },
                                                            }}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center p-4">ไม่มีข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-end items-center bg-transparent '>
                <div className='md:flex md:justify-center md:items-center xs:grid xs:justify-end xs:items-end ' >
                    <div className='flex xs:justify-end  items-center p-4 gap-2 md:w-full' >
                        <label htmlFor="" className='' >ข้อมูลที่แสดง</label>
                        <input
                            type="text"
                            value={rowsPerPage}
                            className='p-2 w-10 border-[1px] border-gray-200 rounded-md'
                            onChange={(e) => {
                                // Only update if the input is a valid number
                                setRowperpage(Number(e.target.value));

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
                        status={selectedItem.status}
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
                            {pathName === '/Admin/EventList' ? (
                                null
                            ) : (
                                <>
                                    <p className='text-[20px] px-4 py-1 flex gap-10' >ปีการศึกษาที่รับ: {selectedRowDetails.years.join(', ')}</p>
                                    <div className='text-[20px] px-4 py-1 flex gap-5'>
                                        <AccordionBranchList selectedRowDetails={selectedRowDetails} branches={branches} />
                                    </div>
                                </>

                            )}

                            <div className='px-4 py-1 flex gap-10 text-[20px]  ' >สถานะ: {selectedRowDetails.status ? (
                                <p className=' text-green-400 pl-2' >เปิด</p>
                            ) : (
                                <p className=' text-red-500 pl-2  ' >ปิด</p>

                            )}</div>
                        </div>
                    ) : (
                        <p>ไม่มีข้อมูล</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails} sx={{ fontFamily: fontFamily.Kanit, fontSize: 'large' }} color="primary">ปิด</Button>
                </DialogActions>
            </Dialog>
            {isUpload && (
                <UploadPopup eventID={eventUploadID} eventName={eventUploadName} isOpen={isUpload} onClose={handleCloseUpload} />
            )}
            {
                alertMessage && (
                    alertType === 'success' ? (
                        <div className='absolute bottom-2 right-4' >
                            <SuccessAlert label={alertMessage} />

                        </div>
                    ) : (
                        <div className='absolute bottom-4 right-4' >
                            <ErrorAlert label={alertMessage} />
                        </div>

                    )
                )
            }
        </div >
    );
}

export default CustomTable;