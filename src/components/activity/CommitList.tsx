import Link from 'next/link';

import type { Commit } from '@/libs/github';
import { limaDateTimeFormatter } from '@/libs/time';

export default function CommitList({ commits }: { commits: Commit[] }) {
	if (commits.length === 0) {
		return <p className='font-reddit-sans text-sm text-tertiary py-6'>No recent commits to show right now.</p>;
	}

	return (
		<ul className='flex flex-col'>
			{commits.map(commit => {
				const [title, ...rest] = commit.message.split('\n');
				const body = rest.join('\n').trim();
				return (
					<li className='py-4 border-b border-border-subtle last:border-b-0' key={commit.sha}>
						<div className='flex flex-col sm:flex-row items-start gap-1.5 sm:gap-6'>
							<div className='flex flex-col gap-0.5 shrink-0 sm:w-32 sm:pt-0.5'>
								<time className='font-mono text-xs text-tertiary' dateTime={commit.date}>
									{limaDateTimeFormatter.format(new Date(commit.date))}
								</time>
								<span className='font-mono text-[10px] text-tertiary/70'>Lima, GMT-5</span>
							</div>
							<div className='flex flex-col items-start gap-1 min-w-0 w-full'>
								<div className='flex flex-row items-center gap-2 font-mono text-xs'>
									<Link className='text-accent hover:underline underline-offset-2' href={commit.repoUrl} rel='noopener noreferrer' target='_blank'>
										{commit.repo}
									</Link>
									<Link className='text-tertiary hover:text-foreground transition-colors' href={commit.url} rel='noopener noreferrer' target='_blank'>
										{commit.sha.slice(0, 7)}
									</Link>
								</div>
								<Link
									className='font-sora text-sm font-medium text-foreground hover:text-accent transition-colors duration-300 ease-out wrap-break-word'
									href={commit.url}
									rel='noopener noreferrer'
									target='_blank'
								>
									{title}
								</Link>
								{body && <p className='font-reddit-sans text-sm leading-6 text-foreground/65 whitespace-pre-line line-clamp-3 wrap-break-word'>{body}</p>}
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
