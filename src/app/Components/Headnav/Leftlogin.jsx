import React from "react";

const Leftlogin = () => {
  return (
    <div>
      <a 
        href="#" 
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-5 py-3"
      >
        <img 
          className="object-cover w-full rounded-t-lg h-90 md:h-auto md:w-80 md:rounded-none md:rounded-s-lg" 
          src="image/02.jpg" 
          alt="Technology acquisitions"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ระบบกองทุนกู้ยืมเพื่อการศึกษา
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            สร้างขึ้นเพื่อเก็บข้อมูลการทำกิจกรรมจิตอาสาของนักศึกษา 
          </p>
        </div>
      </a>
    </div>
  );
};

export default Leftlogin;
