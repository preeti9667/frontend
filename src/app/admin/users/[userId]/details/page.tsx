'use client'
import AdminLayout from '@/app/admin/AdminLayout'
import { Box, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import UserDiet from '../../components/UserDiet';
export default function Details() {
  const router = useRouter();

  return (
<AdminLayout>
     <Box
     sx={{
      background: { xs: "none", sm:'none', md: "white", lg: "white", xl: "white" },
      position: "relative",
      margin:{
        xs: "0px -24px",
        sm: "0px -24px",
        md: "0px",
        lg: "0px",
        xl: "0px",
      },
    }}>
       <Box
          sx={{
            background: "var(--text-color)",
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <ArrowBackIcon
              fontSize="small"
              onClick={() => router.back()}
              sx={{
                width: "30px",
                height: "30px",
                color: "white",
                cursor: "pointer",
              }}
            />

            <Typography variant="h5" color="white">
              User Details
            </Typography>
          </Box>
    </Box>
    <Box
          sx={{
            // display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl: "1fr 1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr",
            },
            padding: { xs: "10px", md: "20px", lg: "20px", xl: "20px" },
          }}
        >

          <UserDiet/>
        </Box>
    </Box>
</AdminLayout>
  )
}
