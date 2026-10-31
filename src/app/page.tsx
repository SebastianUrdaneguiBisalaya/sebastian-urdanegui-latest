'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'motion/react';

import { Icon } from '@/components/shared/Icon';
import { cn } from '@/libs/cn';
import { useLoaderDone } from '@/libs/loader';

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: {
		opacity: 1,
		transition: { duration: 0.7, ease: 'easeOut' },
		y: 0,
	},
};

interface Entry {
	award?: string;
	description: string[];
	meta?: string;
	period: string;
	role: string;
	roleHref?: string;
}

const entries: Entry[] = [
	{
		description: [
			'Build and maintain production web apps for the real estate sector with Next.js, React, TypeScript, and Node.js, mixing SSR and SSG for performance and SEO.',
			'Design REST APIs, structure reusable components, and shipped an AI chatbot on n8n and LLM services for business-workflow automation.',
		],
		period: '2025.10 — 2026.08',
		role: 'Full-Stack Developer, Formula',
	},
	{
		description: ['An MVP connecting parents and healthcare workers in Huancavelica: check-ups, vaccination records, automated alerts, and audio translation into Quechua.'],
		award: '1st place',
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
		description: ['Analyzed national data on rest days from occupational accidents for a competition run by the Secretariat of Government and Digital Transformation of Peru.'],
		award: '4th place',
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
	const loaderDone = useLoaderDone();

	return (
		<motion.main animate={loaderDone ? 'visible' : 'hidden'} className='pb-16' initial='hidden' variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
			<motion.section variants={sectionVariants}>
				<p className='font-sora text-xl sm:text-2xl leading-snug text-foreground tracking-tight w-full'>I build web and mobile products from idea to production.</p>
				<div className='mt-6 flex flex-col gap-4 w-full'>
					<p className='font-reddit-sans text-[15px] leading-7 text-foreground/70'>
						I care less about any one stack and more about how software is structured — how its pieces interact, and how technical decisions turn into something reliable and maintainable.
						I work across the whole lifecycle: architecture, APIs, interfaces, integrations, and getting applications ready for real use.
					</p>
					<p className='font-reddit-sans text-[15px] leading-7 text-foreground/70'>
						I started in analytics and data science with Python, which is where the problem-solving came from. That path led into software engineering, where I found more interest in
						shipping complete systems than in any single layer of them.
					</p>
					<p className='font-reddit-sans text-[15px] leading-7 text-foreground/70'>
						Today that&apos;s mostly TypeScript/JavaScript and Python — APIs, databases, auth, integrations, automation, real-time features, and AI. I keep coming back to multi-tenant SaaS
						architecture and developer tooling: things that solve a real, specific problem for the people using them.
					</p>
					<p className='font-reddit-sans text-[15px] leading-7 text-foreground/70'>
						Want to work together or just say hi? Write to{' '}
						<a
							className='text-foreground underline underline-offset-4 decoration-border-strong hover:text-accent hover:decoration-accent transition-colors duration-300 ease-out'
							href='mailto:sebasurdanegui@gmail.com'
						>
							sebasurdanegui@gmail.com
						</a>
						.
					</p>
				</div>
			</motion.section>

			<motion.section className='mt-14' variants={sectionVariants}>
				<h2 className='font-sora text-sm font-medium text-foreground/50 pb-6 border-b border-border'>Experience</h2>
				<ol className='flex flex-col'>
					{entries.map((entry, idx) => {
						const linked = Boolean(entry.roleHref);
						const rowClassName = 'flex flex-col sm:flex-row gap-1.5 sm:gap-6 w-full group';
						const content = (
							<>
								<span
									className={cn(
										'font-mono text-xs text-tertiary shrink-0 sm:w-34 sm:pt-0.5',
										linked && 'transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none'
									)}
								>
									{entry.period}
								</span>
								<div className='flex flex-col gap-1.5 min-w-0'>
									<p className='font-sora text-[15px] font-medium text-foreground'>
										<span className={cn(linked && 'transition-colors duration-300 ease-out group-hover:text-accent group-focus-visible:text-accent')}>{entry.role}</span>
										{linked && (
											<Icon
												aria-hidden='true'
												className='inline ml-1 align-text-bottom text-accent opacity-0 -translate-x-1 translate-y-0.5 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0'
												icon={ArrowUpRight}
												size='sm'
											/>
										)}
										{entry.meta && <span className='font-mono text-xs text-tertiary font-normal ml-2'>{entry.meta}</span>}
										{entry.award && (
											<span className='font-mono text-xs text-accent font-normal ml-2'>
												<span aria-hidden='true' className='inline-block size-1.5 rounded-full bg-accent align-middle mr-1.5' />
												{entry.award}
											</span>
										)}
									</p>
									{entry.description.map((line, lineIdx) => (
										<p className='font-reddit-sans text-sm leading-6 text-foreground/65' key={lineIdx}>
											{line}
										</p>
									))}
								</div>
							</>
						);
						return (
							<li className='py-6 border-b border-border-subtle last:border-b-0' key={idx}>
								{entry.roleHref ? (
									<a className={rowClassName} href={entry.roleHref} rel='noopener noreferrer' target='_blank'>
										{content}
									</a>
								) : (
									<div className={rowClassName}>{content}</div>
								)}
							</li>
						);
					})}
				</ol>
			</motion.section>
		</motion.main>
	);
}
