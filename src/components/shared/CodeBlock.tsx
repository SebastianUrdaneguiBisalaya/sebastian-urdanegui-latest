'use client';

import { useState, useEffect } from 'react';
import {
    createHighlighter,
    type Highlighter,
    bundledLanguages,
    bundledThemes
} from 'shiki';

export type CodeLanguage = keyof typeof bundledLanguages;

export interface CodeBlockProps {
    code: string;
    language?: CodeLanguage;
    filename?: string;
    theme?: keyof typeof bundledThemes;
}

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighterSingleton(
    language: string,
    theme: keyof typeof bundledThemes
) {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            langs: [language],
            themes: [bundledThemes[theme]]
        });
    }
    return highlighterPromise;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    filename,
    language = 'ts',
    theme = 'github-dark'
}) => {
    const [html, setHtml] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        let mounted = true;

        async function highlight() {
            const highlighter = await getHighlighterSingleton(language, theme);
            if (!highlighter.getLoadedLanguages().includes(language)) {
                await highlighter.loadLanguage(language);
            }
            const result = highlighter.codeToHtml(code, {
                lang: language,
                theme
            });
            if (mounted) {
                setHtml(result);
            }
        }
        highlight();
        return () => {
            mounted = false;
        };
    }, [code, language, theme]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1200);
    };

    return (
        <div
            className='overflow-hidden rounded-xl'
        >
            <div className='flex items-center justify-between'>
                <span className='truncate'>
                    {filename ?? language}
                </span>
                <button
                    className=''
                    onClick={handleCopy}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div
                className='leading-relaxed'
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    )
}