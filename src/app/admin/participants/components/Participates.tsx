"use client";
import React, {useEffect, useMemo, useState, } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ButtonStyle } from "../../components/ButtonStyle";
import { useDebouncedCallback } from "use-debounce";
import ParticipatesAdd from "./ParticipatesAdd";
import { PARTICIPANT_USERS_API } from "@/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";


interface User {
  _id: string;
  fullName: string;
  email: string;
  userId: string;
  isActive: boolean;
}

interface Participants {
  createdAt: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    userId: string;
    isActive: boolean;
  };
}

interface AddUserDialogProps {
  meetingId: string;
}


const Participates: React.FC<AddUserDialogProps> =({ meetingId }) => {
  const [search, setSearch] = useState(""); 
  const [openUser, setOpenUser] = useState(false);
  const [participant, setParticipant] = useState<User[]>([]); // Already added users
  const [allUsers, setAllUsers] = useState<Participants[]>([]); // All available users
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Track selected user IDs

    const [nextPage, setNextPage] = useState<string | null>(null);
  

  const [limit] = useState(10);
  const openUserList = () => {
    setOpenUser(true);
  };
  const closeUserList = () => {
    setOpenUser(false);
  };

  const handleAddParticipants = async (selectedUserIds: string[]) => {
    // console.log(selectedUserIds)
    try {
      const response = await axios.post(`${PARTICIPANT_USERS_API}`, {
        userIds: selectedUserIds, // Send only checked users
        meetingId: meetingId,
        removedUserIds: allUsers.filter((user) => !selectedUserIds.includes(user.user._id)).map((user) => user.user._id),
      });

      if (response.status === 200) {
        toast.success("Users added successfully", { theme: "colored" });
        closeUserList();
      } else {
        toast.error("Failed to add participants");
      }
    } catch (error) {
      console.error("Error adding participants:", error);
    }
  };
  const getUsers = async () => {
 
    try {
      const response = await axios.get(
        `${PARTICIPANT_USERS_API}/${meetingId}/search-users`,
        {
          params: {
            search,
            limit ,
            nextPageTimeStamp: nextPage,
          },
        }
      );

      const { list, nextPage: newNextPage } = response.data.data;
       
        // const addedUsers = response.data.data.list;
        setParticipant([...participant, ...list]);
      
        setNextPage(newNextPage);
        // console.log(newNextPage) 
    } catch (error) {
      console.error(error);
    
    }
  };


  const getParticipants = async () => {
    try {
      const response = await axios.get(`${PARTICIPANT_USERS_API}/${meetingId}`);
      const usersList = response.data.data.list;
      // console.log(usersList);
      setAllUsers(usersList);

      const select = usersList.map((user: Participants) => user.user._id);

      // console.log(select)
      setSelectedUsers(select);
    } catch (error) {
      console.error(error);
    }
  };

const debounced = useDebouncedCallback(
    // function
    (search) => {
      setSearch(search);
    },
    1000
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value);
  };


  useEffect(() => {
    getParticipants();
    getUsers();
  }, [search]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <ButtonStyle
          onClick={openUserList}
          title="Add  Participant"
          color="success"
          variant="contained"
        />
      </Box>
      <TableContainer>
        <Table sx={{ border: "1px solid black" }}>
          <TableHead sx={{ display: "block" }}>
            <TableRow sx={{ display: "table", width: "100%" }}>
              <TableCell>Participant Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody
            sx={{ display: "block", maxHeight: 410, overflowY: "auto" }}
          >
            {allUsers.map((user) => (
              <TableRow
                key={user.user._id}
                sx={{ display: "grid", width: "100%", gridTemplateColumns:"1fr 1fr 1fr"}}
              >
                <TableCell>{user.user.userId}</TableCell>
                <TableCell>{user.user.fullName}</TableCell>
                <TableCell>{user.user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

   
            


      <ParticipatesAdd
        open={openUser}
        onClose={closeUserList}
        participant={participant} // Pass all users
        initialValues={{ users: selectedUsers }} // Pass pre-selected users
        onSubmit={handleAddParticipants}
        search={debounced}
        onChange={handleChange}
        getUsers={getUsers}
        hasMore={nextPage}
      />

    </Box>
  );
};

export default Participates;
function useRef(selectedUsers: string[]) {
  throw new Error("Function not implemented.");
}

