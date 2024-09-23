'use client'
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { filterUser } from '../Utils/handler';
import ViewPopup from './viewPopup';
import EditPopup from './editPopup';

function Usertable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedEditUser, setSelectedEditUser] = useState(null)
    const itemsPerPage = 5;

    const persons = [
        { id: "65172310303-5", firstName: 'Peerapat', lastname: 'Kla', hour: '80/100' },
        { id: "65172310303-2", firstName: 'Kla', lastname: 'Klintan', hour: '12/100' },
        // (Additional person objects here)
    ];

    const filteredPersons = filterUser(persons, searchQuery);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPersons.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleView = (person) => {
        setSelectedUser(person);
    };

    const handleEdit = (person) => {
        setSelectedEditUser(person);

        // เปลี่ยนแปลงเพื่อลดจำนวน state
    };

    const handleDelete = (id) => {
        // ลบผู้ใช้จาก `persons` ตาม ID
        // อาจจะต้องใช้ setPersons() เพื่ออัปเดต state ของรายการ
    };

    const handleClose = () => {
        setSelectedUser(null);
        setSelectedEditUser(null)
    };

    return (
        <div className="bg-slate-50 w-full h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-11/12 max-w-5xl">
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
                    <table className='w-full text-sm bg-white'>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr className='text-center text-sm'>
                                <th className="px-6 py-4">รหัสนักศึกษา</th>
                                <th className="px-6 py-4">ชื่อ</th>
                                <th className="px-6 py-4">นามสกุล</th>
                                <th className="px-6 py-4">ชั่วโมงกิจกรรม</th>
                                <th className="px-6 py-4">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {currentItems.map((person) => (
                                <tr key={person.id} className="bg-white border-b dark:border-gray-200 hover:bg-gray-50">
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{person.id}</th>
                                    <td className="px-6 py-4">{person.firstName}</td>
                                    <td className="px-6 py-4">{person.lastname}</td>
                                    <td className="px-6 py-4">{person.hour}</td>
                                    <td className='flex justify-center gap-3 py-4'>
                                        <button className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' onClick={() => handleView(person)} aria-label="View">
                                            <VisibilityIcon style={{ color: "green" }} />
                                        </button>
                                        <button className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' onClick={() => handleEdit(person)} aria-label="Edit">
                                            <EditIcon style={{ color: "#FFC300" }} />
                                        </button>
                                        <button className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' onClick={() => handleDelete(person.id)} aria-label="Delete">
                                            <DeleteIcon style={{ color: "red" }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* //pageination */}
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
            {selectedUser && (
                <>
                    <ViewPopup selectedUser={selectedUser} closeModal={handleClose} />
                </>
            )}
            {selectedEditUser && (
                <>
                    <EditPopup selectedEditUser={selectedEditUser} closeModal={handleClose} />
                </>
            )}
        </div>
    );
}

export default Usertable;