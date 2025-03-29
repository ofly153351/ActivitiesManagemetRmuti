'use client'
import { ErrorAlert, SuccessAlert } from '@/app/Components/Alert';
import Nav from '@/app/Components/Nav';
import SelectedMyEvent from '@/app/Components/SelectedMyEvent';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

function Page() {
    // const router = useRouter();
    const params = useParams(); // For route parameters
    const searchParams = useSearchParams(); // For query parameters
    const myEvent = searchParams.get('myEvent'); // Get specific query parameter
    const [parsedEvent, setParsedEvent] = useState(null);
    const [isAlert, setIsAlert] = useState({ status: null, message: '' });
    const [label, setLabel] = useState('')

    useEffect(() => {
        if (myEvent) {
            try {
                setParsedEvent(JSON.parse(myEvent));  // Parse JSON string to object
            } catch (error) {
                console.error('Error parsing event:', error);
            }
        }
    }, [myEvent]);

    const handleShowAlert = (status, message) => {
        setIsAlert({ status, message });
        

    };
    console.log(isAlert.message);

    return (
        <div>
            <Nav />
            <div className='min-h-screen w-screen flex justify-center items-center' >
                <div className='grid ' >
                    <SelectedMyEvent selectedEvent={parsedEvent} showAlert={handleShowAlert} />
                    <div className='absolute z-10 bottom-4 right-4' >
                        {isAlert.status !== null && (
                            isAlert.status ? (
                                <SuccessAlert label={isAlert.message} />
                            ) : (
                                <ErrorAlert label={isAlert.message} />
                            )
                        )}

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Page