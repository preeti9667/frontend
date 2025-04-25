"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

type Note = {
  text: string;
  time: string;
};

const NotesTableByDate: React.FC = () => {
  const today = new Date();
  const [page, setPage] = useState(0); // 0 = first 7 days, 1 = next 7
  const [open, setOpen] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [textInput, setTextInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[][]>(Array(14).fill([]).map(() => []));
  const [openDialog, setOpenDialog] = useState(false);


  const get14Days = (start: Date): Date[] => {
    const days: Date[] = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const allDates = get14Days(today);
  const visibleDates = allDates.slice(page * 5, page * 5 + 5);

  const handleOpenDialog = (globalIndex: number) => {
    setSelectedDateIndex(globalIndex);
    // setTextInput("");
    setTimeInput("");
    setEditingIndex(null);
    setOpen(true);
  };

  const handleEdit = (globalIndex: number, noteIndex: number) => {
    const note = notes[globalIndex][noteIndex];
    setSelectedDateIndex(globalIndex);
    setTextInput(note.text);
    setTimeInput(note.time);
    setEditingIndex(noteIndex);
    setOpen(true);
  };

  const handleRemove = (globalIndex: number, noteIndex: number) => {
    const updatedNotes = [...notes];
    updatedNotes[globalIndex].splice(noteIndex, 1);
    setNotes(updatedNotes);
   
  };

  const handleSubmit = () => {
    if (selectedDateIndex !== null) {
      const updatedNotes = [...notes];
      const newNote = { text: textInput, time: timeInput };

      if (editingIndex !== null) {
        updatedNotes[selectedDateIndex][editingIndex] = newNote;
      } else {
        updatedNotes[selectedDateIndex].push(newNote);
      }

      setNotes(updatedNotes);
    }

    setOpen(false);
    setTextInput("");
    setTimeInput("");
    setEditingIndex(null);
  };
  // const globalIndex = page * 5 + i;

  function handleClose(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Box sx={{ mt: 1, px: 2 }}>
      <Box>
      <Typography variant="h6" >User Name :</Typography>
      <Typography variant="h6" sx={{mb:2}}>User Email :</Typography>
      </Box>

      {/* Table */}
      <Paper elevation={0} sx={{border:'1px solid #ccc'}}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleDates.map((date, i) => (
               
                <TableCell key={i} align="center" sx={{borderRight:'1px solid #ccc',}}>
                  <Typography variant="body2" sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}}>
                    {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    {/* <Button size="small" sx={{backgroundColor:'green', textTransform:"none",margin:'10px 20px'}}
                     variant="contained" onClick={() => handleOpenDialog(globalIndex)}>
                      Add Note
                    </Button> */}
                    <AddCircleOutlineRoundedIcon 
                    onClick={() => handleOpenDialog(page * 5 + i)} 
                     color="success"
                      sx={{cursor:'pointer'}}/>
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {/* Notes Row (display notes vertically under each date) */}
            <TableRow>
              {visibleDates.map((_, i) => {
                const globalIndex = page * 5 + i;
                const dayNotes = notes[globalIndex];
              
                
                return (
                  <TableCell key={i} sx={{ verticalAlign: "top" , borderRight:'1px solid #ccc',width:'200px', padding:"inherit"}}>
                       
                    {dayNotes.map((note, index) => (
                      <Box key={index} mb={1} sx={{borderBottom:'1px solid #ccc',}}>
                        <Box sx={{margin:'0 10px'}}>
                        <Typography variant="body2">Time: {note.time}</Typography>
                        <Typography variant="body2">Note: {note.text}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", padding:"5px"  }}>
                        <IconButton size="small" 
                        onClick={() => handleEdit(globalIndex, index)} 
                        color="success">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => 
                           handleRemove(globalIndex, index)
                        
                          } 
                           color="error"
                           >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </TableCell>
                
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
        <Box textAlign="center" sx={{textAlign:'end', mr:5}}>
      
        <IconButton onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(notes.length / 5) - 1))}
         disabled={page === Math.ceil(notes.length / 5) - 1}
         sx={{ ml: 2 }}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
      </Paper>

     
      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{backgroundColor: "var(--text-color)", color: "white"}}>{editingIndex !== null ? "Edit Note" : "Add Note"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Note"
            type="text"
            fullWidth
            margin="normal"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            margin="normal"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}  sx={{ textTransform: "none", }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ textTransform: "none", backgroundColor: "green" }}>
            {editingIndex !== null ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotesTableByDate;


