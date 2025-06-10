'use client'
import React, { useState } from "react";
import Image from "next/image";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from "yup";
import { DASHBOARD_ROUTE,  LOGIN_API, } from '@/constant';
import { useRouter } from 'next/navigation';
import useRequestPost from '@/util/useRequestPost';
import { setCookie } from 'cookies-next';
import { LOGIN_TEMPLATE_IMAGE } from "@/util/images";

interface FormValue {
    email: string;
    userId: string;
}
const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  userId: Yup.string().required("User Id is required"),
});


const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);
 const handleClickShowPassword = () => setShowPassword((show) => !show);

 const handleSubmit = async (value: FormValue) => {
      setIsLoading(true);
      const response = await useRequestPost({
        url:  `${LOGIN_API}`,
        data: value,
      });
      setIsLoading(false)  
      if (response.status === 200) {
        const { token, id} = await response.data.result;
        setCookie("userToken", token, {
          maxAge: 60 * 60 * 24 * 10,
        });
        router.push(`${DASHBOARD_ROUTE.url}`);
      }
    };

const initialValues: FormValue = {
  email: "",
  userId: "",
};

  return (
    <Box
      sx={{ webkitAlignItems: "none" }}
      display={"grid"}
      gridTemplateColumns={{
        xs: "1fr",
        md: "1fr",
        lg: "1fr 1fr",
        xl: "1fr 1fr",
        sm: "1fr",
      }}
      alignItems={"center"}
      margin={"auto"}
      width={"100%"}
      height={"100vh"}
    >
      {/* Image Section */}
      <Box
        sx={{
          display: {
            xs: "none",
            lg: "block",
            xl: "block",
            md: "none",
            sm: "none",
          }}}>
        <Image
          src={LOGIN_TEMPLATE_IMAGE}
          alt="Login Illustration"
          height={600}
          width={600}
          style={{ margin: "auto", display: "block", mixBlendMode: "color-burn" }}
        />
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", lg: "80%" },
          p: { xs: 1, lg: 3 },
          pr: { xs: 2, lg: 7 },
          flex: 1,
          margin: "auto",
        }}>
    

     <Box sx={{
            textAlign:"center",
          margin:"auto",
          }}>
        <Typography
          fontSize={{ xs: "20px", sm: "30px" }}
          textAlign="center"
          mb={2}>
            Log In
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
                name="userId"
                label="User Id"
                type={showPassword ? "text" : "password"}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.userId && Boolean(errors.userId)}
                helperText={<ErrorMessage name="userId" />}
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
    </Box>
  );
};

export default LogIn;

