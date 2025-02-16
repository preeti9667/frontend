"use client";
import React from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Link,  Radio,  RadioGroup,  TextField, Typography, } from "@mui/material";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import style from "@/app/admin/admin.module.css";
import { ADD_MEETING_API, ADMIN_MEETING_ROUTE } from "@/constant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminLayout from "@/app/admin/AdminLayout";
import moment from "moment";

interface meetingProps {
  initialValues?: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    type: string;
  };
  mode: 'add' | 'edit';

  onSubmit: (values: any) => void;

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
    .test("is-valid-date", "Start date must be later than today", (value) => {
      const today = new Date();
      return value && value > today; // Custom validation
    })
    .required("Date is required"),

    endDate: Yup.date()
    .test("is-after-start-date", "End date must be equal or later than start date", function(value){
      const {startDate} = this.parent

      return value && startDate ? value === startDate || value >= startDate: true;

    })
    .required("Date is required"),
  type: Yup.string().required("type is required"),

});

const  MeetingForm :React.FC<meetingProps> =({ initialValues,onSubmit,mode})=> {

  const defaultValues = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    type: '',
    ...initialValues,
  };

  return (
    <AdminLayout>
      <Box sx={{ background:{xs:"none",md:"white",lg:"white",xl:"white"}}}>
      <Box sx={{background:'var(--text-color)', display:"flex", alignItems:'center',padding:"15px",gap:"40px"}}>

          <Link href={`${ADMIN_MEETING_ROUTE.url}`} sx={{color:"white"}}>
            <ArrowBackIcon fontSize="small"  sx={{width:"30px",height:"30px"}}/>
          </Link>
          <Typography variant="h5"  sx={{color:"white"}}>
          {mode === 'add' ? 'Add Meeting' : 'Edit Meeting'}
          </Typography>
          </Box>
          <Box sx={{ display: "grid",gridTemplateColumns:{xs:"1fr",xl:"1fr 1fr",md:"1fr 1fr",lg:"1fr 1fr"}, 
          }}>
            <Box>
        <Box 
        >
            
          <Box sx={{ width:{ xl:"100%"},padding:{xs:"0",md:"20px",lg:"20px",xl:"20px"}}}>
            <Formik
              initialValues={defaultValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, handleBlur, handleChange, errors, touched, handleReset,dirty,isValid }) => (
                <Form>
                   <Box mt={1}>
                   <label htmlFor="title">Title:</label>
                  <Field
                    as={TextField}
                    name="title"
                  value={values.title}
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
                  value={values.description}
                    
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
                  value={moment(values.startTime,"hh:mm A").format("HH:mm")}
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
                  value={moment(values.endTime, "hh:mm A").format("HH:mm")}
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
                  value={moment(values.startDate).format('YYYY-MM-DD')}
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.startDate && Boolean(errors.startDate)}
                    helperText={<ErrorMessage name="startDate" />}
                    margin="auto"
                    /></Box>

                 <Box mt={1}>
              <label htmlFor="EndDate">EndDate:</label>
                  <Field
                    as={TextField}
                    name="endDate"
                    type="date"
                  // value={values.endDate}
                  value={moment(values.endDate).format('YYYY-MM-DD')}
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
        value={values.type}
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
                     disabled={!(isValid && dirty)}>
                        {mode === 'add' ? 'Submit' : 'Update'}
                     </Button>
                  </Box>
                </Form>
              )}
              </Formik>
          </Box>
        </Box>
        </Box>
        {/* <Box sx={{border:"1px solid black"}}>hello</Box> */}
        </Box>
      </Box></AdminLayout>
  );
}

export default MeetingForm;