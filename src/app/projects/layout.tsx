import type { Metadata } from 'next';

import { pageMetadata } from '@/libs/metadata';

export const metadata: Metadata = pageMetadata({
	description: 'Packages, full-stack apps and data projects I have built.',
	path: '/projects',
	title: 'Projects | Sebastian Urdanegui',
});

export default function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
