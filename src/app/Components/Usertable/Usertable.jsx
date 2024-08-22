'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function Usertable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);  // State to store selected user
    const itemsPerPage = 10;

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
        },

    ];

    const filteredPersons = persons.filter(person =>
        person.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPersons.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleView = (person) => {
        setSelectedUser(person);  // Set the selected user when view is clicked
    };

    const closeModal = () => {
        setSelectedUser(null);  // Close the popup
    };

    return (
        <div className='flex w-full h-full'>
            <div className="mx-40 py-16 mt-20">
                <span className='font-kanit p-4 text-[45px] border-b-[2px] border-gray-200'>รายชื่อนักศึกษา</span>
                <div className='mt-10 flex items-center'>
                    <div className='border-[1px] px-2 py-[7.5px] rounded-l-lg border-r-0 border-gray-150 w-fit'>
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="border-[1px] border-gray-150 border-l-0 px-4 py-2 w-[240px] rounded-r-lg font-kanit"
                        placeholder="ค้นหาด้วย รหัสนักศึกษาหรือชื่อ"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="mt-4 border-[1px] rounded-xl border-gray-200 shadow-lg font-kanit">
                    <table className='w-[1150px] text-sm bg-white'>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr className='text-center text-sm'>
                                <th scope="col" className="px-6 font-kanit py-4">รหัสนักศึกษา</th>
                                <th scope="col" className="px-6 font-kanit py-4">ชื่อ</th>
                                <th scope="col" className="px-6 font-kanit py-4">นามสกุล</th>
                                <th scope="col" className="px-6 font-kanit py-4">ชั่วโมงกิจกรรม</th>
                                <th scope="col" className="px-6 font-kanit py-4">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {currentItems.map((person) => (
                                <tr key={person.id} className="bg-white border-b dark:border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="px-6 font-kanit py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {person.id}
                                    </th>
                                    <td className="px-6 py-4">{person.firstName}</td>
                                    <td className="px-6 py-4">{person.lastname}</td>
                                    <td className="px-6 py-4">{person.hour}</td>
                                    <td className='flex justify-center gap-3 py-4'>
                                        <button className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' onClick={() => handleView(person)} aria-label="View"><VisibilityIcon style={{ color : "green" }} /></button>
                                        <Link className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' href='/Admin/Edit' aria-label="Edit"><EditIcon  style={{ color:"#FFC300" }} /></Link>
                                        <button className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' aria-label="Delete"><DeleteIcon  style={{ color : "red" }} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-center mt-4'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handleClick(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Popup Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transform transition-all duration-300 scale-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-kanit text-gray-700">ข้อมูลนักศึกษา</h2>
                            <button onClick={closeModal} aria-label="Close">
                                <CloseIcon className="text-gray-600 hover:text-gray-800 transition duration-300" />
                            </button>
                        </div>
                        <div className="mb-4">
                            <p><strong>รหัสนักศึกษา:</strong> {selectedUser.id}</p>
                            <p><strong>ชื่อ:</strong> {selectedUser.firstName}</p>
                            <p><strong>นามสกุล:</strong> {selectedUser.lastname}</p>
                            <p><strong>ชั่วโมงกิจกรรม:</strong> {selectedUser.hour}</p>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            onClick={closeModal}
                        >
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Usertable;