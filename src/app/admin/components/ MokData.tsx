import React from "react";
import { Box, Skeleton, TableCell } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

interface Props{
  width: any,
  height: any
}
const MokData:React.FC<Props> = ({width,height}) => {
  return (
    <>
        <Skeleton variant="text" width={width} height={height} />
    </>
  );
};

export default MokData;

export function CustomCircularProgress (){
return(
  <>
<CircularProgress size={70}  sx={{color:'#918484'}} thickness={2}/> 

  </>
)
}