import type { Metadata } from 'next';

import CommitList from '@/components/activity/CommitList';
import ContributionGraph from '@/components/activity/ContributionGraph';
import Reveal from '@/components/activity/Reveal';
import { getContributionCalendar, getRecentCommits } from '@/libs/github';

export const revalidate = 3600;

export const metadata: Metadata = {
	description: 'My GitHub contribution graph and latest commits.',
	title: 'Activity | Sebastian Urdanegui',
};

export default async function Page() {
	const [calendar, commits] = await Promise.all([getContributionCalendar(), getRecentCommits(30)]);

	return (
		<main className='pb-16 flex flex-col gap-10'>
			<Reveal className='flex flex-col gap-4 pb-8 border-b border-border-subtle'>
				<h3 className='font-sora text-[15px] font-medium text-foreground'>Contributions</h3>
				{calendar ? <ContributionGraph calendar={calendar} /> : <p className='font-reddit-sans text-sm text-tertiary'>Contribution graph is unavailable right now.</p>}
			</Reveal>
			<Reveal className='flex flex-col gap-2' delay={0.15}>
				<h3 className='font-sora text-[15px] font-medium text-foreground'>Latest commits</h3>
				<CommitList commits={commits} />
			</Reveal>
		</main>
	);
}
