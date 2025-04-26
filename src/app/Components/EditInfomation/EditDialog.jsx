import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CustomTextfield from '../Textfield';
import Customselect from '../Customselect';
import { editPersonalinfo, getBranches, getFaculties } from '@/app/Utils/api';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function EditDialog({ isOpen, isClose, selectUser = [], titleNameOption = [], userID }) {
    const [titleName, setTitleName] = useState(selectUser.length > 0 ? selectUser[0].value : '');
    const [selectedFaculty, setSelectedFaculty] = useState(selectUser[3]?.value.name || '');
    const [selectedBranch, setSelectedBranch] = useState(selectUser[4]?.value.name || '');
    const [facultyList, setFacultyList] = useState([]);
    const [allBranches, setAllBranches] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({}); // <-- เก็บ error message
    const [dupError, setDupError] = useState(false)
    const [successUpdate, setSuccesUpdate] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const facultyRes = await getFaculties();
                const branchRes = await getBranches();

                setFacultyList(facultyRes.data);
                setAllBranches(branchRes.data);

                if (selectedFaculty) {
                    const idOfSelectedFaculty = facultyRes.data.find(faculty => faculty.faculty_name === selectedFaculty)?.faculty_id;
                    const filtered = branchRes.data.filter(branch => branch.faculty_id === idOfSelectedFaculty);
                    setFilteredBranches(filtered);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [selectedFaculty]);

    const handleOnchangeTitlename = (value) => {
        setTitleName(value);
    };

    const handleOnchangeFaculty = (value) => {
        setSelectedFaculty(value);
        setSelectedBranch('');
    };

    const handleOnchangeBranch = (value) => {
        setSelectedBranch(value);
        setFormErrors(prev => {
            const { 'สาขา': removed, ...rest } = prev;
            return rest;
        });
    };

    const handleInputChange = (label, value) => {
        setFormData((prev) => ({ ...prev, [label]: value }));

        // validate ทันทีที่เปลี่ยน
        if (label === 'รหัสนักศึกษา') {
            setDupError(false)
            const isValid = /^\d{11}-\d{1}$/.test(value);
            setFormErrors((prev) => ({ ...prev, [label]: isValid ? '' : 'รหัสนักศึกษาไม่ถูกต้อง เช่น 65123212324-3' }));
        }

        if (label === 'เบอร์โทร') {
            setDupError(false)
            const isValid = /^0\d{9}$/.test(value);
            setFormErrors((prev) => ({ ...prev, [label]: isValid ? '' : 'เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก' }));
        }

        if (label === 'ชั้นปี') {
            if (value === '') {
                return 'กรุณากรอกชั้นปี';
            }
            const year = Number(value);
            if (isNaN(year)) {
                return 'ชั้นปีต้องเป็นตัวเลข';
            }
            if (year < 1 || year > 8) {
                return 'ชั้นปีต้องอยู่ระหว่าง 1-8';
            }
        }

    };
    const handleSave = () => {
        let payload = {
            user_id: userID,
            branch_id: '',
            // set default กันไว้
        };

        selectUser.forEach(item => {
            const fieldName = item.label;
            const oldValue = item.value?.trim?.() ?? item.value;
            const newValue = formData[fieldName]?.trim?.() ?? formData[fieldName];

            let finalValue = '';

            if (fieldName === 'คำนำหน้า') {
                finalValue = titleName !== '' ? titleName : oldValue;
            } else {
                finalValue = (newValue === undefined || newValue === '') ? oldValue : newValue;
            }

            if (fieldName === 'คณะ') {
                const facultyObj = facultyList.find(faculty => faculty.faculty_name === selectedFaculty);
                if (facultyObj) {
                    payload.faculty_id = facultyObj.faculty_id;
                }
            } else if (fieldName === 'สาขา') {
                const branchObj = allBranches.find(branch => branch.branch_name === selectedBranch);
                if (branchObj) {
                    payload.branch_id = branchObj.branch_id;
                }
            } else if (fieldName === 'ชั้นปี') {
                payload.year = parseInt(finalValue);
            } else if (fieldName === 'เบอร์โทร') {
                payload.phone = finalValue;
            } else if (fieldName === 'รหัสนักศึกษา') {
                payload.code = finalValue;
            } else if (fieldName === 'คำนำหน้า') {
                payload.title_name = finalValue;
            } else if (fieldName === 'ชื่อจริง') {
                payload.first_name = finalValue;
            } else if (fieldName === 'นามสกุล') {
                payload.last_name = finalValue;
            }
        });

        console.log('branch_id ที่ map ได้:', payload.branch_id);

        if (!payload.branch_id) {
            setFormErrors(prev => ({
                ...prev,
                'สาขา': 'กรุณาเลือกสาขาให้ถูกต้อง',
            }));
            console.log('FormErrors:', formErrors);
            return;
        } else {
            setFormErrors(prev => {
                const { 'สาขา': removed, ...rest } = prev; // ลบเฉพาะ 'สาขา' ออก
                return rest;
            });
        }

        console.log(payload);


        const handleUpdatePersonalInfo = async () => {
            if (!payload) return;

            try {
                console.log('ส่งข้อมูลไปที่ backend:', payload);
                const res = await editPersonalinfo(payload);
                console.log('แก้ไขข้อมูลสำเร็จ', res?.data); // ใช้ res.data ดีกว่า
                window.location.reload()
            } catch (error) {
                console.error('เกิดข้อผิดพลาด:', error.response?.data || error.message);
                setDupError(true);
            }
        };
        // แล้วเรียก
        handleUpdatePersonalInfo();
    };

    console.log(dupError);

    return (
        <>
            <BootstrapDialog
                onClose={isClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <span className='text-2xl'>แก้ไขข้อมูล</span>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={isClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {selectUser.map((item, index) => (
                        item.label === 'คำนำหน้า' ? (
                            <Customselect
                                key={index}
                                options={titleNameOption}
                                field="label"
                                value={titleName}
                                onChange={handleOnchangeTitlename}
                            />
                        ) : item.label === 'คณะ' ? (
                            <Customselect
                                key={index}
                                options={facultyList}
                                value={selectedFaculty}
                                onChange={handleOnchangeFaculty}
                                field='faculty_name'
                            />
                        ) : item.label === 'สาขา' ? (
                            <div>
                                <Customselect
                                    key={index}
                                    options={filteredBranches}
                                    field="branch_name"
                                    value={selectedBranch}
                                    onChange={handleOnchangeBranch}
                                />
                                {formErrors[item.label] && (
                                    <div className='mx-2' style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                                        {formErrors[item.label]}
                                    </div>
                                )}
                            </div>


                        ) : (
                            <div key={index}>
                                <CustomTextfield
                                    type={item.label === 'ชั้นปี' ? 'number' : 'text'} // 👉 เปลี่ยนตรงนี้
                                    label={item.label}
                                    value={formData[item.label] !== undefined ? formData[item.label] : item.value}
                                    onChange={(e) => handleInputChange(item.label, e.target.value)}
                                    inputProps={item.label === 'ชั้นปี' ? { min: 1, max: 8 } : {}} // 👉 จำกัด min max ให้เลย
                                />
                                {formErrors[item.label] && (
                                    <div className='mx-2' style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                                        {formErrors[item.label]}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                    {dupError && (
                        <div className='px-2 w-[280px] text-red-500 ' >บันทึกทึกข้อมูลไม่สำเร็จเนื่องจาก รหัสนักศึกษา/เบอร์โทร ซ้ำ</div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontFamily: 'Kanit' }} autoFocus onClick={handleSave}>
                        บันทึก
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}

export default EditDialog;