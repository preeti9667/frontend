"use client";
import { Alert, Avatar, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import AdminLayout from "../../AdminLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "@/app/admin/admin.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import SpaIcon from "@mui/icons-material/Spa";
import { useRouter } from "next/navigation";
import { ADMIN_MEETING_ROUTE } from "@/constant";

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
  //  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');
  // const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
  //   'success'
  // );
  

  const router = useRouter();


  const fetchMeetings = async () => {

    const meetingId = (await params).meetingId;

    try {
      const response = await axios.get(
        `http://localhost:4000/meeting/${meetingId}`
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
      await axios.delete(`http://localhost:4000/meeting/${meetingId}`);
      // setSnackbarMessage('Meeting deleted successfully.');
      // setSnackbarSeverity('success');
      // setSnackbarOpen(true);
    router.push('/admin/meeting')

    } catch (error) {
      console.error('Error deleting meeting:', error);
      // setSnackbarMessage('Failed to delete the meeting.');
      // setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


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
          <Link href={"/admin/meeting"} className={style.back}>
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
            onClick={deleteMeeting}
          >
            Delete
          </Button>
        </Box>
         {/* Snackbar for Feedback */}

            {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} 
        severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
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

