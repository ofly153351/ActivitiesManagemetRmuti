'use client'
import React, { useEffect, useState } from "react";
import Nav from "../Components/Headnav/Nav";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from "react-hook-form";

const Page = () => {
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
  const [gender, setGender] = useState('');

  useEffect(() => {
    register('nameTitle', {
      required: "กรุณาใส่คำนำหน้า",
    }); // Register 'nameTitle' field manually
  }, [register]);

  const onSubmit = (data) => {
    console.log(data);
  }

  const handleChange = (event) => {
    setGender(event.target.value);
    setValue('nameTitle', event.target.value); // Set value for 'nameTitle'
  }

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-center ">
        <div className="mt-40 bg-slate-100 w-[480px]  h-[600px] shadow-2xl rounded-xl">
          <div className="flex justify-center items-center">
            <img className="ml-4 p-2 w-[120px]" src="https://www.studentloan.or.th/th/system/files/files/knowledgemedia/%E0%B8%81%E0%B8%A2%E0%B8%A8-01.png" />
            <span className="font-mono text-[35px] font-bold text-gray-700 text-shadow-xl">
              Sign Up
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="items-center m-2">
              <div className="flex justify-center m-2">
                <div className="">
                  <div className="">
                    <FormControl sx={{ marginRight: 1, minWidth: 100 }} size="small">
                      <InputLabel id="demo-select-small-label" sx={{ fontSize: '0.900rem' }}>คำนำหน้า</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={gender}
                        label="คำนำหน้า"
                        onChange={handleChange}
                        sx={{ fontSize: '0.900rem' }}
                      >
                        <MenuItem value='Mister'>นาย</MenuItem>
                        <MenuItem value="Missus">นาง</MenuItem>
                        <MenuItem value="Miss">นางสาว</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  {errors.nameTitle && <div className="text-red-500 text-xs mt-1.5">{errors.nameTitle.message}</div>}
                </div>
                <div className="flex gap-2">
                  <div>
                    <div className="w-[150px] h-10">
                      <input
                        {...register("firstName", { required: "กรุณาใส่ชื่อ" })}
                        placeholder="ชื่อ"
                        className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md focus:shadow-xl duration duration-100 placeholder-gray-550 hover:border-[1px] hover:border-blue-600"
                        type="text"
                      />
                    </div>
                    {errors.firstName && <div className="text-red-500 mt-1 text-xs">{errors.firstName.message}</div>}
                  </div>
                  <div className="w-[150px] h-10">
                    <input
                      {...register("lastName", { required: "กรุณาใส่นามสกุล" })}
                      placeholder="นามสกุล"
                      className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600 placeholder-gray-550"
                      type="text"
                    />
                    {errors.lastName && <div className="text-red-500 mt-1 text-xs">{errors.lastName.message}</div>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mx-6 h-10 gap-2">
                <div className="w-full" >
                  <div>
                    <input
                      {...register("userID", { required: "กรุณาใส่รหัสนักศึกษา" })}
                      className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600"
                      type="text"
                      placeholder="รหัสนักศึกษา"
                    />
                  </div>
                  {errors.userID && <div className="text-red-500 text-xs mt-1">{errors.userID.message}</div>}
                </div>
                <div className="w-full" >
                  <div className="">
                    <input
                      {...register("email", {
                        required: 'กรุณาใส่อีเมลให้ถูกต้อง',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'รูปแบบอีเมลไม่ถูกต้อง'
                        }
                      })}
                      className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600"
                      type="email"
                      placeholder="Email"
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                  </div>
                </div>
                <div className="w-full" >
                  <div className="">
                    <input
                      {...register("password", {
                        required: "กรุณาใส่รหัสผ่าน",
                        minLength: {
                          value: 8,
                          message: "รหัสผ่านต้องมีมากกว่า 9 ตัว"
                        }
                      })}
                      className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600"
                      type="password"
                      placeholder="รหัสผ่าน"
                    />
                  </div>
                  {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>}
                </div>
                <div className="w-full">
                  <div>
                    <input
                      {...register("confirmPassword", {
                        required: "กรุณายืนยันรหัสผ่าน",
                        validate: (value) => value === watch('password') || 'รหัสผ่านไม่ตรงกัน'
                      })}
                      className="p-2 border-[1px] border-gray-300 w-full h-full focus:outline-blue-500 bg-transparent rounded-md placeholder-gray-550 focus:shadow-xl duration duration-100 hover:border-[1px] hover:border-blue-600"
                      type="password"
                      placeholder="ยืนยันรหัสผ่าน"
                    />
                  </div>
                  {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</div>}
                </div>
                <div className="p-4">
                  <button className="px-6 py-4 border-[1px] bg-[#0067B3] text-white font-mono font-semibold rounded-lg shadow-xl hover:bg-blue-600 duration duration-300" type="submit">
                    Sign Up!
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;