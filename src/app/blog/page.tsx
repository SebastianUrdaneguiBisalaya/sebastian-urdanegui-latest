'use client';

import { motion, type Variants } from 'motion/react';

import Card from '@/components/blog/Card';
import { blogList } from '@/constants/constants';

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' }, y: 0 },
};

export default function Page() {
	return (
		<main className='pb-16'>
			<motion.section initial='hidden' variants={sectionVariants} viewport={{ amount: 0.1, once: true }} whileInView='visible'>
				<ul className='flex flex-col'>
					{blogList.map((post, idx) => (
						<li className='py-6 border-b border-white/[0.06] last:border-b-0' key={idx}>
							<Card description={post.description} link={post.link} name={post.name} skills={post.skills} year={post.year} />
						</li>
					))}
				</ul>
			</motion.section>
		</main>
	);
}
