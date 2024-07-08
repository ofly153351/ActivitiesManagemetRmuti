import React from "react";
import Nav from "../Components/Headnav/Nav";
import Leftlogin from "../Components/Headnav/Leftlogin";

const page = () => {
  return (
    <div>
      <Nav />
      <div className="flex flex-row mx-3 my-10 gap-3 min-h-[700px]">
        <div className="basis-3/5 rounded-2xl flex justify-center items-center">
          <Leftlogin />
        </div>
        <div className="basis-2/5 bg-[#d1d5db] rounded-2xl flex justify-center items-center	flex-col gap-1 border border-black">
          <div className="text-5xl font-bold my-3">REGISTER</div>
          <div className="flex gap-1 ">
            <div className="input flex flex-col w-fit static">
              <label
                htmlFor="select"
                className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
              >
                คำนำหน้า:
              </label>
              <select
                id="title"
                name="select"
                className="border-blue-500 input px-[10px] py-[13px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[100px] focus:outline-none"
              >
                <option value="">-</option>
                <option value="option1">นาย</option>
                <option value="option2">นาง</option>
                <option value="option2">นางสาว</option>
              </select>
            </div>

            <div className="input flex flex-col w-fit static">
              <label
                for="input"
                class="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
              >
                ชื่อ:
              </label>
              <input
                id="fname"
                type="text"
                placeholder=""
                name="input"
                class="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[150px] focus:outline-none placeholder:text-black/25"
              />
            </div>
            <div className="input flex flex-col w-fit static">
              <label
                for="input"
                class="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
              >
                นามสกุล:
              </label>
              <input
                id="lname"
                type="text"
                placeholder=""
                name="input"
                class="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[150px] focus:outline-none placeholder:text-black/25"
              />
            </div>
          </div>
          <div className="input flex flex-col w-fit static">
            <label
              for="input"
              class="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
            >
              เบอร์:
            </label>
            <input
              id="phone"
              type="text"
              placeholder=""
              name="input"
              class="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[400px] focus:outline-none placeholder:text-black/25"
            />
          </div>
          <div className="input flex flex-col w-fit static">
            <label
              for="input"
              class="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
            >
              รหัสนักศึกษา:
            </label>
            <input
              id="stdid"
              type="text"
              placeholder=""
              name="input"
              class="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[400px] focus:outline-none placeholder:text-black/25"
            />
          </div>
          <div className="input flex flex-col w-fit static">
            <label
              for="input"
              class="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
            >
              อีเมล:
            </label>
            <input
              id="email"
              type="email"
              placeholder=""
              name="input"
              class="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[400px] focus:outline-none placeholder:text-black/25"
            />
          </div>
          <div className="input flex flex-col w-fit static">
            <label
              for="input"
              class="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
            >
              รหัสผ่าน:
            </label>
            <input
              id="password"
              type="password"
              placeholder=""
              name="input"
              class="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[400px] focus:outline-none placeholder:text-black/25"
            />
          </div>
          <div className="input flex flex-col w-fit static">
            <label
              for="input"
              class="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
            >
              ยืนยันรหัสผ่าน:
            </label>
            <input
              id="password"
              type="password"
              placeholder=""
              name="input"
              class="border-blue-500 input px-[10px] py-[11px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[400px] focus:outline-none placeholder:text-black/25"
            />
          </div>
          <div className="flex gap-1 ">
            <div className="input flex flex-col w-fit static">
              <label
                htmlFor="select"
                className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
              >
                คณะ:
              </label>
              <select
                id="faculty"
                name="select"
                className="border-blue-500 input px-[10px] py-[13px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[200px] focus:outline-none"
              >
                <option value="">-</option>
                <option value="option1">M</option>
                <option value="option2">M</option>
                <option value="option2">M</option>
              </select>
            </div>
            <div className="input flex flex-col w-fit static">
              <label
                htmlFor="select"
                className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
              >
                สาขา:
              </label>
              <select
                id="field"
                name="select"
                className="border-blue-500 input px-[10px] py-[13px] text-md bg-[#e8e8e8] border-2 rounded-[5px] w-[200px] focus:outline-none"
              >
                <option value="">-</option>
                <option value="option1">Mr.</option>
                <option value="option2">Ms.</option>
                <option value="option2">Mrs.</option>
              </select>
            </div>
          </div>

          <button
            class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
