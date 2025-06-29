import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const GPTStatus = ({ status }) => {
  if (!status) return null;

  const isOnline = status.online;
  const color = isOnline ? '#22c55e' : '#ef4444';

  return (
    <Card sx={{ backgroundColor: '#111827', color: '#fff', mb: 4, border: `1px solid ${color}` }}>
      <CardContent>
        <Typography variant="h5" sx={{ color, fontWeight: 'bold' }}>
          🧠 Local GPT Status
        </Typography>
        <Typography mt={2}>
          Status:{" "}
          <span style={{ color }}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </Typography>
        <Typography>
          Model: <span style={{ color: '#3b82f6' }}>{status.model}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GPTStatus;
