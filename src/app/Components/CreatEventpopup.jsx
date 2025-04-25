import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import TransferList from './Tranferlist';
import Customselect from './Customselect';
import { useStore } from '@/store/useStore';
import BasicButtons from './BasicButtons';
import { CreateEvent, getBranches, getFaculties } from '../Utils/api';
import CheckboxButtonLabel from './CheckbokButton';
import width from '../Utils/textfieldWidth';
import { ErrorAlert, SuccessAlert } from './AlertShow';


function CreatEventpopup({ openDialog, handleCloseDialog, facultiesList = [], branchesList = [] }) {
    const theme = useTheme();
    // const { facultiesList, setBranchesList, setFacultiesList } = useStore()
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));  // Desktop
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // iPad
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // iPhone
    const [eventName, setEventname] = useState('');
    const [location, setLocation] = useState('')
    const [selectedTime, setSelectedTime] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [space, setSpace] = useState('')
    const [hour, setHour] = useState('')
    const [detail, setDetail] = useState('')
    const [selectedFaculty, setSelectedFaculty] = useState('')

    const [filteredBranch, setFilteredBranches] = useState([])
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    // const { branchesList, setbranchesList } = useStore()
    const [faculty, setFacultyID] = useState('')
    const [branches, setBranches] = useState([])
    const { user } = useStore();
    const [selectedSchoolYear, setSelectedSchoolYear] = useState('')
    const [errorsMessage, setErrorsMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const years = [
        { fild: 'ปี 1', value: 1 },
        { fild: 'ปี 2', value: 2 },
        { fild: 'ปี 3', value: 3 },
        { fild: 'ปี 4', value: 4 },
    ]


    const handleRightListChange = (newRight) => {
        setSelectedBranches(newRight);
    };

    const d = new Date();
    const n = d.getFullYear();

    const schoolYears = [
        { label: `${n + 543 + 1}`, value: n + 543 + 1 },
        { label: `${n + 543}`, value: n + 543 },
        { label: `${n + 543 - 1}`, value: n + 543 - 1 },
    ];


    // console.log(selectedBranches.map(branch => branch.branch_id));

    const handleOnchange = (e, field) => {

        switch (field) {
            case 'eventName':
                const eventName = e.target.value
                setEventname(eventName)
                break;
            case 'location':
                const location = e.target.value
                setLocation(location)
                break;
            case 'detail':
                const detail = e.target.value
                setDetail(detail)
            default:
                break;
        }

    }


    const handleSelectedFaculty = (value) => {
        // console.log("selectedFaculty", selectedFaculty);

        const selectedFaculty = facultiesList.find(f => f.faculty_name === value);
        setSelectedFaculty(value);
        setFacultyID(selectedFaculty?.faculty_id || '');
        setFilteredBranches(
            branchesList.filter(branch => branch.faculty.faculty_id === selectedFaculty?.faculty_id)
        );
    };

    const handleOnchangeDate = (key, newValue) => {
        if (newValue) {
            const formattedDate = newValue.format('DD-MM-YYYY'); // เอาแค่วันที่
            console.log(`${key}:`, formattedDate);
            setSelectedDate(newValue);
        }
    };

    // ฟังก์ชันจัดการเวลา
    const handleOnchangeTime = (newValue) => {
        if (newValue) {
            // แก้ไขให้ seconds เป็น 00
            const formattedTime = newValue.set('second', 0).format('HH:mm:ss'); // ตั้งค่า second ให้เป็น 00
            console.log("Selected Time:", formattedTime); // แสดงผลใน console
            setSelectedTime(newValue.set('second', 0)); // ตั้งค่า seconds เป็น 00 ใน state
        }
    };

    const clear = () => {
        setSelectedFaculty('')
        setFacultyID('')
        setSelectedBranches([])
    }

    const handleSelectedSchoolYear = (value) => {
        console.log("selectedSchoolYear", value);
        setSelectedSchoolYear(value);
    };


    const startDate = dayjs(selectedDate)
        .set('hour', selectedTime.hour())
        .set('minute', selectedTime.minute())
        .set('second', 0)
        .format('YYYY-MM-DD HH:mm:ss');

    const handleChangeYears = (label) => {
        setSelectedYears((prevSelectedYears) => {
            if (prevSelectedYears.includes(label)) {
                // ถ้าเลือกแล้ว ก็เอาออกจาก list
                return prevSelectedYears.filter((year) => year !== label);
            } else {
                // ถ้ายังไม่เลือก ก็เพิ่มเข้าไปใน list
                return [...prevSelectedYears, label];
            }
        });
    };

    const handleSubmit = async () => {

        if (startDate < dayjs().format('YYYY-MM-DD HH:mm:ss')) {
            setErrorsMessage('ไม่สามารถเลือกวันที่ที่ผ่านไปได้')
            setTimeout(() => {
                setErrorsMessage("")
            }
                , 3000);
            return;
        }

        const payload = {
            event_name: eventName,
            start_date: startDate,
            working_hour: Number(hour),
            free_space: Number(space),
            location,
            detail,
            branches: selectedBranches.map(branch => branch.branch_id),
            years: selectedYears == null ? [] : selectedYears,  // ใช้ ternary operator
            school_year: Number(selectedSchoolYear)
        };

        try {
            const response = await CreateEvent(payload);
            console.log("CreateEvent response:", response);

            if (response) {
                setSuccessMessage('สร้างกิจกรรมเรียบร้อย');
                setTimeout(() => {
                    handleCloseDialog();
                    setSuccessMessage("")
                    window.location.reload();
                }, 800);

            }
        } catch (error) {
            console.log("Failed to create event:", error);

            if (error.message === 'event with same name and start date already exists for this creator') {
                setErrorsMessage('ไม่สามารถสร้างกิจกรรมได้ เนื่องจากมีกิจกรรมที่มีชื่อเดียวกันในวันที่เดียวกัน');
            } else {
                setErrorsMessage('ไม่สามารถสร้างกิจกรรมได้');
            }

            setTimeout(() => setErrorsMessage(""), 3000);
            console.error("Error in handleSubmit:", error);
        }
    };


    return (
        <div className='w-screen '>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="xs" // กำหนดขนาดกรอบให้เล็กลง
                fullWidth={false} // ปิด fullWidth เพื่อให้ขนาด Dialog ไม่เต็มหน้าจอ
                sx={{
                    '& .MuiDialog-paper': {
                        width: isDesktop ? '800px' : isTablet ? '700px' : '400px', // กำหนดขนาดกรอบที่เล็กลงตามหน้าจอ
                        maxWidth: '100%', // ป้องกันการขยายเต็มหน้าจอ
                    }
                }}
            >
                <Box
                    sx={{
                        fontSize: 40,
                        px: { xs: 1, sm: 3 },
                        pt: { xs: 3, md: 3 },
                        fontFamily: "Kanit",
                        textAlign: 'left',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    สร้างกิจกรรม
                </Box>
                <DialogContent
                    sx={{
                        minWidth: isDesktop ? 400 : isTablet ? 400 : '500',
                        padding: isMobile ? 1 : 3
                    }}
                >
                    <Box
                        sx={{
                            display: isTablet ? 'flex' : 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: 2,
                            mb: 2
                        }}
                    >
                        <TextField

                            margin="dense"
                            label="ชื่อกิจกรรม"
                            fullWidth
                            variant="outlined"
                            sx={{
                                width: isMobile ? "100%" : '70%'
                            }}
                            onChange={(e) => handleOnchange(e, 'eventName')}
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="วันที่เริ่มกิจกรรม"
                                sx={{ width: isMobile ? '100%' : '200px', mt: isMobile ? 0 : '8px' }}
                                onChange={(newValue) => handleOnchangeDate('date', newValue)}
                                format="DD/MM/YYYY"
                                required
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField
                                label="เวลาเริ่มต้น"
                                value={selectedDate}
                                onChange={(newValue) => handleOnchangeTime(newValue)}
                                sx={{ width: isMobile ? '100%' : '100px', mt: isMobile ? 0 : '8px' }}
                                format="HH:mm" // กำหนดฟอร์แมตเป็น 24 ชั่วโมง
                                required
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        display: isMobile ? 'grid' : 'flex'
                    }}
                    >
                        <TextField

                            margin="dense"
                            label="จำนวนที่รับ"
                            fullWidth
                            type='text'
                            inputProps={{ min: 1 }}
                            variant="outlined"
                            sx={{ width: isDesktop ? 180 : '100%' }}
                            onChange={(e) => {
                                // กรองให้รับเฉพาะตัวเลข
                                const value = e.target.value;
                                const numericValue = value.replace(/[^0-9]/g, ''); // กรองเฉพาะตัวเลข
                                e.target.value = numericValue;  // อัปเดตค่าที่ผู้ใช้กรอก
                                setSpace(numericValue ? Number(numericValue) : 0);  // เก็บค่าใน state และแปลงเป็นตัวเลข

                            }}
                            required
                        />

                        <TextField

                            margin="dense"
                            label="จำนวนชั่วโมง"
                            fullWidth
                            variant="outlined"
                            type='text'
                            inputProps={{ min: 1 }}
                            sx={{ width: isDesktop ? 200 : '100%' }}
                            onChange={(e) => {
                                // กรองให้รับเฉพาะตัวเลข
                                const value = e.target.value;
                                const numericValue = value.replace(/[^0-9]/g, ''); // กรองเฉพาะตัวเลข
                                e.target.value = numericValue;  // อัปเดตค่าที่ผู้ใช้กรอก
                                setHour(numericValue ? Number(numericValue) : 0);  // เก็บค่าใน state และแปลงเป็นตัวเลข
                            }}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="สถานที่"
                            fullWidth
                            variant="outlined"
                            multiline
                            onChange={(e) => handleOnchange(e, 'location')}
                            required
                        />
                    </Box>
                    <TextField
                        margin="dense"
                        label="รายละเอียดกิจกรรม"
                        fullWidth
                        variant="outlined"
                        multiline
                        onChange={(e) => handleOnchange(e, 'detail')}
                        rows={2}
                        required
                    />
                    <div className='flex items-center gap-2 py-2'>
                        <span>ชั้นปีที่สามารถเข้าร่วมได้</span>
                        {years.map((item) => (
                            <CheckboxButtonLabel
                                key={item.value}
                                label={item.fild}
                                selected={selectedYears.includes(item.value)} // ตรวจสอบว่า value ของ item อยู่ใน selectedYears หรือไม่
                                onChange={() => handleChangeYears(item.value)}
                            />
                        ))}
                    </div>
                    <label htmlFor="" className='text-red-500' >*เลือกสาขาที่สามารถเข้าร่วมกิจกรรมได้(ถ้าว่างเท่ากับทุกสาขาสามารถลงได้)</label>
                    <div className='grid' >
                        <div className='xs:grid lg:flex ' >
                            <Customselect
                                label={'ประจำปีการศึกษา'}
                                options={schoolYears}
                                field='label'
                                onChange={(e) => handleSelectedSchoolYear(e)}
                                value={selectedSchoolYear}
                                width={width.md}
                                required
                            />
                            <div className='md:flex xs:grid ' >
                                <Customselect
                                    label={'คณะ'}
                                    options={facultiesList}
                                    field='faculty_name'
                                    onChange={(e) => handleSelectedFaculty(e)}
                                    value={selectedFaculty}
                                    width={width.md}
                                />
                                <div className='py-3 flex  xs:mx-2' >
                                    <BasicButtons
                                        label={'ล้าง'}
                                        onClick={clear}
                                    />
                                </div>

                            </div>

                        </div>
                        <div className='flex' >
                            {!selectedFaculty ? (
                                < div className=""></div>
                            ) : (
                                <div className='p-4'>
                                    <TransferList
                                        item={filteredBranch}
                                        onRightListChange={handleRightListChange}
                                    />
                                </div>

                            )}
                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary"
                        sx={{
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            fontSize: 20,
                            fontFamily: 'kanit'
                        }}
                    >
                        ยกเลิก
                    </Button>
                    < Button onClick={handleSubmit} color="primary"
                        disabled={
                            !eventName || !startDate || !hour || !space || !location || !selectedSchoolYear
                        }
                        sx={{
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            fontSize: 20,
                            fontFamily: 'kanit'
                        }}
                    >
                        สร้างกิจกรรม
                    </Button>

                </DialogActions>

                {errorsMessage ? (
                    <div className="fixed bottom-4 right-4 z-30">
                        <ErrorAlert label={errorsMessage} />
                    </div>
                ) : successMessage ? (
                    <div className="fixed bottom-4 right-4 z-30">
                        <SuccessAlert label={successMessage} />
                    </div>
                ) : null}
            </Dialog>

        </div >
    )
}

export default CreatEventpopup;