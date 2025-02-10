"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Input,
  InputBase,
  Pagination,
  Paper,
  Skeleton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { GET_MEETING_API } from "@/constant/api.constant";
import CircularProgress from "@mui/material/CircularProgress";
import style from "../admin.module.css";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ADD_MEETING_ROUTE, ADMIN_MEETING_ROUTE } from "@/constant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getCookie } from "cookies-next";
import { get } from "@/util/http.util";
interface DataItem {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
  startDate: number;
  endDate: number;
  type: string;
}
// interface MediaProps {
//   loading?: boolean;
// }

const Meeting = () => {
  const [meetings, setMeetings] = useState<DataItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isMobile = useMediaQuery("(max-width:600px)");

  const fetchMeetings = async () => {
    setIsLoading(true); // Show Skeleton if API is slow

    try {
      const response = await get(GET_MEETING_API, {
        params: {
          search,
          page,
          limit: isMobile ? 0 : limit,
        },
        
      });

      // const { data } = response.data;
      const data = response.data.data;
      // console.log(data)

      setMeetings(data.list);
      setTotalCount(data.count);
      setIsLoading(false);
    } catch (error:any) {
      console.error("Error fetching meetings:", error.response.data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [search, page, isMobile]);

  const totalPages = Math.ceil(totalCount / limit);

  const handleItemClick = (id: string) => {
    router.push(`${ADMIN_MEETING_ROUTE.url}/${id}/details`);
  };

  const meetingCreate = () => {
    router.push(`${ADD_MEETING_ROUTE.url}`);
  };

  const handleRefresh = () => {
    fetchMeetings();
  };
  const handleStatus = () => {
    console.log("clicked");
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          display: {
            xl: "block",
            md: "block",
            xs: "none",
            sm: "block",
            lg: "block",
          },
        }}
      >
        <Box style={{ backgroundColor: "var( --text-color)", color: "white" }}>
          <Box className={style.meetingTop}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                onClick={meetingCreate}
                sx={{ backgroundColor: "white", color: "black" }}
              >
                <AddCircleOutlineIcon />
              </Button>
              <Button
                sx={{ backgroundColor: "white", color: "black" }}
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </Button>
            </Box>
            <Paper sx={{ borderRadius: "5px" }}>
              <InputBase
                placeholder="search"
                sx={{
                  padding: "3px 10px",
                  borderRadius: "10px",
                  width: { lg: "350px", sx: "300px" },
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Paper>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "23px" }}>S.N.</TableCell>
                <TableCell sx={{ fontSize: "23px" }}>Title</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>Start-Date</TableCell>
                <TableCell sx={{ fontSize: "20px" }}>End-Date</TableCell>
                <TableCell sx={{ fontSize: "23px" }}>Time</TableCell>
                <TableCell sx={{ fontSize: "23px" }}>Type</TableCell>
                <TableCell sx={{ fontSize: "23px" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading
                ? Array.from({ length: limit }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" width="100%" height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="100%" height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="100%" height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="100%" height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="100%" height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="100%" height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="100%" height={40} />
                      </TableCell>
                    </TableRow>
                  ))
                : meetings.map((item, index) => (
                    <TableRow
                      key={item._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell onClick={() => handleItemClick(item._id)}>
                        {page * limit - limit + index + 1}
                      </TableCell>

                      <TableCell onClick={() => handleItemClick(item._id)}>
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1).toLowerCase()}
                      </TableCell>
                      <TableCell onClick={() => handleItemClick(item._id)}>
                        {moment(item.startDate).format("ll")}
                      </TableCell>
                      <TableCell onClick={() => handleItemClick(item._id)}>
                        {moment(item.endDate).format("ll")}
                      </TableCell>

                      <TableCell onClick={() => handleItemClick(item._id)}>
                        {item.startTime}-{item.endTime}
                      </TableCell>
                      <TableCell onClick={() => handleItemClick(item._id)}>
                        {item.type}
                      </TableCell>
                      <TableCell onClick={handleStatus} sx={{ color: "green" }}>
                        {item.status}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <Divider />

          {totalPages > 1 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={1.5}
              mb={1.5}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
              Total-Meetings = {totalCount}
            </Box>
          )}
        </TableContainer>
      </Box>

      <Box
        sx={{
          display: {
            xl: "none",
            md: "none",
            xs: "block",
            sm: "none",
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
              onClick={meetingCreate}
              sx={{ backgroundColor: "white", color: "black" }}
            >
              <AddCircleOutlineIcon />
            </Button>
            <Button
              sx={{ backgroundColor: "white", color: "black" }}
              onClick={handleRefresh}
            >
              <RefreshIcon />
            </Button>
          </Box>
          <Paper sx={{ borderRadius: "5px", border: "1px solid black" }}>
            <InputBase
              placeholder="search"
              sx={{ padding: "3px 10px", borderRadius: "10px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Paper>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          mt={3}
        >
          {isLoading
            ? Array.from({ length: limit }).map((_, index) => (
                <Box key={index}>
                  <Skeleton variant="text" width="100%" height={250} />
                </Box>
              ))
            : meetings.map((item, index) => (
                <Box key={index}>
                  <Card
                    sx={{
                      borderRadius: "20px 15px",
                      background: "var(--text1-color)",
                    }}
                  >
                    <CardContent
                      onClick={() => handleItemClick(item._id)}
                      sx={{
                        display: "flex",
                        gap: "15px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h5" textAlign={"center"}>
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1).toLowerCase()}
                      </Typography>
                      <Typography>
                        {" "}
                        Start-Date: {moment(item.startDate).format("ll")}
                      </Typography>
                      <Typography>
                        {" "}
                        End-Date: {moment(item.endDate).format("ll")}{" "}
                      </Typography>

                      <Typography>
                        {" "}
                        Time: {item.startTime}-{item.endTime}
                      </Typography>
                      <Typography variant="h6">
                        {" "}
                        Description: {item.description}
                      </Typography>
                    </CardContent>
                    <Button
                      onClick={handleStatus}
                      color="success"
                      sx={{
                        fontSize: "20px",
                        marginLeft: "10px",
                        marginBottom: "15px",
                      }}
                    >
                      {item.status}
                    </Button>
                  </Card>
                </Box>
              ))}
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default Meeting;
