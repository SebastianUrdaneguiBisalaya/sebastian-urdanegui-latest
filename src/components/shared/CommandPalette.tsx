'use client';

import { useHotkeys } from '@usehotkeys/react';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { blogList, navigationsPaths, projectsList } from '@/constants/constants';
import { cn } from '@/libs/cn';

import Kbd from './Kbd';

const TOGGLE_EVENT = 'command-palette:toggle';

/** Keys for the open shortcut. `null` until mounted, so server and client markup match. */
function useShortcutKeys() {
	const [keys, setKeys] = useState<string[] | null>(null);

	useEffect(() => {
		const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
		setKeys(isMac ? ['⌘', 'K'] : ['Ctrl', 'K']);
	}, []);

	return keys;
}

/** Visible hint that opens the palette. Pairs with the ⌘K / Ctrl K shortcut. */
export function CommandPaletteTrigger({ className }: { className?: string }) {
	const keys = useShortcutKeys();

	return (
		<button
			className={cn('flex items-center gap-2 font-mono text-xs text-foreground/60 hover:text-foreground transition-colors duration-300 ease-out cursor-pointer', className)}
			onClick={() => window.dispatchEvent(new Event(TOGGLE_EVENT))}
			type='button'
		>
			<SearchIcon aria-hidden='true' className='size-3.5' />
			<span>Search</span>
			{keys && (
				<span aria-hidden='true' className='hidden items-center gap-1 sm:flex'>
					{keys.map(key => (
						<Kbd key={key}>{key}</Kbd>
					))}
				</span>
			)}
		</button>
	);
}

export default function CommandPalette() {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	// `mod` is ⌘ on macOS and Ctrl elsewhere.
	useHotkeys('mod+k', () => setOpen(prev => !prev), { label: 'Open command palette' });

	useEffect(() => {
		const toggle = () => setOpen(prev => !prev);
		window.addEventListener(TOGGLE_EVENT, toggle);
		return () => window.removeEventListener(TOGGLE_EVENT, toggle);
	}, []);

	const go = (href: string) => {
		setOpen(false);
		if (href.startsWith('http') || href.startsWith('mailto:')) {
			window.open(href, '_blank', 'noopener,noreferrer');
			return;
		}
		router.push(href);
	};

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder='Type a command or search...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Pages'>
					{navigationsPaths.map(page => (
						<CommandItem key={page.slug} onSelect={() => go(page.slug)} value={`page ${page.name}`}>
							{page.name}
						</CommandItem>
					))}
				</CommandGroup>
				<CommandGroup heading='Projects'>
					{projectsList.map(project => (
						<CommandItem key={project.name} onSelect={() => go(project.link ?? '/projects')} value={`project ${project.name} ${project.skills.join(' ')}`}>
							{project.name}
						</CommandItem>
					))}
				</CommandGroup>
				<CommandGroup heading='Blog'>
					{blogList.map(post => (
						<CommandItem key={post.link} onSelect={() => go(post.link ?? '/blog')} value={`blog ${post.name} ${post.skills.join(' ')}`}>
							{post.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
			<div className='flex items-center gap-4 border-t border-border px-3 py-2 font-mono text-[11px] text-tertiary'>
				<span className='flex items-center gap-1.5'>
					<Kbd>↑</Kbd>
					<Kbd>↓</Kbd>
					navigate
				</span>
				<span className='flex items-center gap-1.5'>
					<Kbd>↵</Kbd>
					open
				</span>
				<span className='ml-auto flex items-center gap-1.5'>
					<Kbd>Esc</Kbd>
					close
				</span>
			</div>
		</CommandDialog>
	);
}
