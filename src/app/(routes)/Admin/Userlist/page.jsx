'use client'
import React, { use, useEffect, useState } from 'react'
import Nav from '@/app/Components/Nav'
import CustomTable from '@/app/Components/CustomTable'
import { getAllUser } from '@/app/Utils/api'
import Loading from '@/app/Components/Loading'
import useStore from '@/store/useStore'
import { all } from 'axios'
import { blockNulluser } from '@/app/Utils/block'
blockNulluser

function page() {
    const title = 'รายชื่อนักศึกษาในระบบ'
    const [allUser, setAlluser] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useStore()
    useEffect(() => {
        blockNulluser(user)
        const fetchData = async () => {
            try {
                const response = await getAllUser()
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



    if (allUser.length > 0 && allUser[0]?.branch?.faculty_id !== undefined) {
        console.log(allUser[0].branch.faculty_id); // จะพิมพ์ 5
    } else {
        console.log("ข้อมูลไม่ครบถ้วนหรือว่างเปล่า");
    }

    const columns = [
        { headerName: 'รหัสนักศึกษา', field: 'code' },
        // {headerName : 'คำนำหน้า' , field: 'title_name'},
        { headerName: 'ชื่อจริง', field: 'first_name' },
        { headerName: 'นามสกุล', field: 'last_name' },
        //     {headerName : 'เบอร์โทร' , field: 'phone'},
        //     {headerName : 'ปีการศึกษา' , field: 'years'},
        {
            headerName: 'คณะ',
            field: 'faculty_name',
        },
        { headerName: 'สาขา', field: 'branch_name' },
        { headerName: 'เบอร์โทร', field: 'phone' },

    ]

    const sortedByCode = allUser.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
    });

    console.log(allUser);


    return (



        <>
            <div className='min-h-screen bg-gray-50' >
                <Nav />
                <div className='h-screen flex justify-center items-center bg-gray-50'>
                    <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                        <h1 className='text-[52px] text-shadow-md p-10'>{title}</h1>
                        {loading ? (
                            <div className='flex justify-center items-center' >
                                <div className='mt-40 px-10 h-[400px]' >
                                    <Loading />
                                </div>
                            </div>
                        ) : (
                            <CustomTable columns={columns} rows={sortedByCode} entity='รายชื่อนักศึกษา' />
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default page