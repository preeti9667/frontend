'use client'
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from "yup";
import { ADMIN_DASHBOARD_ROUTE, ADMIN_LOGIN_API, } from '@/constant';
import { useRouter } from 'next/navigation';
import useRequestPost from '@/util/useRequestPost';
import { setCookie } from 'cookies-next';

interface FormValue {
    email: string;
    password: string;
}
const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().min(6 ,"Password must be at least 6 characters").required("Password is required"),
});



const  Login:React.FC = () =>{
 const [showPassword, setShowPassword] = useState(false);
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);
 const [forgotPassword, setForgotPassword] = useState(false)

 const handleClickShowPassword = () => setShowPassword((show) => !show);


 const handleSubmit = async (value: FormValue) => {
      setIsLoading(true);
      const response = await useRequestPost({
        url:  `${ADMIN_LOGIN_API}`,
        data: value,
      });
      setIsLoading(false)  
      if (response.status === 200) {
        const { token } = await response.data.result;
        setCookie("Token", token, {
          maxAge: 60 * 60 * 24 * 7,
        });
        router.push(`${ADMIN_DASHBOARD_ROUTE.url}`);
      }
    };
  
    

   

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
            Log In to Admin Account
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
              <Box sx={{textAlign:'left', padding:"10px 0px"}}>
              <Link href=''>
                Forgot Password</Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  textTransform: "none",
                  fontSize: "large",
                  backgroundColor: "var(--primary-color)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 0px",
                }}
              >
                Submit
              <CircularProgress size={28} color="secondary" 
                sx={{display: isLoading?"block":"none" }}/>
              </Button>
            </Form>
          )}
        </Formik>
        </Box>
  </Box>
  )
}
export default Login