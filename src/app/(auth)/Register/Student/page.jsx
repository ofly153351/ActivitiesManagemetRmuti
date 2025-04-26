'use client'
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from 'next/link';
import { getBranches, getFaculties, registerUser } from "@/app/Utils/api";
import { handleApiError } from "@/app/Utils/errorhandler";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useRouter } from 'next/navigation'
import { colorsCode } from "@/app/Utils/color";
import { useStore } from "@/store/useStore";
import { checkUserAuth } from "@/app/Utils/block";
import Nav from "@/app/Components/Nav";


function Page() {
  const router = useRouter();
  const { user } = useStore();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nameTitle: '',
      firstName: '',
      lastName: '',
      code: '',
      faculty: '',
      branch: '',
      year: Number,
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const [faculties, setFaculties] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    checkUserAuth(user);

    const fetchData = async () => {
      try {
        const [branchResponse, facultiesResponse] = await Promise.all([
          getBranches(),
          getFaculties()
        ]);
        setBranches(branchResponse.data);
        setFaculties(facultiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        handleApiError(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {

    const payload = {
      title_name: data.nameTitle,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      password: data.password,
      code: data.code,
      year: data.year,
      branch_id: data.branch,
    };

    try {
      const result = await registerUser(payload);
      // console.log(result);
      router.push('/Login')
      alert(result.message)
    } catch (error) {
      handleApiError(error);
      alert(error)
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-center min-h-screen ">
        <div className="bg-slate-100 xs:w-[320px] md:w-[480px] p-6 shadow-2xl rounded-xl xs:mt-20">
          <div className="flex justify-center items-center mb-6">
            <AppRegistrationIcon sx={{ fontSize: 50, color: colorsCode.blue }} />
            <span className="font-kanit xs:text-[20px] text-[35px] text-gray-700">สมัครสมาชิก</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="nameTitle"
              control={control}
              rules={{ required: "กรุณาใส่คำนำหน้า" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" size="small" error={!!errors.nameTitle}>
                  <InputLabel id="nameTitle-label" sx={{ fontSize: '0.9rem' }}>คำนำหน้า</InputLabel>
                  <Select
                    {...field}
                    labelId="nameTitle-label"
                    label="คำนำหน้า"
                  >
                    <MenuItem value="นาย">นาย</MenuItem>
                    <MenuItem value="นาง">นาง</MenuItem>
                    <MenuItem value="นางสาว">นางสาว</MenuItem>
                  </Select>
                  {errors.nameTitle && <div className="text-red-500 text-xs mt-1">{errors.nameTitle.message}</div>}
                </FormControl>
              )}
            />

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

            <input
              {...register("code", {
                required: "กรุณากรอกรหัสนักศึกษา",
                pattern: {
                  value: /^\d{11}-\d$/,
                  message: "รหัสนักศึกษาต้องมี 12 หลัก ตามด้วย - และตัวเลข 1 ตัว"
                }
              })}
              placeholder="รหัสนักศึกษา"
              className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 mt-2"
              type="text"
            />
            {errors.code && <div className="text-red-500 text-xs mt-1">{errors.code.message}</div>}

            <div className="flex gap-2 mt-2">
              <Controller
                name="faculty"
                control={control}
                rules={{ required: "กรุณาเลือกคณะ" }}
                render={({ field }) => (
                  <FormControl sx={{ width: '138px' }} margin="normal" size="small" error={!!errors.faculty}>
                    <InputLabel sx={{ fontSize: '0.9rem' }}>คณะ</InputLabel>
                    <Select
                      {...field}
                      label="คณะ"
                    >
                      {faculties.map((item) => (
                        <MenuItem key={item.faculty_id} value={item.faculty_id}>
                          {item.faculty_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.faculty && <div className="text-red-500 text-xs mt-1">{errors.faculty.message}</div>}
                  </FormControl>
                )}
              />

              <Controller
                name="branch"
                control={control}
                rules={{ required: "กรุณาเลือกสาขา" }}
                render={({ field }) => (
                  <FormControl sx={{ width: '138px' }} margin="normal" size="small" error={!!errors.branch}>
                    <InputLabel sx={{ fontSize: '0.9rem' }}>สาขา</InputLabel>
                    <Select
                      {...field}
                      label="สาขา"
                    >
                      {branches.map((branch) => (
                        <MenuItem key={branch.branch_id} value={branch.branch_id}>
                          {branch.branch_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.branch && <div className="text-red-500 text-xs mt-1">{errors.branch.message}</div>}
                  </FormControl>
                )}
              />

              <Controller
                name="year"
                control={control}
                rules={{ required: "กรุณาเลือกชั้นปี" }}
                render={({ field }) => (
                  <FormControl sx={{ width: '138px' }} margin="normal" size="small" error={!!errors.year}>
                    <InputLabel sx={{ fontSize: '0.9rem' }}>ชั้นปี</InputLabel>
                    <Select
                      {...field}
                      label="ชั้นปี"
                    >
                      {[1, 2, 3, 4, 5].map((year) => (
                        <MenuItem key={year} value={Number(year)}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.year && <div className="text-red-500 text-xs mt-1">{errors.year.message}</div>}
                  </FormControl>
                )}
              />
            </div>

            <input
              {...register("phone", {
                required: "กรุณากรอกเบอร์โทรศัพ์",
                pattern: {
                  value: /^\d{10}$/,
                  message: "เบอร์โทรศัพท์ต้องมี 10 ตัว"
                }
              })}
              placeholder="เบอร์โทรศัพท์"
              className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 mt-2"
              type="text"
            />
            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone.message}</div>}

            <input
              {...register("email", {
                required: 'กรุณาใส่อีเมลให้ถูกต้อง',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'รูปแบบอีเมลไม่ถูกต้อง'
                }
              })}
              placeholder="อีเมล"
              className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 mt-2"
              type="email"
            />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}

            <input
              {...register("password", {
                required: "กรุณาใส่รหัสผ่าน",
                minLength: {
                  value: 8,
                  message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัว"
                }
              })}
              placeholder="รหัสผ่าน"
              className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 mt-2"
              type="password"
            />
            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>}

            <input
              {...register("confirmPassword", {
                required: "กรุณายืนยันรหัสผ่าน",
                validate: (value) => value === watch('password') || 'รหัสผ่านไม่ตรงกัน'
              })}
              placeholder="ยืนยันรหัสผ่าน"
              className="p-2 border-[1px] border-gray-300 w-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 mt-2"
              type="password"
            />
            {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</div>}

            <button
              type="submit"
              className="w-full py-3 bg-[#0067B3] text-white font-kanit rounded-lg shadow-xl hover:bg-blue-600 mt-6"
            >
              สมัครสมาชิก
            </button>

            <div className="mt-4 flex justify-end">
              <p>
                มีบัญชีอยู่แล้ว?
                <Link href='/Login' className="hover:text-blue-500"> เข้าสู่ระบบที่นี่</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;