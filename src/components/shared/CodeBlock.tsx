'use client';

import dedent from 'dedent';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { bundledLanguages, bundledThemes, createHighlighter, type Highlighter } from 'shiki';

import Icons from '@/components/shared/Icons';
import { cn } from '@/libs/cn';

export type CodeLanguage = keyof typeof bundledLanguages;

export interface CodeBlockProps {
	code: string;
	filename?: string;
	language?: CodeLanguage;
	theme?: keyof typeof bundledThemes;
}

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighterSingleton() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({ langs: [], themes: [] });
	}
	return highlighterPromise;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, filename, language = 'ts', theme }) => {
	const { resolvedTheme } = useTheme();
	const shikiTheme: keyof typeof bundledThemes = theme ?? (resolvedTheme === 'light' ? 'github-light' : 'material-theme-darker');
	const [html, setHtml] = useState<string>('');
	const [copied, setCopied] = useState<boolean>(false);

	useEffect(() => {
		let mounted = true;

		async function highlight() {
			const highlighter = await getHighlighterSingleton();
			if (!highlighter.getLoadedThemes().includes(shikiTheme)) {
				await highlighter.loadTheme(bundledThemes[shikiTheme]);
			}
			if (!highlighter.getLoadedLanguages().includes(language)) {
				await highlighter.loadLanguage(language);
			}
			const result = highlighter.codeToHtml(dedent(code), {
				lang: language,
				theme: shikiTheme,
				transformers: [
					{
						pre(node) {
							node.properties.style = '';
						},
					},
				],
			});
			if (mounted) {
				setHtml(result);
			}
		}
		highlight();
		return () => {
			mounted = false;
		};
	}, [code, language, shikiTheme]);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<div className='overflow-hidden'>
			<div className='flex items-center justify-between border border-border-strong p-3 rounded-t-md'>
				<div className='flex flex-row items-center gap-2 text-foreground/60'>
					<Icons language={language} />
					<span className='truncate text-xs font-sora'>{filename ?? language}</span>
				</div>
				<button
					className='relative w-5.5 h-5.5 flex flex-col items-center justify-center text-xs text-foreground/60 font-sora hover:bg-foreground/15 rounded-md transition-all duration-500 ease-out'
					onClick={handleCopy}
				>
					<div
						className={cn(
							'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out p-1',
							copied ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
						)}
					>
						<svg height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'>
							<path d='m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z' fill='currentColor' />
						</svg>
					</div>
					<div
						className={cn(
							'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out p-1',
							copied ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
						)}
					>
						<svg height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'>
							<g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'>
								<path d='M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z' />
								<path d='M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1' />
							</g>
						</svg>
					</div>
				</button>
			</div>
			<div
				className='leading-relaxed border-x border-b border-border-strong rounded-b-md py-4 pl-4 bg-code overflow-x-auto'
				dangerouslySetInnerHTML={{ __html: html }}
				data-lenis-prevent
			/>
		</div>
	);
};
