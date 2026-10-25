'use client';

import { type LenisRef, ReactLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Lenis() {
	const lenisRef = useRef<LenisRef>(null);
	const pathname = usePathname();

	// Lenis keeps its own scroll target, so Next's scroll-to-top on navigation gets overridden. Reset it on route change.
	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger
	useEffect(() => {
		lenisRef.current?.lenis?.scrollTo(0, { force: true, immediate: true });
	}, [pathname]);

	useEffect(() => {
		function update(data: { timestamp: number }) {
			const time = data.timestamp;
			lenisRef.current?.lenis?.raf(time);
		}

		frame.update(update, true);

		return () => cancelFrame(update);
	}, []);

	return (
		<ReactLenis
			options={{
				allowNestedScroll: true,
				autoRaf: false,
			}}
			ref={lenisRef}
			root
		/>
	);
}
