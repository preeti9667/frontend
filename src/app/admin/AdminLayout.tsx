import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          <Box sx={{display:'grid', gridTemplateColumns:'1fr 4fr'}}>
            <Sidebar/>
            <Box>
      <Navbar/>
          {children}
            </Box>
          </Box>
        </body>
      </html>
    );
  }
  