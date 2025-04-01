'use client'
import { Box, Button,  CircularProgress,  Input,  InputBase, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { use, useState } from 'react'
import { text } from 'stream/consumers';
import * as Yup from "yup";
import EmailIcon from '@mui/icons-material/Email';
import {FORGOT_PASSWORD_API, LOGIN_ROUTE } from '@/constant';
import useRequestPost from '@/util/useRequestPost';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
interface FormValue {
  email: string
}
export default function page() {
  const [isLoading, setIsLoading] = useState(false);
const router = useRouter();
const handleSubmit = async(values: FormValue) => {
 setIsLoading(true);
  const response =  await useRequestPost({
    url: `${FORGOT_PASSWORD_API}`,
    data: values
  })
  setIsLoading(false);
  if (response.status === 200) {
    // console.log(response.data);
    const { token } = await response.data.result;
    // setCookie("Token", token, {
    //   maxAge: 60 * 60 * 24 * 7,
    // });
    router.push(`${LOGIN_ROUTE.url}`,);
  // console.log(token)
  }

}

const initialValues: FormValue = {
  email: "",
};

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box 
      sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius:'10px',   }}>
          <Box sx={{textAlign:"center", padding:"20px"}}>
          <EmailIcon/>
        </Box>
       <Formik initialValues={initialValues} 
       onSubmit={(values) => handleSubmit(values)}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
        })}>
        {({ handleBlur, errors, handleChange}) => (
        <Form>
          
          <Box sx={{display: "flex", flexDirection: "column", gap: "30px", padding: "67px 30px", width:"300px"}}>
        
          <Field as={TextField} type="email" name="email" 
          label="Email" variant="outlined"
          onBlur={handleBlur} onChange={handleChange}
            />

        <Button variant="contained" type='submit' disabled={isLoading}
        sx={{ backgroundColor: "var(--primary-color)", padding:"10px 0px" }}>
          Send
            <CircularProgress size={25} color="secondary" 
              sx={{display: isLoading?"block":"none" }}/>
                         
        </Button>
        </Box>
      </Form>
     )}
       </Formik>
      </Box>
    </Box>
  )
}