'use client'
import React, { useState } from 'react'
import MeetingForm from '../components/CreateMeetings'
import { ADD_MEETING_API, ADMIN_MEETING_ROUTE } from '@/constant';
import {useRouter} from 'next/navigation';
import useRequestPost from '@/util/useRequestPost';

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
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (value:DataItem)=>{
 setIsLoading(true);
   const response  =  await useRequestPost({
      url: ADD_MEETING_API,
      data: value
    });
    // console.log(response)
    setIsLoading(false)
    if(response.status === 200){
        router.push(`${ADMIN_MEETING_ROUTE.url}`);
      }
  }
  
  return (
    <>
    <MeetingForm onSubmit={handleSubmit} 
      mode='add' isLoading={isLoading}
    />
    </>
  )
}
