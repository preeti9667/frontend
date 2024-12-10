'use client'
import { Avatar, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import style from '../admin/admin.module.css'
import GroupsIcon from '@mui/icons-material/Groups';
import DehazeIcon from '@mui/icons-material/Dehaze';
const Sidebar = () => {

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    // event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };


  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    
    
  };

  const DrawerList = (
    <Box>hello</Box>
  )
  const theme = useTheme();
//  const isLargeScreen = useMediaQuery('(min-width:768px)');
 const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
   <>
  {isSmallScreen &&(
  <Box sx={{position:'fixed', left:'0'}}>  
<Box sx={{background:'#f4f7f7',}}>

 <Image src='/logo.jpg' width={80} height={80} alt=''className={style.logo} />
   </Box>
   <hr/><hr/><hr/><hr/>
   <Box>
    <List  sx={{display:"flex", flexDirection:'column', gap:'13px'}}>
      <ListItemButton href='/admin/user'
      selected={selectedIndex === 0}
      onClick={(event) => handleListItemClick(event,0)}
      >
    <ListItem sx={{padding:"2px 3px",display:"flex",gap:"20px", alignItems:'center'}}>
       <PeopleAltIcon/>
        <ListItemText primary="users"  />
      </ListItem>
        </ListItemButton>

      <ListItemButton href='/admin/Profile'
      selected={selectedIndex === 1}
      onClick={(event) => handleListItemClick(event,1)}>
      <ListItem sx={{padding:"2px 3px",display:"flex",gap:"20px", alignItems:'center'}}>
       <AccountCircleIcon/>
        <ListItemText primary="Profile"  />
      </ListItem>
        </ListItemButton>

    <ListItemButton href='/admin/meeting'
    selected={selectedIndex === 2}
    onClick={(event) => handleListItemClick(event,2)}>
    <ListItem sx={{padding:"2px 3px",display:"flex",gap:"20px", alignItems:'center'}}>
     <GroupsIcon/>
        <ListItemText primary="Meeting"  />
      </ListItem>
        </ListItemButton>
    
    </List>
   </Box>
   </Box>)}
  

<Box sx={{border:"2px solid black"}} >
   <Button onClick={toggleDrawer(true)} sx={{border:"2px solid black"}}><DehazeIcon/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
</Box>

   </>
  )
}

export default Sidebar;