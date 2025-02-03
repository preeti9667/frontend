"use client"

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, {  useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LOGIN_API,ADMIN_MEETING_ROUTE, ADMIN_ROUTE } from "@/constant";
import Login from "./components/Login";
import { setCookie } from "nookies";
import axios from "axios";
interface FormValue {
  email: string;
  password: string;
}


const LogIn = () => {

  const [messages, setMessages] = useState("");

  const router = useRouter();

  const handleSubmit = async (value: FormValue) => {
    // console.log(value)
       try {
            const response = await axios.post(`${LOGIN_API}`,value)
                // console.log(response)
              const {token} = response.data.result
              setCookie(null, ('Token'), String(token), {
                              expires: 30 })

      if (response.status === 200) {
        router.push(`${ADMIN_ROUTE.url}`);
      } 
    } catch (error) {
      console.error("Login error:", error);
      setMessages("Invalid email and password");
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
         
         <Login onSubmit={handleSubmit}  title="Log In to Your Account" message={messages}/>
      </Box>
    </Box>
  );
};

export default LogIn;
