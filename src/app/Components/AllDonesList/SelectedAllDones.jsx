import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Customselect from '../Customselect';
import { getFaculties } from '@/app/Utils/api';
import { useRouter } from 'next/navigation';


function SelectedAllDones({ open, setOpen }) {
    let year = new Date().getFullYear();
    const years = [{ label: year + 542 }, { label: year + 543 }, { label: year + 544 }];
    const [selectedYears, setSelectedYears] = useState(years[1].label);
    const [faculties, setFaculties] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null)
    const [facultyID, setFacultyID] = useState('');
    const [status, setStatus] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const router = useRouter();


    const handleSelectedYear = (value) => {
        setSelectedYears(value);
        console.log(value);

    }

    const handleSelectedFaculty = (value) => {
        const selectedFaculty = faculties.find(f => f.faculty_name === value);
        setSelectedFaculty(value);
        setFacultyID(selectedFaculty?.faculty_id || '');
    };

    const handleChangeStatus = (selected) => {
        const selectedStatus = StatusList.find(f => f.label === selected);

        setStatus(selected);
        setSelectedStatus(selectedStatus.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFaculties();
                setFaculties(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, [])


    const StatusList = [
        { label: 'อนุมัติ', value: true },
        { label: 'ไม่อนุมัติ', value: false },
    ]

    const handleSubmit = () => {
        const year = selectedYears;
        const status = selectedStatus;
        const faculty_id = facultyID;

        console.log("fac", facultyID);

        if (faculty_id === null || faculty_id === '') {
            router.push(`/Admin/AllDonesEvidence?year=${year}&status=${status}&faculty_id=null`);
            setOpen(false);
            return; // ✅ ป้องกันไม่ให้ทำงานต่อ
        }

        router.push(`/Admin/AllDonesEvidence?year=${year}&status=${status}&faculty_id=${faculty_id}`);
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"สรุปผลการทำกิจกรรม"}
                </DialogTitle>
                <DialogContent>
                    <div className='py-1' >
                        <div className='py-1' >
                            <Customselect
                                label={'ปีการศึกษา'}
                                options={years}
                                value={selectedYears}
                                field='label'
                                onChange={handleSelectedYear}
                            />
                        </div>
                        <div className='py-1' >
                            <Customselect
                                label={'สถานะ'}
                                options={StatusList}
                                value={status}
                                field='label'
                                onChange={handleChangeStatus}
                            />
                        </div>
                        <div>
                            <Customselect
                                label={'คณะ'}
                                options={faculties}
                                field='faculty_name'
                                onChange={(e) => handleSelectedFaculty(e)}
                                value={selectedFaculty}
                                require
                            />
                        </div>
                        <span className='px-3 text-red-500 font:kanit'>
                            ไม่จำเป็นต้องเลือก
                        </span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontFamily: 'Kanit', px: 2 }} onClick={handleSubmit} autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SelectedAllDones