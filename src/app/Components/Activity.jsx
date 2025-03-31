import React, { useEffect, useState, useMemo } from 'react';
import { filterActivities } from '../Utils/handler';
import Accordion from './Acordion';
import { getAllevent, getBranches, joinEvent } from '../Utils/api';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import BasicButtons from './BasicButtons';
import width from '../Utils/textfieldWidth';
import { ErrorAlert, SuccessAlert } from './AlertShow';
import { useStore } from '@/store/useStore';

function Activity({ searchQuery, inEvent }) {
    const [activities, setActivities] = useState([]);
    const { user, branchesList, setBranchesList, myEventList } = useStore();
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [eventsInside, setEventsInside] = useState([]);
    const [loading, setLoading] = useState(true);
    dayjs.locale('th');



    // Improved filtering with null checks
    const filteredActivities = useMemo(() => {
        const filtered = filterActivities(activities, searchQuery);
        return filtered || [];
    }, [activities, searchQuery]);

    // Robust matching event calculation
    const matchingEvent = useMemo(() => {
        // Ensure we have safe arrays to work with
        const safeActivities = filteredActivities || [];
        const safeEventsInside = eventsInside || [];

        // Map and filter with additional safety checks
        return safeActivities
            .map(activity =>
                safeEventsInside.find(event =>
                    event && activity && event.event_id === activity.event_id
                )
            )
            .filter(event => event !== undefined);
    }, [filteredActivities, eventsInside]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch events
                const eventResponse = await getAllevent();
                setActivities(eventResponse.data || []);

                // Fetch branches if not already loaded
                if (!branchesList || branchesList.length === 0) {
                    const branchResponse = await getBranches();
                    setBranchesList(branchResponse.data || []);
                }

                // Set events inside
                if (myEventList?.inside_events) {
                    setEventsInside(myEventList.inside_events);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setActivities([]);
                setEventsInside([]);
                setLoading(false);
            }
        };
        fetchData();
    }, [myEventList]);

    // Safe branch name retrieval
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

    // Event joining handler
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
            console.error('Error joining event:', error);
            setErrorMessage('ไม่สามารถส่งคำขอเข้าร่วมกิจกรรมได้');
            setTimeout(() => setErrorMessage(false), 3000);
            throw error;
        }
    };

    // Loading state
    if (loading) {
        return <div>กำลังโหลด...</div>;
    }

    return (
        <div>
            {filteredActivities.length === 0 ? (
                <div className="h-12 flex justify-center items-center text-center text-gray-500">
                    <div>ยังไม่มีกิจกรรมที่เปิดลงทะเบียน</div>
                </div>
            ) : (
                filteredActivities.map((activity, index) => (
                    <div
                        key={activity.id || index}
                        className="lg:mx-4 p-4 items-center hover:bg-stone-100 border-b border-gray-200"
                    >
                        <div className="flex xs:w-full">
                            <div className="flex-grow">
                                <div className="text-xl flex justify-between font-kanit">
                                    <div>
                                        ชื่อกิจกรรม: <span className="font-thin">{activity.event_name}</span>
                                    </div>
                                    <div>
                                        จำนวนที่รับ: <span className="font-thin">{activity.free_space} คน</span>
                                    </div>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    สถานที่: <span className="font-thin">{activity.location}</span>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    จำนวนชั่วโมงกิจกรรมที่จะได้รับ: <span className="font-thin">{activity.working_hour}</span> ชั่วโมง
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    วันที่เริ่มกิจกรรม: <span className="font-thin">{activity.start_date} เวลา: {activity.start_time}</span>
                                </div>
                                <div className="w-full px-4 py-2 font-kanit">
                                    ชั้นปีที่เปิดรับ: <span className="font-thin">
                                        {activity.years === null ? 'สามารถเข้าร่วมได้ทุกชั้นปี' : `${activity.years.join(', ')}`}
                                    </span>
                                </div>
                                <div className="flex gap-2 justify-between items-center w-full px-4 py-2 font-kanit">
                                    <div>
                                        {activity.branches === null ? (
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
                                    {user?.role === 'student' &&
                                        matchingEvent &&
                                        matchingEvent.some(event => event.event_id === activity.event_id) ? (
                                        <div>
                                            <BasicButtons
                                                diasble
                                                label={'เข้าร่วมแล้ว'}
                                                width={width.sm}
                                                color={"red"}
                                            />
                                        </div>
                                    ) : (user?.role === 'student') && (
                                        <div>
                                            <BasicButtons
                                                label={'ขอเข้าร่วมกิจกรรม'}
                                                width={width.sm}
                                                onClick={() => handleSubmit(activity.event_id)}
                                                aria-label={`เข้าร่วมกิจกรรม ${activity.event_name}`}

                                            />
                                        </div>
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