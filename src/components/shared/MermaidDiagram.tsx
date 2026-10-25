'use client';

import { Check, Copy, Download } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../libs/cn';
import { Icon } from './Icon';
import { Skeleton } from './Skeleton';

type RGBA = readonly [number, number, number, number];

let tokenCanvas: HTMLCanvasElement | undefined;

/** Reads a CSS custom property off `<html>` and resolves it to RGBA — canvas `fillStyle` round-trips any valid CSS color (including `rgb(0 0 0 / 10%)`) into `#rrggbb` or `rgba(...)`. Mermaid's theme API takes literal colors, not `var(...)` references, so tokens are resolved here instead of hardcoded. */
function resolveToken(name: string): RGBA {
	const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	tokenCanvas ??= document.createElement('canvas');
	const ctx = tokenCanvas.getContext('2d');
	if (!raw || !ctx) return [0, 0, 0, 1];

	ctx.fillStyle = '#000000';
	ctx.fillStyle = raw;
	const normalized = ctx.fillStyle;

	if (normalized.startsWith('#')) {
		const value = Number.parseInt(normalized.slice(1), 16);
		return [(value >> 16) & 255, (value >> 8) & 255, value & 255, 1];
	}
	const match = normalized.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
	if (!match) return [0, 0, 0, 1];
	return [Number(match[1]), Number(match[2]), Number(match[3]), match[4] === undefined ? 1 : Number(match[4])];
}

function toHex([r, g, b]: RGBA): string {
	const channel = (n: number) => Math.round(n).toString(16).padStart(2, '0');
	return `#${channel(r)}${channel(g)}${channel(b)}`;
}

/** Composites `top` over the opaque `bottom` into a solid hex — Mermaid derives shades from its theme colors, so alpha ink (`rgb(0 0 0 / 10%)`) has to be flattened against the canvas first. */
function over(top: RGBA, bottom: RGBA): string {
	const [r, g, b, a] = top;
	return toHex([r * a + bottom[0] * (1 - a), g * a + bottom[1] * (1 - a), b * a + bottom[2] * (1 - a), 1]);
}

function isDarkCanvas([r, g, b]: RGBA): boolean {
	return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
}

/** Maps the design tokens onto Mermaid's `base` theme: neutral ink over the canvas. Re-resolved on every render so a theme switch is picked up. */
function buildThemeVariables() {
	const background = resolveToken('--background');
	const solid = (name: string) => over(resolveToken(name), background);
	const ink = solid('--ink');
	const inkSecondary = solid('--ink-secondary');
	const surface = solid('--muted');
	const border = solid('--border-strong');
	const canvas = toHex(background);
	// next/font defines its variables on <body>, not <html>.
	const fontFamily = getComputedStyle(document.body).getPropertyValue('--font-reddit-sans').trim();

	return {
		actorBkg: surface,
		actorBorder: border,
		actorLineColor: border,
		actorTextColor: ink,
		background: canvas,
		clusterBkg: canvas,
		clusterBorder: border,
		darkMode: isDarkCanvas(background),
		edgeLabelBackground: canvas,
		fontFamily,
		fontSize: '14px',
		labelBoxBkgColor: surface,
		labelBoxBorderColor: border,
		labelTextColor: ink,
		lineColor: inkSecondary,
		loopTextColor: ink,
		mainBkg: surface,
		nodeBorder: border,
		noteBkgColor: surface,
		noteBorderColor: border,
		noteTextColor: ink,
		primaryBorderColor: border,
		primaryColor: surface,
		primaryTextColor: ink,
		secondaryColor: surface,
		signalColor: inkSecondary,
		signalTextColor: ink,
		tertiaryColor: canvas,
		textColor: ink,
		titleColor: ink,
	};
}

/** Bumps whenever the resolved theme can have changed — the `class` next-themes toggles on `<html>`, or the OS preference. */
function useThemeVersion(): number {
	const [version, setVersion] = React.useState(0);

	React.useEffect(() => {
		const bump = () => setVersion(current => current + 1);

		const observer = new MutationObserver(bump);
		observer.observe(document.documentElement, {
			attributeFilter: ['class'],
			attributes: true,
		});
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		media.addEventListener('change', bump);

		return () => {
			observer.disconnect();
			media.removeEventListener('change', bump);
		};
	}, []);

	return version;
}

let renderQueue: Promise<unknown> = Promise.resolve();

