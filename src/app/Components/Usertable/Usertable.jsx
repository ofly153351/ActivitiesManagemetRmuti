'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
function Usertable() {

    const [searchQuery, setSearchQuery] = useState('');

    const persons = [
        {
            id: "65172310303-5",
            firstName: 'peerapat',
            lastname: 'klintan',
            hour: '80/100',
        },
        {
            id: "65172310303-2",
            firstName: 'peerapat',
            lastname: 'klintan',
            hour: '12/100',
        }
    ];

    const filteredPersons = persons.filter(person =>
        person.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flex w-screen h-screen'>
            <div className="mx-40 py-16 mt-20 ">
                <span className='font-kanit p-4 text-[45px] border-b-[2px] border-gray-200 '>รายชื่อนักศึกษา</span>
                <div className='mt-10 flex  items-center ' >
                    <div className='border-[1px] px-2 py-[7.5px] rounded-l-lg focus:border-0 border-r-0 border-gray-150 w-fit' >
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="border-[1px] border-gray-150 border-l-0 px-4 py-2 w-[240px] rounded-r-lg"
                        placeholder="Search for items"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="mt-4 border-[1px] rounded-xl border-gray-200 shadow-lg">
                    <table className='w-[1150px] text-sm bg-white'>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr className='text-center text-sm'>
                                <th scope="col" className="px-6  font-kanit py-4">
                                    รหัสนักศึกษา
                                </th>
                                <th scope="col" className="px-6  font-kanit py-4">
                                    ชื่อ
                                </th>
                                <th scope="col" className="px-6  font-kanit py-4">
                                    นามสกุล
                                </th>
                                <th scope="col" className="px-6  font-kanit py-4">
                                    ชั่วโมงกิจกรรม
                                </th>
                                <th scope="col" className="px-6  font-kanit py-4">
                                    การจัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {persons.map((person) => (
                                <tr key={person.id} className="bg-white border-b dark:border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="px-6 font-kanit py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {person.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {person.firstName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.lastname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.hour}
                                    </td>
                                    <td className='items-center gap-5'>
                                        <Link className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' href="/Admin/View"><VisibilityIcon /></Link>
                                        <Link className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' href='/Admin/Edit' ><EditIcon /></Link>
                                        <button className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' ><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Usertable