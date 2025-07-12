"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { PARTICIPANT_USERS_API } from "@/constant";
import useRequest from "@/util/useRequest";
import ParticipatesAdd from "./ParticipatesAdd";
import MokData from "../../components/ MokData";


interface Participants {
  createdAt: string;
  _id: string;
  user?: {
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

const Participates: React.FC<AddUserDialogProps> = ({ meetingId }) => {
  const [openUser, setOpenUser] = useState(false);

  const openUserList = () => {
    setOpenUser(true);
  };
  const closeUserList = () => {
    setOpenUser(false);
  };

  const { data, isLoading } = useRequest({
    url: `${PARTICIPANT_USERS_API}/${meetingId}`,
    params: { openUser },
  });

  const participantsList = (data?.data?.list as Participants[]) || [];

  const selectedUsers = participantsList
    .filter((p) => p.user) // make sure user exists
    .map((user) => user.user!._id); // non-null assertion since we filtered undefined

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <Button
          sx={{ backgroundColor: "green", color: "white", textTransform: "none" }}
          onClick={openUserList}
        >
          Add Participant
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ border: "1px solid black" }}>
          <TableHead sx={{ display: "block" }}>
            <TableRow
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "100%",
              }}
            >
              <TableCell>Participant Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          {isLoading ? (
            <TableBody>
              {Array.from({ length: 8 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={3}>
                    <MokData height="10px" width="100%" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody sx={{ display: "block", maxHeight: 410, overflowY: "auto" }}>
{participantsList
  .filter((participant) => participant.user) // only include valid users
  .map((participant, index) => (
    <TableRow
      key={index}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        width: "100%",
      }}
    >
      <TableCell>{participant.user?.userId}</TableCell>
      <TableCell>{participant.user?.fullName}</TableCell>
      <TableCell>{participant.user?.email}</TableCell>
    </TableRow>
))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <ParticipatesAdd
        open={openUser}
        onClose={closeUserList}
        initialValues={{ users: selectedUsers }}
        meetingId={meetingId}
      />
    </Box>
  );
};

export default Participates;



function useRef(selectedUsers: string[]) {
  throw new Error("Function not implemented.");
}

