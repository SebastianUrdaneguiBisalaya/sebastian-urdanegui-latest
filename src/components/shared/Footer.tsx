'use client';

import { useTheme } from 'next-themes';

import { SwitchTheme, type ThemePreference } from '@/components/shared/SwitchTheme';
import { useMounted } from '@/libs/functions';

export default function Footer() {
	const { setTheme, theme } = useTheme();
	const mounted = useMounted();
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
					<SwitchTheme onValueChange={setTheme} value={(theme ?? 'system') as ThemePreference} />
				) : (
					// Same box as SwitchTheme (3 × 28px options + gaps + padding + border) so the footer doesn't shift once the stored theme is known.
					<div aria-hidden='true' className='h-[34px] w-[94px] rounded-full border border-border' />
				)}
			</div>
		</footer>
	);
}
