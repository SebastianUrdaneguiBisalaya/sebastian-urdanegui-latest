import type { MDXComponents } from 'mdx/types';

const components = {
    a: ({ children, href }) => (
        <a className='font-reddit-sans' href={href}>{children}</a>
    ),
    h1: ({ children }) => (
        <h1 className='font-sora'>{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className='font-sora'>{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className='font-sora'>{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 className='font-sora'>{children}</h4>
    ),
    h5: ({ children }) => (
        <h5 className='font-sora'>{children}</h5>
    ),
    h6: ({ children }) => (
        <h6 className='font-sora'>{children}</h6>
    ),
    li: ({ children }) => (
        <li className='font-reddit-sans'>{children}</li>
    ),
    ol: ({ children }) => (
        <ol className='font-reddit-sans'>{children}</ol>
    ),
    p: ({ children }) => (
        <p className='font-reddit-sans'>{children}</p>
    ),
    ul: ({ children }) => (
        <ul className='font-reddit-sans'>{children}</ul>
    )
} satisfies MDXComponents;

export function useMDXComponents() {
    return components;
}