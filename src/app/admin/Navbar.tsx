import { Avatar, Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <Box sx={{background:'#f4f7f7', position:'sticky', top:'0'}}>
      <Box sx={{display:"flex", justifyContent:'space-between', padding:"0 10px", alignItems:"center"}}>
      <Box>
        <Avatar>H</Avatar>
      </Box>
      <Image src='/health.png' width={70} height={70} alt='' />
      </Box> 
    <hr/>
    </Box>
    
  )
}

export default Navbar