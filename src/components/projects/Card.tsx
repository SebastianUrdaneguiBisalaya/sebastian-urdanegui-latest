'use client';

import Link from 'next/link';

export interface Project {
	description: string;
	link?: string;
	name: string;
	skills: string[];
	year: string;
}

export default function Card({
	description,
	link,
	name,
	skills,
	year,
}: Project) {
	return (
		<Link
			className='w-full h-fit flex flex-row items-stretch gap-6 group'
			href={link ?? '/'}
			rel='noopener noreferrer'
			target='_blank'
		>
			<div className='flex flex-col'>
				<span className='font-sora text-white/70 font-medium group-hover:text-white transition-all duration-500 ease-out'>
					{year}
				</span>
			</div>
			<div className='flex flex-col items-start gap-1'>
				<h3
					className='font-sora font-medium text-white cursor-pointer group-hover:scale-[1.07] transition-all duration-500 ease-out'
				>
					{name} —
				</h3>
				<p className='font-reddit-sans text-sm text-white/85'>{description}</p>
				<div className='flex flex-wrap items-center gap-2 pt-2'>
					{skills.map((item, idx) => (
						<span
							className='font-reddit-sans text-xs text-white/80 bg-white/10 rounded-2xl px-2 py-1 whitespace-nowrap'
							key={idx}
						>
							{item}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
}
