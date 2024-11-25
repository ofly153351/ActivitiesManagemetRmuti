'use client';

import React, { useState, useEffect } from 'react';
import Nav from '../../../Components/Nav';
import CustomTextfield from '@/app/Components/Textfield';
import Customselect from '../../../Components/Customselect';
import EditIcon from '@mui/icons-material/Edit';
import BasicButtons from '@/app/Components/BasicButtons';
import textfieldWidth from '@/app/Utils/textfieldWidth'
function Page() {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    studentCode: '',
    phone: '',
    email: '',
    faculty: '',
    branch: '',
    year: '',
  });

  const [selectedValueFaculty, setSelectedValueFaculty] = useState('');
  const [selectedValueBranch, setSelectedValueBranch] = useState('');

  const [isClient, setIsClient] = useState(false); // เพื่อป้องกันปัญหา Hydration

  useEffect(() => {
    setIsClient(true); // จะทำให้ render ทุกอย่างใน client หลังจากโหลดเสร็จ
  }, []);

  const faculty = [
    { value: '1700', label: 'Science' },
    { value: '1800', label: 'Engineering' },
    { value: '1900', label: 'Arts' },
  ];

  const branch = [
    { value: '1701', label: 'Computer Science' },
    { value: '1801', label: 'Computer Engineering' },
  ];

  const year = [
    { value: '1', label: 'ปี1' },
    { value: '2', label: 'ปี2' },
    { value: '3', label: 'ปี3' },
    { value: '4', label: 'ปี4' },
  ];

  const label = {
    title: 'คำนำหน้า',
    firstName: 'ชื่อจริง',
    lastName: 'นามสกุล',
    studentCode: 'รหัสนักศึกษา',
    phone: 'เบอร์โทร',
    branch: 'สาขา',
    faculty: 'คณะ',
    year: 'ปีการศึกษา',
    email: 'อีเมล',
  };

  const handleSelectChangeFaculty = (value) => {
    setSelectedValueFaculty(value);
  };

  const handleSelectedChangeBranch = (value) => {
    setSelectedValueBranch(value);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isClient) return null; // รอจนกว่า component จะพร้อมก่อน render UI

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-center">
        <div className="mt-40 p-4 rounded-sm border-[1px] border-gray-200 w-[750px] shadow-md">
          <div className="mb-1">
            <span className="w-full px-3 py-2 font-kanit text-[32px] flex items-center gap-2">
              แก้ไขข้อมูลส่วนตัว
              <EditIcon sx={{ fontSize: 'lg' }} />
            </span>
          </div>
          <div className="h-full w-full ml-1 flex flex-wrap items-center">
            <div className="flex">
              <CustomTextfield
                label={label.title}
                width={textfieldWidth.sm}
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
              <CustomTextfield
                label={label.firstName}
                width={textfieldWidth.md}
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
              <CustomTextfield
                label={label.lastName}
                width={textfieldWidth.md}
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
            <div>
              <CustomTextfield
                label={label.email}
                width={textfieldWidth.xl}
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div className="flex">
              <CustomTextfield
                label={label.studentCode}
                width={textfieldWidth.md}
                value={formData.studentCode}
                onChange={(e) => handleInputChange('studentCode', e.target.value)}
              />
              <CustomTextfield
                label={label.phone}
                width={textfieldWidth.md}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              <Customselect
                width={textfieldWidth.sm}
                label={label.year}
                value={formData.year}
                onChange={(value) => handleInputChange('year', value)}
                options={year}
              />
            </div>
            <div className="flex">
              <Customselect
                width={textfieldWidth.lg}
                label={label.faculty}
                value={selectedValueFaculty}
                onChange={handleSelectChangeFaculty}
                options={faculty}
              />
              <Customselect
                width={textfieldWidth.lg}
                label={label.branch}
                value={selectedValueBranch}
                onChange={handleSelectedChangeBranch}
                options={branch}
              />
            </div>
          </div>
          <div className="flex justify-end items-center p-3">
            <BasicButtons
              name={'ยืนยันการแก้ไข'}
              onClick={() => {
                alert('ข้อมูลที่แก้ไข: ' + JSON.stringify(formData));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;