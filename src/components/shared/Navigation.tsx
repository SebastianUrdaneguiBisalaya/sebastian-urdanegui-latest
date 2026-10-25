'use client';

import { motion, type Variants } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationsPaths } from '@/constants/constants';
import { cn } from '@/libs/cn';
import { useLoaderDone } from '@/libs/loader';

const variants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6, ease: 'easeOut' }, y: 0 },
};

export default function Navigation() {
	const pathname = usePathname();
	const loaderDone = useLoaderDone();
	return (
		<motion.div
			animate={loaderDone ? 'visible' : 'hidden'}
			className='fixed z-50 inset-x bottom-5 bg-background/80 border border-border backdrop-blur-md rounded-full w-fit self-center h-fit'
			initial='hidden'
			variants={variants}
		>
			<div className='flex flex-row items-center py-1.5 px-1.5 gap-1'>
				{navigationsPaths.map(item => {
					const active = pathname === item.slug;
					return (
						<Link
							className={cn(
								'relative font-sora font-medium text-sm leading-7 px-3.5 py-1 rounded-full cursor-pointer transition-colors duration-300 ease-out text-foreground/55 hover:text-foreground',
								active && 'text-foreground bg-foreground/6'
							)}
							href={item.slug}
							key={item.slug}
						>
							{item.name}
							{active && <span className='absolute left-1/2 -translate-x-1/2 bottom-0.5 h-0.75 w-0.75 rounded-full' style={{ background: 'var(--accent)' }} />}
						</Link>
					);
				})}
			</div>
		</motion.div>
	);
}
