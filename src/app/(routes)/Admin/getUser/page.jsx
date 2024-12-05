'use client'
import { getUsernyClaim } from '@/app/Utils/api'
import React, { useState } from 'react'
import { useEffect } from 'react'
function page() {


    useEffect(() => {
        const data = async () => {
            try {
                const response = await getUsernyClaim();
                console.log(response.data);
                
            } catch ( error ){
                console.log(error);
                
            }
        }
        data();
    },[])

  return (
    <div>
      dwa
    </div>
  )
}

export default page
