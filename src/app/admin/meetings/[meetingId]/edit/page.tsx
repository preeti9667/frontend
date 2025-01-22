'use client'
import { Box } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MeetingForm from '../../components/CreateMeetings'
// import  { useRouter } from 'next/navigation';
import { ADD_MEETING_API, ADMIN_MEETING_ROUTE, GET_MEETING_API } from '@/constant';

interface DataItem {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string; 
  endDate: string;
  type: string;
}

function Edit({
  params,
}: {
  params: Promise<{ meetingId: string }>;
})  {


  // const router = useRouter()
  const [meeting, setMeeting] = useState<DataItem | null>(null);
  
  
  useEffect(() => {
              const fetchMeeting = async () => {
            try {
              const { meetingId } = await params;
              const response = await axios.get(`${GET_MEETING_API}/${meetingId}`);
              const fetchedMeeting = response.data.meeting;
              setMeeting({ ...fetchedMeeting,
                startDate: new Date(fetchedMeeting.startDate),
                endDate: new Date(fetchedMeeting.endDate)
            });
              console.log(fetchedMeeting)
            } catch (err) {
              // setError('Failed to load meeting data');
              console.error(err);
            } 
          };
      
          fetchMeeting();
        }, [params]);
      
     
        

        const handleSubmit = async (values: DataItem)=>{
      
          const meetingId = (await params).meetingId;

      try {
        const response =  axios.put(`${ADD_MEETING_API}/${meetingId}`,values)
        // console.log(response)
        if((await response).status === 200){
          // router.push(`${ADMIN_MEETING_ROUTE.url}`);
        }
      } catch (error) {
        console.error("meeting form error:", error);
      }
    
    }
    

  return (
    <>
        <Box>
        <MeetingForm onSubmit={handleSubmit} mode='edit' initialValues={meeting ?? { title: '', description: '', startTime: '', endTime: '', startDate: '', endDate: '', type: '' }}
        
 />
        </Box>
    </>
  )
}

export default Edit