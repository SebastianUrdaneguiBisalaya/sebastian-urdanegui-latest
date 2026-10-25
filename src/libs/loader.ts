'use client';

import { useSyncExternalStore } from 'react';

/** Longest the loader may hold the page, in milliseconds; past it the page shows anyway. */
export const LOADER_SAFETY_MS = 8000;

let ready = false;
const listeners = new Set<() => void>();

/** Called by the `Loader` when it hands the screen over to the page. Stays true for the rest of the session, so later route changes animate right away. */
export function markLoaderDone() {
	if (ready) return;
	ready = true;
	for (const listener of listeners) listener();
}

// Failsafe for the entrance animations: if the loader never reports back (an error, a stalled load), they still run.
if (typeof window !== 'undefined') window.setTimeout(markLoaderDone, LOADER_SAFETY_MS);

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};

/** `false` until the loader is done; entrance animations wait for it so they play on a visible page. */
export function useLoaderDone() {
	return useSyncExternalStore(
		subscribe,
		() => ready,
		() => false
	);
}
