'use client'

import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Box, Input, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
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
  // date?: string; // Optional to handle missing dates
  startTime: string;
  endTime: string;
  status: string;
date:number
}


const Meeting = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1)
  const [page, setPage] = useState(0);
  const [search, setSearch]= useState('')

  useEffect(() => {
       axios.get(GET_MEETING_API,{
        params:{
          search,
          page: activePage,
            size: length
        }
       })
       .then((res)=>{ 
        const meetings = res.data.data.list
        const page = res.data.data.page
        if(meetings){
            setData(meetings)
            setPage(page)
            // setSearch(meetings)

          setIsLoading(false)
        }else{
          setIsLoading(true)
        }
  })
       .catch(err => console.log(err))
       
      }, []);

 
  


     
  return (
    <AdminLayout>
      <Box sx={{ border: '2px solid black', padding: '16px' }}>
      {isLoading && (
        <Box sx={{}}><CircularProgress sx={{position:'absolute'}}/></Box>
      )}
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
        <TableCell sx={{fontSize:"23px"}}>Description</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Date</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Edit</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Delete</TableCell>
        <TableCell sx={{fontSize:"23px"}}>More</TableCell>

        </TableRow>
        </TableHead>
        <TableBody>
        {
          data.map((item, index)=>(
            <TableRow key={index} 
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
              <TableCell >{item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase()}</TableCell>
              <TableCell>{item.description.charAt(0).toUpperCase() + item.description.slice(1).toLowerCase()}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell><EditIcon color='success'/></TableCell>
              <TableCell><DeleteIcon color='error'/></TableCell>
              <TableCell><MoreHorizIcon/></TableCell>
          </TableRow>
         
        ))
      }
      
        </TableBody>
     
        </Table>
       <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} 
      onChange={()=> setActivePage} 
      />
    </Stack>
       </TableContainer>
      
      
      </Box>
    </AdminLayout>
  );
};

export default Meeting;
