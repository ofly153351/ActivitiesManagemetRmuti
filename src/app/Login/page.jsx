import React from "react";
import Nav from "../Components/Headnav/Nav";
import Leftlogin from "../Components/Headnav/Leftlogin";


function page() {
  return (
    <div>
    <Nav />
    <div className="flex flex-row mx-3  gap-3 min-h-[700px]">
      <div className="basis-3/5 rounded-2xl flex justify-center items-center">
        <Leftlogin />
      </div>
      <div className="basis-2/5 bg-[#d1d5db] rounded-2xl flex justify-center items-center	flex-col gap-6 border border-black">
        <div className="text-5xl font-bold ">LOGIN</div>

        <div className="input flex flex-col w-fit static">
          <label
            htmlFor="input"
            className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
          >
            อีเมล:
          </label>
          <input
            id="email"
            type="email"
            placeholder=""
            name="input"
            className="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[400px] focus:outline-none placeholder:text-black/25"
          />
        </div>

        <div className="input flex flex-col w-fit static">
          <label
            htmlFor="input"
            className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
          >
            รหัสผ่าน:
          </label>
          <input
            id="password"
            type="password"
            placeholder=""
            name="input"
            className="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[400px] focus:outline-none placeholder:text-black/25"
          />
        </div>

        <button
          className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Login
        </button>
      </div>
    </div>
  </div>
  )
}

export default page
