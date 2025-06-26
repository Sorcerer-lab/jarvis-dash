import React, { useEffect, useState } from 'react';
import { fetchCFStats } from './api/codeforces';
import { fetchGitHubStats } from './api/github';
function App() {
  const [cfData, setCfData] = useState(null);
const [ghData, setGhData] = useState(null);
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

    </div>
  );
}

export default App;
