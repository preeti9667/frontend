"use client";
import React, { use, useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Switch,
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
import { GET_USERS_API } from "@/constant/api.constant";
import style from "../admin.module.css";
import { useRouter } from "next/navigation";
import { ADD_USER_ROUTE, ADMIN_USER_ROUTE } from "@/constant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Moment } from "../components/Chip";
import useRequest from "@/util/useRequest";
import CustomInputBase from "../components/InputBase";
import ResponsiveUsers from "./components/ResponsiveUsers";
import MokData from "../components/ MokData";
import axios from "axios";
import { toast } from "react-toastify";

interface DataItem {
  _id: string;
  createdAt: string;
  userId: string;
  fullName: string;
  email: string;
  contact: string;
  isActive: boolean;
}

export default function Users() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [fullNameSort, setSortFullName] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [userIdSort, setSortUserId] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const { data, isLoading, refetch } = useRequest({
    url: GET_USERS_API,
    params: {
      search,
      page: page + 1,
      limit: isMobile ? 0 : limit,
      fullNameSort,
      userIdSort,
    },
  });
  const userList = (data?.data?.list as DataItem[]) || [];
  const totalCount = data?.data?.count;

  const handleSort = (field: "fullName" | "userId") => {
    if (field === "fullName") {
      setSortFullName(fullNameSort === "asc" ? "desc" : "asc");
      setSortUserId(undefined); // Reset other sorting
    } else {
      setSortUserId(userIdSort === "asc" ? "desc" : "asc");
      setSortFullName(undefined); // Reset other sorting
    }
  };

  const handleUser = async (id: string) => {
    const ras = await axios.put(`${GET_USERS_API}/${id}/status`);
    if (ras.status === 200) {
      toast.success("Status updated successfully", { theme: "colored" });
      refetch();
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
                onClick={() => router.push(`${ADD_USER_ROUTE.url}`)}
                sx={{ backgroundColor: "white", color: "black" }}
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
            <CustomInputBase
              setSearch={setSearch}
              defaultValue={search}
              inputSize="300px"
            />
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "18px" }}>
                  <TableSortLabel
                    active={!!userIdSort}
                    direction={userIdSort || "asc"}
                    onClick={() => handleSort("userId")}
                  >
                    User ID
                  </TableSortLabel>
                </TableCell>

                <TableCell sx={{ fontSize: "18px" }}>Created At</TableCell>

                <TableCell sx={{ fontSize: "18px" }}>
                  <TableSortLabel
                    active={!!fullNameSort}
                    direction={fullNameSort || "asc"}
                    onClick={() => handleSort("fullName")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }}>Email</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>Contact</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            {/* Users Loading */}
            {isLoading &&
              Array.from({ length: limit }).map((_, index) => (
                <TableBody key={index}>
                  <TableRow>
                    {[1, 2, 3, 4, 5,6].map((_, index) => (
                      <TableCell key={index}>
                        <MokData height="40px" width="100%" key={index} />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              ))}

            <TableBody>
              {userList.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell
                    onClick={() =>
                      router.push(`${ADMIN_USER_ROUTE.url}/${user._id}/details`)
                    }
                  >
                    {user.userId}
                  </TableCell>
                  <TableCell>
                    <Moment item={String(user.createdAt)} type="lll" />
                  </TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contact}</TableCell>

                  <TableCell sx={{ padding: "0" }}>
                    <Switch
                      checked={user.isActive}
                      name="isActive"
                      onChange={(e) => handleUser(user._id)}
                      color="success"
                    />
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

      {/* Responsive Users page */}

      <ResponsiveUsers
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        handleUser={handleUser}
        users={userList}
      />
    </AdminLayout>
  );
}
