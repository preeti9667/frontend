import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'white',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(3),
}));

interface DietEntry {
  _id: string;
  date: string;
  entries: Array<{
    time: string;
    text: string;
    _id: string;
  }>;
  createdAt: string;
}

interface DietEntriesProps {
  diets: DietEntry[];
}

 const formatDraftContent = (rawString: string) => {
    try {
      const raw = JSON.parse(rawString);
      const blocks = raw.blocks;

      return (
        <Box sx={{ padding: "0 10px 10px" }}>
          {blocks.map((block: any, i: number) => {
            switch (block.type) {
              case "header-one":
                return (
                  <Typography key={i} variant="h3">
                    {/* {styledContent} */}
                    {block.text}
                  </Typography>
                );
              case "header-two":
                return (
                  <Typography key={i} variant="h5">
                    {block.text}
                  </Typography>
                );
              case "header-three":
                return (
                  <Typography key={i} variant="h6">
                    {block.text}
                  </Typography>
                );
              case "unordered-list-item":
                return <li key={i}>{block.text}</li>;
              case "ordered-list-item":
                // return <ol  key={i}><li>{block.text}</li></ol>;
                return (
                  <ListItem key={i} sx={{padding:'0px',}}>
                    <ListItemText primary={`${i + 1}. ${block.text} `} sx={{margin:'0px', color:'#393838e3'}} />
                  </ListItem>
                );
              default:
                return (
                  <Typography key={i} variant="body2">
                    {block.text}
                  </Typography>
                );
            }
          })}
        </Box>
      );
    } catch (error) {
      return <Typography variant="body2">{rawString}</Typography>;
    }
  };

const DietEntries: React.FC<DietEntriesProps> = ({ diets }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <RestaurantIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Diet Timeline
          </Typography>
        </Box>
           <Box sx={{maxHeight:"600px", overflow:"auto"}}>
        {diets.map((diet, index) => (
          <Box key={diet._id} mb={2}>
            <Box sx={{fontWeight:"bold", fontSize:"19px"}}>
              {moment(diet.date).format('dddd, LL')}
              </Box>
              <Box sx={{display:"flex", gap:"10px", flexDirection:"column", marginTop:"10px"}}>
              {diet.entries.map((entry) => (
                <Box key={entry._id} sx={{border:"1px solid #ccc", padding:"10px", borderRadius:"5px"}}>
                  <Box display="flex" alignItems="center" gap={1} >
                    <AccessTimeIcon color="action" fontSize="small" />
                    <Box  color="text.secondary">
                      {entry.time}
                    </Box>
                  </Box>
                  <Box >
                    {entry.text ? formatDraftContent(entry.text) : 'No content'}
                  </Box>
                  </Box>
              ))}
              </Box>
            </Box>
        ))}
        </Box>
</CardContent>
    </StyledCard>
  );
};

export default DietEntries; 