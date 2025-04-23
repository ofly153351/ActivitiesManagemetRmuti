import React from 'react'

function SumCard({ title, value }) {



    return (
        <div className="shadow-lg bg-slate-50 rounded-md p-4 min-w-full  text-center grid grid-cols-1  hover:translate-x-1 hover:duration-300 ">
            <span>{title}</span>
            <span className='text-[40px]' >{value}</span>
        </div>
    )
}

export default SumCard