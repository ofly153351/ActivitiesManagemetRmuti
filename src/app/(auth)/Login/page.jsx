'use client'
import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useStore } from '@/store/useStore';
import { checkUserAuth } from "@/app/Utils/block";
import Footer from "@/app/Components/Footer";

function Page() {
  const login = useStore((state) => state.login);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const { user } = useStore();

  useEffect(() => {
    checkUserAuth(user)
  }, []);

  const onSubmit = async (data) => {
    try {
      const responseUser = await login(data); // <- รับค่ากลับมา

      console.log('User:', responseUser);

      if (responseUser) {
        setSuccessMessage('Login successful!');
        router.push('/')
      } else {
        throw new Error('No token received after login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your Email or Password');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      {/* Centering Container */}
      <div className="flex flex-grow items-center justify-center px-4 mt-20">
        <div className="flex flex-col md:flex-row bg-blue-300 w-full max-w-3xl rounded-[12px] shadow-2xl">
          {/* Left Side (Logo) */}
          <div className="hidden md:flex items-center justify-center w-1/2">
            <img
              className={`${errorMessage ? 'rounded-l-[12px] h-[420px]' : 'rounded-l-[12px]'}`}
              src="/logo.png"
              alt="Logo"
            />
          </div>
          {/* Right Side (Form) */}
          <div className="bg-slate-100 flex flex-col justify-center items-center w-full md:w-1/2 p-6 rounded-r-[12px] shadow-2xl">
            <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
              <div className="text-[30px] text-center font-kanit py-4 text-gray-700">
                เข้าสู่ระบบ
              </div>

              {/* Email Input */}
              <Box sx={{ '& > :not(style)': { m: 1, width: '97%' } }}>
                <TextField
                  id="email"
                  label="Email"
                  placeholder="Email Address"
                  variant="outlined"
                  type="email"

                  {...register('email', { required: 'Email is required' })}
                />
              </Box>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              {/* Password Input */}
              <Box sx={{ '& > :not(style)': { m: 1, width: '97%' } }}>
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  {...register('password', { required: 'Password is required' })}
                />
              </Box>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              {/* Submit Button */}
              <div className=" flex justify-center items-center mt-4">
                <div className="pl-2 w-full " >
                  <button
                    className=" py-2 px-6 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition duration-300 w-full"
                    type="submit"
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>

              </div>

              {/* Success & Error Messages */}
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

              {/* Forgot Password */}

            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;