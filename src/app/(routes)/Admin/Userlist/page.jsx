import React from 'react'
import Nav from '@/app/Components/Nav'
import Usertable from '@/app/Components/Usertable'

function page() {
    return (
        <div className='bg-slate-500 h-screen' >
            <Nav />
            <>
                <Usertable />
            </>
        </div>
    )
}

export default page