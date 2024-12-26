'use client'

import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Alert, Box, Divider, Input, Pagination, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {GET_MEETING_API} from '@/constant/api.constant'
import CircularProgress from '@mui/material/CircularProgress';
import style from "../admin.module.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface DataItem {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
date:number
}


const Meeting = () => {
  const [meetings, setMeetings] = useState<DataItem[]>([]);
  const [search, setSearch] = useState(''); 
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(4)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(GET_MEETING_API, {
        params: {
          search,
          page,
          limit,
        },
      });

      const { data } = response.data;
      setMeetings(data.list);
      setTotalCount(data.count);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const deleteMeeting = async (meetingId:string) => {
    try {
      await axios.delete(`http://localhost:4000/meeting/${meetingId}`);

      setMeetings((prev) => prev.filter((meeting) => meeting._id !== meetingId));

      setSnackbarMessage('Meeting deleted successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (error) {
      console.error('Error deleting meeting:', error);
      setSnackbarMessage('Failed to delete the meeting.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const aboutMeeting = async (meetingId: string)=>{
    await axios.get(`http://localhost:4000/meeting/${meetingId}`);
    setMeetings((prev) => prev.filter((meeting) => meeting._id == meetingId));
  }
  

  useEffect(() => {
    fetchMeetings();
  }, [search,page]);

  const totalPages = Math.ceil(totalCount / limit);
  


     
  return (
    <AdminLayout>
      <Box sx={{ border: '2px solid black', padding: '16px' }}>
      {/* {isLoading && (
        <Box sx={{}}><CircularProgress sx={{position:'absolute'}}/></Box>
      )} */}
      <Box  style={{ backgroundColor: "var(--text1-color)" , color:"white",}}
     >
        <Box  className={style.meetingTop} >
        <Typography variant='h5'>MEETINGS</Typography>
        <Paper sx={{borderRadius:"5px",}}>
        <Input placeholder="search" 
        sx={{padding:"3px 10px", borderRadius:"10px", width:{lg:'350px',sx:'300px'}}} 
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
      </Paper>
        
        </Box>
      </Box>
       <TableContainer component={Paper} >
      
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
        <TableCell sx={{fontSize:"23px"}}>Title</TableCell>
        {/* <TableCell sx={{fontSize:"23px"}}>Description</TableCell> */}
        <TableCell sx={{fontSize:"23px"}}>Date</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Edit</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Delete</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Status</TableCell>
        <TableCell sx={{fontSize:"23px"}}>More</TableCell>

        </TableRow>
        </TableHead>
        <TableBody>
        {
          meetings.map((item, index)=>(
            <TableRow key={index} 
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
              <TableCell >{item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase()}</TableCell>
              {/* <TableCell>{item.description.charAt(0).toUpperCase() + item.description.slice(1).toLowerCase()}</TableCell> */}
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <EditIcon color='success'  
                sx={{cursor:"pointer"}}/></TableCell>
              <TableCell>
                <DeleteIcon color='error' sx={{cursor:"pointer"}}
                           onClick={() => deleteMeeting(item._id)} /></TableCell>
              <TableCell>{item.status}</TableCell>

              <TableCell><MoreHorizIcon  
               onClick={() => aboutMeeting(item._id)}/></TableCell>
          </TableRow>
         
        ))
      }
      
        </TableBody>
     
        </Table>
        <Divider/>

        {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={1.5} mb={1.5} >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
  
       </TableContainer>
      
            {/* Snackbar for Feedback */}
            <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      </Box>
    </AdminLayout>
  );
};

export default Meeting;
