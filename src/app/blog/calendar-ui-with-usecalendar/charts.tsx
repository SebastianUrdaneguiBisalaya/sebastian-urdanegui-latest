'use client';

import { Tabs } from 'radix-ui';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/libs/cn';

import baseline from './benchmarks/baseline-085ac34.json';
import latest from './benchmarks/latest-dd49e96.json';
import memoized from './benchmarks/memoized-87c7e84.json';

type Run = typeof latest;
type ScenarioId = 'week-layout' | 'month-layout' | 'drag-step' | 'focus-100-moves' | 'mount-week' | 'move-one-event' | 'next-week' | 'mount-month';

const FRAME_MS = latest.settings.frameMs;

const ms = (value: number) => (value < 1 ? `${value.toFixed(2)} ms` : value < 10 ? `${value.toFixed(1)} ms` : `${Math.round(value)} ms`);

const scenarioOf = (run: Run, id: ScenarioId) => {
	const scenario = run.scenarios.find(item => item.id === id);
	if (!scenario) throw new Error(`Unknown benchmark scenario: ${id}`);
	return scenario;
};

/** Median per event count for each scenario, one row per count: `{ events: '500', 'week-layout': 3.57, ... }`. */
function bySize(run: Run, ids: readonly ScenarioId[]) {
	return run.settings.sizes.map(events => {
		const row: Record<string, number | string> = { events: String(events) };
		for (const id of ids) {
			const result = scenarioOf(run, id).results.find(item => item.events === events);
			if (result) row[id] = result.median;
		}
		return row;
	});
}

/** Same frame as the post's Mermaid diagrams: bordered card, small title bar, optional caption. */
function Frame({ title, caption, children }: { title: string; caption?: string; children: React.ReactNode }) {
	return (
		<figure className='my-8 overflow-hidden rounded-md border border-border bg-background'>
			<div className='flex items-center justify-between gap-2 border-b border-border px-3 py-1.5'>
				<span className='truncate font-sora text-xs text-muted-foreground'>{title}</span>
				<span className='shrink-0 font-mono text-[10px] text-tertiary'>median · lower is better</span>
			</div>
			<div className='px-2 pt-5 pb-3 sm:px-4'>{children}</div>
			{caption && <figcaption className='border-t border-border-subtle px-3 py-2 font-reddit-sans text-xs leading-5 text-tertiary'>{caption}</figcaption>}
		</figure>
	);
}

const frameLine = (
	<ReferenceLine
		ifOverflow='extendDomain'
		label={{ fill: 'var(--destructive)', fontSize: 10, position: 'insideTopLeft', value: '60 Hz frame · 16.7 ms' }}
		stroke='var(--destructive)'
		strokeDasharray='4 4'
		y={FRAME_MS}
	/>
);

const axes = (
	<>
		<CartesianGrid vertical={false} />
		<XAxis axisLine={false} dataKey='events' tickLine={false} tickMargin={8} />
		<YAxis axisLine={false} tickFormatter={(value: number) => `${value}`} tickLine={false} tickMargin={4} width={36} />
	</>
);

const tooltip = <ChartTooltip content={<ChartTooltipContent labelFormatter={label => `${label} events`} valueFormatter={ms} />} />;
const legend = <ChartLegend content={<ChartLegendContent />} />;

/** Three strokes that stay distinct in a monochrome palette: solid ink, dashed secondary, dotted tertiary. */
const strokes = [
	{ color: 'var(--ink)', dash: undefined },
	{ color: 'var(--ink-secondary)', dash: '6 4' },
	{ color: 'var(--ink-tertiary)', dash: '2 3' },
] as const;

function ScalingChart({ title, caption, series }: { title: string; caption?: string; series: { id: ScenarioId; label: string }[] }) {
	const config = Object.fromEntries(series.map(({ id, label }, index) => [id, { color: strokes[index].color, label }])) satisfies ChartConfig;
	const data = bySize(
		latest,
		series.map(item => item.id)
	);

	return (
		<Frame caption={caption} title={title}>
			<ChartContainer className='aspect-auto h-64 w-full sm:h-72' config={config}>
				<LineChart accessibilityLayer data={data} margin={{ left: 0, right: 8, top: 8 }}>
					{axes}
					{tooltip}
					{frameLine}
					{series.map(({ id }, index) => (
						<Line dataKey={id} dot={{ fill: 'var(--background)', r: 2.5 }} key={id} stroke={`var(--color-${id})`} strokeDasharray={strokes[index].dash} strokeWidth={1.5} type='monotone' />
					))}
					{legend}
				</LineChart>
			</ChartContainer>
		</Frame>
	);
}

