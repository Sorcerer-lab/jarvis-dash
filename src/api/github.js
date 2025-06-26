import axios from 'axios';

export const fetchGitHubStats = async (username) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return res.data;
  } catch (err) {
    console.error("GitHub API error:", err);
    return null;
  }
};
