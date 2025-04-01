import React from "react";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
interface Props {
  toggleDrawer: (open: boolean) => () => void;
}
const Navbar: React.FC<Props> = ({ toggleDrawer }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
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
  );
};
export default Navbar;
