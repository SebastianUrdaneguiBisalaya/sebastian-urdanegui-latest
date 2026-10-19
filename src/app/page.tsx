'use client';

import { motion, type Variants } from 'motion/react';

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: {
		opacity: 1,
		transition: { duration: 0.7, ease: 'easeOut' },
		y: 0,
	},
};

interface Entry {
	description: string[];
	meta?: string;
	period: string;
	role: string;
	roleHref?: string;
}

const entries: Entry[] = [
	{
		description: [
			'Built a multi-tenant SaaS platform for businesses to create subscription plans, manage customers, track consumption, and run subscription-based experiences.',
			'Designed the core architecture end to end — tenant isolation, auth, relational data models, REST APIs, subscription workflows, and third-party integrations.',
		],
		meta: 'SaaS · B2B2C',
		period: '2026.05 — 2026.08',
		role: 'membi — Co-Founder',
	},
	{
		description: [
			'Build and maintain production web apps for the real estate sector with Next.js, React, TypeScript, and Node.js, mixing SSR and SSG for performance and SEO.',
			'Design REST APIs, structure reusable components, and shipped an AI chatbot on n8n and LLM services for business-workflow automation.',
		],
		period: '2025.10 — 2026.08',
		role: 'Full-Stack Developer, Formula',
	},
	{
		description: [
			'Led technical direction for an AI-powered real-time communication platform that understands, translates, and formulates responses during conversations — speech processing, AI integrations, and the full frontend/backend architecture.',
		],
		period: '2025',
		role: 'aiblabla — Technical Lead',
		roleHref: 'https://github.com/SebastianUrdaneguiBisalaya/ai-blabla-web-platform',
	},
	{
		description: [
			'A centralized web app for organizing personal subscriptions.',
		],
		period: '2025.08',
		role: 'suscripto.manager',
		roleHref: 'https://github.com/SebastianUrdaneguiBisalaya/suscripto.manager',
	},
	{
		description: [
			'An AI music-recommendation platform combining generative AI with the Spotify API for personalized, context-aware picks.',
		],
		period: '2025.08',
		role: 'emotify.ai',
		roleHref: 'https://github.com/SebastianUrdaneguiBisalaya/emotify.ai',
	},
	{
		description: [
			'AI document-processing pipeline: send a photo over Telegram, extract structured data automatically, review it on a web dashboard.',
		],
		period: '2025.06',
		role: 'kooko.ai',
		roleHref: 'https://github.com/SebastianUrdaneguiBisalaya/kooko-ai-frontend',
	},
	{
		description: [
			'An MVP connecting parents and healthcare workers in Huancavelica: check-ups, vaccination records, automated alerts, and audio translation into Quechua.',
		],
		meta: '1st place',
		period: '2025.03',
		role: 'Hackathon Huancavelica Vida Segura',
		roleHref: 'https://drive.google.com/file/d/1m6yJws18WElIgCyvGVjreQMW86qtawWD/view',
	},
	{
		description: [
			'Designed and built a full event-discovery and ticketing platform — search, advanced filtering, date queries, and Stripe checkout — with React, TypeScript, TailwindCSS, Node.js, Express, and SQL.',
		],
		period: '2024.08 — 2024.12',
		role: 'Full-Stack Developer, Make It Real Camp',
	},
	{
		description: [
			'Analyzed national data on rest days from occupational accidents for a competition run by the Secretariat of Government and Digital Transformation of Peru.',
		],
		meta: '4th place',
		period: '2023.09',
		role: 'Datathon Exprésate Perú con Datos',
		roleHref: 'https://drive.google.com/file/d/1PgR3nWq_D70cUymndbIIoMdnuadQaPiG/view',
	},
	{
		description: [
			'Automated Treasury workflows around client exchange-rate targets, supporting roughly PEN 500K in transaction volume over four months, plus an enablement flow for validating financial-derivative requests.',
		],
		period: '2023.01 — 2024.05',
		role: 'Business Strategy Intern, Treasury — BCP',
	},
];

export default function Page() {
	return (
		<motion.main
			animate='visible'
			className='pb-16'
			initial='hidden'
			variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
		>
			<motion.section variants={sectionVariants}>
				<p className='font-sora text-xl sm:text-2xl leading-snug text-white tracking-tight w-full'>
					I build web and mobile products from idea to production.
				</p>
				<div className='mt-6 flex flex-col gap-4 w-full'>
					<p className='font-reddit-sans text-[15px] leading-7 text-white/70'>
						I care less about any one stack and more about how software is
						structured — how its pieces interact, and how technical decisions
						turn into something reliable and maintainable. I work across the
						whole lifecycle: architecture, APIs, interfaces, integrations, and
						getting applications ready for real use.
					</p>
					<p className='font-reddit-sans text-[15px] leading-7 text-white/70'>
						I started in analytics and data science with Python, which is
						where the problem-solving came from. That path led into software
						engineering, where I found more interest in shipping complete
						systems than in any single layer of them.
					</p>
					<p className='font-reddit-sans text-[15px] leading-7 text-white/70'>
						Today that&apos;s mostly TypeScript/JavaScript and Python — APIs,
						databases, auth, integrations, automation, real-time features, and
						AI. I keep coming back to multi-tenant SaaS architecture and
						developer tooling: things that solve a real, specific problem for
						the people using them.
					</p>
				</div>
			</motion.section>

			<motion.section className='mt-14' variants={sectionVariants}>
				<h2 className='font-sora text-sm font-medium text-white/50 pb-6 border-b border-white/10'>
					Experience
				</h2>
				<ol className='flex flex-col'>
					{entries.map((entry, idx) => (
						<li
							className='flex flex-col sm:flex-row gap-1.5 sm:gap-6 py-6 border-b border-white/[0.06] last:border-b-0'
							key={idx}
						>
							<span className='font-mono text-xs text-white/42 shrink-0 sm:w-[136px] sm:pt-0.5'>
								{entry.period}
							</span>
							<div className='flex flex-col gap-1.5 min-w-0'>
								<p className='font-sora text-[15px] font-medium text-white'>
									{entry.roleHref ? (
										<a
											className='hover:text-[var(--accent)] transition-colors duration-300 ease-out'
											href={entry.roleHref}
											rel='noopener noreferrer'
											target='_blank'
										>
											{entry.role}
										</a>
									) : (
										entry.role
									)}
									{entry.meta && (
										<span className='font-mono text-xs text-white/42 font-normal ml-2'>
											{entry.meta}
										</span>
									)}
								</p>
								{entry.description.map((line, lineIdx) => (
									<p className='font-reddit-sans text-sm leading-6 text-white/65' key={lineIdx}>
										{line}
									</p>
								))}
							</div>
						</li>
					))}
				</ol>
			</motion.section>
		</motion.main>
	);
}
