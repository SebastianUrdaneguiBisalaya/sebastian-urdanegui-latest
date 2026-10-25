'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Icon } from '@/components/shared/Icon';
import { cn } from '@/libs/cn';

export const projectCategories = ['Packages', 'Full-stack', 'Data'] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface Project {
	category: ProjectCategory;
	description: string;
	link?: string;
	name: string;
	skills: string[];
	year: string;
}

export default function Card({ description, link, name, skills, year }: Omit<Project, 'category'>) {
	return (
		<Link className='w-full h-fit flex flex-col sm:flex-row items-start gap-1.5 sm:gap-6 group' href={link ?? '/'} rel='noopener noreferrer' target='_blank'>
			<span className='font-mono text-xs text-tertiary shrink-0 sm:w-16 sm:pt-0.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none'>
				{year}
			</span>
			<div className='flex flex-col items-start gap-1.5 min-w-0'>
				<div className='flex flex-row items-center gap-1'>
					<h3 className='font-sora text-[15px] font-medium text-foreground group-hover:text-accent group-focus-visible:text-accent transition-colors duration-300 ease-out'>{name}</h3>
					<Icon
						aria-hidden='true'
						className={cn(
							'text-accent opacity-0 -translate-x-1 translate-y-0.5 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none',
							'group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0'
						)}
						icon={ArrowUpRight}
						size='sm'
					/>
				</div>
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
