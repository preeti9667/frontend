'use client'
import React,{ useState } from 'react'
import { Box, Button, DialogActions, DialogTitle, Dialog} from '@mui/material'

interface DialogProps {
        open: boolean;
        handleDelete: () => void;
        onClose: () => void;
    }

const  MyDialog : React.FC<DialogProps> = ({handleDelete,onClose,open}) => {

  return (

   <Box> 
    <Dialog open={open} onClose={onClose}>
          <DialogTitle>Are you sure you</DialogTitle>
          <DialogActions>
            <Button onClick={handleDelete} variant="contained" color="success">
              Yes
            </Button>
            <Button onClick={onClose} variant="contained" color="error">
              No
            </Button>
          </DialogActions>
        </Dialog>
   </Box>

  )
}
export default MyDialog;
