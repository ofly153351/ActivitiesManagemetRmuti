'use client'
import CustomTable from '@/app/Components/CustomTable'
import Footer from '@/app/Components/Footer'
import Loading from '@/app/Components/Loading'
import Nav from '@/app/Components/Nav'
import { getAllteacher } from '@/app/Utils/api'
import { blockNulluser } from '@/app/Utils/block'
import { checkSessionTimeout } from '@/app/Utils/session'
import { useStore } from '@/store/useStore'
import React, { useEffect, useState } from 'react'

function page() {
    const title = 'รายชื่ออาจารย์'
    const [allUser, setAlluser] = useState([])
    const [loading, setLoading] = useState(true)
    const [columns, setColumns] = useState([])
    const { user } = useStore()
    const { userRoleHash, initUserRoleHash } = useStore()
    // ตรวจสอบว่าเราอยู่ในฝั่ง client

    console.log(user);


    useEffect(() => {
        initUserRoleHash()
    }, [userRoleHash])


    useEffect(() => {
        // blockNulluser(user)
        checkSessionTimeout()
        if (user) {
            const fetchData = async () => {
                try {
                    const response = await getAllteacher()
                    console.log('ข้อมูลที่ได้:', response.data);
                    // กรองข้อมูล เอา user_id ที่ไม่ตรงกับ user ปัจจุบันเท่านั้น
                    const filteredUsers = response.data.filter(u => u.user_id !== user.user_id);


                    setAlluser(filteredUsers);
                } catch (error) {
                    console.log('error:', error.message);
                } finally {
                    setLoading(false)

                }
            };
            fetchData()
            if (userRoleHash === 'admin' || userRoleHash === 'superadmin') {
                setColumns([
                    { headerName: 'รหัส', field: 'code' },
                    { headerName: 'ชื่อจริง', field: 'first_name' },
                    { headerName: 'นามสกุล', field: 'last_name' },
                    { headerName: 'เบอร์โทร', field: 'phone' },
                    { headerName: 'ระดับ', field: 'level' },
                ])
            }
            if (userRoleHash === 'teacher') {
                setColumns([
                    { headerName: 'รหัส', field: 'code' },
                    { headerName: 'ชื่อจริง', field: 'first_name' },
                    { headerName: 'นามสกุล', field: 'last_name' },
                    { headerName: 'เบอร์โทร', field: 'phone' },
                ])
            }
        }
    }, [])




    const sortedByCode = allUser.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
    });






    return (
        <>
            <Nav />
            <div className='min-h-screen  bg-gray-50' >
                <div className='flex min-h-screen justify-center items-center bg-gray-50'>
                    <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                        <h1 className='text-[52px] text-shadow-md p-10'>{title}</h1>
                        {loading ? (
                            <div className='flex justify-center items-center' >
                                <div className='mt-40 px-10 h-[400px]' >
                                    <Loading />
                                </div>
                            </div>
                        ) : (
                            <CustomTable columns={columns} rows={sortedByCode} entity='รายชื่ออาจารย์' />
                        )}
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default page