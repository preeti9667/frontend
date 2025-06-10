"use client";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Paper,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ResponsiveUserDiet from "./ResponsiveUserDiet";

import {
  addDiet,
  deleteDiet,
  updateDiet,
  fetchDiet,
} from "@/customStore/userSlice";
import { useParams } from "next/navigation";
import useRequest from "@/util/useRequest";
import { GET_USERS_API } from "@/constant";
import TextDraft from "../../components/Textdraft";

interface DataItem {
  _id: string;
  fullName: string;
  userId: string;
}
interface Note {
  _id: string;
  userId: string;
  date: string; // e.g., "2025-05-28"
  time: string;
  text: string;
}

const UserDiet = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  const { data } = useRequest({
    url: GET_USERS_API,
  });

  const userList = (data?.data?.list as DataItem[]) || [];
  const user = userList.find((user) => user._id == params.userId);

  const dispatch: any = useDispatch();

  const today = new Date();
  const get14Days = (start: Date): string[] => {
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return moment(d).format("YYYY-MM-DD");
    });
  };

  const allDates = get14Days(today);
  const [page, setPage] = useState(0);
  const visibleDates = allDates.slice(page * 3, page * 3 + 3);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleOpenDialog = (date: string) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
  };
  const handleEdit = (date: string, id: string) => {
    const dayNotes =
      notes.find((note: any) => formatDate(note.date) === date)?.entries || [];
    const noteToEdit = dayNotes.find((n: Note) => n._id === id);

    const formattedTime = moment(noteToEdit?.time, "hh:mm A").format("HH:mm");
    if (noteToEdit) {
      setTimeInput(formattedTime);
      setTextInput(noteToEdit.text);
      setSelectedDate(date);
      setEditingIndex(id); // set id here instead of index
      setOpen(true);
    }
  };

  const formatDraftContent = (rawString: string) => {
    try {
      const raw = JSON.parse(rawString);
      const blocks = raw.blocks;

      return (
        <Box sx={{ padding: "0 10px 10px" }}>
          {blocks.map((block: any, i: number) => {
            // const styledContent = applyInlineStyles(block.text, block.inlineStyleRanges);

            switch (block.type) {
              case "header-one":
                return (
                  <Typography key={i} variant="h3">
                    {/* {styledContent} */}
                    {block.text}
                  </Typography>
                );
              case "header-two":
                return (
                  <Typography key={i} variant="h5">
                    {block.text}
                  </Typography>
                );
              case "header-three":
                return (
                  <Typography key={i} variant="h6">
                    {block.text}
                  </Typography>
                );
              case "unordered-list-item":
                return <li key={i}>{block.text}</li>;
              case "ordered-list-item":
                return (
                  <ListItem key={i} sx={{ padding: "0px" }}>
                    <ListItemText
                      primary={`${i + 1}. ${block.text} `}
                      sx={{ margin: "0px", color: "#393838e3" }}
                    />
                  </ListItem>
                );
              default:
                return (
                  <Typography key={i} variant="body2">
                    {block.text}
                  </Typography>
                );
            }
          })}
        </Box>
      );
    } catch (error) {
      return <Typography variant="body2">{rawString}</Typography>;
    }
  };

  const handleSubmit = async () => {
    if (!selectedDate || !timeInput) {
      setError("Time is required");
      return;
    }
    const formattedTime = moment(timeInput, "HH:mm").format("hh:mm A");
    try {
      if (editingIndex) {
        await dispatch(
          updateDiet({
            userId,
            date: selectedDate,
            _id: editingIndex,
            time: formattedTime,
            text: textInput,
          })
        ).unwrap();
      } else {
        await dispatch(
          addDiet({
            userId,
            date: selectedDate,
            time: formattedTime,
            text: textInput,
          })
        ).unwrap();
      }

      setOpen(false);
      setTextInput("");
      setTimeInput("");
      setSelectedDate(null);
      setEditingIndex(null);
      setError("");
    } catch (err) {
      setError("Failed to save note");
    }
  };

  const handleDelete = async (date: string, id: string) => {
    try {
      await dispatch(
        deleteDiet({
          userId,
          date,
          id, // the note _id
        })
      ).unwrap();
      await dispatch(fetchDiet(userId));
    } catch (err) {
      setError("Failed to delete the note");
    }
  };

  const handleCopyToNextDate = (currentDate: string) => {
    if (!notes || !notes) return;

    const currentIndex = allDates.indexOf(currentDate);
    const nextDate = allDates[currentIndex + 1];
    if (!nextDate) return; // no next date

    // Find notes for currentDate
    const currentDateNotes =
      notes.find((n: any) => formatDate(n.date) === currentDate)?.entries || [];

    // Find notes for nextDate
    const nextDateNotes =
      notes.find((n: any) => formatDate(n.date) === nextDate)?.entries || [];

    // Times already present on nextDate to avoid duplicates
    const existingTimes = nextDateNotes.map((n: any) => n.time);

    currentDateNotes.forEach((note: any) => {
      if (!existingTimes.includes(note.time)) {
        dispatch(
          addDiet({
            userId,
            date: nextDate,
            time: note.time,
            text: note.text,
          })
        );
      }
    });
  };

  useEffect(() => {
    dispatch(fetchDiet(userId));
  }, [dispatch, userId]);

  const notes = useSelector((state: any) => state.diet.notes || []);
  // console.log(notes);

  return (
    <Box
      sx={{
        margin: "0 auto",
        padding: {
          xs: "1px 5px",
          sm: "10px",
          md: "10px",
          lg: "0",
          xl: "0",
        },
      }}
    >
      <ResponsiveUserDiet
        visibleDates={allDates}
        notes={notes}
        userName={user?.fullName}
        handleOpenDialog={handleOpenDialog}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCopyToNextDate={handleCopyToNextDate}
        formatDraftContent={formatDraftContent}
      />

      <Box
        sx={{
          display: {
            xl: "block",
            md: "block",
            xs: "none",
            sm: "none",
            lg: "block",
          },
          //  borderRadius: "12px", overflow: "hidden"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 11px",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#2c3e50", mb: 0.5 }}
            >
              {user?.fullName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              ID: {user?.userId}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              sx={{
                bgcolor: "white",
                boxShadow: 1,
                "&:hover": { bgcolor: "#f5f5f5" },
                "&.Mui-disabled": { bgcolor: "#f5f5f5" },
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => setPage((p) => Math.min(p + 1, 3))}
              disabled={page >= 3}
              sx={{
                bgcolor: "white",
                boxShadow: 1,
                "&:hover": { bgcolor: "#f5f5f5" },
                "&.Mui-disabled": { bgcolor: "#f5f5f5" },
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1px",
            bgcolor: "#e0e0e0",
          }}
        >
          {visibleDates.map((date, index) => {
            const matchedNote = notes.find((note: any) => {
              const noteDate = moment(note.date).format("YYYY-MM-DD");
              return noteDate === date;
            });

            return (
              <Box
                key={date}
                sx={{
                  bgcolor: "white",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    padding: "5px 12px",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "#f8f9fa",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "#2c3e50",
                    }}
                  >
                    {moment(date).format("MMM DD")}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={() => handleOpenDialog(date)}
                      sx={{
                        color: "#4caf50",
                        "&:hover": {
                          bgcolor: "rgba(76, 175, 80, 0.1)",
                        },
                      }}
                    >
                      <AddCircleOutlineRoundedIcon />
                    </IconButton>
                    <Button
                      size="small"
                      onClick={() =>
                        handleCopyToNextDate(moment(date).format("YYYY-MM-DD"))
                      }
                      sx={{
                        textTransform: "none",
                        bgcolor: "var(--text-color)",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        px: 2,
                        color: "white",
                      }}
                    >
                      Copy to Next
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ height: "500px", overflow: "auto" }}>
                  {matchedNote &&
                    matchedNote.entries.map((note: Note, idx: string) => (
                      <Box key={idx} sx={{ borderBottom: "1px solid #eee" }}>
                        <Box
                          sx={{
                            padding: "7px 12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: "15px",
                              fontSize: "x-small",
                              bgcolor: "var(--text1-color)",
                            }}
                          >
                            {note.time}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              sx={{
                                borderRadius: "20px 23px 25px 3px",
                                padding: "1px",
                                border: "1px solid green",
                                color: "green",
                              }}
                              onClick={() => handleEdit(date, note._id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{
                                borderRadius: "20px 23px 25px 3px",
                                padding: "1px",
                                border: "1px solid #b42525",
                                color: "#b42525",
                              }}
                              onClick={() => handleDelete(date, note._id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box sx={{ padding: "0 10px 10px" }}>
                          {formatDraftContent(note.text)}
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "var(--text-color)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 15px",
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>
            {editingIndex !== null ? "Edit Note" : "Add Note"}
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Time"
              type="time"
              sx={{
                width: "150px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              margin="normal"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              // onChange={(e) => {
              //   const value = e.target.value; // "13:45"
              //   const formatted = moment(value, "HH:mm").format("hh:mm A"); // "01:45 PM"
              //   setTimeInput(formatted);
              // }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {error && (
              <Typography
                sx={{ color: "#f44336", mt: 1, fontSize: "0.875rem" }}
              >
                {error}
              </Typography>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextDraft value={textInput} onChange={(e) => setTextInput(e)} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              textTransform: "none",
              px: 3,
              borderRadius: "8px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              px: 3,
              bgcolor: "#4caf50",
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#43a047",
              },
            }}
          >
            {editingIndex !== null ? "Save Changes" : "Add Note"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDiet;
