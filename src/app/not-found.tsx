'use client';

import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='grow flex flex-col items-start justify-center gap-4'>
			<span className='font-mono text-xs text-tertiary'>404</span>
			<p className='font-sora text-lg text-foreground'>This page doesn&apos;t exist.</p>
			<Link className='font-reddit-sans text-sm text-foreground/65 hover:text-accent transition-colors duration-300 ease-out' href='/'>
				Back to the home page
			</Link>
		</div>
	);
}
