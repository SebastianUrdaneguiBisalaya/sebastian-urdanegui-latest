'use client';

import { motion, type Variants } from 'motion/react';

import Card from '@/components/projects/Card';
import { projectsList } from '@/constants/constants';

const cardVariants: Variants = {
	hidden: (idx: number) => ({
		opacity: 0,
		x: idx % 2 === 0 ? 60 : -60,
	}),
	visible: (idx: number) => ({
		opacity: 1,
		transition: {
			delay: idx * 0.12,
			duration: 1.2,
			ease: 'easeOut',
		},
		x: 0,
	})
}

export default function Page() {
	return (
		<main className='pb-4 mt-[1.25em] mb-[1.25em]'>
			<div className='flex flex-col items-start w-full gap-6'>
				{projectsList.map((project, idx) => (
					<motion.div
						className='w-full'
						custom={idx + 1}
						initial='hidden'
						key={idx}
						variants={cardVariants}
						viewport={{ amount: 0.3, once: true }}
						whileInView="visible"
					>
						<Card
							description={project.description}
							link={project.link}
							name={project.name}
							skills={project.skills}
							year={project.year}
						/>
					</motion.div>
				))}
			</div>
		</main>
	);
}
