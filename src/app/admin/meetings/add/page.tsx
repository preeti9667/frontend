'use client'
import React from 'react'
import MeetingForm from '../components/CreateMeetings'
import axios from 'axios';
import { ADD_MEETING_API, ADMIN_MEETING_ROUTE } from '@/constant';
import {useRouter} from 'next/navigation';
import { post } from '@/util/http.util';

interface DataItem {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string; 
  endDate: string;
  type: string;
}

export default function AddMeeting() {
  const router = useRouter()

  const handleSubmit = async (value:DataItem)=>{
   
      const response =  post(`${ADD_MEETING_API}`,value)
      // console.log(response)
      if((await response).status === 200){
        router.push(`${ADMIN_MEETING_ROUTE.url}`);
      }
  }
  
  return (
    <>
    <MeetingForm onSubmit={handleSubmit} 
      mode='add'
    />
    </>
  )
}