/** `mermaid.initialize` is global and `mermaid.render` shares scratch DOM, so concurrent diagrams (or a theme change mid-render) would stomp each other. Renders run one at a time. */
function enqueue<T>(task: () => Promise<T>): Promise<T> {
	const run = renderQueue.then(task, task);
	renderQueue = run.catch(() => undefined);
	return run;
}

async function renderDiagram(id: string, code: string): Promise<string> {
	const { default: mermaid } = await import('mermaid');
	mermaid.initialize({
		securityLevel: 'strict',
		startOnLoad: false,
		suppressErrorRendering: true,
		theme: 'base',
		themeVariables: buildThemeVariables(),
	});
	try {
		const { svg } = await mermaid.render(id, code);
		return svg;
	} catch (error) {
		// Mermaid can leave its scratch node behind when parsing fails.
		document.getElementById(`d${id}`)?.remove();
		throw error;
	}
}

interface MermaidContextValue {
	readonly code: string;
	/** Message of the last failed render, `null` when the current source renders. */
	readonly error: string | null;
	/** Rendered SVG markup, `null` until the first successful render or while the source is invalid. */
	readonly svg: string | null;
}

const MermaidContext = React.createContext<MermaidContextValue | null>(null);

function useMermaidContext() {
	const context = React.useContext(MermaidContext);
	if (!context) {
		throw new Error('Mermaid subcomponents must be used within <Mermaid.Root>.');
	}
	return context;
}

export interface MermaidRootProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Mermaid diagram source, e.g. `graph TD; A-->B`. Re-renders whenever it changes. */
	code: string;
}

/**
 * Compound diagram block that renders Mermaid source (flowcharts, sequence,
 * class, state, ER, gantt, pie…) as themed SVG. Colors come from the design
 * tokens, so the diagram follows light/dark on its own. Rendering happens on
 * the client with `securityLevel: "strict"`.
 * @example
 * ```tsx
 * <Mermaid.Root code={"graph TD; A[Request] --> B{Valid?}; B -->|yes| C[Handle]; B -->|no| D[Reject]"}>
 *   <Mermaid.Header>
 *     <Mermaid.Title>Request flow</Mermaid.Title>
 *     <Mermaid.Actions>
 *       <Mermaid.CopyButton />
 *       <Mermaid.DownloadButton />
 *     </Mermaid.Actions>
 *   </Mermaid.Header>
 *   <Mermaid.Content />
 * </Mermaid.Root>
 * ```
 */
function Root({ code, className, children, ...props }: MermaidRootProps) {
	const themeVersion = useThemeVersion();
	const baseId = React.useId().replace(/:/g, '');
	const renderCount = React.useRef(0);
	const [result, setResult] = React.useState<{
		svg: string | null;
		error: string | null;
	}>({
		error: null,
		svg: null,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: `themeVersion` is a re-render trigger, not read inside the effect.
	React.useEffect(() => {
		let cancelled = false;
		renderCount.current += 1;
		const id = `mermaid-${baseId}-${renderCount.current}`;

		enqueue(() => renderDiagram(id, code)).then(
			svg => {
				if (!cancelled)
					setResult({
						error: null,
						svg,
					});
			},
			(error: unknown) => {
				if (!cancelled)
					setResult({
						error: error instanceof Error ? error.message : String(error),
						svg: null,
					});
			}
		);

		return () => {
			cancelled = true;
		};
	}, [baseId, code, themeVersion]);

	const contextValue = React.useMemo<MermaidContextValue>(
		() => ({
			code,
			error: result.error,
			svg: result.svg,
		}),
		[code, result]
	);

	return (
		<MermaidContext.Provider value={contextValue}>
			<div className={cn('overflow-hidden rounded-md border border-border bg-background', className)} {...props}>
				{children}
			</div>
		</MermaidContext.Provider>
	);
}

export interface MermaidHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Toolbar row above the diagram — typically `Mermaid.Title` on the left and `Mermaid.Actions` on the right. */
function Header({ className, ...props }: MermaidHeaderProps) {
	return <div className={cn('flex items-center justify-between gap-2 border-b border-border px-3 py-1.5', className)} {...props} />;
}

export interface MermaidTitleProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Short label for the diagram, e.g. "Request flow". */
function Title({ className, ...props }: MermaidTitleProps) {
	return <span className={cn('truncate font-sora text-xs text-muted-foreground', className)} {...props} />;
}

export interface MermaidActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Groups the icon buttons (`Mermaid.CopyButton`, `Mermaid.DownloadButton`) at the end of the header. */
function Actions({ className, ...props }: MermaidActionsProps) {
	return <div className={cn('flex shrink-0 items-center gap-0.5', className)} {...props} />;
}

const iconButtonClassName = cn(
	'flex shrink-0 cursor-pointer items-center justify-center rounded-sm p-1 text-muted-foreground transition-colors duration-150 ease-in-out hover:bg-muted hover:text-foreground',
	'focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-ring!',
	'disabled:pointer-events-none disabled:opacity-50'
);

/** Texts rendered by `Mermaid.CopyButton`. Pass `lang` to override any of them. */
export interface MermaidCopyButtonLang {
	/** Accessible label right after copying. */
	copied: string;
	/** Accessible label before copying. */
	copy: string;
}

/** English defaults for `MermaidCopyButtonLang`. */
export const defaultMermaidCopyButtonLang: MermaidCopyButtonLang = {
	copied: 'Copied',
	copy: 'Copy diagram code',
};

export interface MermaidCopyButtonProps {
	/** Extra classes merged onto the button. */
	className?: string;
	/**
	 * Texts rendered by this component. Merges over English defaults.
	 * @default defaultMermaidCopyButtonLang
	 */
	lang?: Partial<MermaidCopyButtonLang>;
}

/** Copies the Mermaid source to the clipboard, showing a brief confirmation. */
function CopyButton({ lang, className }: MermaidCopyButtonProps) {
	const resolvedLang = {
		...defaultMermaidCopyButtonLang,
		...lang,
	};
	const { code } = useMermaidContext();
	const [copied, setCopied] = React.useState(false);
	const timeout = React.useRef<ReturnType<typeof setTimeout>>(undefined);

	React.useEffect(() => () => clearTimeout(timeout.current), []);

	const handleClick = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => setCopied(false), 1500);
	};

	return (
		<button aria-label={copied ? resolvedLang.copied : resolvedLang.copy} className={cn(iconButtonClassName, className)} onClick={handleClick} type='button'>
			<span className='flex animate-fade-scale-in' key={copied ? 'copied' : 'copy'}>
				<Icon icon={copied ? Check : Copy} size='xs' />
			</span>
		</button>
	);
}

