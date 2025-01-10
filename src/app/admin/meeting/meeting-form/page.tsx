"use client";
import React from "react";
import AdminLayout from "../../AdminLayout";
import { Box, Button, FormControl, Link, Select, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import style from "@/app/admin/admin.module.css";
import { useRouter } from "next/navigation";
import { ADD_MEETING_API, ADMIN_MEETING_ROUTE } from "@/constant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
interface DataItem {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: number;
  status: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  startTime: Yup.string().required("StartTime is required"),
  endTime: Yup.string().required("EndTime is required"),
  date: Yup.string().required("Date is required"),
  status: Yup.string().required("Status is required"),
});

const initialValues: DataItem = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  date: 0,
  status: "",
};

export default function MeetingForm() {
  const router = useRouter();
  const handleSubmit = (value: DataItem) => {
    console.log(value)
    try {
      const response =  axios.post(`${ADD_MEETING_API}`,{
      value
      })
      console.log(response)
    // .then((response) => {

    // })
    } catch (error) {
      console.error("meeting form error:", error);
    }
  };


  return (
    <AdminLayout>
      <Box sx={{ background: "white"}}>
      <Box>
          <Link href={`${ADMIN_MEETING_ROUTE.url}`} className={style.back}>
            <ArrowBackIcon fontSize="small" />
            Back
          </Link>
          </Box>
          <Box sx={{ display: "flex",}}>

         
        <Box>
          <Image
            src="/back.avif"
            priority={false}
            alt="picture"
            height={700}
            width={600}
          />
        </Box>

        <Box sx={{ width: "100%", margin: "auto 76px"}}>
          <Box sx={{   width:{xs:"90%", xl:"100%"}}}>
            <Typography variant="h5" textAlign={"center"} color="success">Create Meeting</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleBlur, handleChange, errors, touched, handleReset,dirty,isValid }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="title"
                    label="Title"
                    type="title"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={<ErrorMessage name="title" />}
                    margin="normal"
                  />
                  <Field
                    as={TextField}
                    name="description"
                    label="Description"
                    type="description"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={<ErrorMessage name="description" />}
                    margin="normal"
                  />
                  <Box sx={{ m: 1, display:'flex', gap:3 }}>

                   <Field
                    as={TextField}
                    name="startTime"
                    label="StartTime"
                    type="time"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.startTime && Boolean(errors.startTime)}
                    helperText={<ErrorMessage name="startTime" />}
                    margin="normal"
                    />

                   <Field
                    as={TextField}
                    name="endTime"
                    label="EndTime"
                    type="Time"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.endTime && Boolean(errors.endTime)}
                    helperText={<ErrorMessage name="endTime" />}
                    margin="normal"
                    
                    />
                    </Box>
                  <Box sx={{ m: 1, display:'flex', gap:3, alignItems:'center'}}>

                  <Field
                    as={TextField}
                    name="date"
                    label="date"
                    type="date"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.date && Boolean(errors.date)}
                    helperText={<ErrorMessage name="date" />}
                    margin="normal"
                    />
                  <Field as='Select' name="status" label='Status'
                   style={{width:"500px", height:"40px"}} defaultValue={'CREATED'}>
             <option value=" CREATED"> CREATED</option>
             <option value="ON_GOING">ON_GOING</option>
             <option value="COMPLETED">COMPLETED</option>
             <option value="CANCELLED">CANCELLED</option>
            
           </Field>
                    </Box>
                  <Box className={style.actionBtnForm}>
                  <Button onClick={handleReset} variant="contained" className={style.actionBtnForm1} 
                  color="error">Clear</Button>

                  <Button type="submit" variant="contained" color="success" className={style.actionBtnForm1} 
                     disabled={!(isValid && dirty)}>Submit</Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box></Box>
      </Box>
    </AdminLayout>
  );
}
