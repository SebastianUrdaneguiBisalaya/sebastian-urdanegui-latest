'use client';

import { ArrowLeft, ArrowRight, Check, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/shared/Icon';
import { blogList } from '@/constants/constants';
import { cn } from '@/libs/cn';
import { SITE_URL } from '@/libs/site';

const COPIED_MS = 2000;

function CopyLinkButton({ url }: { url: string }) {
	const [copied, setCopied] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(timeout.current), []);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			return;
		}
		setCopied(true);
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => setCopied(false), COPIED_MS);
	};

	return (
		<button
			className='inline-flex items-center gap-2 font-mono text-xs text-tertiary hover:text-foreground/70 transition-colors duration-300 ease-out cursor-pointer'
			onClick={copy}
			type='button'
		>
			{/* Both icons share one box and cross-fade, so the label never shifts. */}
			<span aria-hidden='true' className='relative inline-flex w-3.5 h-3.5'>
				<Icon className={cn('absolute inset-0 transition-all duration-300 ease-out', copied ? 'opacity-0 scale-50 rotate-[-45deg]' : 'opacity-100 scale-100 rotate-0')} icon={LinkIcon} size='sm' />
				<Icon className={cn('absolute inset-0 text-success transition-all duration-300 ease-out', copied ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45')} icon={Check} size='sm' />
			</span>
			<span aria-live='polite' className={cn('transition-colors duration-300 ease-out', copied && 'text-success')}>
				{copied ? 'Link copied' : 'Copy link'}
			</span>
		</button>
	);
}

function PostLink({ direction, href, name }: { direction: 'previous' | 'next'; href: string; name: string }) {
	const isNext = direction === 'next';
	return (
		<Link
			className={cn('group flex flex-col gap-1.5 py-4 sm:max-w-[45%]', isNext ? 'items-end text-right sm:ml-auto' : 'items-start text-left')}
			href={href}
			rel={isNext ? 'next' : 'prev'}
		>
			<span className='inline-flex items-center gap-1.5 font-mono text-xs text-tertiary'>
				{!isNext && <Icon aria-hidden='true' className='transition-transform duration-300 ease-out group-hover:-translate-x-0.5' icon={ArrowLeft} size='xs' />}
				{isNext ? 'Next' : 'Previous'}
				{isNext && <Icon aria-hidden='true' className='transition-transform duration-300 ease-out group-hover:translate-x-0.5' icon={ArrowRight} size='xs' />}
			</span>
			<span className='font-sora text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300 ease-out'>{name}</span>
		</Link>
	);
}

/** Copy-link button and previous/next navigation, shown only on a post page. Order follows the blog index (`blogList`). */
export default function PostFooter() {
	const pathname = usePathname();
	const index = blogList.findIndex(post => post.link === pathname);
	if (index === -1) return null;

	const previous = blogList[index - 1];
	const next = blogList[index + 1];

	return (
		<footer className='mt-16 flex flex-col gap-6'>
			<CopyLinkButton url={`${SITE_URL}${pathname}`} />
			{(previous || next) && (
				<nav aria-label='More posts' className='flex flex-col sm:flex-row gap-2 sm:gap-6 border-t border-border-subtle'>
					{previous?.link && <PostLink direction='previous' href={previous.link} name={previous.name} />}
					{next?.link && <PostLink direction='next' href={next.link} name={next.name} />}
				</nav>
			)}
		</footer>
	);
}
