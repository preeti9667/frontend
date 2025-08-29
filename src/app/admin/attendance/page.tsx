'use client'
import { Box, Button, Table,TablePagination, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import AdminLayout from '../AdminLayout'
import style from '@/app/admin/admin.module.css'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import AttendanceAdd from './components/AttendanceAdd'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ADD_ATTENDANCE_API, All_ATTENDANCE_API, ATTENDANCE_UPDATE_API,DELETE_ATTENDANCE_API } from '@/constant'
import useRequest from '@/util/useRequest'
import moment from 'moment'
import axios from 'axios'
import {useRouter} from 'next/navigation';
import MokData from '../components/ MokData'
import { toast } from 'react-toastify'
import useRequestPost from '@/util/useRequestPost'
import ResponsiveAttendance from './components/ResponsiveAttendance'
import MyDialog from '../components/MyDialog'
import { it } from 'node:test'


interface Attendance {
  participantIds: []
noOfParticipants: number
  meeting?:{
    _id: string
    meetingId: string;
    title: string
  },
  date: string;
  _id: string;
}

interface FormValues {
  _id: string;
  meetingId: string;
  date: string;
  participantIds: string[];
}

const Attendance = () => {
  const [openUser, setOpenUser] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
   const [initialValues, setInitialValues] = useState<FormValues | null >(null); 
  const [loading, setLoading] = useState(false)

 const isMobile = useMediaQuery("(max-width:600px)");
  const openUserList = () => {
    setInitialValues(null);
    setOpenUser(true);

  };
 
  const { data, isLoading, refetch } = useRequest({
    url: `${ All_ATTENDANCE_API}`,
    params: {
      page: page + 1,
      limit: isMobile ? 0 : limit,
    }
  });
  const AttendanceList = (data?.data?.list as Attendance[]) || [];
  const totalCount = data?.data?.count
  

  const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage); 
    };
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setLimit(+event.target.value);
      setPage(0);
    };

    const handleDelete = async (id: string) => { 
        await axios.delete(`${DELETE_ATTENDANCE_API}/${id}`);
        refetch();  
    }



const handleEdit = (item: Attendance) => {
 
  setInitialValues({
    _id: item._id ,
    meetingId: item.meeting?._id || "",
    date: moment(item.date).format("YYYY-MM-DD"),
    participantIds: item.participantIds || [],
  });
  setOpenUser(true);
};



// Submit handler for both Add & Edit
const handleSubmit = async (values: FormValues) => {
  try {
    if (values._id) {
      setLoading(true);
      await axios.put(`${ATTENDANCE_UPDATE_API}/${values._id}`, {
        date: values.date,
        meetingId: values.meetingId,
        participantIds: values.participantIds,
      });
      setLoading(false);
      setOpenUser(false);
      toast.success("Attendance updated successfully" , { theme: "colored" });
    } else {
      setLoading(true);
    const response  =  await useRequestPost({
      url: ADD_ATTENDANCE_API,
      data: {
        date: values.date,
        meetingId: values.meetingId,
        participantIds: values.participantIds
      }
    });
    if(response.status === 200){
      toast.success("Attendance added successfully", { theme: "colored" });
      setOpenUser(false);
      setLoading(false)
      }
    refetch();
    }
  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
    console.error(err);
  }
};


  

  return (
    <AdminLayout>
       <Paper
              sx={{
                display: {
                  xl: "block",
                  md: "block",
                  xs: "none",
                  sm: "none",
                  lg: "block",
                },
              }}
            >
     <Box style={{ backgroundColor: "var( --text-color)", color: "white" }}>
          <Box className={style.meetingTop}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button   sx={{ backgroundColor: "white", color: "black" }}
               onClick={openUserList} >
                <AddCircleOutlineIcon />
             </Button>
              <Button
                sx={{ backgroundColor: "white", color: "black" }}
                onClick={() => window.location.reload()}
              >
                <RefreshIcon />
              </Button>

            </Box>
          </Box>
        </Box>
 <Box sx={{bgcolor: 'white'}}>
 <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontSize: "18px" }}>MeetingTitle</TableCell>
        <TableCell sx={{ fontSize: "18px" }}>MeetingId</TableCell>

        <TableCell sx={{ fontSize: "18px" }}>Date</TableCell>
        <TableCell sx={{ fontSize: "18px" }}>Total</TableCell>
        <TableCell sx={{ fontSize: "18px" }}>Edit/remove</TableCell>
        <TableCell sx={{ fontSize: "18px" }}>Clean</TableCell>
      </TableRow>

    </TableHead>

              {
                isLoading &&
                Array.from( { length: limit }).map((_, index) => (
                  <TableBody key={index}>
                  <TableRow>
                     { [1,2,3,4,5,6].map((_,index)=>(
                       <TableCell key={index}>
                      <MokData height="40px" width="100%" key={index} />
                    </TableCell>                    
                     ))}
                  </TableRow>                   
                    </TableBody>                
                  )) 
              }

                <TableBody>
                 { AttendanceList.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.meeting?.title}</TableCell>
                    <TableCell >{item.meeting?.meetingId}</TableCell>
                    <TableCell >{moment(item.date).format("LL")}</TableCell>

                      <TableCell >{item.noOfParticipants}</TableCell>

                    <TableCell onClick={() => handleEdit(item)} >
                      <FactCheckOutlinedIcon color='success'
                     
                       sx={{cursor:'pointer'}}/>
                      </TableCell> 

                   
                    <TableCell  onClick={() => handleDelete(item._id)}>
                      < DeleteForeverOutlinedIcon color='error' sx={{cursor:'pointer'}}/></TableCell>
                  </TableRow>
                ))
              }
    </TableBody>
  </Table>
   


   <TablePagination
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={totalCount}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

 </TableContainer>
 </Box>

        </Paper>
             
             <ResponsiveAttendance
             handleEdit={handleEdit}
             AttendanceList={AttendanceList}
             openDialog={openUserList}
             handleDelete={handleDelete}
             isLoading={isLoading}
             />


{openUser && (
  <AttendanceAdd
    open={openUser}
    onClose={() => setOpenUser(false)}
    initialValues={initialValues || undefined}
    handleSubmit={handleSubmit}
    loading={loading}
  />
)}

    </AdminLayout>
  )
}

export default Attendance

function setSelectedAttendance(arg0: { _id: string; meetingId: string; date: string; participantIds:[] }) {
  throw new Error('Function not implemented.')
}
