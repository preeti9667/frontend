import { Box } from '@mui/material'
import moment from 'moment';
import React from 'react'

interface propsItem{
    item:  string;  
}

interface propsMoment{
    item:  string;
    type: string
}
 export const TypeColor: React.FC<propsItem> = ({item}) => {
    const getStageColor = (interval: string) => {
        switch (interval) {
            case "ONCE":
                return 'var(--primary-color)';
            case "WEEKLY":
                return "var( --text-color)";
            case "MONTHLY":
                return "var(--danger-color)";
            case "DAILY":
                return "var(--text1-color)";
        }
    };
    
  return (
    <>
        <Box 
        sx={{color:"white", width:"fit-content",padding:'5px 10px',
         textAlign:"center", borderRadius:"20px",fontSize:"11px",
         background:getStageColor(item)}}>
            {item}
        </Box>
    </>
  )
}


export const StatusColor:React.FC<propsItem> =({item})=>{

    const getStatusColor = (interval: string) => {
        switch (interval) {
            case "CREATED":
                return 'var(--secondary-color)';
            case "COMPLETED":
                return "#0000ff91";
        }
    }
   return(
    <>
     <Box 
        sx={{color:"white", width:"fit-content",padding:'5px 10px',
         textAlign:"center", borderRadius:"20px",fontSize:"11px",
         background:getStatusColor(item)}}>
            {item}
        </Box>
    </>
   ) 

}

export const Moment:React.FC<propsMoment> =({item,type})=>{
    return(
        <>
        <Box>
            {moment(item).format(type)}
        </Box>
        </>
    )
}
