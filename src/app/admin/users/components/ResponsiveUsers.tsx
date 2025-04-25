import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { Moment } from "../../components/Chip";
import CustomInputBase from "../../components/InputBase";
import { useRouter } from "next/navigation";
import { ADD_USER_ROUTE, ADMIN_USER_ROUTE } from "@/constant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import style from "@/app/admin/admin.module.css";
import { CustomCircularProgress } from "../../components/ MokData";
interface Props {
  users: any;
  isLoading: boolean;
  search: any;
  setSearch: any;
  handleUser: any;
}
const ResponsiveUsers: React.FC<Props> = ({
  users,
  isLoading,
  search,
  setSearch,
  handleUser,
}) => {
  const router = useRouter();

  return (
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
          defaultValue={search}
          setSearch={setSearch}
          inputSize="100%"
        />
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        mt={3}
      >
        {isLoading ? (
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
        ) : (
          users.map((user: any) => (
            <Box key={user._id}
            onClick={() => router.push(`${ADMIN_USER_ROUTE.url}/${user._id}/details`)}
            >
              <Card
                sx={{
                  borderRadius: "20px 15px",
                  background: "var(--text1-color)",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h6">Name: {user.fullName}</Typography>

                  <Typography variant="h6">User Id: {user.userId}</Typography>

                  <Box className={style.momentStyle}>
                    Created At:
                    <Moment item={String(user.createdAt)} type="lll" />
                  </Box>
                  <Typography variant="h6">Email: {user.email}</Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.isActive}
                        color="success"
                        name="isActive"
                        onClick={() => handleUser(user._id)}
                      />
                    }
                    label={user.isActive ? "Active" : "Deleted"}
                  />
                </CardContent>
              </Card>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
export default ResponsiveUsers;