/** Week and month layout math (`@usecalendar/core`) against the number of events. */
export function CoreScalingChart() {
	return (
		<ScalingChart
			caption='Wall-clock time of the layout math each view runs per render. Below the dashed line the work fits inside one 60 Hz frame.'
			series={[
				{ id: 'week-layout', label: 'Week layout' },
				{ id: 'month-layout', label: 'Month layout' },
			]}
			title='@usecalendar/core · layout time (ms) vs. events'
		/>
	);
}

/** React commit times (`<Profiler>`, development build in jsdom) against the number of events. */
export function ReactScalingChart() {
	return (
		<ScalingChart
			caption='React commit time from <Profiler>, development build in jsdom. Read it as a trend: a production build in a real browser is faster.'
			series={[
				{ id: 'move-one-event', label: 'Move one event' },
				{ id: 'mount-month', label: 'Mount month view' },
				{ id: 'mount-week', label: 'Mount week view' },
			]}
			title='@usecalendar/react · commit time (ms) vs. events'
		/>
	);
}

const beforeAfterConfig = {
	after: { color: 'var(--ink)', label: 'After #41 (87c7e84)' },
	before: { color: 'var(--ink-tertiary)', label: 'Before (085ac34)' },
} satisfies ChartConfig;

/** Medians of one scenario before and after the memoization PR, plus the speedup at the largest shared count up to 1,000 events. */
function beforeAfterData(scenario: ScenarioId) {
	const after = scenarioOf(memoized, scenario).results;
	const data = scenarioOf(baseline, scenario).results.map((result, index) => ({
		after: after[index]?.median ?? 0,
		before: result.median,
		events: String(result.events),
	}));
	const reference = data.find(row => row.events === '1000') ?? data[data.length - 1];
	return { data, reference, speedup: reference.before / reference.after };
}

/** Before vs. after the memoization PR, one tab per scenario. Tabs are Radix primitives, so arrows and Home/End move between them. */
export function BeforeAfterChart({ title, scenarios }: { title: string; scenarios: { id: ScenarioId; label: string }[] }) {
	const [first] = scenarios;
	if (!first) return null;

	return (
		<Frame caption='Same machine, same fixtures, two commits apart. The speedup is measured at 1,000 events.' title={title}>
			<Tabs.Root defaultValue={first.id}>
				<Tabs.List aria-label='Scenario' className='mb-4 ml-2 inline-flex rounded-md border border-border p-0.5 sm:ml-0'>
					{scenarios.map(({ id, label }) => (
						<Tabs.Trigger
							className={cn(
								'cursor-pointer rounded-sm px-2.5 py-1 font-mono text-[11px] text-tertiary transition-colors duration-150 ease-out hover:text-foreground',
								'data-[state=active]:bg-muted data-[state=active]:text-foreground',
								'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
							)}
							key={id}
							value={id}
						>
							{label}
						</Tabs.Trigger>
					))}
				</Tabs.List>
				{scenarios.map(({ id, label }) => {
					const { data, reference, speedup } = beforeAfterData(id);
					return (
						<Tabs.Content className='outline-hidden' key={id} value={id}>
							<p className='mb-3 px-2 font-reddit-sans text-sm text-foreground/80 sm:px-0'>
								<span className='font-sora text-foreground'>{speedup.toFixed(1)}× faster</span>
								<span className='text-tertiary'>
									{' '}
									· {label.toLowerCase()} at {Number(reference.events).toLocaleString('en-US')} events: {ms(reference.before)} → {ms(reference.after)}
								</span>
							</p>
							<ChartContainer className='aspect-auto h-64 w-full sm:h-72' config={beforeAfterConfig}>
								<BarChart accessibilityLayer barGap={2} data={data} margin={{ left: 0, right: 8, top: 8 }}>
									{axes}
									{tooltip}
									{frameLine}
									<Bar dataKey='before' fill='var(--color-before)' radius={[2, 2, 0, 0]} />
									<Bar dataKey='after' fill='var(--color-after)' radius={[2, 2, 0, 0]} />
									{legend}
								</BarChart>
							</ChartContainer>
						</Tabs.Content>
					);
				})}
			</Tabs.Root>
		</Frame>
	);
}

