"use client";
import React, { useEffect, useRef, useState } from "react";
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
import TextDraft from "../../components/Textdraft";


import { useDispatch, useSelector } from "react-redux";
import { addNote, loadNotes, removeNote } from "@/customStore/userSlice";
import { ContentState, convertFromRaw, RawDraftContentState } from "draft-js";
import moment from "moment";

type Note = {
  text: string;
  time: string;
};

const NotesTableByDate: React.FC = () => {
 const dispatch = useDispatch();
//  const list  = useSelector((state: any) => state.notes);
//  console.log(list)

  const today = new Date();
  const [page, setPage] = useState(0); // 0 = first 7 days, 1 = next 7
  const [open, setOpen] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [textInput, setTextInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[][]>(Array(14).fill([]).map(() => []));
  // const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

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
  const visibleDates = allDates.slice(page * 3, page * 3 + 3);

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

      if(timeInput === ""){
       return setError("Time is required");
      } 

      if (editingIndex !== null) {
        updatedNotes[selectedDateIndex][editingIndex] = newNote;
      } else {
        updatedNotes[selectedDateIndex].push(newNote);
      }

      const dates = visibleDates.map((date) => moment(date).format("YYYY-MM-DD"));
      const selectedDate = dates[selectedDateIndex];
      dispatch(addNote({ date: selectedDate, note: { text: textInput, time: timeInput } }));
      // dispatch(add({text:textInput, time:timeInput}));

      setNotes(updatedNotes);
    
      
    }

     

    setOpen(false);
    setTextInput("");
    setTimeInput("");
    setEditingIndex(null);
    
  };

 

 


  // const globalIndex = page * 5 + i;

  

  useEffect(() => {
    dispatch(addNote({ date : moment().format("YYYY-MM-DD"), note: { text: "", time: "" } }));
  }, [dispatch,]);

  const list = useSelector((state: any) => state.notes);
  console.log(list)
  
  

  // const applyInlineStyles = (text: string, styleRanges: any[]) => {
  //   if (!styleRanges || styleRanges.length === 0) return [text];
  
  //   // Build an array of characters and apply styles
  //   const styledChars = text.split("").map((char, index) => ({
  //     char,
  //     bold: false,
  //     italic: false,
  //     underline: false,
  //   }));
  
  //   styleRanges.forEach((range) => {
  //     const { offset, length, style } = range;
  //     for (let i = offset; i < offset + length; i++) {
  //       if (styledChars[i]) {
  //         if (style === "BOLD") styledChars[i].bold = true;
  //         if (style === "ITALIC") styledChars[i].italic = true;
  //         if (style === "UNDERLINE") styledChars[i].underline = true;
  //       }
  //     }
  //   });
  
  //   // Group styled characters into spans
  //   const elements: React.JSX.Element[] = [];
  //   let currentStyle: { bold: any; italic: any; underline: any; } | null = null;
  //   let currentText = "";
  
  //   const flush = () => {
  //     if (currentText === "") return;
  //     let el = <>{currentText}</>;
  //     if (currentStyle) {
  //       if (currentStyle.bold) el = <strong>{el}</strong>;
  //       if (currentStyle.italic) el = <em>{el}</em>;
  //       if (currentStyle.underline) el = <u>{el}</u>;
  //     }
  //     elements.push(el);
  //     currentText = "";
  //   };
  
  //   styledChars.forEach(({ char, bold, italic, underline }, i) => {
  //     const styleKey = JSON.stringify({ bold, italic, underline });
  //     if (!currentStyle || styleKey !== JSON.stringify(currentStyle)) {
  //       flush();
  //       currentStyle = { bold, italic, underline };
  //     }
  //     currentText += char;
  //   });
  //   flush();
  
  //   return elements;
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
                return <Typography key={i} variant="h3">
                  {/* {styledContent} */}
                  {block.text}
                </Typography>;
              case "header-two":
                return <Typography key={i} variant="h5">
                  {block.text}</Typography>;
              case "header-three":
                return <Typography key={i} variant="h6">{block.text}</Typography>;
              case "unordered-list-item":
                return <li key={i}>{block.text}</li>;
              case "ordered-list-item":
                return <ol key={i}><li>{block.text}</li></ol>;
              default:
                return <Typography key={i} variant="body2">{block.text}</Typography>;
            }
          })}
        </Box>
      );
    } catch (error) {
      return <Typography variant="body2">{rawString}</Typography>;
    }
  };
  
// console.log(formatDraftContent(textInput))



  return (
    <Box sx={{ mt: 1, px: 2 }}>
      <Box>
    {/* {
      list.map((item: any, index: number) => {
        return (
          <Box sx={{mb:2}} key={index}>
            <Typography variant="h6" sx={{mb:2}}>{ formatDraftContent(item.text)}</Typography>
            <Typography variant="h6" sx={{mb:2}}> {item.time}</Typography>
          </Box>
        )
      })
    } */}




      <Typography variant="h6" >User Name :</Typography>
      <Typography variant="h6" sx={{mb:2}}>User Email :</Typography>
      

      <Box textAlign="center" sx={{textAlign:'end', mr:5}}>
      
      <IconButton onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(notes.length / 3) - 1))}
       disabled={page === Math.ceil(notes.length / 3) - 1}
       sx={{ ml: 2 }}>
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>

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

                    <AddCircleOutlineRoundedIcon 
                    onClick={() => handleOpenDialog(page * 3 + i)} 
                   
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
                const globalIndex = page * 3 + i;
                const dayNotes = list[globalIndex];
              


                return (
                  <TableCell key={i} sx={{ verticalAlign: "top" , borderRight:'1px solid #ccc',width:'200px', padding:"inherit"}}>
                     

                    {/* {notes[globalIndex].map((note:any, index: number) => (
                      <Box key={index} mb={1} sx={{borderBottom:'1px solid #ccc',}}>
                        <Box sx={{margin:'0 10px'}}>

                     
                        <Box sx={{ display: "flex", gap:"10px", alignItems:"center" , padding:"5px 10px"}}>
                        <Typography variant="body2" sx={{backgroundColor:"var(--text-color)", padding:"5px 10px", borderRadius:"20px",color:'white'}}
                        >{note.time}
                        </Typography>

                        <IconButton size="small"  sx={{border:'1px solid green',}}
                        onClick={() => handleEdit(globalIndex, index)} 
                        color="success">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{border:'1px solid red',}}
                        onClick={() => 
                           handleRemove(globalIndex, index) } 
                           color="error"
                           >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        </Box>        
                        </Box>

                        {
                          formatDraftContent(note.text)
                        }
                      
                           
                      </Box>
                    ))} */}
                  </TableCell>
                
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      
      </Paper>

     
      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{backgroundColor: "var(--text-color)", color: "white"}}>{editingIndex !== null ? "Edit Note" : "Add Note"}</DialogTitle>
        <DialogContent>
        <Box sx={{display:"flex", flexDirection:"column"}}>
        <TextField
            label="Time"
            type="time"
            fullWidth
            sx={{width:"150px"}}
            margin="normal"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {<Typography sx={{color:"red", paddingBottom:"10px"}}>{error}</Typography>}
          </Box>
        <TextDraft  value={textInput} onChange={(e) => setTextInput(e)}/>
          
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


 