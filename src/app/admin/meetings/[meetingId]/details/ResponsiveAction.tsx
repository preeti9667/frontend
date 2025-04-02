'use client'
import React, { useState } from 'react'
import { Box, Button, Divider, Paper } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface props {
  handleClickStatus: () => void
  handleUpdate: () => void
  handleOpen: () => void
}
const  Responsive:React.FC<props> =({handleClickStatus,handleUpdate,handleOpen}) =>{
  const [action, setAction] = useState(false);
  return (
    <>
          <Box
            sx={{
              display: {
                lg: "none",
                xl: "none",
                md: "none",
                sm: "block",
                xs: "block",
              },
            }}
          >
            <Button
              onClick={() => setAction(!action)}
              sx={{ background: "white", borderRadius: "40px" }}
            >
              <MoreVertIcon />
            </Button>
          </Box>
          {action && (
            <Paper
              elevation={0}
              sx={{
                position: "absolute",
                right: "29px",
                marginTop: "36px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                id="basic-button"
                onClick={handleClickStatus}
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  textTransform: "none",
                  color: "var(--text-color)",
                  boxShadow: "none",
                }}
              >
                Status
              </Button>

              <Divider />

              <Button
                sx={{ textTransform: "none" }}
                color="success"
                // variant="outlined"
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Divider />
              <Button
                sx={{ textTransform: "none" }}
                color="error"
                onClick={handleOpen}
              >
                Delete
              </Button>
            </Paper>
          )}

    </>
  )
}
export default Responsive;