'use client'
import Nav from "./Components/Nav";
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getMyEventStudent, getMyEventStudentWithOutYear } from "./Utils/api";
import Loading from "./Components/Loading";
import { useStore } from "@/store/useStore";
import Activity from "./Components/Activity";


function Page() {
    const [searchQuery, setSearchQuery] = useState(''); // เพิ่ม state สำหรับคำค้นหา
    const [loading, setLoading] = useState(true);
    const { myEventList, setMyEventList, user } = useStore()
    const [selectedValue, setSelectedValue] = useState('');

    const Manu = [
        { selectName: "วันที่ไกล้เริ่ม", SelectValue: "date" },
        { selectName: "ชั่วโมงกิจกรรม(มาก-น้อย)", SelectValue: "hour" },
    ]

    const d = new Date();
    let year = d.getFullYear();

    useEffect(() => {
        if (user?.role === 'student') {
            const fetchData = async () => {
                try {
                    const response = await getMyEventStudentWithOutYear();
                    setMyEventList(response?.data || []);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }
        setLoading(false)
    }, []);

    // console.log(myEventList);
    // console.log(searchQuery);

    console.log(myEventList);




    if (loading) {
        return <div className='flex justify-center items-center min-h-screen p-20' ><Loading /></div>
    }

    return (
        <>
            <Nav />
            <div className='flex'>
                <div className='w-full lg:mx-20 md:mx-10  mb-10'>
                    <div className="lg:px-0 md:px-0 xs:p-8 xs:pl-6 lg:py-16 lg:w-full xs:mt-20">
                        <h1 className='font-kanit lg:text-[45px] md:text-[40px] text-shadow-sm border-b-[2px] xs:w-fit xs:text-[22px] lg:mx-4'>กิจกรรมที่สามารถลงทะเบียนได้</h1>
                    </div>
                    <div className='xs:mx-2  border-b-2 lg:p-4 xs:p-3 flex justify-end  lg:items-end lg:mx-6'>
                        <form className="flex lg:justify-end lg:items-center  xs:mr-0 gap-3">
                            <div className='flex' >
                                <button className="border-b-[1px] border-l-[1px] border-t-[1px] w-10 rounded-tl-lg rounded-bl-lg hover:bg-gray-100">
                                    <SearchIcon fontSize='' />
                                </button>
                                <input
                                    type="search"
                                    name="search-form"
                                    id="search-form"
                                    onChange={(e) => setSearchQuery(e.target.value)} // จัดการการเปลี่ยนแปลงคำค้นหา
                                    placeholder='ค้าหาชื่อกิจกรรม'
                                    className='w-[400px] xs:w-[190px] border-[1px] p-1.5 font-kanit rounded-br-lg rounded-tr-lg' />
                            </div>
                            <Select value={selectedValue} onValueChange={setSelectedValue}>
                                <SelectTrigger className="xs:w-[100px] md:w-[180px]">
                                    <SelectValue placeholder="เรียงตาม" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Manu.map((item, index) => (
                                        <SelectItem key={index} value={item.SelectValue}>
                                            {item.selectName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </form>
                    </div>
                    <div className='xs:mx-2' >
                        <Activity searchQuery={searchQuery} inEvent={myEventList} selectedValue={selectedValue} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Page;