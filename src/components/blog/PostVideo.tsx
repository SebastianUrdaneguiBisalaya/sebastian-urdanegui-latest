'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Icon } from '@/components/shared/Icon';
import { blogList } from '@/constants/constants';
import { cn } from '@/libs/cn';

/** Pulls the video id out of youtu.be, youtube.com/watch, /embed and /shorts URLs. */
const youtubeId = (url: string) => {
	try {
		const { hostname, pathname, searchParams } = new URL(url);
		if (hostname === 'youtu.be') return pathname.slice(1) || undefined;
		return searchParams.get('v') ?? pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/)?.[1];
	} catch {
		return undefined;
	}
};

/**
 * YouTube video for the current post, taken from `Blog.youtube`. Renders only a thumbnail
 * and a play button; the YouTube iframe (and its scripts and cookies) loads on click.
 */
export default function PostVideo() {
	const pathname = usePathname();
	const [playing, setPlaying] = useState(false);
	const post = blogList.find(item => item.link === pathname);
	const id = post?.youtube ? youtubeId(post.youtube) : undefined;
	if (!post || !id) return null;

	const title = `${post.name} (video)`;

	return (
		<figure className='my-8 overflow-hidden rounded-md border border-border bg-background'>
			<div className='relative aspect-video w-full bg-black'>
				{playing ? (
					<iframe
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowFullScreen
						className='absolute inset-0 h-full w-full'
						referrerPolicy='strict-origin-when-cross-origin'
						src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
						title={title}
					/>
				) : (
					<button aria-label={`Play video: ${post.name}`} className='group absolute inset-0 h-full w-full cursor-pointer' onClick={() => setPlaying(true)} type='button'>
						<Image
							alt=''
							className='object-cover opacity-90 transition-opacity duration-300 ease-out group-hover:opacity-100'
							fill
							sizes='(min-width: 768px) 720px, 100vw'
							src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
						/>
						<span
							className={cn(
								'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-14 items-center justify-center rounded-full',
								'bg-background/85 text-foreground backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none',
								'group-hover:scale-105 group-focus-visible:scale-105'
							)}
						>
							<Icon aria-hidden='true' className='translate-x-px' icon={Play} size='md' />
						</span>
					</button>
				)}
			</div>
		</figure>
	);
}
