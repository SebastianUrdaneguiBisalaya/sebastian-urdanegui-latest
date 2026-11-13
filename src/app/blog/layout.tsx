import type { Metadata } from 'next';

import { pageMetadata } from '@/libs/metadata';

export const metadata: Metadata = {
	...pageMetadata({
		description: 'Practical guides on React, Next.js and Python packages I have built.',
		path: '/blog',
		title: 'Blog | Sebastian Urdanegui',
	}),
	// Lets feed readers discover the feed from the page's <head>.
	alternates: { types: { 'application/rss+xml': '/blog/rss.xml' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className='mt-[1.25em] mb-[1.25em]'>{children}</div>;
}
