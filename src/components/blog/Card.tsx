'use client';

import Link from 'next/link';

export interface Blog {
	description: string;
	link?: string;
	name: string;
	skills: string[];
	year: string;
}

export default function Card({ description, link, name, skills, year }: Blog) {
	return (
		<div className='w-full h-fit flex flex-row items-stretch gap-6 group'>
			<div className='flex flex-col'>
				<span className='font-sora text-white/70 font-medium group-hover:scale-[1.05] transition-all duration-500 ease-out'>
					{year}
				</span>
			</div>
			<div className='flex flex-col items-start gap-1'>
				<Link
					className='font-sora font-medium cursor-pointer group-hover:scale-[1.05] transition-all duration-500 ease-out'
					href={link ?? '/'}
				>
					{name} —
				</Link>
				<p className='font-reddit-sans text-sm text-white/85'>{description}</p>
				<div className='flex flex-wrap items-center gap-2 pt-1'>
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
		</div>
	);
}
