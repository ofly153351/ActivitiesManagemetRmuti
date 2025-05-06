import React, { useEffect, useState, useMemo } from 'react';
import { filterActivities } from '../Utils/handler';
import Accordion from './Acordion';
import { getAllevent, getBranches, getMyEventStudent, getMyEventStudentWithOutYear, joinEvent } from '../Utils/api';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import BasicButtons from './BasicButtons';
import width from '../Utils/textfieldWidth';
import { ErrorAlert, SuccessAlert } from './AlertShow';
import { useStore } from '@/store/useStore';
import Loading from './Loading';

function Activity({ searchQuery, inEvent, selectedValue }) {
    const [activities, setActivities] = useState([]);
    const { user, branchesList, setBranchesList, myEventList } = useStore();
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [eventsInside, setEventsInside] = useState([]);
    const [loading, setLoading] = useState(true);
    const { initUserRoleHash, userRoleHash } = useStore()
    dayjs.locale('th');

    useEffect(() => {
        initUserRoleHash()
    }, [userRoleHash])

    // ฟังก์ชันแปลงวันที่ไทยเป็นวัตถุ Date (โดยไม่ใช้ dayjs)
    const parseTHDate = (dateStr) => {
        try {
            // แยกวันเดือนปีจากสตริง
            const parts = dateStr.split(' ');
            if (parts.length !== 3) return null;

            const day = parseInt(parts[0]);
            const monthName = parts[1];
            let year = parseInt(parts[2]);

            // แมปเดือนไทยเป็นตัวเลข (1-12)
            const monthMap = {
                'มกราคม': 0, 'กุมภาพันธ์': 1, 'มีนาคม': 2, 'เมษายน': 3,
                'พฤษภาคม': 4, 'มิถุนายน': 5, 'กรกฎาคม': 6, 'สิงหาคม': 7,
                'กันยายน': 8, 'ตุลาคม': 9, 'พฤศจิกายน': 10, 'ธันวาคม': 11
            };

            const month = monthMap[monthName];

            if (month === undefined) return null;

            // แปลงปีพุทธศักราชเป็นคริสต์ศักราช
            if (year > 2500) {
                year -= 543;
            }

            return new Date(year, month, day);
        } catch (error) {
            console.error("Error parsing date:", error);
            return null;
        }
    };

    // ฟังก์ชันเพื่อแยกวันที่และเวลา
    const parseDateTime = (dateStr, timeStr) => {
        try {
            const date = parseTHDate(dateStr);
            if (!date) return null;

            if (timeStr) {
                const [hours, minutes] = timeStr.split(':').map(Number);
                date.setHours(hours, minutes);
            }

            return date;
        } catch (error) {
            console.error("Error parsing datetime:", error);
            return null;
        }
    };

    // แยกการกรองและการเรียงลำดับ
    const filteredActivities = useMemo(() => {
        return filterActivities(activities, searchQuery) || [];
    }, [activities, searchQuery]);

    // เรียงลำดับกิจกรรม
    const sortedActivities = useMemo(() => {
        const activeActivities = filteredActivities.filter(activity => activity.status === true);

        if (selectedValue === "hour") {
            return [...activeActivities].sort((a, b) => b.working_hour - a.working_hour);
        }

        const now = new Date();

        const sorted = [...activeActivities].sort((a, b) => {
            const dateA = parseDateTime(a.start_date, a.start_time);
            const dateB = parseDateTime(b.start_date, b.start_time);

            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;

            const diffA = Math.abs(dateA - now);
            const diffB = Math.abs(dateB - now);

            return diffA - diffB;
        });

        return sorted;
    }, [filteredActivities, selectedValue]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // ✅ เริ่มโหลดก่อน

                // ดึงข้อมูลกิจกรรม
                const eventResponse = await getAllevent();
                setActivities(eventResponse.data || []);

                // ดึงข้อมูลสาขา (ถ้ายังไม่มี)
                if (!branchesList || branchesList.length === 0) {
                    const branchResponse = await getBranches();
                    setBranchesList(branchResponse.data || []);
                }

                if (userRoleHash === 'student') {
                    const myEventList = await getMyEventStudentWithOutYear();
                    setEventsInside(myEventList.data.inside_events || []);
                }

                // อื่น ๆ เช่น admin/teacher ไม่ต้องดึง event เพิ่มก็ไม่ต้องทำอะไรเพิ่ม

            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
                setActivities([]);
                setEventsInside([]);
            } finally {
                setLoading(false); // ✅ หยุดโหลดเสมอ หลังจากทุกอย่างทำเสร็จ
            }
        };

        fetchData();
    }, [userRoleHash]);



    // console.log("my", eventsInside);

    // ดึงชื่อสาขาอย่างปลอดภัย
    const getBranchNames = (branchIds) => {
        if (!Array.isArray(branchIds) || !Array.isArray(branchesList ?? [])) {
            return 'ไม่มีสาขา';
        }

        return branchIds
            .map(id => {
                const branch = branchesList.find(b => b.branch_id === id);
                return branch ? branch.branch_name : null;
            })
            .filter(name => name !== null)
            .join(', ') || 'ไม่มีสาขา';
    };

    // จัดการการเข้าร่วมกิจกรรม
    const handleSubmit = async (activityId) => {
        try {
            const response = await joinEvent(Number(activityId));
            setSuccessMessage('ส่งคำขอเข้าร่วมกิจกรรมเรียบร้อยแล้ว');
            setTimeout(() => setSuccessMessage(false), 1000);
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            return response;
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเข้าร่วมกิจกรรม:', error);
            setErrorMessage('ไม่สามารถส่งคำขอเข้าร่วมกิจกรรมได้');
            setTimeout(() => setErrorMessage(false), 3000);
            throw error;
        }
    };
    

    // ตรวจสอบกิจกรรมที่เข้าร่วมแล้ว
    const matchedEventIds = useMemo(() => {
        const safeActivities = sortedActivities || [];
        const safeEventsInside = eventsInside || [];

        return new Set(
            safeActivities
                .map(activity =>
                    safeEventsInside.find(event =>
                        event?.event_id === activity?.event_id
                    )
                )
                .filter(Boolean)
                .map(event => event?.event_id)
                .filter(id => typeof id === 'number')
        );
    }, [sortedActivities, eventsInside]);

    const isMatchingReady = (userRoleHash === 'student') ? (eventsInside.length >= 0) : true;

    console.log("isMatchingReady", isMatchingReady);

    console.log("sortedActivities", sortedActivities);

    console.log("userRole", userRoleHash);

    console.log("eventInside", eventsInside);



    if (!isMatchingReady) return <div className='my-20 w-full h-full justify-center items-center flex' ><Loading /></div>;

    if (loading) {
        return <div>กำลังโหลด...</div>;
    }

    return (
        <div>
            {sortedActivities.length === 0 ? (
                <div className="h-12 flex justify-center items-center text-center text-gray-500">
                    <div>ยังไม่มีกิจกรรมที่เปิดลงทะเบียน</div>
                </div>
            ) : (
                sortedActivities.map((activity, index) => (
                    <div
                        key={activity.event_id || index}
                        className="lg:mx-4 p-4 items-center hover:bg-stone-100 border-b border-gray-200"
                    >
                        <div className="flex xs:w-full">
                            <div className="flex-grow">
                                <div className="text-xl flex justify-between font-kanit">
                                    <div>
                                        ชื่อกิจกรรม: <span className="font-thin">{activity.event_name}</span>
                                    </div>
                                    <div>
                                        จำนวนที่รับ: <span className="font-thin">{activity.free_space === 0 ? 'เต็ม' : `${activity.free_space} คน`}</span>
                                    </div>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    สถานที่: <span className="font-thin">{activity.location}</span>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    จำนวนชั่วโมงกิจกรรมที่จะได้รับ: <span className="font-thin">{activity.working_hour}</span> ชั่วโมง
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    วันที่เริ่มกิจกรรม: <span className="font-thin">{activity.start_date} , เวลา: {activity.start_time} น.</span>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    ชั้นปีที่เปิดรับ: <span className="font-thin">
                                        {activity.allow_all_year || activity.years === null ? 'สามารถเข้าร่วมได้ทุกชั้นปี' : `${activity.years.join(', ')}`}
                                    </span>
                                </div>
                                <div className="flex gap-2 justify-between items-center w-full px-4 py-2 font-kanit">
                                    <div>
                                        {activity.allow_all_branch || activity.branches === null ? (
                                            <div>
                                                สาขาที่เปิดรับ: <span className="font-thin">สามารถเข้าร่วมได้ทุกสาขา</span>
                                            </div>
                                        ) : (
                                            <div>
                                                สาขาที่เปิดรับ: <span className="font-thin">
                                                    {getBranchNames(activity.branches)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {userRoleHash === 'student' && isMatchingReady && (
                                        matchedEventIds.has(activity.event_id) ? (
                                            <BasicButtons
                                                diasble
                                                label={'เข้าร่วมแล้ว'}
                                                width={width.sm}
                                            />
                                        ) : activity.free_space === 0 ? (
                                            <BasicButtons
                                                diasble
                                                label={'ปิดรับสมัคร'}
                                                width={width.sm}
                                            />
                                        ) : (
                                            <BasicButtons
                                                label={'ขอเข้าร่วมกิจกรรม'}
                                                width={width.sm}
                                                onClick={() => handleSubmit(activity.event_id)}
                                                aria-label={`เข้าร่วมกิจกรรม ${activity.event_name}`}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <Accordion activity={activity} />
                    </div>
                ))
            )}
            {successMessage && (
                <div className="fixed bottom-4 right-4 w-64">
                    <SuccessAlert label={successMessage} />
                </div>
            )}
            {errorMessage && (
                <div className="fixed bottom-4 right-4 w-64">
                    <ErrorAlert label={errorMessage} />
                </div>
            )}
        </div>
    );
}

export default Activity;