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
import { SuccessAlert } from '@/app/Components/Alert';
import { useRouter } from 'next/navigation';


function Page() {

    const router = useRouter()
    const { user } = useStore();
    const [selectedTitle, setSelectedTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');
    const [faculty, setFaculty] = useState('');
    const [facultyID, setFacultyID] = useState('');
    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const [year, setYear] = useState('');
    const [role, setRole] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [faculties, setFacultie] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [validationMessage, setValidationMessage] = useState({});
    const [isopen, setIsopen] = useState(false)
    // console.log(user);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await getBranches();
                const faculties = await getFaculties();
                setBranches(response.data);
                setFacultie(faculties.data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            } finally {
                setIsLoading(false); // หยุดแสดง Loading
                // if(!user){
                //     router.push('/Home')                    
                // }
            }
        };

        if (user && !isInitialized) {
            setSelectedTitle(user.title_name || '');
            setFirstName(user.first_name || '');
            setLastName(user.last_name || '');
            setCode(user.code || '');
            setPhone(user.phone || '');
            setBranch(user.branch?.branch_name || '');
            setFaculty(user.branch?.faculty?.faculty_name || '');
            setYear(user.year || '');
            setRole(user.role || '');
            setIsInitialized(true);
        }

        fetchData();
    }, [user, isInitialized]);

    const showSuccessAlert = () => {
        setIsopen(true)
        setTimeout(() => {
            setIsopen(false)
        }, 3000);
    }

    const handleChange = (value, field) => {
        if (value === '') {
            return;
        }

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
        // ตรวจสอบ Validation ก่อน
        const errors = {};

        // Validation ชื่อ
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

        // Validation เบอร์โทร
        if (!phone) {
            errors.phone = 'กรุณากรอกเบอร์โทร';
        } else if (!/^0\d{9}$/.test(phone)) {
            errors.phone = 'เบอร์โทรต้องเป็นตัวเลข 10 หลักและขึ้นต้นด้วย 0';
        }

        // Validation รหัสนักศึกษา
        if (!code) {
            errors.code = 'กรุณากรอกรหัสนักศึกษา';
        } else if (!/^\d{11}-\d$/.test(code)) {
            errors.code = 'รูปแบบไม่ถูกต้อง';
        }

        // ถ้ามี Error แสดงข้อความเตือน
        if (Object.keys(errors).length > 0) {
            setValidationMessage(errors);
            return;
        }

        // สร้างข้อมูลที่ต้องการส่ง
        const updatedDataUser = {
            title_name: selectedTitle,
            year: year,
            first_name: firstName,
            last_name: lastName,
            code: code,
            phone,
            branch_id: branches.find(b => b.branch_name === branch)?.branch_id || user.branch?.branch_id,
        };

        // console.log("updatedDataUser", updatedDataUser);

        try {
            const isTeacherUpdate = !updatedDataUser.branch_id && !updatedDataUser.year;

            const isUserUpdate = updatedDataUser.branch_id && updatedDataUser.year;

            if (isTeacherUpdate) {
                const teacherPayload = {
                    title_name: selectedTitle,
                    first_name: firstName,
                    last_name: lastName,
                    code: code,
                    phone,
                }
                // console.log(teacherPayload);

                const response = await updateTeacher(teacherPayload);
                console.log('Teacher updated successfully:', response.data);
                showSuccessAlert()
            } else if (isUserUpdate) {
                console.log(updatedDataUser);
                const response = await updateUser(updatedDataUser);
                console.log('User updated successfully:', response.data);
                showSuccessAlert()
            } else {
                console.warn('No valid update conditions met');
            }
        } catch (error) {

            console.error('Error updating user/teacher:', error);
        }
    };

    const label = {
        firstName: 'ชื่อจริง',
        lastName: 'นามสกุล',
        email: 'Email',
        code: 'รหัสนักศึกษา',
        title: 'คำนำหน้า',
        phone: 'เบอร์โทร',
        branch: 'สาขา',
        faculties: 'คณะ',
        year: 'ปี'
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
        { key: '5', label: 5 },
        { key: '6', label: 6 },
        { key: '7', label: 7 }
    ];



    return (
        <div>
            <Nav />
            <div className="w-screen flex justify-center items-center">
                <div className="mx-40 mt-20 w-fit bg-[#f5f5f5] rounded-xl shadow-md">
                    <div className="flex p-4 justify-start items-center gap-4">
                        <PermIdentityIcon sx={{ fontSize: 64, color: colorsCode.blue }} />
                        <h1 className="text-2xl">แก้ไขข้อมูลส่วนตัว</h1>
                    </div>
                    <div className="p-4">
                        {user?.role === 'student' ? (
                            <div className="">
                                <div className="flex">
                                    <Customselect
                                        width={width.sm}
                                        label={label.title}
                                        field="label"
                                        value={selectedTitle}
                                        onChange={(value) => handleChange(value, 'title')}
                                        options={titles}
                                    />
                                    <div className='grid' >
                                        <CustomTextfield
                                            label={label.firstName}
                                            value={firstName}
                                            onChange={(e) => handleValidationThai(e.target.value, 'firstName', handleChange, setValidationMessage)}
                                        />
                                        {validationMessage.firstName && (
                                            <span className="text-red-500 text-sm pl-3 ">{validationMessage.firstName}</span>
                                        )}
                                    </div>
                                    <div className='grid' >
                                        <CustomTextfield
                                            label={label.lastName}
                                            value={lastName}
                                            onChange={(e) => handleValidationThai(e.target.value, 'lastName', handleChange, setValidationMessage)}
                                        />
                                        {validationMessage.lastName && (
                                            <span className="text-red-500 text-sm pl-3 ">{validationMessage.lastName}</span>
                                        )}
                                    </div>
                                    <Customselect
                                        width={'20%'}
                                        label={label.year}
                                        field="label"
                                        value={year}
                                        onChange={(value) => handleChange(value, 'year')}
                                        options={years}
                                    />
                                </div>
                                <div className="flex">
                                    <div className='grid' >
                                        <CustomTextfield
                                            label={label.code}
                                            value={code}
                                            onChange={(e) => handleCodeValidation(e.target.value, setCode, setValidationMessage)}
                                        />
                                        {validationMessage.code && (
                                            <span className="text-red-500 text-sm pl-3 ">{validationMessage.code}</span>
                                        )}
                                    </div>
                                    <Customselect
                                        readOnly={true}
                                        width={width.md}
                                        label={label.faculties}
                                        options={faculties} // ต้องเป็น array ที่มีข้อมูล
                                        field="faculty_name" // field นี้ต้องตรงกับ key ใน options
                                        value={faculty} // ค่าเริ่มต้นต้องตรงกับ faculty_name ใน options
                                        onChange={(value) => handleChange(value, 'faculty')}
                                    />
                                    <Customselect
                                        readOnly={true}
                                        width={width.md}
                                        label={label.branch}
                                        field="branch_name"
                                        value={branch}
                                        onChange={(value) => handleChange(value, 'branch')}
                                        options={branches}
                                    />
                                </div>
                                <div className="flex">
                                    <div className='grid' >
                                        <CustomTextfield
                                            label={label.phone}
                                            value={phone}
                                            onChange={(e) => handlePhoneValidation(e.target.value, setPhone, setValidationMessage)}
                                        />
                                        {validationMessage.phone && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.phone}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : user?.role === 'teacher' || 'admin' ? (
                            <div className="">
                                <div className="flex">
                                    <Customselect
                                        width={width.sm}
                                        label={label.title}
                                        field="label"
                                        value={selectedTitle}
                                        onChange={(value) => handleChange(value, 'title')}
                                        options={titles}
                                    />
                                    <div className='grid' >
                                        <CustomTextfield
                                            label={label.firstName}
                                            value={firstName}
                                            onChange={(e) => handleValidationThai(e.target.value, 'firstName', handleChange, setValidationMessage)}
                                        />
                                        {validationMessage.firstName && (
                                            <span className="text-red-500 text-sm pl-3 ">{validationMessage.firstName}</span>
                                        )}
                                    </div>
                                    <div className='grid' >
                                        <CustomTextfield
                                            label={label.lastName}
                                            value={lastName}
                                            onChange={(e) => handleValidationThai(e.target.value, 'lastName', handleChange, setValidationMessage)}
                                        />
                                        {validationMessage.lastName && (
                                            <span className="text-red-500 text-sm pl-3 ">{validationMessage.lastName}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className='grid' >
                                        <CustomTextfield
                                            label={label.code}
                                            value={code}
                                            onChange={(e) => handleCodeValidation(e.target.value, setCode, setValidationMessage)}
                                        />
                                        {validationMessage.code && (
                                            <span className="text-red-500 text-sm pl-3 ">{validationMessage.code}</span>
                                        )}
                                    </div>
                                    <div className='grid' >
                                        <CustomTextfield
                                            label={label.phone}
                                            value={phone}
                                            onChange={(e) => handlePhoneValidation(e.target.value, setPhone, setValidationMessage)}
                                        />
                                        {validationMessage.phone && (
                                            <span className="text-red-500 text-sm pl-3">{validationMessage.phone}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center p-7 items-center">
                                < Loading />
                            </div>
                        )

                        }
                        <div className="p-4 w-full flex justify-end">
                            <BasicButtons
                                label="ยืนยันการแก้ไขข้อมูล"
                                width={170}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
                {isopen && (
                    <div className='absolute bottom-12 right-12'>
                        <SuccessAlert label='อัพเดทข้อมูลเรียบร้อย' />
                    </div>
                )}
            </div>
        </div >
    );
}

export default Page;