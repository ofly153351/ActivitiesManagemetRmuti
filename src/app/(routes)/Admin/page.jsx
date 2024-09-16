import React from 'react';
import Nav from '../../Components/Nav';

function Page() {
    return (
        <>
            <Nav />
            <div className='bg-slate-50 w-full h-screen flex justify-center items-center p-10 '>
                <p className='p-10 border-red-500 border-[5px]' >
                    Show Dashboard
                    แต่ยังไม่มี
                </p >
            </div>
        </>
    );
}

export default Page;