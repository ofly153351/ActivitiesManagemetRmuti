'use client'
import Nav from '@/app/Components/Nav'
import { getBranches } from '@/app/Utils/api';
import React, { useEffect, useState } from 'react'

function page() {
  const [brancheslist, setBrancheslist] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const title = 'รายชื่อคณะทั้งหมด'


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBranches();
        if (response.status === 200) {
          setBrancheslist(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

console.log(brancheslist);


  return (

    <>
      <Nav />

    </>
  )
}

export default page