'use client'
import React from "react";
import Nav from "../../Components/Nav";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/Utils/api";
import Cookies from "js-cookie";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check'; // Import the CheckIcon
import { useStore } from '@/store/useStore';
function Page() {
  const login = useStore((state) => state.login);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      // เรียกใช้ login function และรอผลลัพธ์
      await login(payload);

      // ตรวจสอบ token หลังจาก login สำเร็จ
      const token = Cookies.get('token');

      if (token) {
        setSuccessMessage('Login successful!');
        setTimeout(() => {
          router.push('/Home');
        }, 600);
      } else {
        throw new Error('No token received after login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your Email or Password');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };


  return (
    <div>
      <Nav />
      <div className="flex justify-center items-center w-screen h-full mt-20">
        <div>
          <div className="flex bg-blue-300 w-[960px] h-[500px] rounded-[12px] shadow-2xl">
            <div className="left flex justify-center items-center w-[480px]">
              <p>LOGO</p>
              {/* <img className="p-6" src="https://www.studentloan.or.th/th/system/files/files/knowledgemedia/%E0%B8%81%E0%B8%A2%E0%B8%A8-01.png" alt="Sign In" /> */}
            </div>
            <div className="right bg-slate-100 rounded-r-[12px] shadow-2xl w-[480px] gap-7 ">
              <form className="p-4 h-full flex flex-col justify-center items-center relative" onSubmit={handleSubmit(onSubmit)}>
                <div className="text-[35px] text-center font-kanit py-7 text-gray-700">
                  เข้าสู่ระบบ
                </div>
                <div>
                  <div className="flex justify-center items-center gap-7">
                    <Box
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        placeholder="Email Address"
                        variant="outlined"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                      />
                    </Box>
                  </div>
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="w-fit">
                  <div className="flex flex-col items-center">
                    <Box
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                      />
                    </Box>
                  </div>
                  {errors.password && <p className="pt-2 text-red-500">{errors.password.message}</p>}
                </div>
                <div className="flex justify-center items-center mt-5">
                  <button
                    className="py-2 px-6 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition duration-300"
                    type="submit"
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>

                {/* Success or error alert message */}
                {successMessage && (
                  <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="mt-4">
                    {successMessage}
                  </Alert>
                )}

                {errorMessage && (
                  <Alert severity="error" className="mt-4">
                    {errorMessage}
                  </Alert>
                )}

                <div className="absolute bottom-4 right-4 text-gray-700 hover:text-blue-500">
                  <Link href='/'>ลืมรหัสผ่าน ?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;