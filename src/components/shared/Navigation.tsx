'use client';

import { motion, type Variants } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationsPaths } from '@/constants/constants';
import { cn } from '@/libs/cn';

const variants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6, ease: 'easeOut' }, y: 0 },
};

export default function Navigation() {
	const pathname = usePathname();
	return (
		<motion.div
			animate='visible'
			className='fixed z-50 inset-x bottom-5 bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-md rounded-full w-fit self-center h-fit'
			initial='hidden'
			variants={variants}
		>
			<div className='flex flex-row items-center py-1.5 px-1.5 gap-1'>
				{navigationsPaths.map(item => {
					const active = pathname === item.slug;
					return (
						<Link
							className={cn(
								'relative font-sora font-medium text-sm leading-7 px-3.5 py-1 rounded-full cursor-pointer transition-colors duration-300 ease-out text-white/55 hover:text-white',
								active && 'text-white bg-white/[0.06]'
							)}
							href={item.slug}
							key={item.slug}
						>
							{item.name}
							{active && <span className='absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[3px] w-[3px] rounded-full' style={{ background: 'var(--accent)' }} />}
						</Link>
					);
				})}
			</div>
		</motion.div>
	);
}
