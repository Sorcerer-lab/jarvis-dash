import axios from 'axios';

const handle = '_Sorcerer_'; // Change if needed
const XP_PER_AC = 5;
const XP_CONTEST_AC = 15;
const XP_CONTEST_PARTICIPATION = 20;
const MAX_RATING_XP = 50;

function isThisWeek(timestamp) {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek;
}

export async function fetchCodeforcesXP() {
  try {
    const [submissionsRes, ratingRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}`),
      axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`),
    ]);

    const submissions = submissionsRes.data.result;
    const ratingChanges = ratingRes.data.result;

    const solvedThisWeek = new Set();
    let contestXP = 0;

    for (const sub of submissions) {
      if (sub.verdict === 'OK' && isThisWeek(sub.creationTimeSeconds)) {
        const problemKey = `${sub.problem.contestId}-${sub.problem.index}`;
        if (!solvedThisWeek.has(problemKey)) {
          solvedThisWeek.add(problemKey);

          if (sub.author.participantType === 'CONTESTANT') {
            contestXP += XP_CONTEST_AC;
          } else {
            contestXP += XP_PER_AC;
          }
        }
      }
    }

    const latestContest = ratingChanges.at(-1);
    let contestParticipationXP = 0;
    let ratingXP = 0;

    if (latestContest && isThisWeek(latestContest.ratingUpdateTimeSeconds)) {
      contestParticipationXP += XP_CONTEST_PARTICIPATION;
      const delta = latestContest.newRating - latestContest.oldRating;
      if (delta > 0) {
        ratingXP += Math.min(Math.floor(delta / 10), MAX_RATING_XP);
      }
    }

    return {
      acXP: solvedThisWeek.size * XP_PER_AC,
      contestXP,
      contestParticipationXP,
      ratingXP,
      total:
        solvedThisWeek.size * XP_PER_AC +
        contestXP +
        contestParticipationXP +
        ratingXP,
    };
  } catch (err) {
    console.error('❌ Error fetching Codeforces XP:', err);
    return { total: 0 };
  }
}
