import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` // use env variable
};

const GitHubStats = ({ data }) => {
  if (!data) return null;

  return (
    <Card sx={{flex: '1 1 300px',
    maxWidth: 400,
    minWidth: 280,
        borderRadius:4,
     backgroundColor: '#111827',
      color: '#fff', mb: 4,
       border: '1px solid #00ffcc',
       boxShadow: '0 0 20px rgba(0, 255, 166, 0.27)', }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: '#00ffcc', fontWeight: 'bold' }}>
          🧑‍💻 GitHub Stats
        </Typography>
        <Typography mt={2}>Username: <strong>{data.login}</strong></Typography>
        <Typography>Public Repos: {data.public_repos}</Typography>
        <Typography>Followers: {data.followers}</Typography>
      </CardContent>
    </Card>
  );
};

export default GitHubStats;
