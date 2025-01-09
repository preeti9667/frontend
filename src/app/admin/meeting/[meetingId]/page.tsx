"use client";
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogTitle, Paper, Snackbar, Typography } from "@mui/material";
import AdminLayout from "../../AdminLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "@/app/admin/admin.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import SpaIcon from "@mui/icons-material/Spa";
import { useRouter } from "next/navigation";
import {  ADMIN_MEETING_ROUTE, GET_MEETING_API } from "@/constant";

interface DataItem {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
  date: number;
}

export default function page({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {


  const [meeting, setMeeting] = useState<DataItem | null>(null);
  const [open,setOpen] =  useState(false)

  const router = useRouter();


  const fetchMeetings = async () => {

    const meetingId = (await params).meetingId;

    try {
      const response = await axios.get(
      `${GET_MEETING_API}/${meetingId}`
      );
      setMeeting(response.data.meeting);
      // console.log(response.data.meeting)
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const deleteMeeting = async () => {
    const meetingId = (await params).meetingId;
    try {
      await axios.delete(`${GET_MEETING_API}/${meetingId}`);
    router.push(`${ADMIN_MEETING_ROUTE.url}`)

    } catch (error) {
      console.error('Error deleting meeting:', error);
      setSnackbarOpen(true);
    }
  };

  const handleDelete =()=>{
    setOpen(true)
  }
  const handleClose =()=>{
    setOpen(false)
  }

  useEffect(() => {
    fetchMeetings();
  }, []);


  return (
    <AdminLayout>
      <Paper
        elevation={0}
        sx={{
          margin: "auto",
          padding: "40px",
   
        }}>
        <Avatar className={style.avatar}> 
          <SpaIcon color="success" sx={{ width: "100px", height: "100px" }} />
        </Avatar>
        <Box>
          <Link href={`${ADMIN_MEETING_ROUTE.url}`} className={style.back}>
            <ArrowBackIcon fontSize="small" />
            Back
          </Link>
        </Box>
        <Box>
          <Typography textAlign={"center"} color="success">
            {meeting?.title.toLocaleUpperCase()}
          </Typography>
        </Box>

        <Box className={style.time}>
          <Typography>
            {meeting?.startTime}-{meeting?.endTime}
          </Typography>

          <Typography>{moment(meeting?.date).format("ll")}</Typography>
        </Box>
        <Box>
          <Typography>{meeting?.description}</Typography>
        </Box>

        <Box mt={3} mb={3}>
          <Typography variant="h5" color="success">
            {meeting?.status}
          </Typography>
        </Box>
        <Box className={style.action}>
          <Button className={style.actionBtn}
            variant="contained"
            color="success"

          >
            Update
          </Button>
          <Button
            className={style.actionBtn}
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Are you sure you want to delete this meeting?
          </DialogTitle>
          <DialogActions sx={{margin:"10px"}}>
            <Button onClick={deleteMeeting} variant="outlined">Yes</Button>
            <Button onClick={handleClose} variant="outlined">No</Button>

          </DialogActions>
        </Dialog>
        
      </Paper>
    </AdminLayout>
  );
}
function setSnackbarMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

function setSnackbarSeverity(arg0: string) {
  throw new Error("Function not implemented.");
}

function setSnackbarOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

