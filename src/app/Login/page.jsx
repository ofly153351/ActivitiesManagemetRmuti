'use client';
import React from "react";
import Nav from "../Components/Headnav/Nav";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password
      };

      const res = await axios.post('http://localhost:8000/login', payload);
      if (res.status === 200) {
        alert("SignIn Successfully")
        router.push('/Home')
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      if (error.response) {
        alert(`Sign In Failed: ${error.response.data.message}`);
      } else {
        alert('Sign In Failed: An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-center w-screen h-screen">
        <div>
          <div className="flex mt-16 bg-blue-300 w-[960px] h-[500px] rounded-[12px] shadow-2xl">
            <div className="left flex justify-center items-center w-[480px]">
              <img className="p-6" src="https://www.studentloan.or.th/th/system/files/files/knowledgemedia/%E0%B8%81%E0%B8%A2%E0%B8%A8-01.png" alt="Sign In" />
            </div>
            <div className="right bg-slate-100 rounded-r-[12px] shadow-2xl w-[480px] gap-7 ">
              <form className="p-4 h-full flex flex-col justify-center items-center relative" onSubmit={handleSubmit(onSubmit)}>
                <div className="text-[35px] text-center font-mono font-bold py-7 text-gray-700">
                  Sign In!
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
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="flex justify-center items-center mt-5">
                  <button
                    className="py-2 px-6 bg-blue-500 rounded-md text-white hover:bg-blue-800 transition duration-300"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
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