'use client'
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, InputBase } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { PARTICIPANT_USERS_API } from "@/constant";
import { useEffect, useState } from "react";
import CustomInputBase from "../../components/InputBase";
import useRequest from "@/util/useRequest";
import useRequestPost from "@/util/useRequestPost";
import { CustomCircularProgress } from "../../components/ MokData";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface User {
  _id: string;
  fullName: string;
  email: string;
  userId: string;
  isActive: boolean;
}


interface AddUserDialogProps {
    initialValues?: {
        users: string[];
      };
  open: boolean;
  onClose: () => void;
  meetingId: string
}

const validationSchema = Yup.object({});

const participatesAdd:React.FC<AddUserDialogProps> = ({initialValues,open, onClose,meetingId,})=>{
const [limit] = useState();
const [search, setSearch] = useState(""); 
const [newNextPage, setNextPage] = useState<string| null>(null)

  const handleAddParticipants = async (selectedUserIds: string[]) => {
    const response = await useRequestPost({
      url: `${PARTICIPANT_USERS_API}`,
      data: {
        userIds: selectedUserIds, // Send only checked users
        meetingId: meetingId,
        removedUserIds: allUsers.filter((user) => !selectedUserIds.includes(user._id)).map((user) => user._id),
      }
    })
    if (response.status === 200) {
      window.location.reload();
      onClose();
    }
  };

  const {data, isLoading} = useRequest({
    url: `${PARTICIPANT_USERS_API}/${meetingId}/search-users`,
    params: {
      search,
      limit,
      nextPageTimeStamp : newNextPage
    }
  })
  const allUsers = data?.data?.list as User[] || [];
  const nextPage = data?.data?.nextPage 

  
    return(
        <>
  <Dialog open={open} onClose={onClose}>
  <DialogTitle
    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap:"20px",backgroundColor:"var(--text1-color)",padding:"10px" }} >
   <CustomInputBase setSearch={setSearch} defaultValue={search} inputSize="300px"/>
      <HighlightOffOutlinedIcon color="error"
      onClick={onClose}
       sx={{ cursor: "pointer" }} />
  </DialogTitle>
  <Divider />
 
  <DialogContent sx={{padding:"1px 2px"}}>
  
  <Button onClick={() => setNextPage(nextPage)} disabled={isLoading}
    sx={{textTransform:"none", color:'var(--text-color)',display:"flex", alignItems:"center"}}>
    Next Page
    <ArrowForwardIcon sx={{fontSize:"18px"}}/>
    </Button>
   
      <Formik
       validationSchema={validationSchema}
       initialValues={{ users: initialValues?.users || [] }} // Preselect users
       onSubmit={(values) => handleAddParticipants(values.users)} // Extract user IDs
       enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
{
  isLoading ? 
  <Box sx={{height:"320px", display:"flex", justifyContent:"center", alignItems:"center"}}> 
  <CustomCircularProgress/>
  </Box>
  :
     <Box id='scrollableDiv'
    sx={{padding: "10px",height:'320px', overflowY: "scroll",display:'grid', gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
                     
            {allUsers.map((user,index) => (
              <Box key={index} >
               <Field
               sx={{paddingLeft:"0px"}}
  type="checkbox"
  name="users"
  value={user._id}
  as={Checkbox}
  checked={values.users.includes(user._id)} // Show checked for already added users
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const updatedUsers = checked
      ? [...values.users, user._id] // Add if checked
      : values.users.filter((id) => id !== user._id); // Remove if unchecked
    setFieldValue("users", updatedUsers);
  }}
/>
                <label>{user.fullName}</label>
              </Box>
            ))}
            {/* </InfiniteScroll> */}
            </Box>}
            <Divider/>
            <Button variant="contained" sx={{ margin:"10px"}}
             color="success"
             type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </DialogContent>
</Dialog>

        </>
    )
}
export default participatesAdd;

function closeUserList() {
  throw new Error("Function not implemented.");
}
