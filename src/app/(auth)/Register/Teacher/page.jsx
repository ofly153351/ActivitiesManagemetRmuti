'use client'
import React, { useEffect, useState } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from "react-hook-form";
import { registerTeacher } from '../../../Utils/api';
import { handleApiError } from '../../../Utils/errorhandler';
import Nav from "../../../Components/Nav";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { colorsCode } from "@/app/Utils/color";
import { useStore } from "@/store/useStore";
import { checkUserAuth } from "@/app/Utils/block";

function Page() {
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [gender, setGender] = useState('');
    const { user } = useStore();


    useEffect(() => {
        checkUserAuth(user)

        register('nameTitle', {
            required: "กรุณาใส่คำนำหน้า",
        });
    }, [register]);

    const onSubmit = async (data) => {
        const payload = {
            title_name: data.nameTitle,
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            email: data.email,
            password: data.password,
            code: data.code,
        };


        // console.log('Payload to send:', payload);

        try {
            const result = await registerTeacher(payload);
            console.log('Registration successful:', result);
            alert(result.message);
            router.push('/Login')
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleChangegender = (event) => {
        setGender(event.target.value);
        setValue('nameTitle', event.target.value);
    };


    return (
        <div>
            <Nav />
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-slate-100 xs:w-[330px] md:w-[480px] p-6 shadow-2xl rounded-xl">
                    <div className="flex justify-center items-center">
                        <AppRegistrationIcon sx={{ fontSize: 50, color: colorsCode.blue }} />
                        <span className="font-kanit xs:text-[25px] text-[35px] text-gray-700">สมัครสมาชิก</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                            <FormControl fullWidth margin="normal" size="small">
                                <InputLabel id="nameTitle-label" sx={{ fontSize: '0.9rem' }}>คำนำหน้า</InputLabel>
                                <Select
                                    labelId="nameTitle-label"
                                    value={gender}
                                    onChange={handleChangegender}
                                    label="คำนำหน้า"
                                >
                                    <MenuItem value="นาย">นาย</MenuItem>
                                    <MenuItem value="นาง">นาง</MenuItem>
                                    <MenuItem value="นางสาว">นางสาว</MenuItem>
                                </Select>
                                {errors.nameTitle && <div className="text-red-500 text-xs mt-1">{errors.nameTitle.message}</div>}
                            </FormControl>
                            <div className="flex gap-2">
                                <div className="w-full">
                                    <input
                                        {...register("firstName", {
                                            required: "กรุณาใส่ชื่อ",
                                            pattern: {
                                                value: /^[ก-๙]+$/,
                                                message: "กรอกชื่อเป็นภาษาไทย"
                                            }
                                        })}
                                        placeholder="ชื่อ"
                                        className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550"
                                        type="text"
                                    />
                                    {errors.firstName && <div className="text-red-500 mt-1 text-xs">{errors.firstName.message}</div>}
                                </div>
                                <div className="w-full">
                                    <input
                                        {...register("lastName", {
                                            required: "กรุณาใส่นามสกุล",
                                            pattern: {
                                                value: /^[ก-๙]+$/,
                                                message: "กรอกนามสกุลเป็นภาษาไทย"
                                            }
                                        })}
                                        placeholder="นามสกุล"
                                        className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550"
                                        type="text"
                                    />
                                    {errors.lastName && <div className="text-red-500 mt-1 text-xs">{errors.lastName.message}</div>}
                                </div>
                            </div>

                            <div className="mt-2">
                                <input
                                    {...register("code", {
                                        required: "กรุณากรอกรหัสประจำตัวอาจารย์",
                                        pattern: {
                                            value: /^\d{11}-\d$/,
                                            message: "รหัสนักศึกษาต้องมี 12 หลัก ตามด้วย - และตัวเลข 1 ตัว"
                                        }
                                    })}
                                    placeholder="รหัสประจำตัวอาจารย์"
                                    className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550"
                                    type="text"
                                />
                                {errors.code && <div className="text-red-500 text-xs mt-1">{errors.code.message}</div>}
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("phone", {
                                        required: "กรุณากรอกเบอร์โทร",
                                        pattern: {
                                            value: /^\d{10}$/,
                                            message: "เบอร์โทรต้องมี 10 ตัว"
                                        }
                                    })}
                                    placeholder="เบอร์โทร"
                                    className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550"
                                    type="text"
                                />
                                {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone.message}</div>}
                            </div>

                            <div className="mt-2">
                                <input
                                    {...register("email", {
                                        required: 'กรุณาใส่อีเมลให้ถูกต้อง',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'รูปแบบอีเมลไม่ถูกต้อง'
                                        }
                                    })}
                                    placeholder="อีเมล"
                                    className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550"
                                    type="email"
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("password", {
                                        required: "กรุณาใส่รหัสผ่าน",
                                        minLength: {
                                            value: 8,
                                            message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัว"
                                        }
                                    })}
                                    placeholder="รหัสผ่าน"
                                    className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550"
                                    type="password"
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>}
                            </div>

                            <div className="mt-2">
                                <input
                                    {...register("confirmPassword", {
                                        required: "กรุณายืนยันรหัสผ่าน",
                                        validate: (value) => value === watch('password') || 'รหัสผ่านไม่ตรงกัน'
                                    })}
                                    placeholder="ยืนยันรหัสผ่าน"
                                    className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550"
                                    type="password"
                                />
                                {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</div>}
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#0067B3] text-white font-kanit rounded-lg shadow-xl hover:bg-blue-600"
                                >
                                    สมัครสมาชิก
                                </button>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <p>
                                    มีบัญชีอยู่แล้ว?
                                    <Link href='/Login' className="hover:text-blue-500"> เข้าสู่ระบบที่นี่</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;