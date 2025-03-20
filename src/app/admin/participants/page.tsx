import { Box } from '@mui/material'
import React from 'react'
import Participates from './components/Participates'

interface props{
  meetingId:string
}

const Participants:React.FC<props> =({meetingId}) => {
  return (
   <Box>
   <Participates meetingId={meetingId}/>
   </Box>
  )
}
export default Participants