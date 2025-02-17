"use client"

import { Box,} from "@mui/material";
import React, {  useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ADMIN_DASHBOARD_ROUTE, ADMIN_LOGIN_API,  } from "@/constant";
import Login from "./components/Login";
import { setCookie } from 'cookies-next'
import axios from "axios";
import { post } from "@/util/http.util";
import { toast } from "react-toastify";
interface FormValue {
  email: string;
  password: string;
}


const LogIn = () => {
  const router = useRouter();

  const handleSubmit = async (value: FormValue) => {
            const response = await post(`${ADMIN_LOGIN_API}`,value)
                // console.log(response);
              const {token} = response.data.result
              setCookie("Token", token,{
                              maxAge: 60 * 60 * 30
                             });
      if (response.status === 200) {
        router.push(`${ADMIN_DASHBOARD_ROUTE.url}`);
      } 
  };

  return (
    <Box
 
    sx={{webkitAlignItems: "none"}}
      display={"grid"}
      gridTemplateColumns={{ xs: "1fr", md: "1fr", lg: "1fr 1fr", xl: "1fr 1fr", sm: "1fr" }}
      alignItems={"center"}
     margin={"auto"}
     width={"100%"}
     height={"100vh"}
    >
      {/* Image Section */}
      <Box
        sx={{
          display: { xs: "none", lg: "block", xl: "block", md: "none", sm: "none" }, // Hidden on small screens, visible on large screens
         backgroundColor:"white",
          textAlign:"center",
          height:"100vh" }}>

        <Image
          src="https://img.freepik.com/premium-vector/three-people-working-laptops-company-employees-talking-about-boss-tasks-sitting-with-laptop-simple-minimalist-flat-vector-illustration_538213-119540.jpg?ga=GA1.1.2107727690.1726806487"
          alt="Login Illustration"
          height={600}
          width={600}
            />
          </Box>

      {/* Form Section */}
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", lg: "80%" },
          p: { xs: 1, lg: 3 },
          pr: { xs: 2, lg:7 }, 
          flex: 1,
          margin:"auto"}}>
         
         <Login onSubmit={handleSubmit}  title="Log In to Your Account" />
      </Box>
    </Box>
  );
};

export default LogIn;
