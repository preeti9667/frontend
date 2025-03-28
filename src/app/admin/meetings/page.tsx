"use client";

import React, { Suspense, useEffect, useState } from "react";
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
import style from "../admin.module.css";
import { useRouter } from "next/navigation";
import { ADD_MEETING_ROUTE, ADMIN_MEETING_ROUTE } from "@/constant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getCookie } from "cookies-next";
import { useDebouncedCallback } from "use-debounce";
import { Moment, StatusColor, TypeColor } from "../components/Chip";
import MokData from "../components/ MokData";
import useRequest from "../../../util/useRequest";
interface DataItem{
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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const [startDateSort, setStartDateSort] = useState<"asc" | "desc" | undefined>(undefined);

  const router = useRouter();

  const isMobile = useMediaQuery("(max-width:600px)");
  
  const { data, isLoading,  } = useRequest({
    url: GET_MEETING_API,
    params: { 
      search,
        page: page + 1,
        limit: isMobile ? 0 : limit,
        startDateSort

     },
  });
  
  const meetings = data?.data?.list as DataItem[] || [];
  // console.log(meetings);
 
  const debounced = useDebouncedCallback(
    // function
    (search) => {
      setSearch(search);
    },
    1000
  );

 
  const handleItemClick = (id: string) => {
    router.push(`${ADMIN_MEETING_ROUTE.url}/${id}/details`);
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

  const handleSort = (field: "startDate" | "meetingId") => {
    if (field === "startDate") {
      setStartDateSort(startDateSort === "asc" ? "desc" : "asc");
    }
  };

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
                onClick={() => router.push(ADD_MEETING_ROUTE.url)} // meetingCreate }
                sx={{ backgroundColor: "white", color: "black" }}
              >
                <AddCircleOutlineIcon />
              </Button>

              <Button
                sx={{ backgroundColor: "white", color: "black" }}
                onClick={()=> window.location.reload()}
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
                defaultValue={debounced(search)}
                onChange={(e) => debounced(e.target.value)}
              />
            </Paper>
          </Box>
        </Box>
        <Suspense fallback={<Box>Loading...</Box>}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, fontWeight: "bold" }}
            aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "18px" }}>Meeting Id</TableCell>
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

              {isLoading &&
                Array.from({ length: limit }).map((_, index) => (
               <TableBody key={index}>
                  <TableRow>
                     { [1,2,3,4,5,6,7,8].map((_,index)=>(
                      <TableCell key={index}>
                      <MokData height="40px" width="100%" key={index} />
                    </TableCell>                    
                     ))}
                  </TableRow>                   
                    </TableBody>                
                  ))}
                
                  
                {
                meetings.map((item,) => (                 
                  <TableBody key={item._id} >
                    <TableRow
                      onClick={() => handleItemClick(item._id)}
                      sx={{cursor: "pointer", }}>
                      <TableCell>{item.meetingId}</TableCell>
                      <TableCell>
                        <Moment item={(item.createdAt)} type="lll" />
                      </TableCell>

                      <TableCell>
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1).toLowerCase()}
                      </TableCell>
                      <TableCell>
                        <Moment item={String(item.startDate)} type="ll" />
                      </TableCell>
                      <TableCell>
                        <Moment item={String(item.endDate)} type="ll" />
                      </TableCell>
                      <TableCell>{item.startTime} - {item.endTime} </TableCell>
                      <TableCell><TypeColor item={item.type} /></TableCell>
                      <TableCell><StatusColor item={item.status} /></TableCell>
                    </TableRow>
            </TableBody>
                  ))
                }
              
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
        </TableContainer>  </Suspense>
      </Box>

      <Box
        sx={{
          display: {
            xl: "none",
            md: "none",
            xs: "block",
            sm: "block",
            lg: "none",
          }, }} >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              margin: "10px 0",
            }} >
            <Button
              onClick={() => router.push(ADD_MEETING_ROUTE.url)}
              sx={{ backgroundColor: "white", color: "black" }}>
              <AddCircleOutlineIcon />
            </Button>
            <Button
              sx={{ backgroundColor: "white", color: "black" }}
              onClick={()=> window.location.reload()}>
              <RefreshIcon />
            </Button>
          </Box>
          <Paper sx={{ borderRadius: "5px", border: "1px solid black" }}>
            <InputBase
              placeholder="search"
              sx={{ padding: "3px 10px", borderRadius: "10px" }}
              value={search}
              onChange={(e) => debounced(e.target.value)}
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
                <MokData width="100%" height={600} key={index} />                  
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
                      <Typography>
                        Title:
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1).toLowerCase()}
                      </Typography>
                      <Typography>Meeting Id: {item.meetingId}</Typography>

                      <Box className={style.momentStyle}>
                        Created At:
                        <Moment  item={item.createdAt} type="lll" />
                      </Box>
                      <Box className={style.momentStyle}>
                        Start-Date:
                        <Moment item={String(item.startDate)} type="ll" />
                      </Box>
                      <Box className={style.momentStyle}>
                        End-Date:
                        <Moment item={String(item.endDate)} type="ll" />
                      </Box>
                      <Typography>
                        Time: {item.startTime}-{item.endTime}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        Type:
                        <TypeColor item={item.type} />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        Status:
                        <StatusColor item={item.status} />
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
