import React, { useEffect, useState } from 'react'
import { colorsCode } from '../Utils/color'
import CustomTextfield from './Textfield'
import BasicButtons from './BasicButtons'
import { deleteEventOutside, downloadFileEvents, unJoinEvent, uploadFileMyEvent, uploadFileMyEventOustide } from '../Utils/api'
import Loading from './Loading'
import { useRouter } from 'next/navigation'
import ViewPDFdialog from './ViewPDFdialog'



function SelectedMyEvent({ selectedEvent, showAlert }) {
    const [loading, setLoading] = useState(true)
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter()


    useEffect(() => {
        if (selectedEvent) {
            setLoading(false)
        }
    }, [selectedEvent]) // ✅ ใส่ dependency


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
                const response = await uploadFileMyEvent(selectedEvent.event_id, formData)
                console.log(response);
            } else if (selectedEvent.intendent) {
                const response = await uploadFileMyEventOustide(selectedEvent.event_id, formData)
                console.log(response);
            }
            setFile(null);
            showAlert(true, 'อัพโหลดไฟล์สำเร็จ')
            setTimeout(() => {
                showAlert(false, '')
                router.push('/Information/MyEvent')

            }, 1000)
        } catch (error) {
            console.error("Upload error:", error);
            showAlert(false, 'เกิดข้อผิดพลาดในการอัพโหลด')

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

    const handleOpenDialog = () => {
        setOpenDialog(true); // เปิด dialog
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



    return (
        <div className='drop-shadow-md rounded-xl mt-20 xs:mx-2 '
            style={{ backgroundColor: colorsCode.whiteSmoke }} >
            <div className='text-2xl p-4 gap-2' >
                <p className='p-2 border-b-[2px] w-fit'>ข้อมูลกิจกรรมที่ลงทะเบียน</p>
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
                    ) : (selectedEvent?.intendent) ? (
                        <div className='mx-2 flex justify-between items-center' >
                            < button className='underline text-lg text-green-800' label={"ดาวน์โหลดเอกสาร"} onClick={(e) => downloadFileEvents(Number(selectedEvent.event_id))}>
                                ดาวน์โหลดเอกสาร
                            </button>
                            {selectedEvent.file && (
                                < button className='underline text-lg text-green-800' label={"ดาวน์โหลดเอกสาร"} onClick={handleOpenDialog}>
                                    เรียกดูเอกสารที่ส่งไป
                                </button>
                            )}
                            < button className='underline text-lg text-red-800' label={"ดาวน์โหลดเอกสาร"} onClick={(e) => handleDeleteMyeventOutside(selectedEvent.event_id)} >
                                ลบข้อมูลกิจกกรม
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className='text-sm px-2'>ความคิดเห็น:</p>
                            <CustomTextfield placeholder={'ไม่มีความคิดเห็น'} width={'98%'} label={selectedEvent?.comment} disabled={true} />
                        </div>
                    )}
                </div>
                <div className=' lg:flex lg:justify-end items-center p-2'>
                    {
                        !selectedEvent.file && !selectedEvent.status ? (
                            <div className=' lg:flex lg:justify-end lg:items-center  gap-2'>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFile(e.target.files[0])} // ✅ บันทึกไฟล์ที่เลือก
                                    className=" border p-2 rounded-md border-none xs:w-[312px] w-[400px]"
                                />
                                <div className="lg:flex w-full gap-2 justify-end xs:mt-2 lg:mt-0">
                                    <div>
                                        <p className='p-2.5 xs:text-center lg:text-wrap text-white bg-[#e90000d9] rounded-sm shadow-md'>ยังไม่ส่งเอกสาร</p>
                                    </div>
                                    <div className='xs:flex xs:mt-2 lg:mt-0 xs:justify-end xs:items-end gap-2 lg:mb-4' >
                                        {!selectedEvent.intendent && (
                                            <div className='flex justify-center items-center '>
                                                <BasicButtons color={'#e90000d9'} hover={"#E90000"} label={'ยกเลิกการเข้าร่วม'} onClick={() => handleCanclejoinEvent(selectedEvent.event_id)} />
                                            </div>
                                        )}
                                        <div className='flex justify-center items-center' >
                                            <BasicButtons label={'อัพโหลดเอกสาร'} onClick={handleUpload} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        ) : (selectedEvent.intendent && selectedEvent.file) ? (
                            <div className='xs:grid lg:flex justify-end items-center gap-2'>
                                <div className="flex gap-2 justify-end items-center xs:mt-2 md:mt-0">
                                    <div className='flex justify-center items-center'>
                                        <p className='p-2.5 text-white bg-green-500 rounded-sm shadow-md w-full'>ส่งเอกสารแล้ว</p>
                                    </div>
                                </div>
                            </div>
                        ) : selectedEvent.file && !selectedEvent.status && !selectedEvent.comment ? (
                            <div className='xs:grid lg:flex justify-end items-center gap-2'>
                                <div className="flex gap-2 justify-end items-center xs:mt-2 md:mt-0">
                                    <div className='flex justify-center items-center'>
                                        <p className='p-2.5 text-white bg-yellow-500 rounded-sm shadow-md w-full'>รอตรวจสอบ</p>
                                    </div>
                                </div>
                            </div>
                        ) : selectedEvent.file && !selectedEvent.status && selectedEvent.comment ? (
                            <div className='xs:grid lg:flex justify-end items-center gap-2'>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFile(e.target.files[0])} // ✅ บันทึกไฟล์ที่เลือก
                                    className="border p-1 rounded-md xs:w-[312px] sm:w-[390px]"
                                />
                                <div className="flex gap-2 justify-end items-center xs:mt-2 md:mt-0 ">

                                    <div>
                                        <BasicButtons label={'อัพโหลดเอกสาร'} onClick={handleUpload} />
                                    </div>
                                </div>

                            </div>
                        ) : null}
                    {selectedEvent.file !== "" && selectedEvent.status == true ? (
                        <div className="flex gap-2 justify-end items-center xs:mt-2 md:mt-0">
                            <div className='flex justify-center items-center'>
                                <p className='p-2.5 text-white bg-green-500 rounded-sm shadow-md w-full'>ผ่านกิจกรรม</p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div >
            <ViewPDFdialog open={openDialog} filePath={selectedEvent.file} onClose={handleCloseDialog} />
        </div >
    )
}

export default SelectedMyEvent