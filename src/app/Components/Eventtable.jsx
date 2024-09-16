'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { filterEvent } from '../Utils/handler'
function Eventtable() {

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const itemsPerPage = 5;

    const events = [
        {
            id: '1',
            Name: "กวาดวัด",
            credit: "10",
            slots: "99/100",
            description: "อย่าไปต่อยพระ"
        },
        // Add more events as needed
    ];

    const filteredEvents = filterEvent(events , searchQuery)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleView = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="bg-slate-50 w-full h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-11/12 max-w-5xl">
                <span className='font-kanit p-4 text-[45px] border-b-[2px] border-gray-200'>รายชื่อกิจกรรม</span>
                <div className='mt-10 flex items-center'>
                    <div className='border-[1px] px-2 py-[7.5px] rounded-l-lg border-r-0 border-gray-150 w-fit'>
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="border-[1px] border-gray-150 border-l-0 px-4 py-2 w-[240px] rounded-r-lg font-kanit"
                        placeholder="ค้นหาด้วยชื่อกิจกรรม"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="mt-4 border-[1px] rounded-xl border-gray-200 shadow-lg font-kanit">
                    <table className='w-full text-sm bg-white'>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr className='text-center text-sm'>
                                <th scope="col" className="px-6 font-kanit py-4">รหัสกิจกรรม</th>
                                <th scope="col" className="px-6 font-kanit py-4">ชื่อกิจกรรม</th>
                                <th scope="col" className="px-6 font-kanit py-4">เครดิต</th>
                                <th scope="col" className="px-6 font-kanit py-4">จำนวนที่นั่ง</th>
                                <th scope="col" className="px-6 font-kanit py-4">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {currentItems.map((event) => (
                                <tr key={event.id} className="bg-white border-b dark:border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="px-6 font-kanit py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {event.id}
                                    </th>
                                    <td className="px-6 py-4">{event.Name}</td>
                                    <td className="px-6 py-4">{event.credit}</td>
                                    <td className="px-6 py-4">{event.slots}</td>
                                    <td className='flex justify-center gap-3 py-4'>
                                        <button className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' onClick={() => handleView(event)} aria-label="View"><VisibilityIcon style={{ color: "green" }} /></button>
                                        <Link className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' href='/Admin/Edit' aria-label="Edit"><EditIcon style={{ color: "#FFC300" }} /></Link>
                                        <button className='px-2 py-2 rounded-full hover:bg-blue-50 transition duration-500' aria-label="Delete"><DeleteIcon style={{ color: "red" }} /></button>
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

            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transform transition-all duration-300 scale-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-kanit text-gray-700">ข้อมูลกิจกรรม</h2>
                            <button onClick={closeModal} aria-label="Close">
                                <CloseIcon className="text-gray-600 hover:text-gray-800 transition duration-300" />
                            </button>
                        </div>
                        <div className="mb-4">
                            <p><strong>รหัสกิจกรรม:</strong> {selectedEvent.id}</p>
                            <p><strong>ชื่อกิจกรรม:</strong> {selectedEvent.Name}</p>
                            <p><strong>เครดิต:</strong> {selectedEvent.credit}</p>
                            <p><strong>จำนวนที่นั่ง:</strong> {selectedEvent.slots}</p>
                            <p><strong>รายละเอียด:</strong> {selectedEvent.description}</p>
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

export default Eventtable;