'use client'
import React, { use, useEffect, useState } from "react";
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, InputBase, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { ButtonStyle } from "../../components/ButtonStyle";
import { useDebouncedCallback } from "use-debounce";
import ParticipatesAdd from "./ParticipatesAdd";
import { PARTICIPANT_USERS_API } from "@/constant";
import axios, { all } from "axios";
import { toast } from "react-toastify";

interface User {
  _id: string;
  fullName: string;
  email: string;
  userId: string;
  isActive: boolean;
}

interface Participants{
 
  createdAt: string;
  user:{
    _id: string;
    fullName: string;
    email: string;
    userId: string;
    isActive: boolean;
  }
}

interface AddUserDialogProps {
  meetingId: string;
}

// const debounced = useDebouncedCallback(
//   // function
//   (search) => {
//     setSearch(search);
//   },
//   1000
// );
const  Participates:React.FC<AddUserDialogProps> = ({meetingId}) =>{

  
// const [initialValues, setInitialValues] = useState<User | null >(null)
  const [search, setSearch] = useState("");
// const [participant, setParticipant] = useState<User[]>([]);

// const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

const [openUser, setOpenUser] = useState(false);

const [participant, setParticipant] = useState<User[]>([]); // Already added users
const [allUsers, setAllUsers] = useState<Participants[]>([]); // All available users
const [selectedUsers, setSelectedUsers] = useState<string[]>([]); ; // Track selected user IDs
const openUserList =()=>{
 
  setOpenUser(true)
}
const closeUserList =()=>{
  setOpenUser(false)
}

const handleAddParticipants = async (selectedUserIds: string[]) => {
  // console.log(selectedUserIds)
  try {
    const response = await axios.post(`${PARTICIPANT_USERS_API}`, {
      userIds: selectedUserIds, // Send only checked users
    meetingId: meetingId
    });
    if(response.status === 200){
            toast.success('Users added successfully', { theme: 'colored' });
               closeUserList();
    } else {
      toast.error("Failed to add participants");
    }
  } catch (error) {
    console.error("Error adding participants:", error);
  }
};
const getParticipants = async () => {
 
  try {
    const response = await axios.get(`${PARTICIPANT_USERS_API}/${meetingId}/search-users`);
    const addedUsers = response.data.data.list;
    setParticipant(addedUsers);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  getParticipants();
  getUsers();
}, [selectedUsers]);


const getUsers = async () => {
  try {
    const response = await axios.get(`${PARTICIPANT_USERS_API}/${meetingId}`);
    const usersList = response.data.data.list;
    // console.log(usersList)
    setAllUsers(usersList);

    const select = usersList.map((user: Participants) => user.user._id);
    // console.log(select)
    setSelectedUsers(select);
  } catch (error) {
    console.error(error);
  }
};

  return(

<Box sx={{ border: "1px solid black" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
             <ButtonStyle onClick={openUserList}  title="Add User" color="success" variant="contained"/>
                   
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>Created At</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>

                    
                      {
                        allUsers.map((user) => (
                          <TableRow key={user.user._id}>
                            <TableCell>{user.user.userId}</TableCell>
                            <TableCell>{user.user.fullName}</TableCell>
                            <TableCell>{user.user.email}</TableCell>
                            {/* <TableCell>{user.createdAt}</TableCell> */}
                          </TableRow>
                        ))
                      }
                     
                    </TableBody>
            </Table>
          
            <ParticipatesAdd
  open={openUser} 
  onClose={closeUserList} 
  participant={participant} // Pass all users
  initialValues={{ users: selectedUsers }} // Pass pre-selected users
  onSubmit={handleAddParticipants} 
/>
           </Box>


  )}


export default Participates;
