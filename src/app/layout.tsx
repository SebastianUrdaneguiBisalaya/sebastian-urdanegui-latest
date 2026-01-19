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
	authors: [{ name: 'Sebastian Marat Urdanegui Bisalaya', url: 'https://sebastianurdanegui.com' }],
	description:
		'I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.',
	keywords: ['sebastian marat urdanegui bisalaya', 'sebastian urdanegui', 'JavaScript', 'React', 'React Native', 'Node.js', 'TypeScript', 'desarrollo web', 'desarrollo móvil', 'fullstack developer', 'frontend developer', 'backend developer', 'python', 'data analyst', 'data scientist', 'data visualization', 'programación'],
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
			<head>
				<meta content="PE" name="geo.region" />
				<meta content="Perú" name="geo.placename" />
				<meta content="general" name="rating" />
				<meta content="global" name="distribution" />
				<meta
					content='Sebastian Marat Urdanegui Bisalaya | Full-Stack Developer'
					property='og:title'
				/>
				<meta
					content='I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.'
					property='og:description'
				/>
				<meta
					content='Sebastian Marat Urdanegui Bisalaya | Full-Stack Developer'
					name='twitter:title'
				/>
				<meta
					content='I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.'
					name='twitter:description'
				/>
				<meta content='https://sebastianurdanegui.com' property='og:url' />
				<meta content="https://sebastianurdanegui.com" property="twitter:url" />
				<meta content="website" name="og:type" />
				<meta content="summary_large_image" name="twitter:card" />
			</head>
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
