import React from 'react'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/constant'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
export default function Home() {
  return (
    <Box className="fullImage" >
    <Box sx={{display:'flex', justifyContent:"end", padding:"10px",gap:"10px", alignItems:"center"}}>
     
      <Link href={`${SIGNUP_ROUTE.url}`}
     className='Button'>Sign Up</Link>

      <Link href={`${LOGIN_ROUTE.url}`}   className='Button' >
      Login</Link>

    </Box>
      <Box sx={{display:"flex",}}>
        <Box sx={{height:"90vh", }}></Box>
    <Box 
       sx={{ margin:"auto", }}>
       <Typography fontSize={{xs: "40px", md: "80px", lg: "100px", xl: "100px", sm: "50px"}}
       color='success'>
    Welcome To Health</Typography>
    </Box>
      </Box>
    </Box>
  )
}
