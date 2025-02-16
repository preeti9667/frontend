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
  TableSortLabel,
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
  meetingId: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  status: string;
  startDate: number;
  endDate: number;
  type: string;
}


const Meeting = () => {
  const [meetings, setMeetings] = useState<DataItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const [startDateSort, setStartDateSort] = useState< "asc" | "desc" | undefined >(undefined);
  const [meetingIdSort, setMeetingIdSort] = useState<"asc" | "desc" | undefined>(undefined);

  const router = useRouter();

  const isMobile = useMediaQuery("(max-width:600px)");

  const fetchMeetings = async () => {
    setIsLoading(true); // Show Skeleton if API is slow

    try {
      const response = await axios.get(GET_MEETING_API, {
        params: {
          search,
          startDateSort,
          meetingIdSort,
          page: page + 1,
          limit: isMobile ? 0 : limit,
        },
        headers: {
          Authorization: `Bearer ${getCookie("Token")}`,
        },
      });
      // const { data } = response.data;
      const data = response.data.data;
      // console.log(data)

      setMeetings(data.list);
      setTotalCount(data.count);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [search, page, isMobile, limit, startDateSort, meetingIdSort]);

  const handleItemClick = (id: string) => {
    router.push(`${ADMIN_MEETING_ROUTE.url}/${id}/details`);
  };

  const meetingCreate = () => {
    router.push(`${ADD_MEETING_ROUTE.url}`);
  };

  const handleRefresh = () => {
    fetchMeetings();
  };
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const handleSort = (field:  'startDate' | 'meetingId') => {
    if (field === "startDate") {
      setStartDateSort(startDateSort === "asc" ? "desc" : "asc");
      setMeetingIdSort(undefined); // Reset other sorting

    } else  {
      setMeetingIdSort(meetingIdSort === "asc" ? "desc" : "asc");
      setStartDateSort(undefined); // Reset other sorting
    }
  };  

////////////////
  const getStageColor = (interval: string) => {
    switch (interval) {
        case "ONCE":
            return 'var(--primary-color)';
        case "WEEKLY":
            return "var( --text-color)";
        case "MONTHLY":
            return "var(--danger-color)";
        case "DAILY":
            return "var(--text1-color)";
       
    }
};
const getStatusColor = (interval: string) => {
    switch (interval) {
        case "CREATED":
            return 'var(--secondary-color)';
        case "COMPLETED":
            return "#0000ff91";
    }
}

  return (
    <AdminLayout>
      <Box
        sx={{
          display: {
            xl: "block",
            md: "block",
            xs: "none",
            sm: "none",
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
                <TableCell>
                  <TableSortLabel sx={{ fontSize: "18px" }}
                    active={!!meetingIdSort}
                    direction={meetingIdSort || "asc"}
                    onClick={() => handleSort("meetingId")}
                  >
                    Meeting Id
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }}>Created At</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>Title</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>
                  <TableSortLabel
                    active={!!startDateSort}
                    direction={startDateSort || "asc"}
                    onClick={() => handleSort("startDate")} >
                    Start Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }}>End Date</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>Time</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>Type</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>Status</TableCell>
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
                    onClick={() => handleItemClick(item._id)}
                      key={item._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell >
                        {item.meetingId}
                      </TableCell>
                      <TableCell>
                        {moment(item.createdAt).format("lll")}
                      </TableCell>

                      <TableCell >
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1).toLowerCase()}
                      </TableCell>
                      <TableCell>
                        {moment(item.startDate).format("ll")} 
                      </TableCell>
                      <TableCell>{moment(item.endDate).format("ll")}</TableCell>
                      <TableCell>
                        {item.startTime} - {item.endTime}
                      </TableCell>
                      <TableCell>
                       <Box className={style.meetingTypeStatus}
                       sx={{backgroundColor:getStageColor(item.type)}}>
                        {item.type}</Box>
                      </TableCell>

                      <TableCell >
                      <Box className={style.meetingTypeStatus}
                      sx={{ backgroundColor:getStatusColor(item.status), }}> 
                      {item.status}
                        </Box> 
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <Divider />

          <TablePagination
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={totalCount}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

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
                        gap: "14px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography>Title: {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1).toLowerCase()}</Typography>
                      <Typography>Meeting Id: {item.meetingId}</Typography>
                      <Typography>Created At: {moment(item.createdAt).format("lll")}</Typography>
                      <Typography>
                        Start-Date: {moment(item.startDate).format("ll")}
                      </Typography>
                      <Typography>
                        End-Date: {moment(item.endDate).format("ll")}
                      </Typography>

                      <Typography>
                        Time: {item.startTime}-{item.endTime}
                      </Typography>
                       <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>Title:
                         <Typography className={style.meetingTypeStatus}
                         sx={{backgroundColor:getStageColor(item.type),}}
                         >
                       {item.type}
                 </Typography>
                        </Box>

                 <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
                 Status:
                 <Typography className={style.meetingTypeStatus}
                 sx={{backgroundColor:getStatusColor(item.status)}}>

                      {item.status}
                     </Typography>
                 </Box>

                    </CardContent>
                   
                  </Card>
                </Box>
              ))}
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default Meeting;
