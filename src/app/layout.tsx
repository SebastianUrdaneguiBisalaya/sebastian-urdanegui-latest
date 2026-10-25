import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { JetBrains_Mono, Reddit_Sans, Sora } from 'next/font/google';

import Footer from '@/components/shared/Footer';
import Lenis from '@/components/shared/Lenis';
import Navbar from '@/components/shared/Navbar';
import Navigation from '@/components/shared/Navigation';
import ThemeProvider from '@/components/shared/ThemeProvider';

const sora = Sora({
	subsets: ['latin'],
	variable: '--font-sora',
});

const redditSans = Reddit_Sans({
	subsets: ['latin'],
	variable: '--font-reddit-sans',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
	authors: [{ name: 'Sebastian Marat Urdanegui Bisalaya', url: 'https://sebastianurdanegui.com' }],
	description: 'I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.',
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
	title: 'Sebastian Marat Urdanegui Bisalaya | Full-Stack Developer',
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
				<meta content='Sebastian Marat Urdanegui Bisalaya | Full-Stack Developer' property='og:title' />
				<meta content='I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.' property='og:description' />
				<meta content='Sebastian Marat Urdanegui Bisalaya | Full-Stack Developer' name='twitter:title' />
				<meta content='I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.' name='twitter:description' />
				<meta content='https://sebastianurdanegui.com' property='og:url' />
				<meta content='https://sebastianurdanegui.com' property='twitter:url' />
				<meta content='website' name='og:type' />
				<meta content='summary_large_image' name='twitter:card' />
			</head>
			<body className={`${sora.variable} ${redditSans.variable} ${jetbrainsMono.variable} antialiased`}>
				<ThemeProvider>
					<div className='max-w-2xl w-full min-h-screen h-full flex flex-col px-5 sm:px-0 pb-20'>
						<Navbar />
						<Navigation />
						<div className='flex-1 flex flex-col'>{children}</div>
						<Footer />
					</div>
					<Lenis />
					<SmoothCursor />
				</ThemeProvider>
			</body>
		</html>
	);
}
