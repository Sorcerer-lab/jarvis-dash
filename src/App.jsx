import React, { useEffect, useState } from 'react';
import { fetchCFStats } from './api/codeforces';
import { fetchGitHubStats } from './api/github';
import { fetchXPData } from './api/xp';

function App() {
  const [cfData, setCfData] = useState(null);
const [ghData, setGhData] = useState(null);
const [xpData, setXpData] = useState(null);

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


    </div>
  );
}

export default App;
