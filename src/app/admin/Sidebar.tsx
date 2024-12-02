import { Avatar, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import DiamondIcon from '@mui/icons-material/Diamond';
const Sidebar = () => {
  return (
   <Box sx={{border:'2px solid black'}}>
<Box >
<DiamondIcon sx={{width:'80px', height:'100px', color:'blue',}}/>
   </Box>
   <Box>
    <List>
    <ListItem>
      <ListItemButton href='/admin/meeting'>
       <Avatar >
       <PeopleAltIcon/>
       </Avatar>
        <ListItemText primary="users"  />
        </ListItemButton>
      </ListItem>

      <ListItem>
       <Avatar >
       <AccountCircleIcon/>
       </Avatar>
        <ListItemText primary="Profile"  />
      </ListItem>
    <ListItem>
       <Avatar >
       <AccountCircleIcon/>
       </Avatar>
        <ListItemText primary="Meeting"  />
      </ListItem>
    
    </List>
   </Box>
   </Box>
  )
}

export default Sidebar;