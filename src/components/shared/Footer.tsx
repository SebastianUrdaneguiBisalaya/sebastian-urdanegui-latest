'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { flushSync } from 'react-dom';

import { SwitchTheme, type ThemePreference } from '@/components/shared/SwitchTheme';
import { useMounted } from '@/libs/functions';

const TRANSITION_DURATION_MS = 750;

export default function Footer() {
	const { setTheme, theme } = useTheme();
	const mounted = useMounted();
	const toggleRef = React.useRef<HTMLDivElement>(null);
	const origin = React.useRef<{ x: number; y: number } | null>(null);

	// Expanding-circle reveal via the View Transitions API; falls back to an instant switch where unsupported or with reduced motion.
	const handleThemeChange = (next: ThemePreference) => {
		if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setTheme(next);
			return;
		}
		const rect = toggleRef.current?.getBoundingClientRect();
		const x = origin.current?.x ?? (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
		const y = origin.current?.y ?? (rect ? rect.top + rect.height / 2 : window.innerHeight);
		const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
		const transition = document.startViewTransition(() => {
			flushSync(() => setTheme(next));
		});
		transition.ready.then(() => {
			document.documentElement.animate(
				{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
				{ duration: TRANSITION_DURATION_MS, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
			);
		});
	};
	return (
		<footer className='w-full flex flex-row items-center justify-between gap-4 py-6 mt-4 border-t border-border'>
			<span className='font-mono text-xs text-tertiary'>Sebastian Urdanegui — Lima, PE</span>
			<div className='flex flex-row items-center gap-4'>
				<a
					className='font-mono text-xs text-tertiary hover:text-foreground/70 transition-colors duration-300 ease-out'
					href='https://github.com/SebastianUrdaneguiBisalaya'
					rel='noopener noreferrer'
					target='_blank'
				>
					Source
				</a>
				{mounted ? (
					<div
						onPointerDownCapture={event => {
							origin.current = { x: event.clientX, y: event.clientY };
						}}
						onKeyDownCapture={() => {
							origin.current = null;
						}}
						ref={toggleRef}
					>
						<SwitchTheme onValueChange={handleThemeChange} value={(theme ?? 'system') as ThemePreference} />
					</div>
				) : (
					// Same box as SwitchTheme (3 × 28px options + gaps + padding + border) so the footer doesn't shift once the stored theme is known.
					<div aria-hidden='true' className='h-[34px] w-[94px] rounded-full border border-border' />
				)}
			</div>
		</footer>
	);
}
