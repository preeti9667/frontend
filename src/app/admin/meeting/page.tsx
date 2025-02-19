'use client'

import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Alert, Box, Card, CardContent, Divider, Input, InputBase, Pagination, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import {GET_MEETING_API} from '@/constant/api.constant'
import CircularProgress from '@mui/material/CircularProgress';
import style from "../admin.module.css"
import moment from 'moment';
import {useRouter} from 'next/navigation'
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
  const [limit] = useState(7)
  const [isLoading, setIsLoading] = useState(false)

const router = useRouter()  

 



  
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(GET_MEETING_API, {
        params: {
          search,
          page,
          limit: isMobile ? 0 : limit ,
        },
      });
      // const { data } = response.data;
      const  data  = response.data.data;
        // console.log(data)
       
      setMeetings(data.list);
      setTotalCount(data.count);

     if(!response){
        setIsLoading(true)
      }

    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  
  useEffect(() => {
    fetchMeetings();
  }, [search, page, isMobile]);

  const totalPages = Math.ceil(totalCount / limit);
  
const handleItemClick =(id: string)=>{
  router.push(`http://localhost:3000/admin/meeting/${id}`)
}
   
  return (
    <AdminLayout>
        
      {isLoading && ( 
        <Box><CircularProgress sx={{position:'absolute'}}/></Box>
      )}

      <Box mt={3} ml={6} mr={5} 
      sx={{
 display: { xl:"block", md:'block', xs:'none', sm:'block', lg:'block'}}}>


      <Box  style={{ backgroundColor: "var( --text-color)" , color:"white",}}
     >
        <Box  className={style.meetingTop}  >
        <Typography variant='h5'>MEETINGS</Typography>
        <Paper sx={{borderRadius:"5px",}}>
        <InputBase placeholder="search" 
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
        <TableCell sx={{fontSize:"23px"}}>S.N.</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Title</TableCell>
        {/* <TableCell sx={{fontSize:"23px"}}>Description</TableCell> */}
        <TableCell sx={{fontSize:"23px"}}>Date</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Time</TableCell>
        <TableCell sx={{fontSize:"23px"}}>Status</TableCell>
        

        </TableRow>
        </TableHead>
        <TableBody >
        {
          meetings.map((item, index)=>(

          <TableRow  key={item._id}
          onClick={() => handleItemClick(item._id)}
            sx={{ '&:last-child td, &:last-child th': { border: 0}, cursor:"pointer"}} >

              <TableCell>{index + 1}</TableCell>
              <TableCell >{item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase()}</TableCell>
              {/* <TableCell>{item.description.charAt(0).toUpperCase() + item.description.slice(1).toLowerCase()}</TableCell> */}
              <TableCell>{
              moment(item.date).format('ll')}
              </TableCell>
              <TableCell>{item.startTime}-{item.endTime}</TableCell>
              <TableCell>{item.status}</TableCell>

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
       </Box>
      
           
      <Box  sx={{
display: { xl:"none", md:'none', xs:'block', sm:'none', lg:'none'}
        
      }}>
      <Paper sx={{borderRadius:"5px", border:"1px solid black", }}>
        <InputBase placeholder="search" 
        sx={{padding:"3px 10px", borderRadius:"10px",}} 
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
      </Paper> 
      <Box sx={{display:"flex", flexDirection:"column", gap:"20px", 


      }} mt={3}>
        {
          meetings.map((item, index)=>(
            <Box key={index} >  
              <Card sx={{ borderRadius:'20px 15px',
              background:'var(--text1-color)', 
               
              }}>

          {/* <Typography variant='h4'>{index +1}</Typography> */}
        <CardContent sx={{display:"flex", justifyContent:'space-between', alignItems:"center",}}>
          <Typography>{moment(item.date).format('ll')}</Typography>
          <Typography>{item.startTime}-{item.endTime}</Typography>
          </CardContent>

                <CardContent sx={{marginTop:"-20px"}}>
          <Typography variant='h5'>
            {item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase()}</Typography>
          <Typography variant='h6'> {item.description}</Typography>
          <Typography variant='h5'mt={1}
          sx={{color: 'white'}}
          >
            {item.status}</Typography></CardContent>
        </Card>
        </Box>
          ))
        }
      </Box>
      </Box>

      
    </AdminLayout>
  );
};

export default Meeting;
