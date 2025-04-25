import React, { useEffect, useMemo, useState } from 'react'
import BasicButtons from './BasicButtons';
import { useRouter } from 'next/navigation';
import Loading from './Loading';

function HorizontalCard({ eventsInside, eventOutside }) {
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        if (eventsInside) {
            setIsLoading(false)
        }
        if (eventOutside) {
            setIsLoading(false)
        }
    }, [])

    const router = useRouter()
    const selectEvent = (params, myEvent) => {
        console.log(params, myEvent);
        if (params && myEvent) {
            // แปลงข้อมูล myEvent เป็น string (ถ้าจำเป็น)
            const myEventString = JSON.stringify(myEvent);
            // ส่งข้อมูลไปพร้อม query parameter
            router.push(`/Information/MyEvent/selectedEvent/${params}?myEvent=${encodeURIComponent(myEventString)}`);
        }
    }




    if (isLoading)
        return <div className='p-20 flex justify-center items-center min-h-full' ><Loading /></div>

    return (
        <div className="">
            {eventsInside?.map((item, index) => (
                <>
                    <button key={index} className=" py-1 border-md w-full hover:-translate-y-1 hover:duration-75  " onClick={() => selectEvent(item.event_id, item)} >
                        <div className="md:h-[80px] xs:justify-center p-2 m-2 drop-shadow-md  xs:gap-2 bg-white md:flex md:justify-between items-center xs:grid  ">
                            <div className='md:flex gap-2 px-2 xs:gird' >
                                <p className='truncate xs:border-[0px] md:border-r-[1px] border-gray-200 px-2' >
                                    กิจกรรมที่ : {index + 1}
                                </p>
                                <p className='truncate w-29 xs:border-[0px] md:border-r-[1px] border-gray-200 px-2' >
                                    {item.event_name}
                                </p>
                            </div>
                            <div className='xs:px-0 md:px-2' >
                                {item.status ? (
                                    <div className='w-fit flex xs:gap-1 md:gap-2 ' >
                                        <div className='xs:pl-0 md:pl-2 xs:flex w-full xs:max-w-[120px] md:max-w-[140px] lg:max-w-fit ' >
                                            <div className='truncate p-2 bg-green-500 rounded-md text-shadow-md shadow-md text-white border-l-[1px]'
                                            >
                                                สถานะ : ตรวจสอบแล้ว
                                            </div>
                                        </div>
                                        <div className='xs:pl-0 md:pl-2 xs:border-[0px] md:border-l-[1px]' >
                                            <div className='xs:pl-0 md:pl-2 xs:flex w-full xs:max-w-[120px] md:max-w-[140px] lg:max-w-fit ' >
                                                <div className='truncate p-2 bg-green-500 rounded-md text-shadow-md shadow-md text-white border-l-[1px]' >
                                                    ผ่านกิจกรรม
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ) : (!item.status && !item.file) ? (
                                    <div className='w-fit xs:flex xs:gap-1 md:gap-2 ' >
                                        <div className='xs:pl-0 md:pl-2 xs:flex w-full xs:max-w-[120px] md:max-w-[140px] lg:max-w-fit ' >
                                            <p className='truncate p-2 bg-yellow-500 rounded-md text-shadow-md shadow-md text-white xs:border-[0px] md:border-l-[1px]' >
                                                สถานะ : ยังไม่ส่งเอกสาร
                                            </p>
                                        </div>
                                        <div className='xs:pl-0 md:pl-2  border-l-[1px]' >
                                            <div className='truncate p-2 bg-red-500 rounded-md text-shadow-md shadow-md text-white xs:border-[0px] md:border-l-[1px]' >
                                                ไม่ผ่านกิจกรรม
                                            </div>
                                        </div>
                                    </div>
                                ) : (!item.status && item.file && item.comment !== '') ? (
                                    <div className='w-fit xs:gap-1 md:gap-2 flex' >
                                        <div className='xs:pl-0 md:pl-2 xs:flex w-full xs:max-w-[120px] md:max-w-[140px] lg:max-w-fit ' >

                                            <div className='truncate p-2 bg-orange-500 rounded-md text-shadow-md shadow-md text-white xs:border-[0px] md:border-l-[1px]' >
                                                สถานะ : ส่งเอกสารใหม่
                                            </div>
                                        </div>
                                        <div className='xs:pl-0 md:pl-2  border-l-[1px]' >
                                            <div className='truncate p-2 bg-red-500 rounded-md text-shadow-md shadow-md text-white xs:border-[0px] md:border-l-[1px]' >
                                                ไม่ผ่านกิจกรรม
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                    (!item.status && item.file) ? (
                                        <div className='w-fit xs:gap-1 md:gap-2 flex' >
                                            <div className='xs:pl-0 md:pl-2 xs:flex w-full xs:max-w-[120px] md:max-w-[140px] lg:max-w-fit ' >
                                                <div className='truncate p-2 bg-yellow-500 rounded-md text-shadow-md shadow-md text-white xs:border-[0px] md:border-l-[1px]' >
                                                    สถานะ : รอตรวจสอบเอกสาร
                                                </div>
                                            </div>
                                            <div className='xs:pl-0 md:pl-2  border-l-[1px]' >
                                                <div className='truncate p-2 bg-red-500 rounded-md text-shadow-md shadow-md text-white xs:border-[0px] md:border-l-[1px]' >
                                                    ไม่ผ่านกิจกรรม
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                            </div>
                        </div>
                    </button>
                </>
            ))}

            {eventOutside && eventOutside.length > 0 ? (
                <>
                    {eventOutside?.map((item, index) => (
                        <button key={index} className=" py-1 border-md w-full hover:-translate-y-1 hover:duration-75  " onClick={() => selectEvent(item.event_id, item)} >
                            <div className="md:h-[80px] xs:justify-center p-2 m-2 drop-shadow-md  xs:gap-2 bg-white md:flex md:justify-between items-center xs:grid  ">
                                <div className='md:flex gap-2 px-2 xs:gird' >
                                    <p className='truncate xs:border-[0px] md:border-r-[1px] border-gray-200 px-2' >
                                        กิจกรรมที่ : {index + 1}
                                    </p>
                                    <p className='truncate w-29 xs:border-[0px] md:border-r-[1px] border-gray-200 px-2' >
                                        {item.event_name}
                                    </p>
                                </div>
                                <div className='xs:px-0 md:px-2' >
                                    {item.file ? (
                                        <div className='w-fit flex xs:gap-1 md:gap-2 ' >
                                            <div className='xs:pl-0 md:pl-2 xs:border-[0px] ' >
                                                <div className='truncate p-2 bg-green-500 rounded-md text-shadow-md shadow-md text-white border-l-[1px]'
                                                >
                                                    สถานะ : ส่งเอกสารแล้ว
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='w-fit flex xs:gap-1 md:gap-2 ' >
                                            <div className='xs:pl-0 md:pl-2 xs:border-[0px] ' >
                                                <div className='truncate p-2 bg-red-500 rounded-md text-shadow-md shadow-md text-white border-l-[1px]'>
                                                    สถานะ : ยังไม่ส่งเอกสาร
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </>
            ) : (eventOutside?.length === 0) ? (
                <div className='flex justify-center items-center p-10 text-lg '>ไม่มีข้อมูล</div>
            ) : (eventsInside?.length === 0) ? (
                <div className='flex justify-center items-center p-10 text-lg '>ไม่มีข้อมูล</div>
            ) : null}
        </div >

    )
}

export default HorizontalCard