import React from 'react'
import Nav from '@/app/Components/Headnav/Nav'
import Usertable from '@/app/Components/Usertable/Usertable'

function page() {
    return (
        <div className='bg-slate-50' >
            <Nav />
            <>
                <Usertable />
            </>
        </div>
    )
}

export default page