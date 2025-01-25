"use client"

import React, { useState } from "react";
import style from "./admin.module.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  CssBaseline,
  ListItemButton,
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import { usePathname } from "next/navigation";
import { ADMIN_MEETING_ROUTE, ADMIN_USER_ROUTE } from "@/constant/route.constant";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pathname = usePathname();

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      marginTop={7}
    >
      <List sx={{ display: "flex", flexDirection: "column" }}>
        <Divider />
        <ListItemButton
          href={`${ADMIN_USER_ROUTE.url}`}
          disableRipple
         sx={{ color: pathname === `${ADMIN_USER_ROUTE.url}` ? "var(--text-color)" : ""}}
        >
          <ListItem className={style.listItem}>
            <PeopleAltIcon />
            <ListItemText primary="users" />
          </ListItem>
        </ListItemButton>{" "}
        <Divider />
        {/* <ListItemButton href="/admin/profile">
          <ListItem className={style.listItem}>
            <AccountCircleOutlinedIcon />
            <ListItemText primary="Profile" />
          </ListItem>
        </ListItemButton>
        <Divider /> */}
        <ListItemButton
          href={`${ADMIN_MEETING_ROUTE.url}`}  disableRipple
          sx={{
            color: pathname === `${ADMIN_MEETING_ROUTE.url}` ? "var(--text-color)" : "",
          }}
        >
          <ListItem className={style.listItem}>
            <GroupsIcon />
            <ListItemText primary="Meetings" />
          </ListItem>
        </ListItemButton>
        <Divider />
      </List>
    </Box>
  );

  return (
        <Box sx={{ display: "flex",
         width:'100vw'}}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            style={{ backgroundColor: "var(--secondary-color)" }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton
                color="inherit"
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2, display: { xs: "block", lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Avatar
                src="/logo.jpg"
                sx={{
                  width: "60px",
                  height: "60px",
                  display: { xs: "none", lg: "block" },
                }}
              ></Avatar>
              <Typography variant="h4">HEALTH</Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", lg: "block" },

              width: 300,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 300, boxSizing: "border-box" },
            }}
            open
          >
            {drawerContent}
          </Drawer>

          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              [`& .MuiDrawer-paper`]: { boxSizing: "border-box", width: 250 },
            }}
          >
            {drawerContent}
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 
          , }}>
            {children}
          </Box>
        </Box>
    
  );
}
