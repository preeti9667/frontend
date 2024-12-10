import { Box,   useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // const isLargeScreen = useMediaQuery('(min-width:768px)');
    return (
      <html lang="en">
        <body>
          <Box sx={{ flexGrow: 1 }}>
        <Grid container>
        <Grid 
        size={ 2.5}
        >
        
           <Sidebar/>
        </Grid>
        <Grid  size={9.5}
        // size={isLargeScreen? 9.5: 11}
        >
      <Navbar/>
          {children}
         
        </Grid>
        </Grid>
          </Box>
        </body>
      </html>
    );
  }
  