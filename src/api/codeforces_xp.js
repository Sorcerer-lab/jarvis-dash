// api/codeforces_xp.js
import axios from 'axios';

export const fetchCodeforcesXP= async (handle) => {
  try {
    const [userRes, submissionsRes, contestsRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${handle}`),
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}`),
      axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`)
    ]);

    const user = userRes.data.result[0];
    const submissions = submissionsRes.data.result;
    const contests = contestsRes.data.result;

    // --- Rank XP ---
    const rank = user.rank || 'newbie';
    const rankXPMap = {
      newbie: 10, pupil: 20, specialist: 30,
      expert: 50, candidate_master: 70, master: 100,
      international_master: 120, grandmaster: 150
    };
    const rankXP = rankXPMap[rank] || 5;

    // --- Submissions XP ---
    const totalSubmissions = submissions.length;
    const submissionXP = totalSubmissions * 1;

    // --- Contest Submissions XP ---
    const contestSubXP = submissions.filter(sub => sub.author.participantType === 'CONTESTANT').length * 2;

    // --- Contest Participation XP ---
    const contestParticipationXP = contests.length * 10;

    const totalXP = rankXP + submissionXP + contestSubXP + contestParticipationXP;

    // --- Upcoming Contests ---
    const allContests = await axios.get('https://codeforces.com/api/contest.list');
    const upcoming = allContests.data.result.filter(c => c.phase === 'BEFORE');
    const nextContest = upcoming.length > 0 ? upcoming[0] : null;
    console.log("🔍 User Data:", user);
console.log("📄 Submissions:", submissions.slice(0, 5)); // just first 5
console.log("📊 Contests:", contests);
console.log("⏳ Upcoming Contests:", upcoming.slice(0, 3));


    return {
      rankXP,
      submissionXP,
      contestSubXP,
      contestParticipationXP,
      totalXP,
      upcomingContest: nextContest
        ? {
            name: nextContest.name,
            time: new Date(nextContest.startTimeSeconds * 1000).toLocaleString()
          }
        : null
    };
  } catch (err) {
    console.error('❌ Error fetching Codeforces XP:', err);
    return null;
  }
};
