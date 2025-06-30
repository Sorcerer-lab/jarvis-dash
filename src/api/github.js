import axios from 'axios';
const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` // use env variable
};

export const fetchGitHubStats = async (username) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`,{headers});
    return res.data;
  } catch (err) {
    console.error("GitHub API error:", err);
    return null;
  }
};
