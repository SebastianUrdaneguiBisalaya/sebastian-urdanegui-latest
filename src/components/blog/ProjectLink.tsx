'use client';

import { ArrowUpRight, FolderGit2, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components/shared/Icon';
import { blogList, projectsList } from '@/constants/constants';
import { cn } from '@/libs/cn';

const hostOf = (url: string) => {
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return url;
	}
};

/** Link to the project a post is about, shown above the post. Posts are matched to projects through `Blog.project`. */
export default function ProjectLink() {
	const pathname = usePathname();
	const post = blogList.find(item => item.link === pathname);
	const project = post?.project ? projectsList.find(item => item.name === post.project) : undefined;
	if (!project?.link) return null;

	const host = hostOf(project.link);
	const isRepository = host === 'github.com';

	return (
		<a
			className='group inline-flex items-center gap-2 mb-2 font-mono text-xs text-tertiary hover:text-foreground/70 focus-visible:text-foreground/70 transition-colors duration-300 ease-out'
			href={project.link}
			rel='noopener noreferrer'
			target='_blank'
		>
			<Icon aria-hidden='true' icon={isRepository ? FolderGit2 : Globe} size='sm' />
			<span>
				<span className='text-foreground/70'>{project.name}</span>
				<span aria-hidden='true'> · </span>
				{isRepository ? 'Repository' : host}
			</span>
			<Icon
				aria-hidden='true'
				className={cn(
					'text-accent transition-[translate] duration-300 ease-out motion-reduce:transition-none',
					'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5'
				)}
				icon={ArrowUpRight}
				size='xs'
			/>
		</a>
	);
}
