"use client";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { ATTENDANCE_USER_API, GET_MEETING_API } from "@/constant";
import { useEffect, useState } from "react";
import useRequest from "@/util/useRequest";
import { CustomCircularProgress } from "../../components/ MokData";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

interface User {
  _id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  isPresent: boolean;
}

interface FormValues {
  _id: string;
  meetingId: string;
  date: string;
  participantIds: string[];
}

interface DataItem {
  _id: string;
  title: string;
  meetingId: string;
}

interface AttendanceAddProps {
  initialValues?: FormValues;
  loading: boolean;
  open: boolean;
  onClose: () => void;
  handleSubmit: (values: FormValues) => void;
}

const validationSchema = Yup.object({
  meetingId: Yup.string().required("Meeting  is required"),
  date: Yup.string().required("Date is required"),
  participantIds: Yup.array().required("Users are required"),
});

const AttendanceAdd: React.FC<AttendanceAddProps> = ({
  initialValues,
  loading,
  open,
  onClose,
  handleSubmit,
}) => {
  const [selectedMeetingId, setSelectedMeetingId] = useState("");
  const [selectedDate, setSelectedDate] = useState(initialValues?.date || "");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const { data: meetings } = useRequest({ url: GET_MEETING_API });
  const Title = (meetings?.data?.list as DataItem[]) || [];

  useEffect(() => {
    setSelectedMeetingId(initialValues?.meetingId || "");
    setSelectedDate(initialValues?.date || "");
  }, [initialValues]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!selectedMeetingId || !selectedDate) return;

      try {
        const res = await axios.get(ATTENDANCE_USER_API, {
          params: { meetingId: selectedMeetingId, date: selectedDate },
        });
        const users: User[] = res.data?.data?.list || [];

        if (initialValues) {
          const updatedUsers = users.map((u) => ({
            ...u,
            // isPresent: (initialValues.participantIds as string[]).includes(u._id),
          }));
          setSelectedUsers(updatedUsers);
        } else {
          setSelectedUsers(users);
        }
      } catch (err: any) {
        toast.success(err.message || "Something went wrong", {
          theme: "colored",
        });
        setSelectedUsers([]);
      }
    };
    fetchUsers();
  }, [selectedMeetingId, selectedDate, initialValues]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        sx={{
          ".css-16htz67-MuiPaper-root-MuiDialog-paper": {
            maxWidth: { xs: "90vw", sm: "80vw" },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            backgroundColor: "var(--text1-color)",
            padding: "10px",
            color: "var(--text-color)",
          }}
        >
          {initialValues ? "Edit Attendance" : "Add Attendance"}

          <HighlightOffOutlinedIcon
            color="error"
            onClick={onClose}
            sx={{ cursor: "pointer" }}
          />
        </DialogTitle>
        <Divider />

        <DialogContent sx={{ padding: "1px 2px" }}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              _id: initialValues?._id || "",
              meetingId: selectedMeetingId,
              date: selectedDate,
              participantIds: initialValues?.participantIds || [],
            }}
            onSubmit={(values) => {
              const participantIds = selectedUsers
                .filter((u) => u.isPresent)
                .map((u) => u._id);
              handleSubmit({ ...values, participantIds });
            }}
            enableReinitialize
          >
            {({ handleChange }) => (
              <Form>
                <Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                        lg: "1fr 1fr ",
                        xl: "1fr 1fr",
                        sm: "1fr 1fr",
                      },
                      gap: "10px",
                      width: {
                        xs: "100%",
                        md: "400px",
                        lg: "600px",
                        xl: "600px",
                        sm: "100%",
                      },
                      padding: "10px",
                    }}
                  >
                    <TextField
                      fullWidth
                      type="date"
                      name="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        handleChange(e);
                      }}
                    />

                    <FormControl>
                      <InputLabel id="meeting-select-label">Meeting</InputLabel>
                      <Select
                        label="Meeting"
                        name="meetingId"
                        value={
                          Title.some((item) => item._id === selectedMeetingId)
                            ? selectedMeetingId
                            : ""
                        }
                        onChange={(e) => {
                          setSelectedMeetingId(e.target.value);
                          handleChange(e);
                        }}
                      >
                        {Title.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box
                    id="scrollableDiv"
                    sx={{
                      padding: "10px",
                      maxHeight: "320px",
                      overflowY: "scroll",
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr 1fr ",
                        md: "1fr 1fr 1fr ",
                        lg: "1fr 1fr 1fr 1fr ",
                        xl: "1fr 1fr 1fr 1fr",
                        sm: "1fr 1fr ",
                      },
                      gap: "10px",
                    }}
                  >
                    {selectedUsers.map((user, index) => (
                      <Box key={index}>
                        <Checkbox
                          checked={user.isPresent || false}
                          onChange={(e) => {
                            setSelectedUsers((prev) =>
                              prev.map((u) =>
                                u._id === user._id
                                  ? { ...u, isPresent: e.target.checked }
                                  : u
                              )
                            );
                          }}
                        />

                        <label>
                          {" "}
                          {user.fullName.charAt(0).toUpperCase() +
                            user.fullName.slice(1)}
                        </label>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Divider />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{
                    padding: "8px 30px",
                    margin: "10px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {initialValues ? "Update" : "Add"}

                  <CircularProgress
                    size={28}
                    sx={{ display: loading ? "block" : "none", color: "white" }}
                  />
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AttendanceAdd;

function closeUserList() {
  throw new Error("Function not implemented.");
}
