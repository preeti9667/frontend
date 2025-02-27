'use client'

import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, TextField } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ButtonStyle } from '../../components/ButtonStyle';
import { Field, Form, Formik } from 'formik';
import { on } from 'events';

import * as Yup from "yup";
import { text } from 'stream/consumers';


interface userProps{
open:boolean,
onClose:()=>void
participant: participantItem[]
onSubmit:()=>void

}

interface participantItem{
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  isActive: boolean;
}
const validationSchema = Yup.object({
  // name: Yup.string().required("Required"),
});
const  MeetingUsers:React.FC<userProps> = ({open,onClose,participant,onSubmit}) =>{

  const   initialValues:participantItem ={
    _id: "",
    userId: "",
    fullName: "",
    email: "",
    isActive: false,
  }

  return (
  
    <Box>
        <Dialog open={open}
        onClose={onClose}>
          <DialogTitle color='success'> Add User to Meeting</DialogTitle>
          <Divider/>
          <DialogContent sx={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', padding:'10px'}}>
         
          <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}

    >
      {({ errors, touched }) => (
        <Form>
          {participant.map((item) => (
            <Box key={item._id}>
            {/* <Field
            as={FormControlLabel}
            name="_id"
            control={<Checkbox />}
            label="fullName" 
            /> */}
            <Field 
            as={TextField}
            name="_id"
            label="fullName"
            variant="outlined"
            error={touched.fullName && Boolean(errors.fullName)}
            helperText={touched.fullName && errors.fullName}
            />
            </Box>
          ))}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>

        

          </DialogContent>
         <Divider/>
          {/* <DialogActions>
           <ButtonStyle title='Add Users' color='success' variant='contained' onClick={onSubmit}/>
          </DialogActions> */}
        </Dialog>
    </Box>

  )
}
export default MeetingUsers;
