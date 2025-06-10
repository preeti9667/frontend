import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  background: 'linear-gradient(135deg, var(--text-color) 0%, var(--secondary-color) 100%)',
  color: 'white',
  marginBottom: theme.spacing(3),
}));

interface UserProfileProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    fullName: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '2rem',
            }}
          >
            {user.firstName[0]}{user.lastName[0]}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {user.fullName}
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Box>
        </Box>
        <Chip
          label={`ID: ${user.userId}`}
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
        />
      </CardContent>
    </StyledCard>
  );
};

export default UserProfile; 