'use client'

import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ButtonStyle } from '../../components/ButtonStyle';
import { Form, Formik } from 'formik';




interface userProps{
open:boolean,
onClose:()=>void
participant: participantItem[]
onSubmit:()=>void

}

interface participantItem {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  isActive: boolean;
}


const  MeetingUsers:React.FC<userProps> = ({open,onClose,participant,onSubmit}) =>{
  return (
  
    <Box>
        <Dialog open={open}
        onClose={onClose}>
          <DialogTitle color='success'> Add User to Meeting</DialogTitle>
          <Divider/>
          <DialogContent sx={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', padding:'10px'}}>
         
         {participant.map((item,index) => (
           <Box key={item._id} sx={{ borderBottom:'1px solid #ccc'}}>
    
           <FormControlLabel  control={<Checkbox />} label={`${item.fullName} ${item._id}`} />
             
            </Box>
        
         ) )}
        

          </DialogContent>
         <Divider/>
          <DialogActions>
           <ButtonStyle title='Add Users' color='success' variant='contained' onClick={onSubmit}/>
          </DialogActions>
        </Dialog>
    </Box>

  )
}
export default MeetingUsers;
