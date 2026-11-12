'use client';

import { motion, type Variants } from 'motion/react';

import { useLoaderDone } from '@/libs/loader';

const variants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: (delay: number) => ({ opacity: 1, transition: { delay, duration: 0.7, ease: 'easeOut' }, y: 0 }),
};

export default function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
	const loaderDone = useLoaderDone();
	return (
		<motion.section animate={loaderDone ? 'visible' : 'hidden'} className={className} custom={delay} initial='hidden' variants={variants}>
			{children}
		</motion.section>
	);
}
