import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

const XPTracker = ({ data }) => {
  if (!data) return null;

  const percentage = Math.min((data.xp / data.goal) * 100, 100);

  return (
    <Card sx={{ backgroundColor: '#1f2937', color: '#fff', mb: 4, border: '1px solid #a855f7',boxShadow: '0 0 20px rgba(195, 0, 255, 0.34)', }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: '#a855f7', fontWeight: 'bold' }}>
          🚀 XP Tracker
        </Typography>
        <Typography mt={2}>
          Today's XP: <strong>{data.xp}</strong> / <strong>{data.goal}</strong>
        </Typography>

        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 10,
              borderRadius: 5,
              boxShadow: '0 0 20px #00ffff44',
              backgroundColor: '#4b5563',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#a855f7'
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default XPTracker;
