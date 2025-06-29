import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Quote = ({ quote }) => {
  if (!quote) return null;

  return (
    <Card sx={{ backgroundColor: '#0f172a', color: '#fff', mb: 4, border: '1px solid #06b6d4' }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: '#06b6d4', fontWeight: 'bold' }}>
          ✨ Quote of the Moment
        </Typography>
        <Typography mt={2} fontStyle="italic" color="gray.300">
          "{quote}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Quote;
