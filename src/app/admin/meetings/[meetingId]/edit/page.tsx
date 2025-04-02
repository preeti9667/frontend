'use client'
import { Box } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MeetingForm from '../../components/CreateMeetings'
import {useParams, useRouter} from 'next/navigation';
import { ADD_MEETING_API, ADMIN_MEETING_ROUTE, GET_MEETING_API } from '@/constant';
import useRequest from '@/util/useRequest';
import { toast } from 'react-toastify';

interface DataItem {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string; 
  endDate: string;
  type: string;
}

const  Edit = ()=>{
  const params = useParams<{ meetingId: string }>();
  const router = useRouter()
  const [initialValues, setInitialValues] = useState<DataItem | null >(null); 
  const [isLoading, setIsLoading] = useState(false);

  const {data} = useRequest({
    url: `${GET_MEETING_API}/${params.meetingId}`,
  })
  const response = data?.meeting as DataItem || null;
  

  useEffect(() => {
    if (response) {
      setInitialValues(response);
    }
  }, [response]);

        const handleSubmit = async (values: any) => {
            setIsLoading(true);
            try {    
              const response = await axios.put(`${ADD_MEETING_API}/${params.meetingId}`,
              {
                title: values.title,
                description: values.description,
                startDate: values.startDate,
                endDate: values.endDate,
                startTime: values.startTime,
                endTime: values.endTime,
                type: values.type
              });

              setInitialValues(response.data.meeting);
              setIsLoading(false);
              if (response.status === 200) {
                  router.push(`${ADMIN_MEETING_ROUTE.url}/${params.meetingId}/details`);
          }
        } catch (error:any) {
          toast.error(error.message || "Something went wrong", { theme: "colored" });
        }
        };
  
  return (
    <>
        <Box>
      {initialValues && (
        <MeetingForm onSubmit={handleSubmit} mode='edit' initialValues={initialValues} 
        isLoading={isLoading}
        />
       )} 
    
         </Box>
     </>
  )
}

export default Edit 