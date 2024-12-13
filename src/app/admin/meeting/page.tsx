import React from 'react'
import AdminLayout from '../AdminLayout';
import { Box } from '@mui/material';
const Meeting = () => {
  return (
    <AdminLayout>
        <Box className="admin" sx={{height:'600px'}}>
            hello meeting
        </Box>
    </AdminLayout>
  )
}

export default Meeting;