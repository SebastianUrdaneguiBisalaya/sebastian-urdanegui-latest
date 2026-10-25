'use client';

import { animate, cancelFrame, frame } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { LOADER_SAFETY_MS, markLoaderDone } from '@/libs/loader';

const WORD = '> sebasdev';
const FONT_SIZE = 200;
const PADDING = 24;
/** Horizontal distance between the points of the wave's polyline; the smaller, the smoother the curve. */
const WAVE_STEP = 6;
/** Radians per second the wave travels. */
const WAVE_SPEED = 2.4;
/** Seconds the fake progress takes to reach 90%; the last 10% waits for the page to be ready. */
const PROGRESS_DURATION = 2;
const ZOOM_DURATION = 1.6;
const ZOOM_SCALE = 14;

interface Box {
	height: number;
	width: number;
	x: number;
	y: number;
}

interface Playback {
	stop: () => void;
}

export default function Loader() {
	const [done, setDone] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const textRef = useRef<SVGTextElement>(null);
	const brightRef = useRef<SVGGElement>(null);
	const wavePathRef = useRef<SVGPathElement>(null);
	const labelRef = useRef<HTMLDivElement>(null);
	const valueRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		const svg = svgRef.current;
		const text = textRef.current;
		const bright = brightRef.current;
		const wavePath = wavePathRef.current;
		const label = labelRef.current;
		const value = valueRef.current;
		if (!(root && svg && text && bright && wavePath && label && value)) return;

		const html = document.documentElement;
		const previousOverflow = html.style.overflow;
		html.style.overflow = 'hidden';

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const state = { p: 0, phase: 0 };
		const playbacks: Playback[] = [];
		let box: Box = { height: FONT_SIZE, width: 1000, x: 0, y: 0 };
		let cancelled = false;

		const pageLoaded = new Promise<void>(resolve => {
			if (document.readyState === 'complete') resolve();
			else window.addEventListener('load', () => resolve(), { once: true });
		});
		const fontsReady = document.fonts?.ready ?? Promise.resolve();

		// The bright layer is clipped by a sine wave whose level rises with `state.p`; the amplitude is 0 at both ends so it starts empty and ends flat and full.
		const render = () => {
			const { height, width, x, y } = box;
			const amplitude = Math.sin(Math.PI * state.p) * height * 0.08;
			const level = y + height - state.p * height;
			let d = `M ${x - 10} ${level}`;
			for (let px = x - 10; px <= x + width + 10; px += WAVE_STEP) {
				d += ` L ${px} ${level + amplitude * Math.sin(((px - x) / width) * Math.PI * 4 + state.phase)}`;
			}
			d += ` L ${x + width + 10} ${y + height + 10} L ${x - 10} ${y + height + 10} Z`;
			wavePath.setAttribute('d', d);
			value.textContent = String(Math.round(state.p * 100));
		};

		const wave = ({ timestamp }: { timestamp: number }) => {
			state.phase = (timestamp / 1000) * WAVE_SPEED;
			render();
		};

		const run = <T extends Playback>(playback: T) => {
			playbacks.push(playback);
			return playback;
		};

		const finish = () => {
			window.clearTimeout(safety);
			if (cancelled) return;
			html.style.overflow = previousOverflow;
			setDone(true);
		};

		// Failsafe: if the sequence stalls (a font or the load event never settles), drop the overlay and hand the page over.
		const safety = window.setTimeout(() => {
			cancelFrame(wave);
			for (const playback of playbacks) playback.stop();
			markLoaderDone();
			finish();
		}, LOADER_SAFETY_MS);

		const sequence = async () => {
			await fontsReady;
			if (cancelled) return;

			const b = text.getBBox();
			box = { height: b.height, width: b.width, x: b.x, y: b.y };
			svg.setAttribute('viewBox', `${b.x - PADDING} ${b.y - PADDING} ${b.width + PADDING * 2} ${b.height + PADDING * 2}`);
			svg.style.opacity = '1';

			if (reducedMotion) {
				state.p = 1;
				render();
				await pageLoaded;
				if (cancelled) return;
				markLoaderDone();
				await run(animate(root, { opacity: 0 }, { duration: 0.3, ease: 'easeOut' }));
				finish();
				return;
			}

			render();
			frame.update(wave, true);
			await Promise.all([pageLoaded, run(animate(0, 0.9, { duration: PROGRESS_DURATION, ease: 'easeOut', onUpdate: v => (state.p = v) }))]);
			if (cancelled) return;
			await run(animate(state.p, 1, { duration: 0.6, ease: 'easeInOut', onUpdate: v => (state.p = v) }));
			if (cancelled) return;
			cancelFrame(wave);
			render();

			// Zoom in until the word leaves the view, darkening as it goes; only then does the page show.
			svg.style.transformOrigin = '50% 50%';
			run(animate(label, { opacity: 0 }, { duration: 0.25 }));
			run(animate(bright, { opacity: 0.3 }, { duration: ZOOM_DURATION, ease: 'easeIn' }));
			run(animate(svg, { opacity: 0 }, { delay: ZOOM_DURATION * 0.7, duration: ZOOM_DURATION * 0.3, ease: 'easeIn' }));
			await run(animate(svg, { scale: ZOOM_SCALE }, { duration: ZOOM_DURATION, ease: [0.5, 0, 0.75, 0] }));
			if (cancelled) return;
			markLoaderDone();
			await run(animate(root, { opacity: 0 }, { duration: 0.25, ease: 'easeOut' }));
			finish();
		};

		sequence();

		return () => {
			cancelled = true;
			window.clearTimeout(safety);
			cancelFrame(wave);
			for (const playback of playbacks) playback.stop();
			html.style.overflow = previousOverflow;
		};
	}, []);

	if (done) return null;

	return (
		<div aria-label='Loading' className='loader fixed inset-0 z-90 flex flex-col items-center justify-center overflow-hidden bg-background' ref={rootRef} role='status'>
			<noscript>
				<style>{'.loader{display:none}'}</style>
			</noscript>
			<div className='w-[min(88vw,760px)]'>
				<svg aria-hidden='true' className='w-full h-auto overflow-visible opacity-0' ref={svgRef} viewBox={`0 0 1000 ${FONT_SIZE + PADDING * 2}`}>
					<defs>
						<clipPath id='loader-wave'>
							<path ref={wavePathRef} />
						</clipPath>
					</defs>
					<text className='font-sora fill-foreground/20' fontSize={FONT_SIZE} fontWeight={800} ref={textRef} x='0' y={FONT_SIZE}>
						{WORD}
					</text>
					<g clipPath='url(#loader-wave)' ref={brightRef}>
						<text className='font-sora fill-foreground' fontSize={FONT_SIZE} fontWeight={800} x='0' y={FONT_SIZE}>
							{WORD}
						</text>
					</g>
				</svg>
				<div aria-hidden='true' className='flex justify-end pt-3 font-mono text-xs text-foreground/70' ref={labelRef}>
					loading…{' '}
					<span className='tabular-nums ml-1.5 min-w-[3ch] text-right' ref={valueRef}>
						0
					</span>
					&nbsp;%
				</div>
			</div>
		</div>
	);
}
