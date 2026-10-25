'use client';

import { motion, type Variants } from 'motion/react';
import { useState } from 'react';

import Card, { type ProjectCategory, projectCategories } from '@/components/projects/Card';
import { Tag } from '@/components/shared/Tag';
import { projectsList } from '@/constants/constants';
import { cn } from '@/libs/cn';

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' }, y: 0 },
};

type Filter = 'All' | ProjectCategory;

const filters: Filter[] = ['All', ...projectCategories];

const countOf = (filter: Filter) => (filter === 'All' ? projectsList.length : projectsList.filter(project => project.category === filter).length);

export default function Page() {
	const [filter, setFilter] = useState<Filter>('All');
	const visibleProjects = filter === 'All' ? projectsList : projectsList.filter(project => project.category === filter);

	return (
		<main className='pb-16'>
			<motion.section initial='hidden' variants={sectionVariants} viewport={{ amount: 0.1, once: true }} whileInView='visible'>
				<div aria-label='Filter projects' className='flex flex-row flex-wrap items-center gap-2 pb-6 border-b border-border-subtle' role='group'>
					{filters.map(item => {
						const active = filter === item;
						return (
							<button
								aria-pressed={active}
								className='rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
								key={item}
								onClick={() => setFilter(item)}
								type='button'
							>
								<Tag className={cn(!active && 'hover:text-foreground hover:border-border-strong')} color={active ? 'accent' : 'outline'} size='sm'>
									<Tag.Text>{item}</Tag.Text>
									<span className={cn('text-[10px]', active ? 'text-accent/70' : 'text-tertiary')}>{countOf(item)}</span>
								</Tag>
							</button>
						);
					})}
				</div>
				<ul className='flex flex-col'>
					{visibleProjects.map(project => (
						<li className='py-6 border-b border-border-subtle last:border-b-0' key={project.name}>
							<Card description={project.description} link={project.link} name={project.name} skills={project.skills} year={project.year} />
						</li>
					))}
				</ul>
			</motion.section>
		</main>
	);
}