const frameShareConfig = { share: { color: 'var(--ink)', label: 'Share of a 60 Hz frame' } } satisfies ChartConfig;

const frameShareScenarios: { id: ScenarioId; label: string }[] = [
	{ id: 'drag-step', label: 'Drag step' },
	{ id: 'focus-100-moves', label: '100 focus moves' },
	{ id: 'week-layout', label: 'Week layout' },
	{ id: 'month-layout', label: 'Month layout' },
	{ id: 'move-one-event', label: 'Move one event' },
	{ id: 'mount-month', label: 'Mount month' },
	{ id: 'mount-week', label: 'Mount week' },
];

/** `frameShare` of every scenario at one event count, as a percentage of 16.7 ms. */
export function FrameShareChart({ events }: { events: number }) {
	const data = frameShareScenarios.map(({ id, label }) => {
		const results = scenarioOf(latest, id).results;
		const result = results.find(item => item.events === events) ?? results[0];
		return { label, share: Math.round(result.frameShare * 1000) / 10 };
	});

	return (
		<Frame
			caption='drag-step and the focus moves don’t depend on the event count. Anything past 100% would drop at least one frame during an interaction.'
			title={`Share of one frame at ${events} events (%)`}
		>
			<ChartContainer className='aspect-auto h-72 w-full' config={frameShareConfig}>
				<BarChart accessibilityLayer data={data} layout='vertical' margin={{ left: 8, right: 16 }}>
					<CartesianGrid horizontal={false} />
					<XAxis axisLine={false} dataKey='share' tickFormatter={(value: number) => `${value}%`} tickLine={false} type='number' />
					<YAxis axisLine={false} dataKey='label' tickLine={false} type='category' width={104} />
					<ChartTooltip content={<ChartTooltipContent hideLabel valueFormatter={value => `${value}%`} />} />
					<ReferenceLine label={{ fill: 'var(--destructive)', fontSize: 10, position: 'insideBottomRight', value: '100%' }} stroke='var(--destructive)' strokeDasharray='4 4' x={100} />
					<Bar dataKey='share' fill='var(--color-share)' radius={[0, 2, 2, 0]} />
				</BarChart>
			</ChartContainer>
		</Frame>
	);
}

/** Where the numbers come from, read from the run's own `meta` and `settings`. */
export function TestEnvironment({ className }: { className?: string }) {
	const { meta, settings } = latest;
	const date = new Date(meta.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', timeZone: 'UTC', year: 'numeric' });
	const rows: [string, string][] = [
		['Machine', `${meta.cpu.model} · ${meta.cpu.cores} cores · ${meta.memoryGb} GB RAM`],
		['OS', `macOS (Darwin ${meta.os.release}, ${meta.os.arch})`],
		['Runtime', `Node.js ${meta.node}`],
		['Temporal', meta.temporal === 'native' ? 'Native' : 'temporal-polyfill (Node 24 has no native Temporal)'],
		['React', `${meta.react.version}, ${meta.react.build} build, ${meta.react.environment}`],
		['Event counts', settings.sizes.join(', ')],
		['Sampling', `~${settings.core.budgetMs / 1000} s per case · ${settings.core.minSamples}–${settings.core.maxSamples} samples (core), ${settings.react.minSamples}+ (React)`],
		['Run', `${date} · commit ${meta.commit} · ${meta.durationSeconds} s total${meta.dirty ? ' · uncommitted changes' : ''}`],
	];

	return (
		<figure className={cn('my-8 overflow-hidden rounded-md border border-border bg-background', className)}>
			<div className='border-b border-border px-3 py-1.5 font-sora text-xs text-muted-foreground'>Test environment</div>
			<dl className='grid grid-cols-1 gap-x-6 gap-y-2 p-4 sm:grid-cols-[max-content_1fr]'>
				{rows.map(([label, value]) => (
					<div className='contents' key={label}>
						<dt className='font-mono text-[11px] text-tertiary sm:pt-px'>{label}</dt>
						<dd className='mb-2 font-reddit-sans text-sm text-foreground/80 sm:mb-0'>{value}</dd>
					</div>
				))}
			</dl>
		</figure>
	);
}
