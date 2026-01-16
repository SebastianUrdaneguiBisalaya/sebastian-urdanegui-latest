'use client';

import { ReactLenis, type LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';
import { useEffect, useRef } from 'react';

export default function Lenis() {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        function update(data: { timestamp: number }) {
            const time = data.timestamp;
            lenisRef.current?.lenis?.raf(time);
        }
        frame.update(update);
        return () => cancelFrame(update);
    }, []);

    return (
        <ReactLenis
            options={{ autoRaf: false }}
            ref={lenisRef}
            root
        />
    )
}