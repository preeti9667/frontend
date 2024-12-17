

'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout';
import { Box } from '@mui/material';
import axios from 'axios';

interface DataItem {
  title: string, 
description:string,
endTime:string,
startTime:string,
status:string,
date:number
}



export default function Meeting() {
 

  const [data, setData] = useState<DataItem[]>([]);
 
  useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/meeting");
  //     // console.log(response)
  //     const result = await response.json();
  //     setData(result);
  //   } catch (err) {
  //     console.log(err)
  //   } };
  //    fetchData();
  
  // if (typeof window !== 'undefined') {
  
  axios.get('http://localhost:4000/meeting')
  .then(meeting=> setData(meeting.data))
  .catch(err => console.log(err))
  // }
  }, []);

  return (
    <AdminLayout>
      <Box>
        
      </Box>
    </AdminLayout>
  )
}






 
  
  