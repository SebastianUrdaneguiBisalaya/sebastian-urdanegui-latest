import type { MDXComponents } from 'mdx/types';

const textOf = (node: React.ReactNode): string => {
	if (typeof node === 'string' || typeof node === 'number') return String(node);
	if (Array.isArray(node)) return node.map(textOf).join('');
	if (node && typeof node === 'object' && 'props' in node) return textOf((node.props as { children?: React.ReactNode }).children);
	return '';
};

/** Same algorithm the posts' `DocsToc` items are generated with: heading text → anchor id. */
const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');

const components = {
	a: ({ children, href }) => (
		<a className='font-reddit-sans' href={href}>
			{children}
		</a>
	),
	code: ({ children }) => <code className='font-mono text-[0.875em] text-foreground bg-muted border border-border rounded px-1.5 py-0.5 wrap-break-word'>{children}</code>,
	h1: ({ children }) => <h1 className='font-sora text-2xl md:text-3xl mb-[0.888889em] text-foreground'>{children}</h1>,
	h2: ({ children }) => (
		<h2 className='font-sora text-xl md:text-2xl mt-[2em] mb-[1em] scroll-mt-8 text-foreground/90' id={slugify(textOf(children))}>
			{children}
		</h2>
	),
	h3: ({ children }) => <h3 className='font-sora text-lg md:text-xl mt-[1.6em] mb-[0.6em] text-foreground/80'>{children}</h3>,
	h4: ({ children }) => <h4 className='font-sora'>{children}</h4>,
	h5: ({ children }) => <h5 className='font-sora'>{children}</h5>,
	h6: ({ children }) => <h6 className='font-reddit-sans text-[13px] text-foreground/50 mb-[1em] mt-[1em]'>{children}</h6>,
	li: ({ children }) => (
		<li className='font-reddit-sans text-foreground/80 mt-[1.1em] mb-[1.1em] in-[ul]:relative in-[ul]:before:mr-2 in-[ul]:before:content-["-"] in-[ul]:before:absolute in-[ul]:before:-ml-4 in-[ul]:pl-4'>
			{children}
		</li>
	),
	p: ({ children }) => <p className='font-reddit-sans leading-7 mt-[1.25em] mb-[1.25em] text-foreground/80'>{children}</p>,
	ul: ({ children }) => <ul className='font-reddit-sans'>{children}</ul>,
} satisfies MDXComponents;

export function useMDXComponents() {
	return components;
}
