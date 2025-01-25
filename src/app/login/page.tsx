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
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LOGIN_API, ADMIN_ROUTE } from "@/constant";
import style from "./login.module.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
interface FormValue {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues: FormValue = {
  email: "",
  password: "",
};

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessages] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();
  const handleSubmit = async (value: FormValue) => {
    // try {
      // const response = await fetch(LOGIN_API,  {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(value),
      // });

       try {
            const response = await axios.post(`${LOGIN_API}`,value)
                console.log(response)
      if (response.status === 200) {
        router.push(`${ADMIN_ROUTE.url}`);
      } else {
        setMessages("Invalid email and password");
      }
    } catch (error) {
      console.error("Login error:", error);
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
          margin:"auto"
    
      }}>
          <Box sx={{
            textAlign:"center",
          margin:"auto",
          }}>
        <Typography
          fontSize={{ xs: "20px", sm: "30px" }}
          textAlign="center"
          mb={2}>

          Log In to Your Account
        </Typography>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ handleBlur, handleChange, touched, errors }) => (
            <Form >
              <Field
                as={TextField}
                name="email"
                label="Email or Phone"
                type="email"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
                margin="normal"
              />

              <Field
                as={TextField}
                variant="outlined"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}  
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography color="error" variant="body2" mt={1} mb={1}>
                {messages}
              </Typography>

              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: 'var(--primary-color)' }}
                fullWidth
                sx={{
                  textTransform: "none",
                  fontSize: "large",
                  padding: "10px 16px",
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik></Box>
      </Box>
    </Box>
  );
};

export default LogIn;
