"use client";
import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useRouter } from "next/navigation";
import {  ADMIN_MEETING_ROUTE, SIGNUP_API } from "@/constant";
interface formValues {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
}
const validationSchema = Yup.object({
  firstName: Yup.string().max(15, 'Must be 10 characters or less').required("First-Name is required"),
  lastName: Yup.string().max(15, 'Must be 10 characters or less').required("Last-Name is required"),
  fullName: Yup.string().max(15, 'Must be 20 characters or less').required("Full-Name is required"),
  email: Yup.string().email('Invalid email address').required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const router = useRouter()
  const handleSubmit = async (values:formValues) => {
    // console.log(values)
     try {
          const response = await axios.post(`${SIGNUP_API}`,values)
          console.log(response)
          if (response.status === 200) {
            router.push(`${ADMIN_MEETING_ROUTE.url}`);
          }
        } catch (error) {
          console.error("Signup error", error);
        }
      
  };
  const initialValues: formValues = {
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    password: "",
  };
  return (
    <Box 
    sx={{display:"flex", width:"100%", height:"100vh",}}>
        <Box sx={{height:"100%"}}></Box>
      <Paper
        sx={{
            width: { xs: "300px", sm: "300px", lg: "400px", xl:"400px",md:"350px" },
          margin: "auto",
          padding: "40px 20px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" textAlign={"center"} color="success">
          Create Your Account
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleBlur,
            handleChange,
            errors,
            touched,
            handleReset,
            dirty,
            isValid,
          }) => (
            <Form>
              <Box mt={1}>
                <label htmlFor="firstName">FirstName:</label>
                <Field
                  as={TextField}
                  name="firstName"
                  value={values.firstName}
                  type="text"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={<ErrorMessage name="firstName" />}
                  margin="auto"
                />
              </Box>
              <Box mt={1}>
                <label htmlFor="lastName">LastName:</label>
                <Field
                  as={TextField}
                  name="lastName"
                  value={values.lastName}
                  type="text"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={<ErrorMessage name="lastName" />}
                  margin="auto"
                />
              </Box>
              <Box mt={1}>
                <label htmlFor="fullName">FullName:</label>
                <Field
                  as={TextField}
                  name="fullName"
                  value={values.fullName}
                  type="text"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={<ErrorMessage name="fullName" />}
                  margin="auto"
                />
              </Box>
              <Box mt={1}>
                <label htmlFor="email">Email:</label>
                <Field
                  as={TextField}
                  name="email"
                  value={values.email}
                  type="email"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={<ErrorMessage name="email" />}
                  margin="auto"
                />
              </Box>
              <Box mt={1}>
              <label htmlFor="password">Password:</label>
              <Field
                as={TextField}
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                margin="auto"
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
              /></Box>

              <Button
                type="submit"

                variant="contained"
                style={{ backgroundColor: 'var(--primary-color)' }}
                fullWidth
                sx={{
                  textTransform: "none",
                  fontSize: "large",
                  padding: "10px 16px",
                  marginTop:"10px"
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
