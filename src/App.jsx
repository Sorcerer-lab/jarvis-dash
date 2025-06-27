import React, { useEffect, useState } from 'react';
import { fetchCFStats } from './api/codeforces';
import { fetchGitHubStats } from './api/github';
import { fetchXPData } from './api/xp';
import quotes from './data/quotes';
import { fetchLocalGPTStatus } from './api/gpt_status';

function App() {
  const [cfData, setCfData] = useState(null);
const [ghData, setGhData] = useState(null);
const [xpData, setXpData] = useState(null);
const [quote, setQuote] = useState('');
const [gptStatus, setGptStatus] = useState({ online: false, model: '' });

useEffect(() => {
  fetchLocalGPTStatus().then(setGptStatus);
}, []);
useEffect(() => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  setQuote(random);

  // Optional auto-refresh every 60s
  const interval = setInterval(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, 60000);

  return () => clearInterval(interval);
}, []);


useEffect(() => {
  const loadXP = async () => {
    const data = await fetchXPData();
    setXpData(data);
  };

  loadXP(); // Initial fetch

  const interval = setInterval(() => {
    loadXP(); // Auto-refresh every 5 minutes (300,000 ms)
  }, 300000);

  return () => clearInterval(interval); // Cleanup on unmount
}, []);

  useEffect(() => {
    fetchCFStats('_Sorcerer_').then(data => setCfData(data));
  }, []);
  

useEffect(() => {
  fetchGitHubStats('Sorcerer-lab').then(data => setGhData(data));
}, []);


  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold">Welcome, Sorcerer</h1>
      <p className="text-lg">JARVIS Dashboard Online</p>

      {cfData && (
        <div className="bg-gray-800 p-4 rounded-xl mt-8 shadow-lg text-center">
          <p className="text-xl text-blue-400 font-semibold">Codeforces Stats</p>
          <p className="mt-2">Rating: <span className="text-yellow-300">{cfData.rating}</span></p>
          <p>Rank: {cfData.rank}</p>
          <p>Max Rating: {cfData.maxRating}</p>
          <p>Max Rank: {cfData.maxRank}</p>
        </div>
      )}
      {ghData && (
  <div className="bg-gray-800 p-4 rounded-xl mt-6 shadow-lg text-center">
    <p className="text-xl text-green-400 font-semibold">GitHub Stats</p>
    <p className="mt-2">Username: {ghData.login}</p>
    <p>Public Repos: {ghData.public_repos}</p>
    <p>Followers: {ghData.followers}</p>
  </div>
)}
{xpData && (
  <div className="bg-gray-800 p-4 rounded-xl mt-6 shadow-lg text-center w-2/3">
    <p className="text-xl text-purple-400 font-semibold">XP Tracker</p>
    <p className="mt-2">Today’s XP: {xpData.xp} / {xpData.goal}</p>
    <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
      <div
        className="bg-purple-500 h-4 rounded-full"
        style={{ width: `${(xpData.xp / xpData.goal) * 100}%` }}
      />
    </div>
  </div>
)}
{quote && (
  <div className="bg-gray-800 p-4 rounded-xl mt-6 shadow-lg text-center w-3/4">
    <p className="text-xl text-cyan-400 font-semibold">Quote of the Moment</p>
    <p className="mt-4 italic text-gray-300">"{quote}"</p>
  </div>
)}
<div className="card bg-gray-900 text-white p-4 rounded-xl shadow-md">
  <h2 className="text-lg font-semibold">🧠 Local GPT Status</h2>
  <p>Status: <span className={gptStatus.online ? "text-green-400" : "text-red-500"}>
    {gptStatus.online ? "Online" : "Offline"}
  </span></p>
  <p>Model: <span className="text-blue-300">{gptStatus.model}</span></p>
</div>



    </div>
    
  );
}

export default App;
