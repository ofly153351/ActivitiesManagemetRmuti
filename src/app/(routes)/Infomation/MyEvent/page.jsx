'use client'
import CustomTable from '@/app/Components/CustomTable'
import Loading from '@/app/Components/Loading'
import Nav from '@/app/Components/Nav'
import ShowDialogTable from '@/app/Components/ShowDialogTable'
import React, { useState } from 'react'
Loading
function page() {
    const title = 'กิจกรรมของฉัน'
    const [loading, setLoading] = useState(false)
    
    // const columns = [
    //     {headerName : }
    // ]

    return (
        <div className="bg-gray-50 h-screen">
            <Nav />
            <div className="flex justify-center items-center bg-gray-50">
                <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                    <h1 className="text-[52px] text-shadow-md p-10">{title}</h1>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="mt-40 px-10 h-[400px]">
                                <Loading />
                            </div>
                        </div>
                    ) : (
                        <CustomTable />
                    )}
                </div>
            </div>

        </div>



    )
}

export default page