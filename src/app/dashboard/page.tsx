'use client'
import React, { lazy, Suspense } from 'react'
import { Box, CircularProgress, Container, Skeleton, Grid, Grid2 } from '@mui/material'
import { DASHBOARD_API } from '@/constant'
import useRequest from '@/util/useRequest'
import UserProfile from './components/UserProfile'
import MeetingsList from './components/MeetingsList'
import DietEntries from './components/DietEntries'
const Dashboard = () => {
  const {data, isLoading} = useRequest({
    url: DASHBOARD_API,
  })
  
  if (isLoading || !data?.data) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
       <Grid container spacing={3}>
            <Grid item xs={12}>
             <Skeleton variant="rounded"  height={100} />
            </Grid>
            <Grid item xs={12} md={6}>
             <Skeleton variant="rounded" height={600} />  
            </Grid>
            <Grid item xs={12} md={6}>
             <Skeleton variant="rounded" height={600} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  }

  const dashboardData = data?.data;
  const user = dashboardData?.user;
  const meetings = dashboardData?.meetings;
  const diets = dashboardData?.diets;
  // console.log(diets);
  
  return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4}}>
        <Container maxWidth="lg">
          <Grid container >
            {/* User Profile Section - Full width */}
            <Grid item xs={12}>
              <UserProfile user={user} />
            </Grid>

            {/* Meetings Section - Left side */}
            <Grid item xs={12} md={6} >
              <MeetingsList meetings={meetings} />
            </Grid>

            {/* Diet Entries Section - Right side */}
            <Grid item xs={12} md={6} sx={{paddingLeft:{xs: '0px', md: '20px', lg: '20px', xl: '20px', sm: '10px'}}}>
              <DietEntries diets={diets} />
            </Grid>
          </Grid>
        </Container>
      </Box>
  )
}

export default Dashboard