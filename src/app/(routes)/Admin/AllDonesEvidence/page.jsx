'use client'
import CustomTable from '@/app/Components/CustomTable';
import EvidancedDialog from '@/app/Components/Evidenced/EvidancedDialog';
import Loading from '@/app/Components/Loading';
import Nav from '@/app/Components/Nav';
import { getAllStudentDonesEvidence } from '@/app/Utils/api';
import { blockNulluser } from '@/app/Utils/block';
import { checkSessionTimeout } from '@/app/Utils/session';
import { useStore } from '@/store/useStore';
import React, { useEffect, useState } from 'react';



export default function page({ searchParams }) {
    const year = searchParams.year;
    const status = searchParams.status;
    const facultyId = searchParams.faculty_id;
    const title = 'รายชื่อนักศึกษาที่ส่งเอกสาร';
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [userID, setUserID] = useState('');
    const [years, setYears] = useState('');
    const { user } = useStore()
    const [eventID, setEventID] = useState('')


    useEffect(() => {
        // blockNulluser(user)
        checkSessionTimeout()
        const fetchEvidenceData = async () => {
            try {
                const res = await getAllStudentDonesEvidence(Number(year), status, Number(facultyId));
                setData(res.data);
            } catch (error) {
                console.error('Error fetching evidence:', error);
            } finally {
                setLoading(false);
            }
        };

        if (year && facultyId) {
            fetchEvidenceData();
        }
    }, [year, facultyId, status]);

    console.log(data);


    const columns = [
        { headerName: 'รหัสนักศึกษา', valueGetter: (params) => params.data.Student?.code || '-' },
        { headerName: 'ชื่อ', valueGetter: (params) => params.data.Student?.first_name || '-' },
        { headerName: 'นามสกุล', valueGetter: (params) => params.data.Student?.last_name || '-' },
        { headerName: 'คณะ', valueGetter: (params) => params.data.Student?.faculty_name || '-' },
        { headerName: 'สาขา', valueGetter: (params) => params.data.Student?.branch_name || '-' },
        { headerName: 'ชั้นปี', valueGetter: (params) => params.data.Student?.year || '-' },
        { headerName: 'หลักฐานการส่ง', field: 'evidence' },
        // { headerName: 'หมายเหตุ', valueGetter: (params) => params.data.remark || '-' },
    ];

    // let a = [1, 2, 3]
    // let b = a
    // b.push(4)

    // console.log(a)


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
                            rows={data}
                            columns={columns}
                            entity="กิจกรรม"
                            setOpenEvidence={setOpen}
                            setUserID={setUserID}
                            setYears={setYears}
                            setEventID={setEventID}
                        />
                    )}
                </div>
            </div>
            <EvidancedDialog
                userID={userID}
                open={open}
                setOpen={setOpen}
                years={year}
            />
        </div>
    );
}