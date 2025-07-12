import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Chip,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';

import {TypeColor, StatusColor} from '../../admin/components/Chip';
import moment from 'moment';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'white',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(3),
}));

interface Meeting {
  _id: string;
  meetingId: string;
  title: string;
  description: string;
  startDate: string;
  type: string;
  status: string;
}

interface MeetingsListProps {
  meetings: Meeting[];
}

const MeetingsList: React.FC<MeetingsListProps> = ({ meetings }) => {
  return (
    <StyledCard>
      <CardContent >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <EventIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
           Meetings
          </Typography>
        </Box>
        <List sx={{maxHeight: '600px', overflow: 'auto'}}>
          {meetings.map((meeting, index) => (
            <React.Fragment key={meeting._id}>
              {index > 0 && <Divider />}
              <ListItem sx={{ display: 'flex',  }}>
            
                <Box sx={{ display: 'flex', flexDirection: 'column',padding:"10px"}} gap={1} mb={1} width="100%">
                  <Typography variant='h6'>{meeting.title}</Typography>
                   <Typography>
                    {moment(meeting.startDate).format('dddd, LL')}
                    </Typography> 
                  
                <Typography variant="body2" color="text.secondary">
                  {meeting.description}
                </Typography>
                </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column',gap:"10px" }}>
                  <TypeColor item={meeting.type} />
                  <StatusColor item={meeting.status} />
                  </Box>
               
              </ListItem>
           
            </React.Fragment>
          ))}
          
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default MeetingsList; 