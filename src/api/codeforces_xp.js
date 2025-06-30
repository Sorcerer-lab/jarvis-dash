// api/codeforces_xp.js
import axios from 'axios';

export const fetchCodeforcesXP= async (handle) => {
  try {
    const [userRes, submissionsRes, contestsRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${handle}`),
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}`),
      axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`)
    ]);
  
    const user = userRes.data?.result?.[0];
    const submissions = submissionsRes.data.result;
    const contests = contestsRes.data.result;

  

    // --- Submissions XP done---
   const today = new Date();
   const uniquePractice = new Set();
        const uniqueContest = new Set();

        let submissionXP = 0;
        let contestSubXP = 0;

        for (const sub of submissions) {
          const subDate = new Date(sub.creationTimeSeconds * 1000);
          const isToday =
            subDate.getFullYear() === today.getFullYear() &&
            subDate.getMonth() === today.getMonth() &&
            subDate.getDate() === today.getDate();

          if (!isToday || sub.verdict !== 'OK') continue;

          const problemId = `${sub.problem.contestId}-${sub.problem.index}`;

          if (sub.author.participantType === 'PRACTICE') {
            if (!uniquePractice.has(problemId)) {
              uniquePractice.add(problemId);
              submissionXP += 5;
            }
          } else if (
            ['CONTESTANT', 'VIRTUAL', 'OUT_OF_COMPETITION'].includes(sub.author.participantType)

           ) {
            if (!uniqueContest.has(problemId)) {
              uniqueContest.add(problemId);
              contestSubXP += 10;
            }
          }
        }
    
        const participatedToday = contests.filter(ratingChange => {
          const date = new Date(ratingChange.ratingUpdateTimeSeconds * 1000);
          return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          );
        });

        const contestParticipationXP = participatedToday.length * 30;
    // --- Upcoming Contests ---
   const allContests = await axios.get('https://codeforces.com/api/contest.list');

const upcoming = allContests.data.result
  .filter(c => c.phase === 'BEFORE')
  .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds); // Sort by soonest first

const nextContest = upcoming.length > 0 ? upcoming[0] : null;

console.log("Calculated Submission XP:", submissionXP);
console.log("🔍 User Data:", user);
console.log("📄 Submissions:", submissions.slice(0, 5)); // just first 5
console.log("📊 Contests:", contests);
console.log("⏳ Upcoming Contests:", upcoming.slice(0, 3));
for (const sub of submissions.slice(0, 10)) {
  console.log({
    verdict: sub.verdict,
    participantType: sub.author?.participantType,
    problemId: `${sub.problem.contestId}-${sub.problem.index}`
  });
}
 const totalXP= submissionXP+
      contestSubXP+
      contestParticipationXP;

    return {
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
