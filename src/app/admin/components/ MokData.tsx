import { Box, Skeleton, TableCell } from "@mui/material";
import React from "react";


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
