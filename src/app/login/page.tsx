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
import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LOGIN_API, ADMIN_ROUTE } from "@/constant";
import style from "./login.module.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (response.ok) {
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
      className="page"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
    >
      {/* Image Section */}
      <Box
        sx={{
          display: { xs: "none", lg: "block" }, // Hidden on small screens, visible on large screens
          flex: 1,
          p: 2,
        }}
      >
        <Image
          src="https://img.freepik.com/premium-vector/three-people-working-laptops-company-employees-talking-about-boss-tasks-sitting-with-laptop-simple-minimalist-flat-vector-illustration_538213-119540.jpg?ga=GA1.1.2107727690.1726806487"
          alt="Login Illustration"
          height={660}
          width={600}
        />
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          margin: "auto",
          width: { xs: "90%", sm: "430px", lg: "80%" },
          p: { xs: 1, lg: 3 },
          pr: { xs: 2, lg:7 }, // Adds padding to the right
          flex: 1,
      
        }}>
        <Typography
          fontSize={{ xs: "20px", sm: "30px" }}
          textAlign="center"
          mb={2}
        >
          Log In to Your Account
        </Typography>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ handleBlur, handleChange, touched, errors }) => (
            <Form className={style.form}>
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
        </Formik>
      </Box>
    </Box>
  );
};

export default LogIn;
