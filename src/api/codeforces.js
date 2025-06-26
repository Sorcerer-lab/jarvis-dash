import axios from 'axios';

export const fetchCFStats = async (handle) => {
  try {
    const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    return res.data.result[0]; // returns user object
  } catch (err) {
    console.error("Codeforces API error:", err);
    return null;
  }
};
