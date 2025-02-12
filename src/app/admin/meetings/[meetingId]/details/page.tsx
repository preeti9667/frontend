"use client";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "@/app/admin/admin.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import SpaIcon from "@mui/icons-material/Spa";
import { useRouter } from "next/navigation";
import { ADMIN_MEETING_ROUTE, GET_MEETING_API } from "@/constant";
import AdminLayout from "../../../AdminLayout";
import MyDialog from "@/app/admin/components/Dialog";
import { toast } from "react-toastify";

interface DataItem {
  _id: string;
  meetingId: string;
  createdAt: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
  startDate: string;
  endDate: string;
  type: string;
}

export default function page({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const [meeting, setMeeting] = useState<DataItem | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
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

  const handleUpDate = (_id: string | undefined) => {
    // console.log(id)
    router.push(`${ADMIN_MEETING_ROUTE.url}/${_id}/edit`);
  };
  const  handleStatusChange = async(event: SelectChangeEvent<string>) => {
    const value = event.target.value;
   try {
    const res = axios.put(`${GET_MEETING_API}/${(await params).meetingId}/status`,
      {
        status: value
      })
    setStatus((await res).data.meeting.status)
    // console.log(res)
   } catch (error: any) {
    const errorResponse = error.response.data;
           toast.error(errorResponse.message, {theme: 'colored'});
   
   }
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          background: { xs: "none", md: "white", lg: "white", xl: "white" },
          padding: { xs: "0", md: "20px", lg: "20px", xl: "20px" },
        }}
      >
        <Box>
          <Link href={`${ADMIN_MEETING_ROUTE.url}`} className={style.back}>
            <ArrowBackIcon fontSize="small" />
            Back
          </Link>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl: "1fr 1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr",
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "18px",}}>
            <Box>
              <Typography textAlign={"center"} color="success">
                {meeting?.title.toLocaleUpperCase()}
              </Typography>
            </Box>

            <Typography>Meeting Id: {meeting?.meetingId}</Typography>
            <Typography>Created At: {moment(meeting?.createdAt).format("lll")}</Typography>

            <Typography>
              Time: {meeting?.startTime} - {meeting?.endTime}
            </Typography>

            <Typography>
              Date: {moment(meeting?.startDate).format("ll")} -{" "}
              {moment(meeting?.endDate).format("ll")}
            </Typography>

            <Typography>Description: {meeting?.description}</Typography>

            <Typography>Type: {meeting?.type}</Typography>
          
            <FormControl sx={{ width: '200px'}}  size="small">
            <InputLabel id="demo-simple-select-label" >Status</InputLabel>
            <Select
             label="Status"
          value={status}
          onChange={handleStatusChange}
          
          >
          <MenuItem value='CREATED' >CREATED</MenuItem>
          <MenuItem value='COMPLETED'>COMPLETED</MenuItem>
        </Select>
             </FormControl>

            <Box className={style.action}>
              <Button
                sx={{ textTransform: "none", fontSize: "20px", width: "150px" }}
                variant="contained"
                color="success"
                onClick={() => handleUpDate(meeting?._id)}
              >
                Update
              </Button>
              <Button
                sx={{ textTransform: "none", fontSize: "20px", width: "150px" }}
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>

          <Box sx={{ border: "1px solid black" }}>hello</Box>
        </Box>

        <MyDialog
          handleDelete={deleteMeeting}
          onClose={handleClose}
          open={open}
        />
      </Box>
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
