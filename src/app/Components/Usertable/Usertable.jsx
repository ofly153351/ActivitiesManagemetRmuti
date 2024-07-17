'use client'
import React from 'react'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function Usertable() {
    let person = {
        id : 65172310303-5,
        firstName : 'peerapat',
        lastname : 'klintan',
        hour : '80/100',
    }
    console.log(person.firstName);
    return (
        <div className='flex w-screen h-screen'>
            <div className="mx-40 py-16 mt-20 ">
                <span className='font-sans p-4 text-[45px] border-b-[2px] border-gray-200 '>รายชื่อนักศึกษา</span>
                <div className="mt-10 border-[1px] rounded-xl  ">
                    <table className='w-[1200px] rounded-xl'>
                        <thead className=' bg-gray-100 ' >
                            <tr className='border-b-2' >
                                <th className='p-4 rounded-tl-lg' >
                                    รหัสนักศึกษา
                                </th>
                                <th className='p-4' >
                                    ชื่อ
                                </th>
                                <th className='p-4' >
                                    นามสกุล
                                </th>
                                <th className='p-4' >
                                    จำนวนชั่วโมงจิตอาสา
                                </th>
                                <th className='p-4 w-' >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-center' >
                            <tr className='border-b-2 ' >
                                <td className='p-4'>
                                    65172310303-5
                                </td>
                                <td>
                                    พีรพัทธ
                                </td>
                                <td>
                                    กลิ่นตัน
                                </td>
                                <td>
                                    80/100
                                </td>
                                <td className=' items-center gap-5'>
                                    <Link className='px-2 ' href="/Admin/View"><VisibilityIcon/></Link>
                                    <Link className='px-2' href='/Admin/Edit' ><EditIcon/></Link>
                                    <button className='px-2' ><DeleteIcon/></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Usertable