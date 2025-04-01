'use client'
import React, { useState } from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { ADMIN_DASHBOARD_ROUTE, ADMIN_MEETING_ROUTE, ADMIN_USER_ROUTE, LOGIN_ROUTE } from '@/constant'
import { deleteCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from "@mui/icons-material/Groups";
import MyDialog from "./Dialog";
import style from '@/app/admin/admin.module.css'

interface Props {
    toggleDrawer: (open: boolean) => () => void;
   
}

const  Sidebar : React.FC<Props> = ({toggleDrawer})=> {
 const [logoutOpen, setLogoutOpen] = useState(false);  
      const pathname = usePathname();
      const router = useRouter();
      const handleDelete = ()=>{
        // console.log("delete")
        deleteCookie("Token")
        router.push(`${LOGIN_ROUTE.url}`)
          
      }
  return (
    <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        marginTop={7}
      > 
        <List sx={{ display: "flex", flexDirection: "column" }}>
          <Divider/> 
          <ListItemButton
         onClick={ () => router.push(`${ADMIN_DASHBOARD_ROUTE.url}`)}
            disableRipple
           sx={{ color: pathname === `${ADMIN_DASHBOARD_ROUTE.url}` ? "var(--text-color)" : ""}}
          >
            <ListItem 
            className={style.listItem}
            >
              <PersonIcon />
              <ListItemText primary="Dashboard" />
            </ListItem>
          </ListItemButton>
          <Divider />
          <ListItemButton
         onClick={() => router.push(`${ADMIN_USER_ROUTE.url}`)}
            disableRipple
           sx={{ color: pathname === `${ADMIN_USER_ROUTE.url}` ? "var(--text-color)" : ""}}
          >
            <ListItem 
            className={style.listItem}
            >
              <PeopleAltIcon />
              <ListItemText primary="users" />
            </ListItem>
          </ListItemButton>
          <Divider />
         
          <ListItemButton
            onClick={() => router.push(`${ADMIN_MEETING_ROUTE.url}`)} 
            disableRipple
            sx={{
              color: pathname === `${ADMIN_MEETING_ROUTE.url}` ? "var(--text-color)" : "",
            }}
          >
            <ListItem 
            className={style.listItem}
            >
              <GroupsIcon />
              <ListItemText primary="Meetings" />
            </ListItem>
          </ListItemButton>
          <Divider />
  
          <ListItemButton onClick={() => setLogoutOpen(true)}
            disableRipple>
            <ListItem 
            className={style.listItem}
            >
            <PersonIcon />
              <ListItemText primary="Logout" />
            </ListItem>
          </ListItemButton>
          <Divider/>
        </List>
        <MyDialog handleDelete={handleDelete} open={logoutOpen}  onClose={()=>setLogoutOpen(false)}/>
  
      </Box>
  )
}
export default Sidebar;