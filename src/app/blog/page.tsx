'use client';

import { Rss } from 'lucide-react';
import { motion, type Variants } from 'motion/react';

import Card from '@/components/blog/Card';
import { Icon } from '@/components/shared/Icon';
import { blogList } from '@/constants/constants';
import { useLoaderDone } from '@/libs/loader';

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' }, y: 0 },
};

export default function Page() {
	const loaderDone = useLoaderDone();

	return (
		<main className='pb-16'>
			<motion.section initial='hidden' variants={sectionVariants} viewport={{ amount: 0.1, once: true }} whileInView={loaderDone ? 'visible' : undefined}>
				<ul className='flex flex-col'>
					{blogList.map((post, idx) => (
						<li className='py-6 border-b border-border-subtle last:border-b-0' key={idx}>
							<Card description={post.description} link={post.link} name={post.name} skills={post.skills} year={post.year} />
						</li>
					))}
				</ul>
				<p className='mt-12'>
					<a className='inline-flex items-center gap-2 font-mono text-xs text-tertiary hover:text-foreground/70 transition-colors duration-300 ease-out' href='/blog/rss.xml'>
						<Icon aria-hidden='true' icon={Rss} size='sm' />
						Subscribe via RSS
					</a>
				</p>
			</motion.section>
		</main>
	);
}
