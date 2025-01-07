'use client'
import { Box } from '@mui/material';
import AdminLayout from '../../AdminLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface DataItem {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
date:number
}


export default function page(
  {
  params,
}: {
  params: Promise<{ meetingId: string }>
}
) {

const [meeting, setMeeting] = useState<DataItem | null>(null)

   const fetchMeetings = async () => {
    const meetingId = (await params).meetingId
      try {
        const response = await axios.get(`http://localhost:4000/meeting/${meetingId}`)
          setMeeting(response.data.meeting)
        // console.log(response.data.meeting) 

      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };
  
  useEffect(() => {
      fetchMeetings();
    }, []);


  return (
  <AdminLayout>
    <Box>{meeting?.title}</Box>
    <Box>{meeting?.description}</Box>
    <Box>{meeting?.status}</Box>

  </AdminLayout>
  )
}

