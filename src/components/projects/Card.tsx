'use client';

import Link from 'next/link';

export interface Project {
	description: string;
	link?: string;
	name: string;
	skills: string[];
	year: string;
}

export default function Card({ description, link, name, skills, year }: Project) {
	return (
		<Link className='w-full h-fit flex flex-col sm:flex-row items-start gap-1.5 sm:gap-6 group' href={link ?? '/'} rel='noopener noreferrer' target='_blank'>
			<span className='font-mono text-xs text-tertiary shrink-0 sm:w-[64px] sm:pt-0.5'>{year}</span>
			<div className='flex flex-col items-start gap-1.5 min-w-0'>
				<h3 className='font-sora text-[15px] font-medium text-foreground group-hover:text-accent transition-colors duration-300 ease-out'>{name}</h3>
				<p className='font-reddit-sans text-sm leading-6 text-foreground/65'>{description}</p>
				<div className='flex flex-wrap items-center gap-x-3 gap-y-1 pt-1'>
					{skills.map((item, idx) => (
						<span className='font-mono text-xs text-tertiary' key={idx}>
							{item}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
}
