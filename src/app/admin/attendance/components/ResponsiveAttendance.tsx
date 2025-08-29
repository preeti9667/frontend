import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import moment from "moment";
import { CustomCircularProgress } from "../../components/ MokData";

interface Props {
  handleEdit: any;
  AttendanceList: any;
  openDialog: any;
  handleDelete: any;
  isLoading: boolean;
}

const ResponsiveAttendance: React.FC<Props> = ({
  openDialog,
  handleEdit,
  AttendanceList,
  handleDelete,
  isLoading,
}) => {
  return (
    <Box
      sx={{
        display: {
          xl: "none",
          md: "none",
          xs: "block",
          sm: "block",
          lg: "none",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            margin: "10px 0",
          }}
        >
          <Button
            sx={{ backgroundColor: "white", color: "black" }}
            onClick={() => openDialog(true)}
          >
            <AddCircleOutlineIcon />
          </Button>
          <Button
            sx={{ backgroundColor: "white", color: "black" }}
            onClick={() => window.location.reload()}
          >
            <RefreshIcon />
          </Button>
        </Box>

        {isLoading && (
          <Box
            sx={{
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomCircularProgress />
          </Box>
        )}

        {AttendanceList.map((AttendanceList: any) => (
          <Card
            key={AttendanceList._id}
            sx={{
              borderRadius: "20px 14px",
              background: "var(--text1-color)",
              margin: "20px 0",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ paddingLeft: "18px" }}>
                MeetingTitle: {AttendanceList.meeting?.title}{" "}
              </Typography>

              <Typography variant="h6" sx={{ paddingLeft: "18px" }}>
                MeetingId: {AttendanceList.meeting?.meetingId}{" "}
              </Typography>
              <Typography variant="h6" sx={{ paddingLeft: "18px" }}>
                Date: {moment(AttendanceList.date).format("LL")}
              </Typography>
              <Typography variant="h6" sx={{ paddingLeft: "18px" }}>
                Total: {AttendanceList.noOfParticipants}
              </Typography>
              <CardActions>
                <Button
                  size="small"
                  color="success"
                  onClick={() => handleEdit(AttendanceList)}
                  sx={{
                    textTransform: "capitalize",
                    border: "1px solid green",
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  sx={{ textTransform: "capitalize", border: "1px solid red" }}
                  onClick={() => handleDelete(AttendanceList._id)}
                >
                  clean
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ResponsiveAttendance;
