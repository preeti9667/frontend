'use client'
import { Box } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState, } from 'react'
import MeetingForm from '../../components/CreateMeetings'
import {useParams, useRouter} from 'next/navigation';
import { ADD_MEETING_API, ADMIN_MEETING_ROUTE, GET_MEETING_API } from '@/constant';
import useRequest from '@/util/useRequest';

interface DataItem {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string; 
  endDate: string;
  type: string;
}

const Edit = ()=>{
  const MeetingId = useParams<{meetingId: string}>()
console.log(MeetingId)

// ({
//   params,
// }: {
//   params: Promise<{ meetingId: string }>;
// })  {


  const router = useRouter()
  const [initialValues, setInitialValues] = useState<DataItem | null >(null);
  // const [isLoading, setIsLoading] = useState(false)

  // useEffect( () => {
  //       const fetchMeeting = async () => {
  //         try {
  //           const response = await axios.get(`${GET_MEETING_API}${MeetingId}`);
  //           console.log(response)
  //           const data = response.data.meeting;
  //           // console.log(data)
  //           setInitialValues(data);

  //         } catch (error) {
  //           console.error('Error fetching meeting data:', error);
  //         }
  //       };
    
  //        fetchMeeting();
  //     }, [MeetingId]);

const {data,isLoading} = useRequest({
url:`${GET_MEETING_API}/${MeetingId}`
})
const upDate = data.meeting

   const handleSubmit = async (values: any) => {  
            try {    
              const response = await axios.put(`${ADD_MEETING_API}/${MeetingId}`,
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
              
              if (response.status === 200) {
                  router.push(`${ADMIN_MEETING_ROUTE.url}/${MeetingId}/details`);
            // console.log('Meeting updated successfully');
          }
        } catch (error) {
          console.error('Error updating meeting:', error);
        }
      // };
        };


  
  return (
    <>
        <Box>
      {initialValues && (
        <MeetingForm onSubmit={handleSubmit} mode='edit' initialValues={initialValues} />
      )}
         </Box>
     </>
  )
}

export default Edit;