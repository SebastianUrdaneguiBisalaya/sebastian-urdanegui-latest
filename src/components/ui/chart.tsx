'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/libs/cn';

/**
 * shadcn/ui chart primitives on top of Recharts. Series colors come from a `ChartConfig`
 * and are exposed as `--color-<key>` on the container, so charts read `var(--color-<key>)`
 * and follow the site's light/dark tokens without hardcoded colors.
 */

export type ChartConfig = Record<
	string,
	{
		label?: React.ReactNode;
		color?: string;
	}
>;

type ChartContextValue = { config: ChartConfig };

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
	const context = React.useContext(ChartContext);
	if (!context) {
		throw new Error('useChart must be used within a <ChartContainer />');
	}
	return context;
}

function ChartContainer({
	id,
	className,
	children,
	config,
	...props
}: React.ComponentProps<'div'> & {
	config: ChartConfig;
	children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}) {
	const uniqueId = React.useId();
	const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`;

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				className={cn(
					'flex aspect-video justify-center font-mono text-[11px]',
					'[&_.recharts-cartesian-axis-tick_text]:fill-tertiary [&_.recharts-cartesian-grid_line]:stroke-border-subtle',
					'[&_.recharts-reference-line_line]:stroke-destructive [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border-strong',
					'[&_.recharts-layer]:outline-hidden [&_.recharts-surface]:outline-hidden',
					className
				)}
				data-chart={chartId}
				data-slot='chart'
				{...props}
			>
				<ChartStyle config={config} id={chartId} />
				<RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
	const entries = Object.entries(config).filter(([, item]) => item.color);
	if (!entries.length) return null;

	return <style>{`[data-chart=${id}] {\n${entries.map(([key, item]) => `  --color-${key}: ${item.color};`).join('\n')}\n}`}</style>;
}

const ChartTooltip = RechartsPrimitive.Tooltip;

interface TooltipItem {
	color?: string;
	dataKey?: string | number | ((obj: unknown) => unknown);
	name?: string | number;
	payload?: Record<string, unknown>;
	value?: number | string | ReadonlyArray<number | string>;
}

function ChartTooltipContent({
	active,
	payload,
	label,
	className,
	hideLabel = false,
	labelFormatter,
	valueFormatter,
}: {
	active?: boolean;
	payload?: ReadonlyArray<TooltipItem>;
	label?: React.ReactNode;
	className?: string;
	hideLabel?: boolean;
	labelFormatter?: (label: React.ReactNode) => React.ReactNode;
	valueFormatter?: (value: number) => React.ReactNode;
}) {
	const { config } = useChart();
	if (!active || !payload?.length) return null;

	return (
		<div className={cn('grid min-w-36 gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-[11px] shadow-sm', className)}>
			{!hideLabel && <div className='text-foreground'>{labelFormatter ? labelFormatter(label) : label}</div>}
			<div className='grid gap-1'>
				{payload.map(item => {
					const key = String(item.dataKey ?? item.name ?? 'value');
					const itemConfig = config[key];
					const value = typeof item.value === 'number' ? item.value : Number(item.value);
					return (
						<div className='flex items-center gap-2' key={key}>
							<span className='size-2 shrink-0 rounded-[2px]' style={{ background: item.color ?? `var(--color-${key})` }} />
							<span className='flex-1 text-muted-foreground'>{itemConfig?.label ?? item.name}</span>
							<span className='tabular-nums text-foreground'>{Number.isFinite(value) ? (valueFormatter ? valueFormatter(value) : value) : '—'}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({ className, payload }: { className?: string; payload?: ReadonlyArray<{ dataKey?: unknown; value?: unknown; color?: string }> }) {
	const { config } = useChart();
	if (!payload?.length) return null;

	return (
		<div className={cn('flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-3 font-mono text-[11px]', className)}>
			{payload.map(item => {
				const key = String(item.dataKey ?? item.value ?? '');
				return (
					<div className='flex items-center gap-1.5 text-muted-foreground' key={key}>
						<span className='size-2 shrink-0 rounded-[2px]' style={{ background: item.color ?? `var(--color-${key})` }} />
						{config[key]?.label ?? key}
					</div>
				);
			})}
		</div>
	);
}

export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent };
