"use client";
import React, {useEffect, useMemo, useState, } from "react";
import {
  Box,
  Tab,
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
import useRequest from "@/util/useRequest";
import MokData, { CustomCircularProgress } from "../../components/ MokData";




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
  const [openUser, setOpenUser] = useState(false);

  const openUserList = () => {
    setOpenUser(true);
  };
  const closeUserList = () => {
    setOpenUser(false);
  };

  const { data,isLoading } = useRequest({
    url: `${PARTICIPANT_USERS_API}/${meetingId}`,
    params: {
        
      },
  });
  const participantsList = data?.data?.list as Participants [] || [];
  const selectedUsers = participantsList.map((user: Participants) => user.user._id);

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
            <TableRow sx={{ display: "grid",gridTemplateColumns:"1fr 1fr 1fr", width: "100%" }}>
              <TableCell>Participant Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          {isLoading &&
                Array.from({length: 8}).map((_, index) => (
               <TableBody key={index}>
                  <TableRow>                    
                      <TableCell key={index}>
                      <MokData height="10px" width="100%" key={index} />
                    </TableCell>                    
                  </TableRow>                   
                    </TableBody>                
                  ))}   

          <TableBody
            sx={{ display: "block", maxHeight: 410, overflowY: "auto" }}>
            {participantsList.map((participant,index) => (
              <TableRow
                key={index}
                sx={{ display: "grid", width: "100%", gridTemplateColumns:"1fr 1fr 1fr"}} >
                <TableCell>{participant.user.userId}</TableCell>
                <TableCell>{participant.user.fullName}</TableCell>
                <TableCell>{participant.user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ParticipatesAdd
        open={openUser}
        onClose={closeUserList}
        initialValues={{ users: selectedUsers }} // Pass pre-selected users
          meetingId={meetingId}  />
    </Box>
  );
};

export default Participates;
function useRef(selectedUsers: string[]) {
  throw new Error("Function not implemented.");
}

