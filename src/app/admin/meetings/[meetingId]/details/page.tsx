"use client";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {useState } from "react";
import style from "@/app/admin/admin.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import {
  ADMIN_MEETING_ROUTE,
  GET_MEETING_API,
} from "@/constant";
import AdminLayout from "../../../AdminLayout";
import MyDialog from "@/app/admin/components/Dialog";
import { toast } from "react-toastify";
import { Moment, StatusColor, TypeColor } from "@/app/admin/components/Chip";
import Grid from "@mui/material/Grid2";
import { useParams } from "next/navigation";
import axios from "axios";
import Participants from "@/app/admin/participants/page";
import useRequest from "@/util/useRequest";
import Responsive from "./ResponsiveAction";
import MokData from "@/app/admin/components/ MokData";
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

const MeetingDetails = () => {
  const params = useParams<{ meetingId: string }>();
  const meetingId = params.meetingId;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

 
  const {data, isLoading} = useRequest({
    url: `${GET_MEETING_API}/${meetingId}`,
    params:{
      status
    }
  });
  const meeting = data?.meeting as DataItem || null;

  const deleteMeeting = async () => {
    try {
      await axios.delete(`${GET_MEETING_API}/${meetingId}`);
      router.push(`${ADMIN_MEETING_ROUTE.url}`);
    } catch (error:any) {
      toast.error(error.message || "Something went wrong", { theme: "colored" });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  const handleUpDate = (_id: string | undefined) => {
    // console.log(id)
    router.push(`${ADMIN_MEETING_ROUTE.url}/${_id}/edit`);
  };
  const handleStatusChange = async (event: String) => {
    const value = event;
    try {
      const res = await axios.put(
        `${GET_MEETING_API}/${meetingId}/status`,
        {
          status: value,
        }
      );
      setStatus(res.data.meeting.status);
      if (res.status === 200) {
        toast.success("Status updated successfully", { theme: "colored" });
        setIsOpen(false);
      }
      // console.log(res)
    } catch (error: any) {
      const errorResponse = error.response.data;
      toast.error(errorResponse.message, { theme: "colored" });
    }
  };

  const handleClickStatus = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          background: { xs: "none", sm:'white', md: "white", lg: "white", xl: "white" },
          position: "relative",
          margin:{
            xs: "0px -24px",
            sm: "0px",
            md: "0px",
            lg: "0px",
            xl: "0px",
          },
        }}
      >
        <Box
          sx={{
            background: "var(--text-color)",
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <ArrowBackIcon
              fontSize="small"
              onClick={() => router.back()}
              sx={{
                width: "30px",
                height: "30px",
                color: "white",
                cursor: "pointer",
              }}
            />

            <Typography variant="h5" color="white">
              Meeting Details
            </Typography>
          </Box>

          <Box
            sx={{
              display: {
                lg: "block",
                xl: "block",
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          >
    
    {/* Top Action */}
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Button
                onClick={handleClickStatus}
                variant="contained"
                sx={{
                  height: "35px",
                  backgroundColor: "white",
                  textTransform: "none",
                  color: "var(--text-color)",
                  boxShadow: "none",
                }}
              >
                Status
              </Button>
              <Menu
                open={isOpen}
                onClose={handleClickStatus}
                sx={{
                  ".css-1tktgsa-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
                    top: "140px !important",
                    right: {
                      md: "180px",
                      sm: "130px",
                      xs: "130px",
                      lg: "180px",
                      xl: "180px",
                    },
                    left: "auto !important",
                  },
                  ".css-1toxriw-MuiList-root-MuiMenu-list": {
                    paddingTop:'0',
                    paddingBottom:'0'
                  }
                }}
              >
          
                <MenuItem onClick={() => handleStatusChange("COMPLETED")}>
                  COMPLETED
                </MenuItem>
              </Menu>

              <Box className={style.action}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    boxShadow: "none",
                    background: "white",
                    color: "var(--text-color)",
                  }}
                  onClick={() => handleUpDate(meeting?._id)}
                >
                  Update
                </Button>

                <Button
                  sx={{
                    textTransform: "none",
                    boxShadow: "none",
                    background: "white",
                    color: "var(--text-color)",
                  }}
                  variant="outlined"
                  color="error"
                  onClick={() => setOpen(true)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>

{/* Top Action Responsive */}
          <Responsive
            handleClickStatus={handleClickStatus}
            handleOpen={()=>setOpen(true)}
            handleUpdate={() => handleUpDate(meeting?._id)}
          />

        </Box>

      {/* Meeting Details */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl: "1fr 1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr",
            },
            padding: { xs: "10px", md: "20px", lg: "20px", xl: "20px" },
          }}
        >
          <Grid container spacing={2} gap={4} sx={{height:'400px', marginTop:"30px"}}>
            <Grid size={3} sx={{ display: "grid", gap: "8px", }}>
              <Box>Title</Box>
              <Box>Meeting Id</Box>
              <Box> Created At</Box>
              <Box> Time</Box>
              <Box>StartDate</Box>
              <Box>EndDate</Box>
              <Box>Description</Box>
              <Box>Type</Box>
              <Box>Status</Box>
            </Grid>
           
         
          {isLoading ?
          <Box sx={{display: "grid", gap: "2px",marginTop:"30px"}}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <MokData width="200px" height="6px" key={item}/>
            ))
            }
          </Box>  :
            <Grid size={8} sx={{ display: "grid", gap: "8px" }}>
              <Box>{meeting?.title.toLocaleUpperCase()}</Box>
              <Box>{meeting?.meetingId}</Box>
              <Box>
                <Moment item={String(meeting?.createdAt)} type="lll" />
              </Box>
              <Box>
                {meeting?.startTime} - {meeting?.endTime}
              </Box>
              <Box>
                <Moment item={String(meeting?.startDate)} type="ll" />
              </Box>
              <Box>
                <Moment item={String(meeting?.endDate)} type="ll" />
              </Box>
              <Box>{meeting?.description}</Box>
              <Box>
                <TypeColor item={String(meeting?.type)} />
              </Box>
              <Box>
                <StatusColor item={String(meeting?.status)} />
              </Box>
            </Grid>}
          </Grid>

        <Participants meetingId={meetingId} />

        </Box>


        <MyDialog
          handleDelete={deleteMeeting}
          onClose={handleClose}
          open={open}
        />

      </Box>
    </AdminLayout>
  );
};
export default MeetingDetails;
function setSnackbarMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

function setSnackbarSeverity(arg0: string) {
  throw new Error("Function not implemented.");
}

function setSnackbarOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
