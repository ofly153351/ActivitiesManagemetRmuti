import React, { useEffect, useState } from 'react'
import { colorsCode } from '../Utils/color'
import CustomTextfield from './Textfield'
import BasicButtons from './BasicButtons'
import { deleteEventOutside, downloadFileEvents, unJoinEvent, uploadFileMyEvent, uploadFileMyEventOustide } from '../Utils/api'
import Loading from './Loading'
import { useRouter } from 'next/navigation'
import ViewPDFdialog from './ViewPDFdialog'
import { Input } from 'postcss'
import InputUploadfile from './InputUploadfile'
import { useStore } from '@/store/useStore'
import axios from 'axios'



function SelectedMyEvent({ selectedEvent, showAlert }) {
    const [loading, setLoading] = useState(true)
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const { user } = useStore()

    useEffect(() => {
        if (selectedEvent) {
            setLoading(false)
        }
    }, [selectedEvent]) // ✅ ใส่ dependency

    console.log(selectedEvent);


    const handleUpload = async () => {
        if (!file) {
            showAlert(false, "กรุณาเลือกไฟล์ PDF ก่อนอัปโหลด");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("event_id", selectedEvent.event_id); // ส่ง event_id ไปด้วย

        try {
            setUploading(true);

            if (!selectedEvent.intendent) {
                const res = await uploadFileMyEvent(selectedEvent.event_id, formData);
                if (res.status === 200) {
                    showAlert(true, 'อัปโหลดไฟล์สำเร็จ');
                    setFile(null);
                    setTimeout(() => {
                        showAlert(null, '');
                        router.push('/Information/MyEvent');
                    }, 1000);
                }
            } else {
                const res = await uploadFileMyEventOustide(selectedEvent.event_id, formData);
                if (res.status === 200) {
                    showAlert(true, 'อัปโหลดไฟล์สำเร็จ');
                    setFile(null);
                    setTimeout(() => {
                        showAlert(null, '');
                        router.push('/Information/MyEvent');
                    }, 1000);
                }
            }
        } catch (error) {
            console.log('Upload error:', error);

            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 403) {
                    showAlert(false, 'กรุณาอัปโหลดไฟล์ที่มีขนาดไม่เกิน 10 MB');
                } else if (status === 500) {
                    showAlert(false, 'กรุณาอัปโหลดไฟล์ที่มีนามสกุล .pdf');
                    setTimeout(() => {
                        showAlert(null, '');
                    }, 3000);
                } else if (status > 400 || 450) {
                    showAlert(false, 'กรุณาอัปโหลดไฟล์ที่มีขนาดไม่เกิน 10 MB');
                    setTimeout(() => {
                        showAlert(null, '');
                    }, 3000);
                }
            } else {
                showAlert(false, 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
                setTimeout(() => {
                    showAlert(null, '');
                }, 3000);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleCanclejoinEvent = async (eventID) => {
        if (eventID) {
            try {
                const response = await unJoinEvent(eventID)
                showAlert(true, 'ยกเลิกสำเร็จ')
                setTimeout(() => {
                    router.push('/Information/MyEvent')
                }, 1000);
                return response
            } catch (error) {
                console.error(error);
                showAlert(false, 'เกิดข้อผิดพลาดในการยกเลิก')
            }
        }
    }




    const [openDialog, setOpenDialog] = useState(false); // State สำหรับเปิด/ปิด dialog
    const [selectedEventId, setSelectedEventId] = useState('')
    const [selectedUserID, setSelectedUserID] = useState('')


    const handleOpenDialog = (eventID, userID) => {
        setOpenDialog(true); // เปิด dialog
        setSelectedEventId(eventID)
        setSelectedUserID(userID)
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // ปิด dialog
    };


    const handleDeleteMyeventOutside = async (eventID) => {
        if (eventID) {
            try {
                const response = await deleteEventOutside(eventID)
                showAlert(true, 'ลบข้อมูลสำเร็จ')
                setTimeout(() => {
                    router.push('/Information/MyEvent')
                }, 1000);

                return response
            } catch (error) {
                console.error(error);
                showAlert(false, 'เกิดข้อผิดพลาดในการลบข้อมูล')
            }
        }
    }


    if (loading) {
        return <Loading /> // ✅ แสดงข้อความตอนโหลด
    }


    console.log(selectedEvent.status, selectedEvent.comment, selectedEvent.file);



    return (
        <div className='drop-shadow-md rounded-xl mt-20 xs:mx-2 '
            style={{ backgroundColor: colorsCode.whiteSmoke }} >
            <div className='text-2xl p-4 gap-2' >
                <div className="w-full px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <p className="p-2 border-b-2 w-fit font-medium">ข้อมูลกิจกรรมที่ลงทะเบียน</p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end">
                        {selectedEvent.file && selectedEvent.intendent && (
                            <>
                                <BasicButtons
                                    label="ดาวน์โหลดเอกสาร"
                                    onClick={() => downloadFileEvents(Number(selectedEvent.event_id))}
                                />

                            </>
                        )}

                    </div>
                </div>
                <div className="xs:grid lg:flex py-2">
                    <div className='grid '>
                        <p className='text-sm px-2'>ชื่อกิจกรรม:</p>
                        <CustomTextfield label={selectedEvent?.event_name} disabled={true} />
                    </div>
                    <div className='grid '>
                        <p className='text-sm px-2'>สถานที่:</p>
                        <CustomTextfield label={selectedEvent?.location} disabled={true} />
                    </div>

                </div>
                <div className="xs:grid lg:flex py-2">
                    <div className='grid '>
                        <p className='text-sm px-2'>ปีการศึกษาที่รับ:</p>
                        <CustomTextfield label={selectedEvent?.school_year} disabled={true} />
                    </div>
                    <div className='grid '>
                        <p className='text-sm px-2'>วันที่เริ่ม:</p>
                        <CustomTextfield label={selectedEvent?.start_date} disabled={true} />
                    </div>
                </div>
                <div className="xs:grid lg:flex py-2">
                    <div className='grid '>
                        <p className='text-sm px-2'>เวลา:</p>
                        <CustomTextfield label={selectedEvent?.start_time} disabled={true} />
                    </div>
                    <div className='grid '>
                        <p className='text-sm px-2'>หน่วยกิจกรรม:</p>
                        <CustomTextfield label={selectedEvent?.working_hour} disabled={true} />
                    </div>
                </div>
                <div className='grid '>
                    {selectedEvent?.comment ? (
                        <div>
                            <p className='text-sm px-2'>ความคิดเห็น:</p>
                            <CustomTextfield width={'98%'} label={selectedEvent?.comment} disabled={true} />
                        </div>
                    ) : (
                        <div>
                            <p className='text-sm px-2'>ความคิดเห็น:</p>
                            <CustomTextfield placeholder={'ไม่มีความคิดเห็น'} width={'98%'} label={selectedEvent?.comment} disabled={true} />
                        </div>
                    )}
                </div>
                <div className=' xs:flex xs:justify-end items-center p-2 gap-2'>
                    {
                        !selectedEvent.file && !selectedEvent.status ? (
                            <div className='lg:flex lg:justify-end lg:items-center  gap-2'>
                                <div className="lg:flex w-full gap-2 justify-end xs:mt-2 lg:mt-0">
                                    <div className='xs:flex xs:mt-2 lg:mt-0 xs:justify-end xs:items-end gap-2 lg:mb-4' >
                                        {(!selectedEvent.intendent && selectedEvent.intendent !== undefined) && (
                                            <div className='flex justify-center items-center '>
                                                <BasicButtons color={'#e90000d9'} hover={"#E90000"} label={'ยกเลิกการเข้าร่วม'} onClick={() => handleCanclejoinEvent(selectedEvent.event_id)} />
                                            </div>
                                        )}
                                        <InputUploadfile onFileChange={setFile} />
                                        <div className="flex gap-2 justify-end items-center  ">
                                            {file ? (
                                                <div>
                                                    <BasicButtons label={'อัปโหลดเอกสาร'} onClick={handleUpload} />
                                                </div>
                                            ) : (
                                                <div>
                                                    <BasicButtons diasble={true} label={'อัปโหลดเอกสาร'} onClick={handleUpload} />
                                                </div>
                                            )}
                                        </div>
                                        <BasicButtons
                                            hover="#d32f2f"
                                            color="#e53935"
                                            label="ยกเลิกกิจกรรม"
                                            onClick={() => handleDeleteMyeventOutside(selectedEvent.event_id)}
                                        />
                                    </div>

                                </div>
                            </div>

                        ) : (selectedEvent.file && !selectedEvent.status && !selectedEvent.comment) ? (
                            <div className='xs:grid lg:flex justify-end items-center gap-2'>
                                <div className="flex gap-2 justify-end items-center xs:mt-2 md:mt-0">
                                    <BasicButtons
                                        hover="#f57c00"
                                        color="#fb8c00"
                                        label="เรียกดูเอกสารที่ส่งไป"
                                        onClick={() =>
                                            handleOpenDialog(selectedEvent.event_id, user.user_id)
                                        }
                                    />

                                    {selectedEvent.intendent && (
                                        <div className='flex justify-center items-center'>
                                            <p className='p-2.5 text-[14px] text-white bg-green-500 rounded-sm shadow-md w-full'>ส่งเอกสารแล้ว</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    {selectedEvent.file !== "" && selectedEvent.status === true ? (
                        <div className="flex gap-2 justify-end items-center xs:mt-2 md:mt-0">
                            <div className='flex justify-center items-center'>
                                <p className='p-2.5 text-[14px] text-white bg-green-500 rounded-sm shadow-md w-full'>ผ่านกิจกรรม</p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div >
            <ViewPDFdialog open={openDialog} eventID={selectedEventId} userID={selectedUserID} filePath={selectedEvent.file} onClose={handleCloseDialog} />
        </div >
    )
}

export default SelectedMyEvent