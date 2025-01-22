"use client";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "@/app/admin/admin.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import SpaIcon from "@mui/icons-material/Spa";
import { useRouter } from "next/navigation";
import { ADMIN_MEETING_ROUTE, GET_MEETING_API } from "@/constant";
import AdminLayout from "../../../AdminLayout";

interface DataItem {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
  startDate: string;
  endDate: string;
  type:string;

}

export default function page({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const [meeting, setMeeting] = useState<DataItem | null>(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const fetchMeetings = async () => {
    const meetingId = (await params).meetingId;

    try {
      const response = await axios.get(`${GET_MEETING_API}/${meetingId}`);
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
      router.push(`${ADMIN_MEETING_ROUTE.url}`);
    } catch (error) {
      console.error("Error deleting meeting:", error);
      setSnackbarOpen(true);
    }
  };

  const handleDelete = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleUpDate =(_id: string | undefined) =>{
    // console.log(id)
   router.push(`${ADMIN_MEETING_ROUTE.url}/${_id}/edit`);

  }

  return (
    <AdminLayout>
      <Paper
        elevation={0}
        sx={{
          // margin: "auto",
          padding: "30px 40px",
          }} >

        <Box>
          <Link href={`${ADMIN_MEETING_ROUTE.url}`} className={style.back}>
            <ArrowBackIcon fontSize="small" />
            Back
          </Link>
        </Box>

        <Box sx={{border:"1px solid black",
          display:"grid",
          gridTemplateColumns:"1fr 1fr ",
        

        }}>
          <Box>
        <Avatar className={style.avatar}>
          <SpaIcon color="success" sx={{ width: "100px", height: "100px" }} />
        </Avatar>
        <Box>
          <Typography textAlign={"center"} color="success">
            {meeting?.title.toLocaleUpperCase()}
          </Typography>
        </Box>

        <Box className={style.time}>
          <Typography>
            {meeting?.startTime}-{meeting?.endTime}
          </Typography>

          <Typography>{moment(meeting?.startDate).format("ll")}</Typography>
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
          <Button
            // className={style.actionBtn}
            sx={{textTransform:'none', width:"200px", fontSize:"20px"}}
            variant="contained"
            color="success"
            onClick={
              () =>
              handleUpDate
              (meeting?._id)
            }
          >
            Update
          </Button>
          <Button
            sx={{textTransform:'none', width:"200px", fontSize:"20px"}}
            
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box></Box>

        <Box sx={{border:"1px solid black"}}>

           hello
        </Box></Box>


        {/* Delete Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure you</DialogTitle>
          <DialogActions>
            <Button onClick={deleteMeeting} variant="contained" color="success">
              Yes
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              No
            </Button>
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
