import axios from 'axios';

const username = 'Sorcerer-lab'; // Change if needed

const XP_PER_COMMIT = 3;
const XP_PER_REPO = 5;
const XP_PER_PR = 10;
const XP_PER_ISSUE = 5;
const XP_PER_STAR = 1;

function isThisWeek(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek;
}

export async function fetchGitHubXP() {
  try {
    const headers = {
      Accept: 'application/vnd.github+json',
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

    for (const repo of repos) {
      const commitsRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}`,
        { headers }
      );

      const recentCommits = commitsRes.data.filter(commit =>
        isThisWeek(commit.commit.author.date)
      );
      totalCommits += recentCommits.length;

      const issuesRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/issues?creator=${username}&state=all`,
        { headers }
      );
      const recentIssues = issuesRes.data.filter(
        issue => isThisWeek(issue.created_at) && !issue.pull_request
      );
      totalIssues += recentIssues.length;

      const prsRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/pulls?state=all`,
        { headers }
      );
      const recentPRs = prsRes.data.filter(
        pr => pr.user.login === username && isThisWeek(pr.created_at)
      );
      totalPRs += recentPRs.length;

      totalStars += repo.stargazers_count;
    }

    const repoXP = repos.length * XP_PER_REPO;
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
    return { total: 0 };
  }
}
