"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "@/app/admin/admin.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import moment from "moment";
import SpaIcon from "@mui/icons-material/Spa";
import { useRouter } from "next/navigation";
import { ADMIN_MEETING_ROUTE, GET_MEETING_API, PARTICIPANT_USERS_API } from "@/constant";
import AdminLayout from "../../../AdminLayout";
import MyDialog from "@/app/admin/components/Dialog";
import { toast } from "react-toastify";
import { Moment, StatusColor, TypeColor } from "@/app/admin/components/Chip";
import Grid from '@mui/material/Grid2';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MeetingUsers from "../../components/MeetingUsers";
import { ButtonStyle } from "@/app/admin/components/ButtonStyle";
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

interface participantItem {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  isActive: boolean;
}

export default  function page({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const [meeting, setMeeting] = useState<DataItem | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [action, setAction] = useState(false);

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
      getUsers();
  }, [status]);

  const [participant, setParticipant] = useState<participantItem[]>([]);
  const getUsers = async () => {
    try {
      const response = await axios.get(`${PARTICIPANT_USERS_API}/${(await params).meetingId}/search-users`);
      // console.log(response.data.data.list);
      setParticipant(response.data.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpDate = (_id: string | undefined) => {
    // console.log(id)
    router.push(`${ADMIN_MEETING_ROUTE.url}/${_id}/edit`);
  };
  const  handleStatusChange = async(event: String) => {
    // const value = event.target.value;
    const value = event

   try {
    const res = axios.put(`${GET_MEETING_API}/${(await params).meetingId}/status`,
      {
        status: value
      })
    setStatus((await res).data.meeting.status)
   if ((await res).status === 200) {
    toast.success('Status updated successfully', {theme: 'colored'});
    setIsOpen(false);
   }
    // console.log(res)
   } catch (error: any) {
    const errorResponse = error.response.data;
          toast.error(errorResponse.message, {theme: 'colored'});
   
   }
  };

  const handleShowAction = ()=>{
    setAction(!action)
  }
  

const [isOpen, setIsOpen] = useState(false);

  const handleClickStatus =()=>{
    setIsOpen(!isOpen)
  }
  
const [openUser, setOpenUser] = useState(false);
  
const openUserList =()=>{
  setOpenUser(true)
}
const closeUserList =()=>{
  setOpenUser(false)
}

const handleAddUser = async() => {
try {
  const res = axios.post(`${PARTICIPANT_USERS_API}`)
    
  console.log(res)
  if ((await res).status === 200) {
    toast.success('Status updated successfully', {theme: 'colored'});
  }
} catch (error: any) {
  const errorResponse = error.response.data;
  toast.error(errorResponse.message, {theme: 'colored'});
}
}

  return (
    <AdminLayout>
      <Box
        sx={{
          background: { xs: "none", md: "white", lg: "white", xl: "white" },
          position: "relative",
        }} >
         <Box sx={{background:'var(--text-color)', display:"flex",padding:"10px",
         justifyContent:"space-between"}}>
            <Box sx={{display:"flex", gap:"10px", alignItems:"center"}}>
       
            <ArrowBackIcon fontSize="small"  onClick={()=>router.back()}
             sx={{width:"30px",height:"30px", color:"white", cursor:"pointer"}}/>

          <Typography variant="h5" color="white">Meeting Details</Typography>
          </Box>

          <Box sx={{display:{lg:"block", xl:"block", md:'block', sm:"none", xs:"none"}}}>
          <Box sx={{display:"flex", gap:"10px", alignItems:"center"}}>

          {/* <FormControl sx={{m:1,minWidth:100, background:"white", borderRadius:"5px"}} 
          size="small" >

            <InputLabel>Status</InputLabel>
            <Select sx={{height:"35px"}}
             label="Status"
          value={status}
          onChange={handleStatusChange}>
          <MenuItem value='CREATED'>CREATED</MenuItem>
          <MenuItem value='COMPLETED'>COMPLETED</MenuItem>
        </Select>
             </FormControl> */}

           
            <Button
               id="basic-button"
            onClick={handleClickStatus}
            variant="contained"
          
            sx={{height:"35px", backgroundColor:"white", textTransform:"none", color:"var(--text-color)" , boxShadow:"none"}}
           >
              Status
            </Button>
         <Menu open={isOpen} onClose={handleClickStatus} 
           sx={{".css-1tktgsa-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {top:"140px !important", right:{md:"180px", sm:"130px", xs:"130px", lg:"180px", xl:"180px"}, left:"auto !important"}}}
        >
           <MenuItem onClick={() => handleStatusChange("CREATED") } >CREATED</MenuItem>
           <MenuItem onClick={() => handleStatusChange("COMPLETED")}>COMPLETED</MenuItem>
         </Menu>
            

             <Box className={style.action}>
              <Button
               className={style.btnMenu}
                variant="outlined"
                color="success"
                onClick={() => handleUpDate(meeting?._id)}>
                Update
              </Button>
              <Button
         className={style.btnMenu}
                variant="outlined"
                color="error"
                onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Box></Box>
          <Box sx={{display:{lg:"none", xl:"none", md:'none', sm:"block", xs:"block"}}}>
            <Button onClick={handleShowAction} sx={{background:"white", borderRadius:"40px"}}>
             <MoreVertIcon/>
           </Button>
          </Box>
          {
            action && (
              <Paper elevation={0}
               sx={{position:"absolute", right:'29px', marginTop:"36px", display:"flex", flexDirection:"column"}}>

<Button
               id="basic-button"
            onClick={handleClickStatus}
            variant="contained"
          
            sx={{ backgroundColor:"white", textTransform:"none", color:"var(--text-color)", boxShadow:"none"}}  >
              Status
            </Button>
      
         <Divider/>

              <Button
                sx={{ textTransform: "none"}}
                color="success"
                // variant="outlined"
                onClick={() => handleUpDate(meeting?._id)}>
                Update
              </Button>
              <Divider/>
              <Button
                sx={{ textTransform: "none"}}
                color="error"
                // variant="outlined"
                onClick={handleDelete}>
                Delete
              </Button>
            
              </Paper>
            )
          }

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
          padding: { xs: "10px", md: "20px", lg: "20px", xl: "20px" }, }}>

            <Grid container spacing={2} gap={4}>
              <Grid size={3} sx={{display:"grid", gap:"8px"}}>
                <Box>Title</Box>
                <Box>Meeting Id</Box>
                  <Box> Created At</Box>
                  <Box>  Time</Box>
                  <Box>StartDate</Box>
                  <Box>endDate</Box>
                  <Box>Description</Box>
                  <Box>Type</Box>
                  <Box>Status</Box>
              </Grid>
              <Grid size={8} sx={{display:"grid", gap:"8px"}}>
                <Box>
              {meeting?.title.toLocaleUpperCase()}
                </Box>
                <Box>   
              {meeting?.meetingId}
                </Box>
                <Box>                
              <Moment item={String(meeting?.createdAt)} type="lll"/>
                </Box>
                <Box>
                {meeting?.startTime} - {meeting?.endTime}
                </Box>
                <Box>
                <Moment item={String(meeting?.startDate)} type="ll"/> 
                </Box>
                <Box>
                <Moment item={String(meeting?.endDate)} type="ll"/>
                  </Box>
                  <Box>
                  {meeting?.description}
                  </Box>
                  <Box>
                  <TypeColor item={String(meeting?.type)}/>
                  </Box>
                  <Box>
                  <StatusColor item={String(meeting?.status)}/>
                  </Box>
              </Grid>
            </Grid>

          <Box sx={{ border: "1px solid black" }}>
            <Box>
             <ButtonStyle onClick={openUserList}  title="Add User" color="success" variant="contained"/>
                   
            </Box>
            <Box>
              <MeetingUsers open={openUser} 
              onClose={closeUserList} 
              participant={participant}
              onSubmit={handleAddUser} />
            </Box>
            
            hello</Box>
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
