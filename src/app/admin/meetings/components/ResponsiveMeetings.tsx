'use client'
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { Moment, StatusColor, TypeColor } from "../../components/Chip"
import style from "@/app/admin/admin.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import CustomInputBase from "../../components/InputBase";
import { useRouter } from "next/navigation";
import { CustomCircularProgress } from "../../components/ MokData";
import { ADD_MEETING_ROUTE } from "@/constant";
interface props {
    meetings : any
    handleClick: any 
    isLoading: boolean
   search: any
   setSearch: any
}


const Responsive :React.FC<props> = ({meetings,handleClick,isLoading, search,setSearch}) => {

    const router = useRouter();

    return (
     <>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    margin: "10px 0",
                    gap:"10px"
                 
                  }} >
                  <Button 
                    onClick={() => router.push(ADD_MEETING_ROUTE.url)}
                    sx={{ backgroundColor: "white", color: "black", boxShadow:"1px 1px 1px ", border:'none'}}>
                    <AddCircleOutlineIcon />
                  </Button>
      
                  <Button
                    sx={{ backgroundColor: "white", color: "black" , boxShadow:"1px 1px 1px ", border:'none'}}
                    onClick={()=> window.location.reload()}>
                    <RefreshIcon />
                  </Button>
      
                </Box>
                <CustomInputBase defaultValue={search} setSearch={setSearch} inputSize="fit"/>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "20px",height:'100vh'}}mt={3}>
                {isLoading &&    
                <Box sx={{height:"60vh",display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <CustomCircularProgress/>                  
                </Box>}
                  <Box sx={{display:"flex", flexDirection:'column', gap:"20px"}}>

                   {meetings.map((item:any,) => (
                      <Box key={item._id} >
                  <Card
                    sx={{
                      borderRadius: "20px 15px",
                      background: "var(--text1-color)",
                    }}
                  >
                    <CardContent
                      onClick={() => handleClick(item._id)}
                      sx={{
                        display: "flex",
                        gap: "14px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography>
                        Title:
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1).toLowerCase()}
                      </Typography>
                      <Typography>Meeting Id: {item.meetingId}</Typography>

                      <Box className={style.momentStyle}>
                        Created At:
                        <Moment  item={item.createdAt} type="lll" />
                      </Box>
                      <Box className={style.momentStyle}>
                        Start-Date:
                        <Moment item={String(item.startDate)} type="ll" />
                      </Box>
                      <Box className={style.momentStyle}>
                        End-Date:
                        <Moment item={String(item.endDate)} type="ll" />
                      </Box>
                      <Typography>
                        Time: {item.startTime}-{item.endTime}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        Type:
                        <TypeColor item={item.type} />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        Status:
                        <StatusColor item={item.status} />
                      </Box>
                    </CardContent>
                  </Card>
            
                  </Box>
                     ))}
                     </Box>
  </Box>
  </>
    )
}
export default Responsive

