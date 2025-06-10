import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


interface Note {
  _id: string;
  userId: string;
  date: string; // e.g., "2025-05-28"
  time: string;
  text: string;
}

interface Props {
    visibleDates: string[]
    notes: any
    handleOpenDialog: (date: string) => void
    handleEdit: (date: string, id: string) => void
    handleDelete: (date: string, id: string) => void
    formatDraftContent: (rawString: string) => any
    handleCopyToNextDate: (date: string) => void
    userName:any
}
const  ResponsiveUserDiet:React.FC<Props> = ({visibleDates,notes,userName,
    handleOpenDialog,handleEdit,handleDelete
    ,formatDraftContent,handleCopyToNextDate
})=> {
  return (
    <Box
    sx={{
        display: {
          xl: "none",
          md: "none",
          xs: "block",
          sm: "block",
          lg: "none",
        }, }} >
    <Typography variant="h4" sx={{padding:"5px 15px"}}>{userName}</Typography>
    <Box  sx={{ borderRadius: "12px", overflow: "hidden",}}>
        <Box
          sx={{
            display: "flex",
           flexDirection: "column",
            gap: "40px",  
          }} >
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
                    borderRadius:"10px"
                }}
              >
                <Box
                  sx={{
                    padding: "5px 10px",
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
                      onClick={() => handleCopyToNextDate(date)}
                      sx={{
                        textTransform: "none",
                        bgcolor: "var(--text-color)",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        px: 2,
                        color: "white",
                      }}>
                      Copy to Next
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ height: "300px", overflow: "auto",bgcolor:"white",borderRadius:"10px"}}>
                  {matchedNote &&
                    matchedNote.entries.map((note: Note, idx: string) => (
                      <Box
                        key={idx}  
                        sx={{
                          overflow: "hidden",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
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
                              size="small"
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
                        <Box>{formatDraftContent(note.text)}</Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            );
          })}
        </Box>  
      </Box>

    </Box>
  )
}

export default ResponsiveUserDiet