/** Texts rendered by `Mermaid.DownloadButton`. Pass `lang` to override any of them. */
export interface MermaidDownloadButtonLang {
	/** Accessible label of the button. */
	download: string;
}

/** English defaults for `MermaidDownloadButtonLang`. */
export const defaultMermaidDownloadButtonLang: MermaidDownloadButtonLang = {
	download: 'Download SVG',
};

export interface MermaidDownloadButtonProps {
	/** Extra classes merged onto the button. */
	className?: string;
	/**
	 * Name of the downloaded file.
	 * @default "diagram.svg"
	 */
	fileName?: string;
	/**
	 * Texts rendered by this component. Merges over English defaults.
	 * @default defaultMermaidDownloadButtonLang
	 */
	lang?: Partial<MermaidDownloadButtonLang>;
}

/** Downloads the rendered diagram as an `.svg` file. Disabled until the diagram has rendered successfully. */
function DownloadButton({ lang, fileName = 'diagram.svg', className }: MermaidDownloadButtonProps) {
	const resolvedLang = {
		...defaultMermaidDownloadButtonLang,
		...lang,
	};
	const { svg } = useMermaidContext();

	const handleClick = () => {
		if (!svg) return;
		const url = URL.createObjectURL(
			new Blob([svg], {
				type: 'image/svg+xml',
			})
		);
		const link = document.createElement('a');
		link.href = url;
		link.download = fileName;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<button aria-label={resolvedLang.download} className={cn(iconButtonClassName, className)} disabled={!svg} onClick={handleClick} type='button'>
			<Icon icon={Download} size='xs' />
		</button>
	);
}

interface DiagramProps extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	svg: string;
}

/** Mounts Mermaid's SVG, which it sanitizes itself under `securityLevel: "strict"`. Set through a ref so a re-render of the parent never rewrites the DOM. */
function Diagram({ svg, label, className, ...props }: DiagramProps) {
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		if (ref.current) ref.current.innerHTML = svg;
	}, [svg]);

	return <div aria-label={label} className={cn('flex justify-center overflow-x-auto p-6 [&_svg]:h-auto [&_svg]:max-w-full', className)} ref={ref} role='img' {...props} />;
}

/** Texts rendered by `Mermaid.Content`. Pass `lang` to override any of them. */
export interface MermaidContentLang {
	/** Accessible name of the rendered diagram — Mermaid's SVG isn't navigable text, so describe what it shows. */
	diagram: string;
	/** Heading of the error state, above Mermaid's own message. */
	error: string;
	/** Shown while the first render is in flight. */
	loading: string;
}

