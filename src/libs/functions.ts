'use client';

import { useEffect, useState } from 'react';

function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(
        () => {
            if (typeof window === 'undefined') return false;
            return window.matchMedia(query).matches;
        }
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia(query);
        const listener = () => setMatches(mediaQuery.matches);
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

export { useMediaQuery };