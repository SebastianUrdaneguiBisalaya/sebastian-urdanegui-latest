import * as React from 'react';

import { cn } from '@/libs/cn';

export interface ChartFigureProps extends Omit<React.ComponentProps<'figure'>, 'title'> {
	/** Credit line at the very bottom. Defaults to the site owner. */
	byline?: React.ReactNode;
	/** What the figure shows and how to read it. Sits under the content. */
	description?: React.ReactNode;
	/** Optional small label at the right of the top bar, e.g. "median · lower is better". */
	meta?: string;
	/** Short name shown in the top bar, e.g. "Layout time vs. events". */
	title: string;
}

/**
 * Bordered card for charts, tables and any figure in a post: a top bar with the title, the
 * content, a description and a byline. Colors and type come from the site tokens, so it
 * matches the Mermaid diagrams and works in light and dark mode.
 */
export function ChartFigure({ title, meta, description, byline = 'By Sebastian Marat Urdanegui Bisalaya', className, children, ...props }: ChartFigureProps) {
	return (
		<figure className={cn('my-8 overflow-hidden rounded-md border border-border bg-background', className)} {...props}>
			<div className='flex items-center justify-between gap-2 border-b border-border px-3 py-1.5'>
				<figcaption className='truncate font-sora text-xs text-muted-foreground'>{title}</figcaption>
				{meta && <span className='shrink-0 font-mono text-[10px] text-tertiary'>{meta}</span>}
			</div>
			<div className='px-2 pt-5 pb-3 sm:px-4'>{children}</div>
			{(description || byline) && (
				<div className='border-t border-border-subtle px-3 py-2.5'>
					{description && <p className='font-reddit-sans text-xs leading-5 text-tertiary'>{description}</p>}
					{byline && <p className={cn('font-mono text-[10px] text-tertiary', description && 'mt-2')}>{byline}</p>}
				</div>
			)}
		</figure>
	);
}
