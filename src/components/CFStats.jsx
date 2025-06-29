// src/components/CFStatsCard.jsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function CFStats({ data }) {
  if (!data) return null;

  return (
    <Card
      sx={{
        backgroundColor: '#1f1f2e',
        border: '2px solid #00ffff88',
        borderRadius: 4,
        boxShadow: '0 0 20px #00ffff44',
        mb: 4,
        flex: '1 1 300px',
    maxWidth: 400,
    minWidth: 280,
        
      }}
    >
      <CardContent>
        <Typography variant="h5" color="#00ffff">
          Codeforces Stats
        </Typography>
        <Typography mt={2}>Rating: {data.rating}</Typography>
        <Typography>Rank: {data.rank}</Typography>
        <Typography>Max Rating: {data.maxRating}</Typography>
        <Typography>Max Rank: {data.maxRank}</Typography>
      </CardContent>
    </Card>
  );
}