/** English defaults for `MermaidContentLang`. */
export const defaultMermaidContentLang: MermaidContentLang = {
	diagram: 'Diagram',
	error: "Couldn't render the diagram",
	loading: 'Rendering diagram…',
};

export interface MermaidContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'lang'> {
	/**
	 * Texts rendered by this component. Merges over English defaults.
	 * @default defaultMermaidContentLang
	 */
	lang?: Partial<MermaidContentLang>;
	/**
	 * Placeholder shown while the first render is in flight. Pass a `Skeleton` shaped like your diagram — flowcharts, sequences and pies don't look alike. Rendered as given, so include its own `label` for assistive tech.
	 * @default a generic flowchart-shaped Skeleton
	 */
	skeleton?: React.ReactNode;
}

/** The diagram itself. Shows a `Skeleton` (or your own via `skeleton`) while rendering and Mermaid's message when the source is invalid; wide diagrams scroll horizontally instead of shrinking. */
function Content({ lang, skeleton, className, ...props }: MermaidContentProps) {
	const resolvedLang = {
		...defaultMermaidContentLang,
		...lang,
	};
	const { svg, error } = useMermaidContext();

	if (error) {
		return (
			<div className={cn('flex flex-col gap-2 p-4', className)} role='alert' {...props}>
				<p className='text-sm font-medium text-destructive'>{resolvedLang.error}</p>
				<pre className='overflow-x-auto whitespace-pre-wrap font-mono text-xs text-muted-foreground'>{error}</pre>
			</div>
		);
	}

	if (!svg) {
		if (skeleton !== undefined) return skeleton;
		return (
			<Skeleton className={cn('items-center gap-4 p-6', className)} label={resolvedLang.loading} {...props}>
				<Skeleton.Item className='h-10 w-36' />
				<div aria-hidden='true' className='flex gap-6'>
					<Skeleton.Item className='h-10 w-28' />
					<Skeleton.Item className='h-10 w-28' />
				</div>
				<Skeleton.Item className='h-10 w-36' />
			</Skeleton>
		);
	}

	return <Diagram className={className} label={resolvedLang.diagram} svg={svg} {...props} />;
}

export const Mermaid = {
	Actions,
	Content,
	CopyButton,
	DownloadButton,
	Header,
	Root,
	Title,
};

/** Skeleton for sequence diagrams: participant boxes on top, message bars below. */
function SequenceSkeleton({ label }: { label: string }) {
	return (
		<Skeleton className='gap-5 p-6' label={label}>
			<div aria-hidden='true' className='flex justify-between'>
				<Skeleton.Item className='h-8 w-24' />
				<Skeleton.Item className='h-8 w-24' />
				<Skeleton.Item className='h-8 w-24' />
			</div>
			<div aria-hidden='true' className='flex flex-col gap-4'>
				<Skeleton.Item className='h-2.5 w-2/3' />
				<Skeleton.Item className='ml-auto h-2.5 w-1/2' />
				<Skeleton.Item className='h-2.5 w-3/4' />
				<Skeleton.Item className='ml-auto h-2.5 w-2/3' />
			</div>
		</Skeleton>
	);
}

export interface MermaidDiagramProps {
	code: string;
	/** Header label, also the diagram's accessible name. @default "Diagram" */
	title?: string;
	/** Shape of the loading skeleton, so it resembles the diagram that replaces it. @default "flowchart" */
	variant?: 'flowchart' | 'sequence';
}

/** Ready-made `Mermaid`: title, copy and download actions, and a skeleton matching the diagram type. Built for MDX, where only plain props can be passed. */
export function MermaidDiagram({ code, title = 'Diagram', variant = 'flowchart' }: MermaidDiagramProps) {
	const loading = 'Rendering diagram…';
	return (
		<Mermaid.Root className='my-[1.25em]' code={code.trim()}>
			<Mermaid.Header>
				<Mermaid.Title>{title}</Mermaid.Title>
				<Mermaid.Actions>
					<Mermaid.CopyButton />
					<Mermaid.DownloadButton fileName='diagram.svg' />
				</Mermaid.Actions>
			</Mermaid.Header>
			<Mermaid.Content
				lang={{
					diagram: title,
					loading,
				}}
				skeleton={variant === 'sequence' ? <SequenceSkeleton label={loading} /> : undefined}
			/>
		</Mermaid.Root>
	);
}
