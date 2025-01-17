"use client";
import React from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Link,  Radio,  RadioGroup,  TextField, Typography, } from "@mui/material";
import Image from "next/image";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import style from "@/app/admin/admin.module.css";
import { ADD_MEETING_API, ADMIN_MEETING_ROUTE } from "@/constant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import AdminLayout from "@/app/admin/AdminLayout";

interface DataItem {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string; 
  endDate: string;
  type: string;
}
interface meetingProps {
  onSubmit: (values: DataItem) => void;

}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  startTime: Yup.string().required("StartTime is required"),

  endTime: Yup.string().required("EndTime is required") .test(
    'is-after-start-time',
    'End time must be later than Start time', 
    function(value){
      const { startTime } = this.parent;
      return value && startTime ? value > startTime : true;
    }
  ),
    startDate: Yup.date()
    .test("is-valid-date", "Invalid date", (value) => {
      const today = new Date();
      return value && value >= today; // Custom validation
    })
    .required("Date is required"),
    endDate: Yup.date()
    .test("is-after-start-date", "Invalid date", function(value){
      const {date} = this.parent
      return value && date? value >= date: true ; 
    })
    .required("Date is required"),
  type: Yup.string().required("type is required"),

});

const initialValues: DataItem = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  startDate: "",
 endDate:"",
 type:"",
};

const  MeetingForm :React.FC<meetingProps> =({onSubmit})=> {

  return (
    <AdminLayout>
      <Box sx={{ background: "white"}}>
      <Box >
          <Link href={`${ADMIN_MEETING_ROUTE.url}`} className={style.back}>
            <ArrowBackIcon fontSize="small" />
            Back
          </Link>
          </Box>
          <Box sx={{ display: "grid",gridTemplateColumns:"1fr 1fr", border:'1px solid black'}}>
            <Box>

            

        <Box 
        sx={{padding:"1px 20px"}}
        >
            
          <Box sx={{   width:{xs:"90%", xl:"100%"}}}>
            <Typography variant="h5" textAlign={"center"} color="success">Create Meeting</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values)=>{
                onSubmit(values);
                // console.log(values)
              }}
            >
              {({ handleBlur, handleChange, errors, touched, handleReset,dirty,isValid }) => (
                <Form>
                   <Box mt={1}>
                   <label htmlFor="Title">Title:</label>
                  <Field
                    as={TextField}
                    name="title"
                  
                    type="title"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={<ErrorMessage name="title" />}
                    margin="auto"
                  /></Box>
                   <Box mt={1}>
                   <label htmlFor="description">Description:</label>
                  <Field
                    as={TextField}
                    name="description"
                    
                    type="description"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={<ErrorMessage name="description" />}
                    margin="auto"
                  /></Box>
             

             <Box mt={1}>
             <label htmlFor="startTime">StartTime:</label>
                   <Field
                    as={TextField}
                    name="startTime"
                    type="time"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.startTime && Boolean(errors.startTime)}
                    helperText={<ErrorMessage name="startTime" />}
                    margin="auto"
                    /></Box>

<Box mt={1}>
<label htmlFor="endTime">EndTime:</label>
                   <Field
                    as={TextField}
                    name="endTime"
                    // label="EndTime"
                    type="time"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.endTime && Boolean(errors.endTime)}
                    helperText={<ErrorMessage name="endTime" />}
                    margin="auto"
                    
                    /></Box>

                <Box mt={1}>
              <label htmlFor="startDate">StartDate:</label>
                  <Field
                    as={TextField}
                    name="startDate"
                    type="date"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.startDate && Boolean(errors.startDate)}
                    helperText={<ErrorMessage name="date" />}
                    margin="auto"
                    /></Box>

                 <Box mt={1}>
              <label htmlFor="EndDate">EndDate:</label>
                  <Field
                    as={TextField}
                    name="endDate"
                    type="date"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.endDate && Boolean(errors.endDate)}
                    helperText={<ErrorMessage name="endDate" />}
                    margin="auto"
                    /></Box>
                    <Box mt={1}>
                    <label htmlFor="type">Type:</label>
      <RadioGroup
        row
        onBlur={handleBlur}
       onChange={handleChange}
        name="type" >
         <FormControlLabel value="DAILY" control={<Radio />} label="DAILY" />
        <FormControlLabel value="WEEKLY" control={<Radio />} label="WEEKLY" />
        <FormControlLabel value="MONTHLY" control={<Radio />} label="MONTHLY" />
        <FormControlLabel value="ONCE" control={<Radio />} label="ONCE" />
      </RadioGroup>
  
                    </Box>
                

                  <Box className={style.actionBtnForm}>
                  <Button onClick={handleReset} variant="contained" className={style.actionBtnForm1} 
                  color="error">Clear</Button>

                  <Button type="submit" variant="contained" color="success" className={style.actionBtnForm1} 
                     disabled={!(isValid && dirty)}
                     >Submit</Button>
                  </Box>
                </Form>
              )}
              </Formik>
          </Box>
        </Box>
        </Box>
        <Box sx={{border:"1px solid black"}}>hello</Box>
        </Box>
      </Box></AdminLayout>
  );
}

export default MeetingForm;