'use client'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { Box, Button, Card, CardContent, Divider, FormControlLabel, InputBase, Pagination,
   Paper, Skeleton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, 
   useMediaQuery} from '@mui/material'
   import axios from "axios";
   import { GET_USERS_API } from "@/constant/api.constant";
   import style from "../admin.module.css";
   import moment from "moment";
   import { useRouter } from "next/navigation";
   import { ADD_USER_ROUTE, ADMIN_USER_ROUTE } from "@/constant";
   import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
   import RefreshIcon from "@mui/icons-material/Refresh";
import { getCookie } from 'cookies-next';
   interface DataItem {
     _id: string;
     createdAt: string;
     userId: string;
    fullName: string,
    email: string,
    isActive: boolean,
     
   }
   export default function Users() {
   
     const [users, setUsers] = useState<DataItem[]>([]);
     const [search, setSearch] = useState("");
     const [page, setPage] = useState(0);
     const [totalCount, setTotalCount] = useState(0);
     const [limit, setLimit] = useState(10);
     const [isLoading, setIsLoading] = useState(false);
     const [fullNameSort, setSortFullName] = useState<"asc" | "desc" | undefined>(undefined);
     const [userIdSort, setSortUserId] = useState<"asc" | "desc" | undefined>(undefined);
  
    
    
   
   

     const handleChangePage = (event: unknown, newPage: number) => {
       setPage(newPage);
     };
   
     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
       setLimit(+event.target.value);
       setPage(0);
     };
   
    
     const router = useRouter();
   
     const isMobile = useMediaQuery("(max-width:600px)");
   
     const fetchUsers = async () => {
       setIsLoading(true); // Show Skeleton if API is slow
   
       try {
         const response = await axios.get(GET_USERS_API, {
           params: {
             search,
             fullNameSort,
             userIdSort,
             page: page + 1,
             limit: isMobile ? 0 : limit,
           },
            headers: {
                     Authorization: `Bearer ${getCookie("Token")}`,
                   },
         });
   
         // const { data } = response.data;
         const data = response.data.data;
         console.log(data)
   
         setUsers(data.list);
         setTotalCount(data.count);
         setIsLoading(false);
       } catch (error) {
         console.error("Error fetching users:", error);
         setIsLoading(true);
       }
     };
   
     useEffect(() => {
       fetchUsers();
     }, [search, page, isMobile, fullNameSort, userIdSort, limit]);
   
    //  const totalPages = Math.ceil(totalCount / limit);
  
   
     const userCreate = () => {
       router.push(`${ADD_USER_ROUTE.url}`);
     };
   
     const handleRefresh = () => {
       fetchUsers();
     };
     
     const handleSort = (field: "fullName" | "userId" ) => {
      if (field === "fullName") {
        setSortFullName(fullNameSort === "asc" ? "desc" : "asc");
        setSortUserId(undefined); // Reset other sorting
      } else {
        setSortUserId(userIdSort === "asc" ? "desc" : "asc");
        setSortFullName(undefined); // Reset other sorting
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
            sm: "block",
            lg: "block",
          },
        }}
      >
        <Box style={{ backgroundColor: "var( --text-color)", color: "white" }}>
          <Box className={style.meetingTop}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                onClick={userCreate}
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
              
                <TableCell sx={{ fontSize: "23px" }}>  
               Created At
                </TableCell>
                <TableCell sx={{ fontSize: "23px" }}>
                <TableSortLabel
                active={!!userIdSort}
                direction={userIdSort || "asc"}
                onClick={() => handleSort("userId")}
              >
                User ID
              </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "23px" }}>
                <TableSortLabel
                active={!!fullNameSort}
                direction={fullNameSort || "asc"}
                onClick={() => handleSort("fullName")}
              >
               Name
              </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "20px" }}>Email</TableCell>
                <TableCell sx={{ fontSize: "23px" }}>Action</TableCell>
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
                    </TableRow>
                  ))
                : users.map((item, index) => (
                    <TableRow
                    // onClick={() => handleItemClick(item._id)}
                      key={item._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      
                        {/* {page * limit - limit + index + 1} */}
                    

                      <TableCell>
                        { moment(item.createdAt).format('LLL')}
                      </TableCell>
                      <TableCell>
                        {item.userId}
                       
                      </TableCell>
                      <TableCell>
                        {item.fullName}
                      </TableCell>
                      <TableCell>
                        {item.email}
                      </TableCell>
                      <TableCell>     
              <Switch checked={item.isActive} 
              color="success" name="isActive" />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <Divider />

          <TablePagination
            rowsPerPageOptions={[10, 20, 25, 50]}
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
              onClick={userCreate}
              sx={{ backgroundColor: "white", color: "black" }}
            >
              <AddCircleOutlineIcon />
            </Button>
            <Button
              sx={{ backgroundColor: "white", color: "black" }}
              onClick={handleRefresh}>
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
            : users.map((item, index) => (
                <Box key={index}>
                  <Card
                    sx={{
                      borderRadius: "20px 15px",
                      background: "var(--text1-color)",
                    }}
                  >
                    <CardContent
                      // onClick={() => handleItemClick(item._id)}
                      sx={{
                        display: "flex",
                        gap: "15px",
                        flexDirection: "column",
                        padding: '20px'
                      }}
                    >
                      <Typography variant="h5">
                      Crated At: { moment(item.createdAt).format('LLL')}
                      </Typography>
                      <Typography variant="h5">
                     User Id: {item.userId}
                      </Typography>
                      <Typography variant="h5">
                     Name: {item.fullName}
                      </Typography> 

                      <FormControlLabel
            control={
              <Switch checked={item.isActive} color="success" name="isActive" />
            }
            label="Active"
          />
                    </CardContent>
                  </Card>
                </Box>
              ))}
        </Box>
      </Box>
    </AdminLayout>
  )
}
