'use client'
import ActivityAccordion from '@/app/Components/Acordion'
import CustomTable from '@/app/Components/CustomTable'
import HorizontalCard from '@/app/Components/HorizontalCard'
import Loading from '@/app/Components/Loading'
import Nav from '@/app/Components/Nav'
import ShowDialogTable from '@/app/Components/ShowDialogTable'
import { getMyEventStudent } from '@/app/Utils/api'

import React, { use, useState, useEffect } from 'react'

function page() {
    const title = 'กิจกรรมของฉัน'
    const [loading, setLoading] = useState(false)
    const [myEvent, setMyEvent] = useState([])
    const [insideEvents, setInsideEvents] = useState([])
    const [outSideEvents, setOutsideEvents] = useState([])
    const d = new Date()
    let year = d.getFullYear()
    let currentThaiYear = year + 543





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMyEventStudent(currentThaiYear)
                setMyEvent(response.data)
                console.log(response.data);

                // Only set selectedEvent once, initially
                if (!insideEvents.length && response.data.inside_events) {
                    setInsideEvents(response.data.inside_events)
                    console.log('inside has been set')
                }
                if (!outSideEvents.length && response.data.outside_events) {
                    setOutsideEvents(response.data.outside_events)
                    console.log('inside has been set');
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, []) // Empty dependency array, so it runs only once on initial load

    console.log(myEvent);
    console.log(insideEvents);
    console.log(outSideEvents);




    return (
        <div className="">
            <Nav />
            <div className="bg-gray-50 min-h-screen flex justify-center items-center ">
                <div className="w-[80%] bg-white rounded-md mt-10 font-kanit shadow-md ">
                    <h1 className="text-[52px] text-shadow-md  p-10">{title}</h1>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="mt-40 px-10 h-[400px]">
                                <Loading />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='w-full px-4' >
                                <div className=' border-b-2 border-slate-200 ' >
                                    <p className=' text-2xl py-2 border-b-1' >กิจกรรมภายในมหาวิทยาลัย :</p>
                                </div>
                                <HorizontalCard eventsInside={insideEvents} />
                            </div>
                            <div className='w-full px-4' >
                                <div className=' border-b-2 border-slate-200 ' >
                                    <p className=' text-2xl py-2 border-b-1' >กิจกรรมภายในมหาวิทยาลัย :</p>
                                </div>
                                <HorizontalCard eventOutside={outSideEvents} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>


    )
}
export default page