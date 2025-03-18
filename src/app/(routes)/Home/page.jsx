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
                <div className='w-full lg:mx-20 md:mx-10 xs:m-0'>
                    <div className="lg:px-0 md:px-0 xs:p-8 xs:pl-6 lg:py-16 lg:w-full xs:mt-20">
                        <h1 className='font-kanit lg:text-[45px] md:text-[40px] text-shadow-sm border-b-[2px] xs:w-fit xs:text-[22px] lg:mx-4'>กิจกรรมที่สามารถลงทะเบียนได้</h1>
                    </div>
                    <div className='xs:mx-2  border-b-2 lg:p-4 xs:p-3 flex justify-end  lg:items-end lg:mx-6'>
                        <form className="flex lg:justify-end lg:items-center lg:mr-[60px] xs:mr-0 gap-3">
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
                            <Select>
                                <SelectTrigger className="xs:w-[100px]  w-[180px]">
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
                    <div className='xs:mx-2' >
                        <Activity searchQuery={searchQuery} />

                    </div>
                </div>
            </div>
            {/* <Footter /> */}
        </>
    );
}

export default Page;