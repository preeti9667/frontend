'use client'
import { useEffect } from 'react';
import { Avatar, Box } from '@mui/material';
import * as React from 'react';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import { ADMIN_GET_API } from '@/constant';
export default function Admin() {
  // const fetchAdmin = async ()=>{
  //   const res = await axios.get(`${ADMIN_GET_API}`)
  //   console.log(res)
  // }
  
useEffect(()=>{
    // fetchAdmin()
},[])


  return (
    <>
   <AdminLayout>
      <Box 
     sx={{background:{xs:"none",md:"white",lg:"white",xl:"white"},
     display:"grid",
     gridTemplateColumns:{xs:"1fr",xl:"1fr 1fr",md:"1fr 1fr",lg:"1fr 1fr"},
     padding:{xs:"0",md:"20px",lg:"20px",xl:"20px",
      height:"100vh"
     }}}>

      <Box sx={{margin:"auto"}}>
        <Avatar
        sx={{ width: 100, height: 100, backgroundColor: "green", fontSize: "50px"}}>P</Avatar>
      </Box>
      <Box sx={{margin:"auto"}}>
        hello admin
      </Box>
    </Box>
   </AdminLayout>
    </>
  );
}
