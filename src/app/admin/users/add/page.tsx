'use client'
import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import AdminLayout from '../../AdminLayout'
import Login from '../../../login/components/Login'
import axios from 'axios';
import { ADMIN_LOGIN_API, SIGNUP_ROUTE } from '@/constant';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next'

interface FormValue {
  email: string;
  password: string;
}
export default function Add() {
    const [messages, setMessages] = useState('');
    const router = useRouter();
const handleSubmit = async (value: FormValue) => {
    // console.log(value)
       try {
            const response = await axios.post(`${ADMIN_LOGIN_API}`,value)
                // console.log(response)
             const {token} = response.data.result
               setCookie("tokenAdmin", token, { maxAge: 60 * 60 * 24,});

      if (response.status === 200) {
        router.push(`${ SIGNUP_ROUTE.url}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessages("Invalid email and password");
    }
  };
  return (
    <AdminLayout>
    <Box sx={{display:"flex",
      background:{xs:"none",md:"white",lg:"white",xl:"white"},
    }}>
      <Box sx={{height:"85vh"}}></Box>
      <Box 
      sx={{ width: { xs: "90%", sm: "80%", lg: "400px" },
      margin:"auto"}}>
      <Login title="Login To Admin Account" onSubmit={handleSubmit} message={messages}/>
      </Box>

    </Box>
    </AdminLayout>
  )
}
