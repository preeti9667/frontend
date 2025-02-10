'use client'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from "yup";

interface FormValue {
    email: string;
    password: string;
}
interface FormValueProps {
    onSubmit: (values: any) => void;
    title?:string;
  
}
const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});



const  Login:React.FC <FormValueProps>= ({onSubmit,title}) =>{


 const [showPassword, setShowPassword] = useState(false);

 
   const handleClickShowPassword = () => setShowPassword((show) => !show);

const initialValues: FormValue = {
  email: "",
  password: "",
};
  return (
  <Box>
     <Box sx={{
            textAlign:"center",
          margin:"auto",
          }}>
        <Typography
          fontSize={{ xs: "20px", sm: "30px" }}
          textAlign="center"
          mb={2}>
            {title}
        </Typography>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleBlur, handleChange, touched, errors }) => (
            <Form >
              <Field
                as={TextField}
                name="email"
                label="Email"
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
  )
}
export default Login