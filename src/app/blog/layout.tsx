import type { Metadata } from 'next';

import { pageMetadata } from '@/libs/metadata';

export const metadata: Metadata = pageMetadata({
	description: 'Practical guides on React, Next.js and Python packages I have built.',
	path: '/blog',
	title: 'Blog | Sebastian Urdanegui',
});

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className='mt-[1.25em] mb-[1.25em]'>{children}</div>;
}
