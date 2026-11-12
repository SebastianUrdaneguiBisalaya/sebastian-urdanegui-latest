'use client';

import { useEffect, useState } from 'react';

import type { ContributionCalendar, ContributionDay, ContributionLevel } from '@/libs/github';

const levelColor: Record<ContributionLevel, string> = {
	FIRST_QUARTILE: 'color-mix(in oklab, var(--accent) 30%, var(--muted))',
	FOURTH_QUARTILE: 'var(--accent)',
	NONE: 'var(--muted)',
	SECOND_QUARTILE: 'color-mix(in oklab, var(--accent) 55%, var(--muted))',
	THIRD_QUARTILE: 'color-mix(in oklab, var(--accent) 78%, var(--muted))',
};

const legend: ContributionLevel[] = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
const dayFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC', weekday: 'short', year: 'numeric' });

const POPOVER_WIDTH = 200;

interface Hovered {
	day: ContributionDay;
	left: number;
	top: number;
}

export default function ContributionGraph({ calendar }: { calendar: ContributionCalendar }) {
	const { weeks, totalContributions } = calendar;
	const [hovered, setHovered] = useState<Hovered | null>(null);

	useEffect(() => {
		if (!hovered) return;
		const close = () => setHovered(null);
		window.addEventListener('scroll', close, { passive: true });
		window.addEventListener('resize', close);
		return () => {
			window.removeEventListener('scroll', close);
			window.removeEventListener('resize', close);
		};
	}, [hovered]);

	const show = (day: ContributionDay, target: HTMLElement) => {
		const rect = target.getBoundingClientRect();
		const half = POPOVER_WIDTH / 2;
		const center = rect.left + rect.width / 2;
		const left = Math.min(Math.max(center, half + 8), window.innerWidth - half - 8);
		setHovered({ day, left, top: rect.top });
	};

	const monthLabels = weeks.map((week, idx) => {
		const first = week.contributionDays[0];
		if (!first) return '';
		const month = monthFormatter.format(new Date(first.date));
		const prev = weeks[idx - 1]?.contributionDays[0];
		return !prev || monthFormatter.format(new Date(prev.date)) !== month ? month : '';
	});

	return (
		<div className='flex flex-col gap-3'>
			<p className='font-mono text-xs text-tertiary'>
				<span className='text-foreground'>{totalContributions.toLocaleString('en-US')}</span> contributions in the last year
			</p>
			<div className='overflow-x-auto pb-1' data-lenis-prevent onScroll={() => setHovered(null)}>
				<div className='inline-flex flex-col gap-1.5 min-w-max'>
					<div className='flex flex-row gap-0.75'>
						{monthLabels.map((label, idx) => (
							<span className='w-2.5 font-mono text-[10px] leading-none text-tertiary overflow-visible whitespace-nowrap' key={idx}>
								{label}
							</span>
						))}
					</div>
					<div className='flex flex-row gap-0.75' onMouseLeave={() => setHovered(null)}>
						{weeks.map((week, weekIdx) => (
							<div className='flex flex-col gap-0.75' key={weekIdx}>
								{week.contributionDays.map(day => (
									<button
										aria-label={`${day.contributionCount} contributions on ${dayFormatter.format(new Date(day.date))}`}
										className='size-2.5 rounded-[2px] outline outline-foreground/5 -outline-offset-1 cursor-pointer transition-transform duration-150 hover:scale-125 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1'
										key={day.date}
										onBlur={() => setHovered(null)}
										onClick={event => show(day, event.currentTarget)}
										onFocus={event => show(day, event.currentTarget)}
										onMouseEnter={event => show(day, event.currentTarget)}
										style={{ background: levelColor[day.contributionLevel] }}
										type='button'
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='flex flex-row items-center justify-end gap-1 font-mono text-[10px] text-tertiary'>
				<span className='mr-1'>Less</span>
				{legend.map(level => (
					<span className='size-2.5 rounded-[2px]' key={level} style={{ background: levelColor[level] }} />
				))}
				<span className='ml-1'>More</span>
			</div>

			{hovered && (
				<div
					className='fixed z-60 pointer-events-none -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-lg px-3 py-2 flex flex-col gap-2 animate-fade-scale-in origin-bottom'
					role='tooltip'
					style={{ left: hovered.left, top: hovered.top - 8, width: POPOVER_WIDTH }}
				>
					<div className='flex flex-row items-baseline justify-between gap-2'>
						<span className='font-sora text-xs font-medium text-foreground'>
							{hovered.day.contributionCount} contribution{hovered.day.contributionCount === 1 ? '' : 's'}
						</span>
						<span className='font-mono text-[10px] text-tertiary'>{dayFormatter.format(new Date(hovered.day.date))}</span>
					</div>
				</div>
			)}
		</div>
	);
}
