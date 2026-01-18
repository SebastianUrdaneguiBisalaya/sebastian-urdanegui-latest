'use client';

import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

export interface MermaidDiagramProps {
    code: string;
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function render() {
            try {
                mermaid.initialize({
                    securityLevel: 'strict',
                    startOnLoad: false,
                    theme: 'dark',
                });
                const id = `mermaid-${Math.random().toString(36).slice(2)}`;
                const { svg } = await mermaid.render(id, code);
                if (!cancelled && containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
            } catch (err: unknown) {
                if (!cancelled) {
                    setError((err as Error).message);
                }
            }
        }
        render();

        return () => {
            cancelled = true;
        };
    }, [code]);

    if (error) {
        return (
            <div className=''>
                Mermaid error: {error}
            </div>
        )
    }

    return (
        <div
            className='w-full flex flex-col items-center pt-[1.25em] pb-[1.25em]'
            ref={containerRef}
        />
    )
}