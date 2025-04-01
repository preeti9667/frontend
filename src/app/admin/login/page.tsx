"use client";

import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import Login from "./components/Login";
import { LOGIN_TEMPLATE_IMAGE } from "@/util/images";
const LogIn = () => {
 
  return (
    <Box
      sx={{ webkitAlignItems: "none" }}
      display={"grid"}
      gridTemplateColumns={{
        xs: "1fr",
        md: "1fr",
        lg: "1fr 1fr",
        xl: "1fr 1fr",
        sm: "1fr",
      }}
      alignItems={"center"}
      margin={"auto"}
      width={"100%"}
      height={"100vh"}
    >
      {/* Image Section */}
      <Box
        sx={{
          display: {
            xs: "none",
            lg: "block",
            xl: "block",
            md: "none",
            sm: "none",
          }}}>
        <Image
          src={LOGIN_TEMPLATE_IMAGE}
          alt="Login Illustration"
          height={600}
          width={600}
          style={{ margin: "auto", display: "block", mixBlendMode: "color-burn" }}
        />
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", lg: "80%" },
          p: { xs: 1, lg: 3 },
          pr: { xs: 2, lg: 7 },
          flex: 1,
          margin: "auto",
        }}>
        <Login/>
      </Box>
    </Box>
  );
};

export default LogIn;
