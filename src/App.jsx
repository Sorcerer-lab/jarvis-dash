import React, { useEffect, useState } from 'react';
import { Container, Typography,Box } from '@mui/material';
import { fetchCFStats } from './api/codeforces';
import { fetchGitHubStats } from './api/github';
import { fetchXPData } from './api/xp';
import { fetchLocalGPTStatus } from './api/gpt_status';
import quotes from './data/quotes';
import WeeklyXPTracker from './components/WeeklyXPTracker';

import CFStats from './components/CFStats';
import GitHubStats from './components/GitHubStats';
import XPTracker from './components/XPTracker';
import Quote from './components/Quote';
import GPTStatus from './components/GPTStatus';

export default function App() {
  const [cfData, setCfData] = useState(null);
  const [ghData, setGhData] = useState(null);
  const [xpData, setXpData] = useState(null);
  const [quote, setQuote] = useState('');
  const [gptStatus, setGptStatus] = useState({ online: false, model: '' });

  useEffect(() => {
    fetchCFStats('_Sorcerer_').then(setCfData);
    fetchGitHubStats('Sorcerer-lab').then(setGhData);
  }, []);

  useEffect(() => {
    const loadXP = async () => {
      const data = await fetchXPData();
      setXpData(data);
    };

    loadXP();
    const interval = setInterval(loadXP, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAndUpdate = () => {
      fetchLocalGPTStatus().then(status => setGptStatus(status));
    };
    fetchAndUpdate();
    const interval = setInterval(fetchAndUpdate, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
    const interval = setInterval(() => {
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(random);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: 'Orbitron, sans-serif',
          color: '#00ffff',
          textShadow: '0 0 10px #00ffff99',
          mb: 4,
          textAlign: 'center'
        }}
      >
        Welcome, Sorcerer
      </Typography>

  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', mb: 4 }}>
    <CFStats data={cfData} />
    <GitHubStats data={ghData} />
    </Box>
      
      <XPTracker data={xpData} />
      <WeeklyXPTracker />

      <Quote quote={quote} />
      <GPTStatus status={gptStatus} />
    </Container>
  );
}
