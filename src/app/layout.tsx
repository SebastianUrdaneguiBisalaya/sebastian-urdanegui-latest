import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Sora, Reddit_Sans } from 'next/font/google';

import Footer from '@/components/shared/Footer';
import Lenis from '@/components/shared/Lenis';
import Navbar from '@/components/shared/Navbar';
import Navigation from '@/components/shared/Navigation';

const geistSans = Sora({
	subsets: ['latin'],
	variable: '--font-sora',
});

const geistMono = Reddit_Sans({
	subsets: ['latin'],
	variable: '--font-reddit-sans',
});

export const metadata: Metadata = {
	description:
		'I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.',
	title: 'Sebastian Marat Urdanegui Bisalaya | Full-Stack Developer',
};

const SmoothCursor = dynamic(() => import('../components/shared/SmoothCursor'));

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className='max-w-3xl w-full min-h-screen h-full flex flex-col p-4'>
					<Navbar />
          			<Navigation />
					{children}
					<Footer />
				</div>
        		<Lenis />
				<SmoothCursor />
			</body>
		</html>
	);
}
