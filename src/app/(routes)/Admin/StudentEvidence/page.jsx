'use client'
import Loading from '@/app/Components/Loading'
import Nav from '@/app/Components/Nav'
import React, { useState, useEffect } from 'react'
import CustomTable from '@/app/Components/CustomTable'
import { getStudentEvidence } from '@/app/Utils/api'
import EvidancedDialog from '@/app/Components/Evidenced/EvidancedDialog'
import { SuccessAlert } from '@/app/Components/AlertShow'
import { blockNulluser } from '@/app/Utils/block'
import { useStore } from '@/store/useStore'

function page() {

    const title = 'รายชื่อนักศึกษาที่ส่งเอกสาร'
    const [loading, setLoading] = React.useState(false)
    const [studentEvidence, setStudentEvidence] = useState([])
    const [open, setOpen] = React.useState(false);
    const [userID, setUserID] = useState('');
    const [years, setYears] = useState('')
    const [openAlert, setOpenAlert] = useState({ status: false, message: '' });
    const { user } = useStore()

    useEffect(() => {
        // blockNulluser(user)
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getStudentEvidence();
                setStudentEvidence(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])




    const handleOpenAlert = () => {
        setOpenAlert({ status: true, message: 'บันทึกข้อมูลเรียบร้อยแล้ว' });

        setTimeout(() => {
            setOpenAlert({ status: false, message: '' });
        }, 3000);
    }


    const sortedStudentEvidence = (studentEvidence?.length > 0)
        ? studentEvidence.sort((a, b) => a.code.localeCompare(b.code))
        : [];


    const columns = [
        { headerName: 'รหัสนักศึกษา', field: 'code' },
        {
            headerName: 'ชื่อ-นามสกุล',
            valueGetter: ({ data }) => `${data.first_name} ${data.last_name}`, // ✅ รวมชื่อที่นี่
        },
        { headerName: 'คณะ', field: 'faculty_name' },
        { headerName: 'สาขา', field: 'branch_name' },
        { headerName: 'หลักฐานการส่ง', field: 'evidence' },

    ];


    return (
        <div className="bg-gray-50 h-screen">
            <Nav />
            <div className="flex justify-center items-center bg-gray-50 min-h-screen">
                <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md">
                    <h1 className="text-[52px] text-shadow-md p-10">{title}</h1>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="mt-40 px-10 h-[400px]">
                                <Loading />
                            </div>
                        </div>
                    ) : (
                        <CustomTable
                            rows={sortedStudentEvidence}
                            columns={columns}
                            entity="กิจกรรม"
                            setOpenEvidence={setOpen}
                            setUserID={setUserID}
                            setYears={setYears}
                        />
                    )}
                </div>
            </div>
            <EvidancedDialog
                userID={userID}
                open={open}
                setOpen={setOpen}
                years={years}
                setOpenAlert={handleOpenAlert}
            />
            {openAlert.status === true && openAlert.message !== '' && (
                <div className='fixed right-4 bottom-4 z-50'>
                    <SuccessAlert label={openAlert.message} />
                </div>
            )}
        </div>
    )
}

export default page