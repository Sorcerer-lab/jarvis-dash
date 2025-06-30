import React, { useEffect, useState } from 'react';
import { Container, Typography,Box,Card,CardContent,Divider } from '@mui/material';
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
import { fetchCodeforcesXP } from './api/codeforces_xp';
import { fetchGitHubXP } from './api/github_xp';

export default function App() {
  const [ghXpData, setGhXpData] = useState(null);

  const [cfData, setCfData] = useState(null);
  const [ghData, setGhData] = useState(null);
  const [xpData, setXpData] = useState(null);
  const [quote, setQuote] = useState('');
  const [gptStatus, setGptStatus] = useState({ online: false, model: '' });
  const [cfXpData, setCfXpData] = useState(null);

  useEffect(() => {
  const loadXP = async () => {
    const data = await fetchGitHubXP();
    setGhXpData(data);
  };

  loadXP();
  const interval = setInterval(loadXP, 5 * 60 * 1000);
  return () => clearInterval(interval);
}, []);

   useEffect(() => {
  const loadXP = async () => {
    const data = await fetchCodeforcesXP();
    setCfXpData(data);
  };

  loadXP();
  const interval = setInterval(loadXP, 5 * 60 * 1000); // refresh every 5 mins
  return () => clearInterval(interval);
}, []);

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
  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 4, mt: 6 }}>
  {cfXpData && (
    <Card sx={{ backgroundColor: '#121212', color: 'white', minWidth: 300, maxWidth: 400, boxShadow: 6 }}>
      <CardContent>
        <Typography variant="h6" color="cyan" gutterBottom>
          🧮 Codeforces XP Tracker
        </Typography>
        <Divider sx={{ backgroundColor: '#333', mb: 2 }} />
        <Typography>📈 Rank : {xpData.rankXP??0} XP</Typography>
        <Typography>📝 Submissions : {xpData.submissionXP??0} XP</Typography>
        <Typography>⚔️ Contest Submissions : {xpData.contestSubmissionXP??0} XP</Typography>
        <Typography>🎯 Contest Participation : {xpData.contestParticipationXP??0} XP</Typography>
        <Divider sx={{ backgroundColor: '#333', my: 2 }} />
        <Typography variant="body1" color="lightgreen">
          ⭐ Total XP : {xpData.totalXP??0}
        </Typography>
        <Divider sx={{ backgroundColor: '#333', my: 2 }} />
        {cfXpData.upcomingContest ? (
    <Box mt={2}>
      <Typography variant="subtitle1" color="secondary">
        🕒 Upcoming Contest:
      </Typography>
      <Typography>{cfXpData.upcomingContest.name}</Typography>
      <Typography variant="caption">{cfXpData.upcomingContest.time}</Typography>
    </Box>
  ) : (
    <Typography mt={2}>No upcoming contests.</Typography>
  )}
      </CardContent>
    </Card>
  )}

  {ghXpData && (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg text-center w-[350px]">
      <p className="text-xl text-green-400 font-semibold">GitHub XP</p>
      <p className="mt-2">📦 Repositories: {ghXpData.repoXP??0} XP</p>
      <p>🔨 Commits: {ghXpData.commitXP??0} XP</p>
      <p>🚀 PRs: {ghXpData.prXP??0} XP</p>
      <p>🐞 Issues: {ghXpData.issueXP??0} XP</p>
      <p>⭐ Stars: {ghXpData.starXP??0} XP</p>
      <p className="mt-2 text-green-300 font-bold text-lg">Total XP: {ghXpData.total}</p>
    </div>
  )}
</Box>


      <XPTracker data={xpData} />
      <WeeklyXPTracker />

      <Quote quote={quote} />
      <GPTStatus status={gptStatus} />
    </Container>
  );
}
