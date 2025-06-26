import axios from 'axios';

const SHEET_ID = '1z2DeCZQAg1ERdxKhgP3uXj2mU1OiG6qDdDUWTACGcxs';
const API_KEY = 'AIzaSyDgwKakAysYIbENvFpdddFrf9ejQ0SvxMo';
const RANGE = 'Sheet1!A2:B2'; // Assuming your XP & goal are in row 2

export const fetchXPData = async () => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try {
    const res = await axios.get(url);
    const [xp, goal] = res.data.values[0];
    return { xp: Number(xp), goal: Number(goal) };
  } catch (err) {
    console.error("Google Sheets API error:", err);
    return null;
  }
};
