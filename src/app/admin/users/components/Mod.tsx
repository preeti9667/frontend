"use client";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Typography, Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MyEditor from "../../components/Textdraft";
import { addNote, removeNote } from "@/customStore/userSlice";
type Note = {
  text: string;
  time: string;
};

const NotesTableByDate = () => {
  const dispatch = useDispatch();
  const notesByDate = useSelector((state: any) => state.notes);

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

  const handleOpenDialog = (date: string) => {
    setSelectedDate(date);
    setTextInput("");
    setTimeInput("");
    setEditingIndex(null);
    setError("");
    setOpen(true);
  };

  const handleEdit = (date: string, index: number, note: Note) => {
    setSelectedDate(date);
    setTextInput(note.text);
    setTimeInput(note.time);
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = (date: string, index: number) => {
    dispatch(removeNote({ date, index }));
  };

  const handleSubmit = () => {
    if (!timeInput) {
      setError("Time is required");
      return;
    }

    if (selectedDate) {
      const note = { text: textInput, time: timeInput };
      if (editingIndex !== null) {
        // For simplicity, remove and add again
        dispatch(removeNote({ date: selectedDate, index: editingIndex }));
      }
      dispatch(addNote({ date: selectedDate, note }));
    }

    setOpen(false);
    setTextInput("");
    setTimeInput("");
    setEditingIndex(null);
  };

  const formatDraftContent = (rawString: string) => {
    try {
      const raw = JSON.parse(rawString);
      return (
        <Box sx={{ padding: "0 10px 10px" }}>
          {raw.blocks.map((block: any, i: number) => {
            switch (block.type) {
              case "header-one":
                return <Typography key={i} variant="h5">{block.text}</Typography>;
              case "unordered-list-item":
                return <li key={i}>{block.text}</li>;
              default:
                return <Typography key={i} variant="body2">{block.text}</Typography>;
            }
          })}
        </Box>
      );
    } catch {
      return <Typography>{rawString}</Typography>;
    }
  };

  return (
    <Box sx={{ mt: 2, px: 3 }}>
      <Box textAlign="right" mb={2}>
        <IconButton onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton onClick={() => setPage((p) => Math.min(p + 1, 3))} disabled={page >= 3}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>

      <Paper elevation={1}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleDates.map((date) => (
                <TableCell key={date} align="center">
                  <Typography variant="subtitle2">
                    {moment(date).format("MMM DD")}
                    <AddCircleOutlineRoundedIcon
                      onClick={() => handleOpenDialog(date)}
                      color="success"
                      sx={{ ml: 1, cursor: "pointer" }}
                    />
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {visibleDates.map((date) => (
                <TableCell key={date} sx={{ verticalAlign: "top" }}>
                  {(notesByDate[date] || []).map((note: Note, idx: number) => (
                    <Box key={idx} mb={2} sx={{ borderBottom: "1px solid #ccc", pb: 1 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="caption" color="primary">{note.time}</Typography>
                        <Box>
                          <IconButton size="small" color="success" onClick={() => handleEdit(date, idx, note)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(date, idx)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      {formatDraftContent(note.text)}
                    </Box>
                  ))}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingIndex !== null ? "Edit Note" : "Add Note"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Time"
            type="time"
            fullWidth
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            sx={{ my: 2, width: 200 }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <MyEditor value={textInput} onChange={(val) => setTextInput(val)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingIndex !== null ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotesTableByDate;

 