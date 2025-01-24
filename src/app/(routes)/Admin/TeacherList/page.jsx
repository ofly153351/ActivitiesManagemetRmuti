'use client'
import CustomTable from '@/app/Components/CustomTable'
import Loading from '@/app/Components/Loading'
import Nav from '@/app/Components/Nav'
import { getAllteacher } from '@/app/Utils/api'
import React, { useEffect, useState } from 'react'

function page() {
    const title = 'รายชื่อนักศึกษาในระบบ'
    const [allUser, setAlluser] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllteacher()
                console.log('ข้อมูลที่ได้:', response.data);
                setAlluser(response.data)

            } catch (error) {
                console.log('error:', error.message);
            } finally {
                setLoading(false)

            }

        };
        fetchData()
    }, [])


    console.log(allUser);

    const columns = [
        { headerName: 'รหัส', field: 'code' },
        // {headerName : 'คำนำหน้า' , field: 'title_name'},
        { headerName: 'ชื่อจริง', field: 'first_name' },
        { headerName: 'นามสกุล', field: 'last_name' },
        { headerName: 'เบอร์โทร', field: 'phone' },

    ]
    return (
        <>
            <div className='min-h-screen bg-gray-50' >
                <Nav />
                <div className='flex justify-center items-center bg-gray-50'>
                    <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                        <h1 className='text-[52px] text-shadow-md p-10'>{title}</h1>
                        {loading ? (
                            <div className='flex justify-center items-center' >
                                <div className='mt-40 px-10 h-[400px]' >
                                    <Loading />
                                </div>
                            </div>
                        ) : (
                            <CustomTable columns={columns} rows={allUser} entity='รายชื่อนักศึกษา' />
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default page