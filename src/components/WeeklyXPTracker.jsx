// src/components/WeeklyXPTracker.jsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchXPData } from '../api/xp';

const WeeklyXPTracker = () => {
  const [xpToday, setXpToday] = useState(0);
  const [goalToday, setGoalToday] = useState(100);

  const weeklyXP = [
    { date: 'Mon', xp: 80 },
    { date: 'Tue', xp: 95 },
    { date: 'Wed', xp: 70 },
    { date: 'Thu', xp: 100 },
    { date: 'Fri', xp: 110 },
    { date: 'Sat', xp: 90 },
    { date: 'Sun', xp: 85 },
  ];

  const weeklyGoal = 700;
  const totalXP = weeklyXP.reduce((sum, day) => sum + day.xp, 0);

  useEffect(() => {
    const loadXP = async () => {
      const data = await fetchXPData();
      setXpToday(data?.xp || 0);
      setGoalToday(data?.goal || 100);
    };

    loadXP();
  }, []);

  return (
    <Card sx={{ background: '#0a0f1c', color: '#00e5ff', mb: 4, border: '1px solid #00e5ff' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>📈 Weekly XP Tracker</Typography>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyXP}>
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Line type="monotone" dataKey="xp" stroke="#00e5ff" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>

        <Typography mt={2}>Total XP This Week: {totalXP} / {weeklyGoal}</Typography>
        <LinearProgress variant="determinate" value={(totalXP / weeklyGoal) * 100} sx={{ height: 10, mt: 1, bgcolor: '#1f2937', '& .MuiLinearProgress-bar': { backgroundColor: '#00e5ff' } }} />

        <Box mt={3}>
          <Typography variant="body1">Today’s XP: {xpToday} / {goalToday}</Typography>
          <Typography variant="body2" color={xpToday >= goalToday ? 'lightgreen' : 'orange'}>
            {xpToday >= goalToday ? '✔ Goal Met Today' : '🔴 Keep Pushing!'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeeklyXPTracker;
