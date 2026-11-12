import 'server-only';

const GITHUB_USERNAME = 'SebastianUrdaneguiBisalaya';
const REVALIDATE_SECONDS = 3600;

export type ContributionLevel = 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';

export interface ContributionDay {
	contributionCount: number;
	contributionLevel: ContributionLevel;
	date: string;
}

export interface ContributionCalendar {
	totalContributions: number;
	weeks: { contributionDays: ContributionDay[] }[];
}

export interface Commit {
	date: string;
	message: string;
	repo: string;
	repoUrl: string;
	sha: string;
	url: string;
}

function authHeaders(): HeadersInit {
	const token = process.env.GITHUB_TOKEN;
	return {
		Accept: 'application/vnd.github+json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
		'X-GitHub-Api-Version': '2022-11-28',
	};
}

export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
	if (!process.env.GITHUB_TOKEN) return null;

	const query = `
		query ($login: String!) {
			user(login: $login) {
				contributionsCollection {
					contributionCalendar {
						totalContributions
						weeks {
							contributionDays { date contributionCount contributionLevel }
						}
					}
				}
			}
		}
	`;

	try {
		const response = await fetch('https://api.github.com/graphql', {
			body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
			headers: { ...authHeaders(), 'Content-Type': 'application/json' },
			method: 'POST',
			next: { revalidate: REVALIDATE_SECONDS },
		});
		if (!response.ok) return null;
		const json = await response.json();
		return json?.data?.user?.contributionsCollection?.contributionCalendar ?? null;
	} catch {
		return null;
	}
}

interface SearchCommitItem {
	commit: { author: { date: string }; message: string };
	html_url: string;
	repository: { html_url: string; name: string };
	sha: string;
}

export async function getRecentCommits(limit = 30): Promise<Commit[]> {
	const params = new URLSearchParams({
		order: 'desc',
		per_page: String(limit),
		q: `author:${GITHUB_USERNAME}`,
		sort: 'author-date',
	});

	try {
		const response = await fetch(`https://api.github.com/search/commits?${params}`, {
			headers: authHeaders(),
			next: { revalidate: REVALIDATE_SECONDS },
		});
		if (!response.ok) return [];
		const json: { items?: SearchCommitItem[] } = await response.json();
		return (json.items ?? []).map(item => ({
			date: item.commit.author.date,
			message: item.commit.message,
			repo: item.repository.name,
			repoUrl: item.repository.html_url,
			sha: item.sha,
			url: item.html_url,
		}));
	} catch {
		return [];
	}
}
