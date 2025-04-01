"use client";

import React, {  useState } from "react";
import AdminLayout from "../AdminLayout";
import ResponsiveMeetings from "./components/ResponsiveMeetings";
import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  useMediaQuery,
} from "@mui/material";
import { GET_MEETING_API } from "@/constant/api.constant";
import style from "../admin.module.css";
import { useRouter } from "next/navigation";
import { ADD_MEETING_ROUTE, ADMIN_MEETING_ROUTE } from "@/constant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Moment, StatusColor, TypeColor } from "../components/Chip";
import MokData from "../components/ MokData";
import useRequest from "../../../util/useRequest";
import CustomInputBase from "../components/InputBase";
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
  const totalCount = data?.data?.count 
  
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
                onClick={() => router.push(ADD_MEETING_ROUTE.url)}
                sx={{ backgroundColor: "white", color: "black" }}>
                <AddCircleOutlineIcon />
              </Button>

              <Button
                sx={{ backgroundColor: "white", color: "black" }}
                onClick={()=> window.location.reload()} >
                <RefreshIcon />
              </Button>
            </Box>
            <CustomInputBase defaultValue={search} setSearch={setSearch} inputSize="300px"/>
          </Box>
        </Box>
        
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

{/* Meeting Loading */}
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
 {/* Fetching Meetings */}
                { meetings.map((item,) => (  
                    <TableBody key={item._id}>               
                     <TableRow
                            onClick={() => handleItemClick(item._id)}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell>{item.meetingId}</TableCell>
                            <TableCell>
                              <Moment item={item.createdAt} type="lll" />
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
                            <TableCell>
                              {item.startTime} - {item.endTime}{" "}
                            </TableCell>
                            <TableCell>
                              <TypeColor item={item.type} />
                            </TableCell>
                            <TableCell>
                              <StatusColor item={item.status} />
                            </TableCell>
                          </TableRow>
                    </TableBody>
                  )) }
          </Table>
          <Divider />
{/* Meetings Pagination */}
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


 {/* This is  Responsive Meetings Page */}
      <Box
       sx={{
           display: {
                  xl: "none",
                  md: "none",
                  xs: "block",
                  sm: "block",
                  lg: "none",
                }, }} >
                    <ResponsiveMeetings 
                    meetings={meetings}
                     isLoading={isLoading} 
                     handleClick={handleItemClick}
                     search={search}
                     setSearch={setSearch}/>
                </Box>
    </AdminLayout>
  );
};

export default Meeting;
