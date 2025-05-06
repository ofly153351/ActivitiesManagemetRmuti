'use client';
import React, { useEffect, useState } from 'react';
import Nav from '@/app/Components/Nav';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { colorsCode } from '@/app/Utils/color';
import CustomTextfield from '@/app/Components/Textfield';
import Customselect from '@/app/Components/Customselect';
import width from '@/app/Utils/textfieldWidth';
import { useStore } from '@/store/useStore';
import BasicButtons from '@/app/Components/BasicButtons';
import { getBranches, getFaculties, updateTeacher, updateUser } from '@/app/Utils/api';
import Loading from '@/app/Components/Loading';
import { handleValidationThai, handleCodeValidation, handlePhoneValidation } from '@/app/Utils/validation';
import { ErrorAlert, SuccessAlert } from '@/app/Components/AlertShow';
import { blockNulluser } from '@/app/Utils/block';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { checkSessionTimeout } from '@/app/Utils/session';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Footer from '@/app/Components/Footer';


function Page() {
    // ใช้ useState สำหรับ client-side rendering
    const [isClient, setIsClient] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(''); // เพิ่ม email state
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');
    const [faculty, setFaculty] = useState('');
    const [facultyID, setFacultyID] = useState('');
    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const [year, setYear] = useState('');
    const [role, setRole] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [faculties, setFaculties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [validationMessage, setValidationMessage] = useState({});
    const [isopen, setIsopen] = useState(null);
    const [isOpenEdit, setIsOpenEdit] = useState(true);
    const { userRoleHash, initUserRoleHash, user, setUser } = useStore()
    // ตรวจสอบว่าเราอยู่ในฝั่ง client



    useEffect(() => {
        initUserRoleHash()
    }, [userRoleHash])

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // if (!isClient) return; // ไม่ทำงานถ้ายังไม่ใช่ฝั่ง client
        // ป้องกัน user ที่เป็น null
        blockNulluser(userRoleHash)
        checkSessionTimeout()
        const fetchData = async () => {
            try {
                const response = await getBranches();
                const facultiesData = await getFaculties();
                setBranches(response.data);
                setFaculties(facultiesData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        console.log(user);

        // ตรวจสอบว่า user มีค่าและยังไม่ได้ตั้งค่าเริ่มต้น
        if (user && !isInitialized) {
            setSelectedTitle(user.title_name || '');
            setFirstName(user.first_name || '');
            setLastName(user.last_name || '');
            setCode(user.code || '');
            setPhone(user.phone || '');
            setBranch(user.branch || '');
            setFaculty(user.faculty_name || '');
            setYear(user.year || '');
            setEmail(user.email || ''); // ตั้งค่า email จาก user
            setIsInitialized(true);
        }

        fetchData();
    }, [user, isClient, isInitialized]); // เพิ่ม dependencies




    const showSuccessAlert = () => {
        setIsopen(true)
        setTimeout(() => {
            setIsopen(false)
        }, 3000);
    }

    const handleChange = (value, field) => {
        switch (field) {
            case 'title':
                setSelectedTitle(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'year':
                setYear(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'code':
                setCode(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'faculty':
                const selectedFaculty = faculties.find(f => f.faculty_name === value);
                setFaculty(value);
                setFacultyID(selectedFaculty?.faculty_id || '');
                break;
            case 'branch':
                setBranch(value);
                break;
            default:
                console.warn(`Unhandled field: ${field}`);
        }
    };

    const handleSubmit = async () => {
        const errors = {};

        if (!firstName) {
            errors.firstName = 'กรุณากรอกชื่อจริง';
        } else if (!/^[ก-๙]+$/.test(firstName)) {
            errors.firstName = 'ชื่อจริงต้องเป็นภาษาไทยเท่านั้น';
        }

        if (!lastName) {
            errors.lastName = 'กรุณากรอกนามสกุล';
        } else if (!/^[ก-๙]+$/.test(lastName)) {
            errors.lastName = 'นามสกุลต้องเป็นภาษาไทยเท่านั้น';
        }

        if (!phone) {
            errors.phone = 'กรุณากรอกเบอร์โทร';
        } else if (!/^0\d{9}$/.test(phone)) {
            errors.phone = 'เบอร์โทรต้องเป็นตัวเลข 10 หลักและขึ้นต้นด้วย 0';
        }

        if (!code) {
            errors.code = 'กรุณากรอกรหัสนักศึกษา';
        } else if (!/^\d{11}-\d$/.test(code)) {
            errors.code = 'รูปแบบไม่ถูกต้อง';
        }

        if (Object.keys(errors).length > 0) {
            setValidationMessage(errors);
            return;
        }

        const updatedData = {
            title_name: selectedTitle,
            first_name: firstName,
            last_name: lastName,
            code,
            phone,
            year,
            branch_id: branches.find(b => b.branch_name === branch)?.branch_id || user?.branch?.branch_id,
        };

        try {
            let response;
            if (userRoleHash === 'teacher' || userRoleHash === 'admin') {
                response = await updateTeacher(updatedData);
            } else {
                response = await updateUser(updatedData);
            }

            // อัพเดท user ในโกลบอลสเตท
            setUser({ ...user, ...updatedData });

            console.log('Update successful:', response.data);
            showSuccessAlert();
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            setIsopen(false)
            setTimeout(() => {
                setIsopen(null)
            }, 2000);
            console.error('Error updating data:', error);
        }
    };

    const label = {
        firstName: 'ชื่อจริง',
        lastName: 'นามสกุล',
        email: 'Email',
        code: 'รหัสนักศึกษา',
        teacherCode: 'รหัสอาจารย์',
        title: 'คำนำหน้า',
        phone: 'เบอร์โทร',
        branch: 'สาขา',
        faculties: 'คณะ',
        year: 'ชั้นปี'
    };

    const titles = [
        { key: 'mister', label: 'นาย' },
        { key: 'miss', label: 'นาง' },
        { key: 'missis', label: 'นางสาว' },
    ];

    const years = [
        { key: '1', label: 1 },
        { key: '2', label: 2 },
        { key: '3', label: 3 },
        { key: '4', label: 4 },
    ];

    const handleOpenEdit = () => {
        setIsOpenEdit(prev => !prev);
    }


    console.log("branch" + branch);
    // ถ้าอยู่ฝั่ง server หรือยังโหลดข้อมูลไม่เสร็จ ให้แสดง loading
    if (!isClient || isLoading || !user) {
        return (
            <div>
                <Nav />
                <div className="min-h-screen w-screen flex justify-center items-center">
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Nav />
            <div className="min-h-screen w-screen flex justify-center items-center ">
                <div className="w-fit bg-[#f5f5f5] rounded-xl shadow-md">
                    <div className="flex p-4 justify-start items-center gap-4">
                        <PermIdentityIcon sx={{ fontSize: 64, color: colorsCode.blue }} />
                        <h1 className="text-2xl">แก้ไขข้อมูลส่วนบุคคล</h1>
                    </div>
                    <div className="p-4">
                        {userRoleHash === 'student' ? (
                            <div className="">
                                <div className=" xs:grid md:grid-cols-3">
                                    <Customselect
                                        // width={'full'}
                                        label={label.title}
                                        field="label"
                                        value={selectedTitle}
                                        onChange={(value) => handleChange(value, 'title')}
                                        options={titles}
                                        readOnly={isOpenEdit}
                                    />
                                    <div className='grid'>
                                        <CustomTextfield
                                            label={label.firstName}
                                            value={firstName}
                                            onChange={(e) => handleValidationThai(e.target.value, 'firstName', handleChange, setValidationMessage)}
                                            disabled={isOpenEdit}
                                        // width={'full'}
                                        />
                                        {validationMessage.firstName && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.firstName}</span>
                                        )}
                                    </div>
                                    <div className='grid'>
                                        <CustomTextfield
                                            label={label.lastName}
                                            value={lastName}
                                            onChange={(e) => handleValidationThai(e.target.value, 'lastName', handleChange, setValidationMessage)}
                                            disabled={isOpenEdit}
                                        />
                                        {validationMessage.lastName && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.lastName}</span>
                                        )}
                                    </div>

                                </div>
                                <div className="xs:grid md:grid-cols-3">
                                    <Customselect
                                        label={label.year}
                                        field="label"
                                        value={year}
                                        onChange={(value) => handleChange(value, 'year')}
                                        options={years}
                                        readOnly={isOpenEdit}
                                    />
                                    <div className='grid'>
                                        <CustomTextfield
                                            label={label.code}
                                            value={code}
                                            onChange={(e) => handleCodeValidation(e.target.value, setCode, setValidationMessage)}
                                            disabled={isOpenEdit}
                                        />
                                        {validationMessage.code && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.code}</span>
                                        )}
                                    </div>
                                    <Customselect
                                        readOnly={true}
                                        // width={width.md}
                                        label={label.branch}
                                        field="branch_name"
                                        value={branch}
                                        onChange={(value) => handleChange(value, 'branch')}
                                        options={branches}
                                    />
                                </div>

                                <div className="flex">
                                    <div className='xs:grid '>

                                        <CustomTextfield
                                            label={label.phone}
                                            value={phone}
                                            onChange={(e) => handlePhoneValidation(e.target.value, setPhone, setValidationMessage)}
                                            disabled={isOpenEdit}
                                        />
                                        {validationMessage.phone && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.phone}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (userRoleHash === 'teacher' || userRoleHash === 'admin') ? (
                            <div className="">
                                <div className="grid">
                                    <Customselect
                                        // width={width.md}
                                        label={label.title}
                                        field="label"
                                        value={selectedTitle}
                                        onChange={(value) => handleChange(value, 'title')}
                                        options={titles}
                                        readOnly={isOpenEdit}
                                    />
                                    <div className='grid'>
                                        <CustomTextfield
                                            label={label.firstName}
                                            value={firstName}
                                            onChange={(e) => handleValidationThai(e.target.value, 'firstName', handleChange, setValidationMessage)}
                                            disabled={isOpenEdit}
                                        />
                                        {validationMessage.firstName && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.firstName}</span>
                                        )}
                                    </div>
                                    <div className='grid'>
                                        <CustomTextfield
                                            label={label.lastName}
                                            value={lastName}
                                            onChange={(e) => handleValidationThai(e.target.value, 'lastName', handleChange, setValidationMessage)}
                                            disabled={isOpenEdit}
                                        />
                                        {validationMessage.lastName && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.lastName}</span>
                                        )}
                                    </div>

                                </div>
                                <div className="grid">
                                    <div className='grid'>
                                        <CustomTextfield
                                            label={label.teacherCode}
                                            value={code}
                                            onChange={(e) => handleCodeValidation(e.target.value, setCode, setValidationMessage)}
                                            disabled={isOpenEdit}
                                        />
                                        {validationMessage.code && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.code}</span>
                                        )}
                                    </div>
                                    <div className='grid'>
                                        <CustomTextfield
                                            label={label.phone}
                                            value={phone}
                                            onChange={(e) => handlePhoneValidation(e.target.value, setPhone, setValidationMessage)}
                                            disabled={isOpenEdit}
                                        />
                                        {validationMessage.phone && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.phone}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Loading />
                        )}
                        <div className="p-4 w-full flex justify-end items-center gap-2 ">
                            <BasicButtons
                                label="ยืนยันการแก้ไขข้อมูล"
                                width={120}
                                onClick={handleSubmit}
                            />
                            <Tooltip title="แก้ไขข้อมูลส่วนบุคคล">
                                <IconButton>
                                    <button onClick={handleOpenEdit} className='p-2'>
                                        <EditNoteIcon sx={{ fontSize: 40, color: colorsCode.blue }} />
                                    </button>
                                </IconButton>
                            </Tooltip>

                        </div>
                    </div>
                </div>
                {isopen !== null && isopen === true ? (
                    <div className='fixed bottom-4 right-4'>
                        <SuccessAlert label='อัปเดทข้อมูลเรียบร้อย' />
                    </div>
                ) : isopen !== null && isopen === false && (
                    <div className='fixed bottom-4 right-4'>
                        <ErrorAlert label='เกิดข้อผิดพลาดในการแก้ไขข้อมูล' />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Page;