'use client'
import Nav from '../../Components/Nav'
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Activity from '../../Components/Activity';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



function Page() {
    const [searchQuery, setSearchQuery] = useState(''); // เพิ่ม state สำหรับคำค้นหา
    // const [loading, setLoading] = useState(true);



    const Manu = [
        { selectName: "เวลา", SelectValue: "เวลา" },
        { selectName: "วันที่", SelectValue: "วันที่" },
        { selectName: "ชั่วโมง", SelectValue: "ชั่วโมง" },


    ]

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // แทนที่ URL ของ API ของคุณที่นี่
    //             await axios.get('/api/activities');
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);


    // if (loading) {
    //     return (
    //         <div className="w-screen  bg-white border-b-2 border-[#0067B3] shadow-md flex justify-center px-10 items-center fixed z-10">
    //             <Box sx={{ display: 'flex' }}>
    //                 <CircularProgress />
    //             </Box>
    //         </div>
    //     );
    // }

    return (
        <>
            <Nav />
            <div className='flex'>
                <div className='w-full m-20 '>
                    <div className="px-10 py-16 w-[650px]">
                        <h1 className='font-kanit text-[45px] text-shadow-sm border-b-[2px]'>กิจกรรมที่สามารถลงทะเบียนได้</h1>
                    </div>
                    <div className='border-b-2 p-4 mx-4'>
                        <form className="flex justify-end items-center mr-[60px] gap-3">
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
                                    className='w-[400px] border-[1px] p-1.5 font-kanit rounded-br-lg rounded-tr-lg' />
                            </div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="เรียงตาม" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Manu.map((item, index) => (
                                            <SelectItem key={index} value={item.SelectValue}>{item.selectName}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </form>
                    </div>
                    <Activity searchQuery={searchQuery} /> {/* ส่ง searchQuery ไปยัง Activity */}
                </div>
            </div>
            {/* <Footter /> */}
        </>
    );
}

export default Page;