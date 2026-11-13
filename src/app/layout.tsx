import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Reddit_Sans, Sora } from 'next/font/google';
import { ViewTransition } from 'react';

import Footer from '@/components/shared/Footer';
import Lenis from '@/components/shared/Lenis';
// import Loader from '@/components/shared/Loader';
import Navbar from '@/components/shared/Navbar';
import Navigation from '@/components/shared/Navigation';
import ThemeProvider from '@/components/shared/ThemeProvider';
import { pageMetadata } from '@/libs/metadata';

const sora = Sora({
	subsets: ['latin'],
	variable: '--font-sora',
});

const redditSans = Reddit_Sans({
	subsets: ['latin'],
	variable: '--font-reddit-sans',
});



export const metadata: Metadata = {
	...pageMetadata({
		description: 'I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.',
		path: '/',
		title: 'Sebastian Marat Urdanegui Bisalaya | Full-Stack Developer',
	}),
	authors: [{ name: 'Sebastian Marat Urdanegui Bisalaya', url: 'https://sebastianurdanegui.com' }],
	keywords: [
		'sebastian marat urdanegui bisalaya',
		'sebastian urdanegui',
		'JavaScript',
		'React',
		'React Native',
		'Node.js',
		'TypeScript',
		'desarrollo web',
		'desarrollo móvil',
		'fullstack developer',
		'frontend developer',
		'backend developer',
		'python',
		'data analyst',
		'data scientist',
		'data visualization',
		'programación',
	],
	metadataBase: new URL('https://sebastianurdanegui.com'),
};

const SmoothCursor = dynamic(() => import('../components/shared/SmoothCursor'));

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<meta content='PE' name='geo.region' />
				<meta content='Perú' name='geo.placename' />
				<meta content='general' name='rating' />
				<meta content='global' name='distribution' />
			</head>
			<body className={`${sora.variable} ${redditSans.variable} antialiased`}>
				<ThemeProvider>
					{/* <Loader /> */}
					<div className='max-w-172 w-full min-h-screen h-full flex flex-col px-5 sm:px-0 pb-20'>
						<Navbar />
						<Navigation />
						<ViewTransition name='page'>
							<div className='flex-1 flex flex-col'>{children}</div>
						</ViewTransition>
						<Footer />
					</div>
					<Lenis />
					<SmoothCursor />
				</ThemeProvider>
			</body>
		</html>
	);
}
