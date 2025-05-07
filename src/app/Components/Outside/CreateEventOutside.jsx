import React, { useState } from 'react';
import CustomDialog from '../CustomDialog';
import dayjs from 'dayjs';
import { CreateEventsOutSide } from '@/app/Utils/api';
import { ErrorAlert, SuccessAlert } from '../AlertShow';
import { useRouter } from 'next/navigation';



function CreateEventOutside({ isOpen, isClose }) {
    const router = useRouter()
    const [closeDialog, setCloseDialog] = useState(null);
    const [eventName, setEventname] = useState('');
    const [intendent, setIntendent] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [workingHour, setWorkingHour] = useState('');
    const [location, setLocation] = useState('');
    const [selectStudyYear, setSelectStudyYear] = useState('')
    const [errors, setErrors] = useState({
        eventName: '',
        intendent: '',
        selectTime: '',
        workingHour: '',
        location: '',
        selectedDate: '',
        selectStudyYear: ''
    });
    const [isAlert, setIsAlert] = useState({ status: null, message: '' })

    const handleCloseDialog = (value) => {
        setCloseDialog(value);
        isClose(value);
    };

    const handleChangerEventName = (e) => {
        setEventname(e.target.value);
    };

    const handleChangeIntendent = (e) => {
        setIntendent(e.target.value);
    };

    const handleTimeChange = (time) => {
        setSelectTime(time);
    };

    const handleChangeWorkingHour = (e) => {
        const rawValue = e.target.value;
        const numericValue = rawValue.replace(/[^0-9]/g, ''); // กรองให้เหลือแต่ตัวเลข

        if (!numericValue) {
            setWorkingHour(''); // เคลียร์เมื่อไม่มีอะไรกรอก
        } else {
            const value = Number(numericValue);
            const clamped = Math.min(value, 7); // จำกัดไม่ให้เกิน 7
            setWorkingHour(clamped);
        }
    };

    const handleChangeLoaction = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = () => {
        // Assuming `selectedDate` is managed properly
        const combineDateTime = formattedDate + " " + selectTime;


        // การตรวจสอบข้อผิดพลาด
        let hasError = false;
        const newErrors = { ...errors };

        // ตรวจสอบว่า eventName ถูกกรอกหรือไม่
        if (eventName.trim() === "") {
            newErrors.eventName = "กรุณากรอกชื่อกิจกรรม";
            hasError = true;
        } else {
            newErrors.eventName = "";
        }

        // ตรวจสอบ workingHour ว่าไม่เกิน 24 ชั่วโมง
        if (workingHour < 1 || workingHour > 24) {
            newErrors.workingHour = "กรุณากรอกชั่วโมงกิจกรรมระหว่าง 1 ถึง 24";
            hasError = true;
        } else {
            newErrors.workingHour = "";
        }

        // ตรวจสอบ location
        if (location.trim() === "") {
            newErrors.location = "กรุณากรอกสถานที่";
            hasError = true;
        } else {
            newErrors.location = "";
        }

        const currentDate = dayjs().format('YYYY-MM-DD')
        console.log(currentDate);
        console.log(formattedDate);

        const checkFormattedDate = dayjs(formattedDate)

        if (checkFormattedDate.isBefore(dayjs(currentDate))) { // ใช้ dayjs(currentDate) เพื่อแปลงเป็น dayjs object
            newErrors.selectedDate = "กรุณากรอกวันที่ในอนาคต";
            hasError = true;
        } else {
            newErrors.selectedDate = "";
        }


        // ตรวจสอบ intendent
        if (intendent.trim() === "") {
            newErrors.intendent = "กรุณากรอกผู้ดูแลกิจกรรม";
            hasError = true;
        } else {
            newErrors.intendent = "";
        }

        if (!selectTime) {
            newErrors.selectTime = "กรุณากรอกเวลา"
            hasError = true;
        } else {
            newErrors.selectTime = "";

        }

        if (!selectStudyYear) {
            newErrors.selectStudyYear = "กรุณากรอกปีการศึกษา"
        }


        // ถ้ามีข้อผิดพลาดจะตั้งค่า errors และไม่ส่งข้อมูล
        if (hasError) {
            setErrors(newErrors);
            return;
        }

        console.log(selectStudyYear);

        // ถ้าทุกอย่างถูกต้อง, สร้าง payload
        const payload = {
            event_name: eventName,
            location: location,
            working_hour: workingHour,
            start_date: combineDateTime,
            intendent: intendent,
            school_year: selectStudyYear,
        };

        console.log(payload);

        if (payload) {
            try {
                const fetchData = async () => {
                    const response = await CreateEventsOutSide(payload)
                    setErrors({
                        eventName: '',
                        intendent: '',
                        selectTime: '',
                        workingHour: '',
                        location: '',
                        selectedDate: '',
                    })
                    if (response.status === 200) {
                        setIsAlert({ status: true, message: "สร้างกิจกรรมสำเร็จ" });
                        router.push('/Information/MyEvent')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    }
                    return response
                }
                fetchData();
            } catch (error) {
                console.error(error);
                setIsAlert({ status: false, message: "ไม่สามารถสร้างกิจกรรมได้" });
            }

        }
        // ส่ง payload ไปยัง API หรือประมวลผลตามต้องการ
    };



    const date = new Date();
    const year = date.getFullYear()
    let currentYears = year + 543

    const studyYear = [
        { label: currentYears + 1, value: currentYears + 1 },
        { label: currentYears, value: currentYears },
        { label: currentYears - 1, value: currentYears - 1 },
    ]

    const handleSelectStudyYear = (event) => {
        console.log("เลือกปีการศึกษา:", event);
        setSelectStudyYear(event);
    };

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const formattedDate = selectedDate.format('YYYY-MM-DD');


    const data = [
        { label: "ชื่อกิจกรรม", function: handleChangerEventName, value: eventName, error: errors.eventName },
        { label: "สถานที่", function: handleChangeLoaction, value: location, error: errors.location },
        { label: 'ชั่วโมงกิจกรรม', function: handleChangeWorkingHour, value: workingHour, error: errors.workingHour },
        { label: 'ผู้ดูแลกิจกรรม', function: handleChangeIntendent, value: intendent, error: errors.intendent },
        { label: 'วันที่เริ่มกิจกรรม', function: setSelectedDate, value: selectedDate, error: errors.selectedDate },
        { label: 'เวลา', function: handleTimeChange, value: selectTime, error: errors.selectTime },
        { label: 'ปีการศึกษา', options: studyYear, function: handleSelectStudyYear, value: selectStudyYear, error: errors.selectStudyYear }
    ];

    console.log(selectStudyYear);


    return (
        <>
            <CustomDialog
                title="แบบฟอร์มกิจกรรม"
                isOpen={isOpen}
                isClose={handleCloseDialog}
                data={data}
                handleTimeChange={handleTimeChange}
                onClick={handleSubmit}
                isAlert={isAlert}
            />
            {isAlert.status !== null && isAlert.status === true ? (
                <div className='fixed xs:bottom-2 xs:right-2 lg:bottom-4 lg:right-4 z-20 ' >
                    <SuccessAlert label={isAlert.message} />
                </div>
            ) : (isAlert.status !== null && isAlert.status === false) ? (
                <div className='fixed xs:bottom-2 xs:right-2 lg:bottom-4 lg:right-4 z-20 ' >
                    <ErrorAlert label={isAlert.message} />
                </div>
            ) : null}
        </>

    );
}

export default CreateEventOutside;