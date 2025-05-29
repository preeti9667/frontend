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
import MyEditor from "../../components/Textdraft";
import { addDiet, deleteDiet, updateDiet, fetchDiet} from "@/customStore/userSlice";
import { useParams } from "next/navigation";
import useRequest from "@/util/useRequest";
import { GET_USERS_API } from "@/constant";
// type Note = {
//   text: string;
//   time: string;
// };


interface DataItem {
  _id: string;
  fullName: string;
  userId: string;
}
interface Note {
  id: string;
  userId: string;
  date: string; // e.g., "2025-05-28"
  time: string;
  text: string;
}

interface DietState {
  notes: Note[];
}

const NotesTableByDate = () => {
  const params = useParams<{userId: string}>()
const { data} = useRequest({
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  // const handleOpenDialog = (date: string) => {
  //   setSelectedDate(date);
  //   setTextInput("");
  //   setTimeInput("");
  //   setEditingIndex(null);
  //   setError("");
  //   setOpen(true);
  // };

  // const handleEdit = (date: string, index: number, note: Note) => {
  //   setSelectedDate(date);
  //   setTextInput(note.text);
  //   setTimeInput(note.time);
  //   setEditingIndex(index);
  //   setOpen(true);
  // };

  // const handleDelete = (date: string, index: number) => {
  //   dispatch(removeNote({ date, index }));
  // };

  // const handleSubmit = () => {
  //   if (!timeInput) {
  //     setError("Time is required");
  //     return;
  //   }

  //   if (selectedDate) {
  //     const note = { text: textInput, time: timeInput };
  //     if (editingIndex !== null) {
  //       // For simplicity, remove and add again
  //       dispatch(removeNote({ date: selectedDate, index: editingIndex }));
  //     }
  //     dispatch(addNote({ date: selectedDate, note }));
  //   }

  //   setOpen(false);
  //   setTextInput("");
  //   setTimeInput("");
  //   setEditingIndex(null);
  // };




  
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
                // return <ol  key={i}><li>{block.text}</li></ol>;
                return (
                  <ListItem key={i}>
                    <ListItemText primary={`${i + 1}. ${block.text} `} />
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

  // const handleCopyToNextDate = (currentDate: string) => {
  //   const currentIndex = allDates.indexOf(currentDate);
  //   const nextDate = allDates[currentIndex + 1];

  //   if (!nextDate) return; // no next date

  //   const sourceNotes = notesByDate[currentDate] || [];

  //   // Optionally prevent duplicates
  //   const existingTimes = (notesByDate[nextDate] || []).map(
  //     (n: Note) => n.time
  //   );
  //   const filteredNotes = sourceNotes.filter(
  //     (n: Note) => !existingTimes.includes(n.time)
  //   );

  //   filteredNotes.forEach((note: Note) => {
  //     // return dispatch(addNote({ date: nextDate, note }));
  //   });
  // };




useEffect(() => {
  if (params.userId) {
    dispatch(fetchDiet(params.userId));
  }
}, [dispatch, params.userId]);

const { userDoc, loading, } = useSelector((state: any) => state.diet);


  


  return (
    <Box sx={{ mt: 2, px: 3 }}>
      
      <Box textAlign="right" mb={2} sx={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
        <Box sx={{textAlign:"left"}}>
          <Typography sx={{textTransform:"uppercase"}}>{ user?.fullName}</Typography>
          <Typography>{user?.userId}</Typography>
        </Box>
        <Box>
        <IconButton
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => setPage((p) => Math.min(p + 1, 3))}
          disabled={page >= 3}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #ccc" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {visibleDates.map((date, index) => (
            <Box
              key={date}
              sx={{ borderRight: "1px solid #ccc", padding: "inherit" }}
            >
              <Box
                sx={{
                  borderBottom: "1px solid #ccc",
                  padding: "10px 34px",
                  textAlign: "center",
                  display: "flex",
                  
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">
                  {moment(date).format("MMM DD")}{" "}
                </Typography>
                <AddCircleOutlineRoundedIcon
                  // onClick={() => handleOpenDialog(date)}
                  color="success"
                  sx={{ ml: 1, cursor: "pointer" }}
                />

                <Button
                  size="small"
                  // onClick={() => handleCopyToNextDate(date)}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "var(--text-color)",
                    borderRadius: "20px",
                    fontSize:"smaller",
                    marginLeft:"10px",
                    padding:"1px 10px",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "none",
                    },
                  }}
                  >
                  Copy to Next
                </Button>
                  </Box>

              <Box sx={{ height: "400px", overflow: "auto" }}>
                {(notesByDate[date] || []).map((note: Note, idx: number) => (
                  <Box key={idx} sx={{ borderBottom: "1px solid #ccc" }}>
                    <Box
                      sx={{
                        padding: "10px 5px",
                        display: "flex",
                        justifyContent: "space-between",
                        //  textAlign:"-webkit-right"
                      }}
                    >
                      {/* <Box sx={{display:"flex", alignItems:"center", width:"fit-content"}}> */}
                      <Typography
                        color="primary"
                        sx={{
                          border: "1px solid #ccc",
                          padding: "1px 10px",
                          borderRadius: "30px",
                          width: "fit-content",
                          fontSize: "smaller",
                          backgroundColor: "var(--text-color)",
                          color: "white",
                        }}
                      >
                        {note.time}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <IconButton
                          sx={{
                            background: "#29b127d1",
                            color: "white",
                            borderRadius: "10px",
                            padding: "1px 7px",
                            "&:hover": {
                              background: "var(--secondary-color)",
                              color: "white",
                            },
                          }}
                          // onClick={() => handleEdit(date, idx, note)}
                        >
                          <EditIcon sx={{ fontSize: "medium" }} />
                        </IconButton>
                        <IconButton
                          color="error"
                          sx={{
                            background: "#ec0a0aad",
                            color: "white",
                            borderRadius: "7px",
                            padding: "1px 7px",
                            "&:hover": {
                              background: "var(--danger-color)",
                              color: "white",
                            },
                          }}
                          // onClick={() => handleDelete(date, idx)}
                        >
                          <DeleteIcon sx={{ fontSize: "medium" }} />
                        </IconButton>
                      </Box>
                    </Box>
                    {formatDraftContent(note.text)}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            backgroundColor: "var(--text-color)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editingIndex !== null ? "Edit Note" : "Add Note"}
          <HighlightOffIcon
            onClick={() => setOpen(false)}
            sx={{ cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Time"
              type="time"
              fullWidth
              sx={{ width: "150px" }}
              margin="normal"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {
              <Typography sx={{ color: "red", paddingBottom: "10px" }}>
                {error}
              </Typography>
            }
          </Box>
          <MyEditor value={textInput} onChange={(e) => setTextInput(e)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            // onClick={handleSubmit}
            sx={{ textTransform: "none", backgroundColor: "green" }}
          >
            {editingIndex !== null ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotesTableByDate;
