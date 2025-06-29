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
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg text-center w-[350px]">
      <p className="text-xl text-blue-400 font-semibold">Codeforces XP</p>
      <p className="mt-2">Contests: {cfXpData.contestXP} XP</p>
      <p>Submissions: {cfXpData.submissionXP} XP</p>
      <p className="mt-2 text-blue-300 font-bold text-lg">Total XP: {cfXpData.total}</p>
    </div>
  )}

  {ghXpData && (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg text-center w-[350px]">
      <p className="text-xl text-green-400 font-semibold">GitHub XP</p>
      <p className="mt-2">📦 Repositories: {ghXpData.repoXP} XP</p>
      <p>🔨 Commits: {ghXpData.commitXP} XP</p>
      <p>🚀 PRs: {ghXpData.prXP} XP</p>
      <p>🐞 Issues: {ghXpData.issueXP} XP</p>
      <p>⭐ Stars: {ghXpData.starXP} XP</p>
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
