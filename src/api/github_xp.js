import axios from 'axios';

const username = 'Sorcerer-lab'; // Change if needed

const XP_PER_COMMIT = 3;
const XP_PER_REPO = 5;
const XP_PER_PR = 10;
const XP_PER_ISSUE = 5;
const XP_PER_STAR = 1;

function isToday(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export async function fetchGitHubXP() {
  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    };

    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers }
    );

    const repos = reposRes.data;
    let totalCommits = 0;
    let totalPRs = 0;
    let totalIssues = 0;
    let totalStars = 0;
    
    const today = new Date();
const todayRepos = repos.filter(repo => {
  if (repo.fork || repo.archived) return false;
  const created = new Date(repo.created_at);
  return (
    created.getFullYear() === today.getFullYear() &&
    created.getMonth() === today.getMonth() &&
    created.getDate() === today.getDate()
  );
});

    for (const repo of repos) {
      // Only check active, non-forked repos
      if (repo.fork || repo.archived) continue;

      // Commits
      const commitsRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}`,
        { headers }
      );
      const todayCommits = commitsRes.data.filter(commit =>
        isToday(commit.commit.author.date)
      );
      totalCommits += todayCommits.length;

      // Issues
      const issuesRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/issues?creator=${username}&state=all`,
        { headers }
      );
      const todayIssues = issuesRes.data.filter(
        issue => isToday(issue.created_at) && !issue.pull_request
      );
      totalIssues += todayIssues.length;

      // PRs
      const prsRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/pulls?state=all`,
        { headers }
      );
      const todayPRs = prsRes.data.filter(
        pr => pr.user.login === username && isToday(pr.created_at)
      );
      totalPRs += todayPRs.length;

      // Stars (stars are total, not per-day — GitHub doesn’t expose star timestamps via public API)
      totalStars += repo.stargazers_count;
    }

   const repoXP = todayRepos.length * XP_PER_REPO;
    const commitXP = totalCommits * XP_PER_COMMIT;
    const prXP = totalPRs * XP_PER_PR;
    const issueXP = totalIssues * XP_PER_ISSUE;
    const starXP = totalStars * XP_PER_STAR;

    return {
      repoXP,
      commitXP,
      prXP,
      issueXP,
      starXP,
      total: repoXP + commitXP + prXP + issueXP + starXP,
    };
  } catch (err) {
    console.error('❌ Error fetching GitHub XP:', err);
    return {
      repoXP: 0,
      commitXP: 0,
      prXP: 0,
      issueXP: 0,
      starXP: 0,
      total: 0,
    };
  }
}
