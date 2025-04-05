"use client"
import React, { useState } from "react";
import {
  Drawer,
  Box,
  CssBaseline,
} from "@mui/material";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CustomError from "../customError/page";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
        <Box sx={{ display: "flex",
         width:'100vw'}}>
          <CssBaseline />
          <Navbar  toggleDrawer={toggleDrawer}/>
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
            <Sidebar toggleDrawer={toggleDrawer} />
          </Drawer>

          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              [`& .MuiDrawer-paper`]: { boxSizing: "border-box", width: 250 },
            }}
          >
           <Sidebar toggleDrawer={toggleDrawer} />
          </Drawer>
          <Box component="main" 
          sx={{ flexGrow: 1,mt:8, p:3}} >
        
            {children}
  
          </Box>
         
        </Box>
    
  );
}
