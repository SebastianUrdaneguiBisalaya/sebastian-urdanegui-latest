'use client';

import { motion, type Variants } from 'motion/react';
import Image from 'next/image';

const paragraphVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 10
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 1.2,
			ease: 'easeOut'
		},
		y: 0,
	}
}

export default function Page() {
	return (
		<main className='pb-4'>
			<motion.a
				className='flex justify-center sm:block cursor-pointer'
				href='https://www.linkedin.com/in/sebastianurdaneguibisalaya/'
				initial='hidden'
				target='_blank'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<Image
					alt='Profile image'
					className='sm:float-right self-center mt-4 mb-4 sm:ml-4 rounded-full'
					height={130}
					src='/image-profile.webp'
					width={130}
				/>
			</motion.a>
			<motion.p
				className='font-reddit-sans mt-[1.25em] mb-[1.25em] text-white/85 leading-7'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				I am a Full-Stack Developer and Product Engineer from Lima, Peru, focused on designing and building web and mobile products from idea to production.
			</motion.p>
			<motion.p
				className='font-reddit-sans mt-[1.25em] mb-[1.25em] text-white/85 leading-7'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				Rather than being defined by a specific technology stack, I focus on how software is structured, how its components interact, and how technical decisions translate into reliable, maintainable products. I enjoy working across the entire development lifecycle—from designing architectures and APIs to building interfaces, integrating external services, and optimizing applications for real-world use.
			</motion.p>
			<motion.p
				className='font-reddit-sans mt-[1.25em] mb-[1.25em] text-white/85 leading-7'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				My background started in analytics and data science with Python, which gave me a strong foundation in problem solving, algorithms, and working with data. That path eventually led me toward software engineering and product development, where I found a stronger interest in turning ideas into complete, usable systems. Along the way, I built and published open-source financial analysis libraries, including{' '}
				<a
					className='font-bold'
					href='https://github.com/SebastianUrdaneguiBisalaya/py-portfolio-analytics'
					rel='noreferrer'
					target='_blank'
				>
					pyportfolioanalytics{' '}
				</a>
				<a className='font-bold underline' href='https://pepy.tech/projects/pyportfolioanalytics?timeRange=threeMonths&category=version&includeCIDownloads=true&granularity=weekly&viewType=line&versions=Total%2C0.*' rel='noreferrer' target='_blank'>with over 2.6K downloads</a>, and{' '}
				<a
					className='font-bold'
					href='https://github.com/SebastianUrdaneguiBisalaya/py-financial-analysis'
					rel='noreferrer'
					target='_blank'
				>
					pyFinancialAnalysis{' '}
				</a>
				<a className='font-bold underline' href='https://pepy.tech/projects/pyfinancialanalysis?timeRange=threeMonths&category=version&includeCIDownloads=true&granularity=weekly&viewType=line&versions=Total%2C1.*' rel='noreferrer' target='_blank'>with over 2.4K downloads</a>.
			</motion.p>
			<motion.p
				className='font-reddit-sans mt-[1.25em] mb-[1.25em] text-white/85 leading-7'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				Today, I work primarily with modern JavaScript/TypeScript ecosystems and Python, building applications that involve APIs, databases, authentication, third-party integrations, automation, real-time communication, and AI-powered features. I’m particularly interested in multi-tenant SaaS architectures, developer tooling, and products that solve practical problems for businesses and users.
			</motion.p>
			<motion.p
				className='font-reddit-sans mt-[1.25em] mb-[1.25em] text-white/85 leading-7'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				I’m driven by the idea of building software that goes beyond working code: products that are simple to use, technically sound, and capable of growing with the people who depend on them.
			</motion.p>
			<motion.h2
				className='text-left font-sora text-white/95 text-lg w-full mt-[1.25em] mb-[1.25em] leading-7'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				Experience
			</motion.h2>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<a className='font-bold font-sora underline' href='https://membi.dev' target='_blank'>
						membi —  Co-Founder
					</a>{' '}
					<span className='font-light italic'>
						| May 2026 – August 2026 · SaaS · B2B2C
					</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Built a multi-tenant SaaS platform that enables businesses to create subscription plans, manage customers, track consumption, and provide subscription-based experiences.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Designed and implemented core application architecture across the frontend and backend, including tenant isolation, authentication and authorization, relational data models, REST APIs, subscription workflows, and integrations with external services.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Focused on building the product as a scalable foundation rather than a collection of isolated features, with clear boundaries between organizations, branches, users, customers, roles, permissions, and business operations.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<span className='font-bold font-sora'>
						Full-Stack Developer — Formula, Marketing Agency
					</span>{' '}
					<span className='font-light italic'>| October 2025 – August 2026</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Develop and maintain production web applications for the real estate sector, working across frontend architecture, backend integrations, performance, and automation.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Build applications with Next.js, React, TypeScript, and Node.js, using SSR and SSG where appropriate to balance performance, SEO, and user experience.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Design and integrate REST APIs, structure reusable application components, and maintain scalable codebases within collaborative development workflows.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Also designed and implemented an AI-powered chatbot using n8n and LLM-based services, integrating automation and conversational capabilities into business workflows.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<span className='font-bold font-sora'>aiblabla</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Built an AI-powered real-time communication platform designed to understand, translate, and formulate responses during conversations.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Led the technical direction of the product, working across real-time communication, AI integrations, speech processing, frontend and backend architecture, and product development.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<a
						className='font-bold font-sora underline'
						href='https://github.com/SebastianUrdaneguiBisalaya/suscripto.manager'
						target='_blank'
					>
						suscripto.manager
					</a>{' '}
					<span className='font-light italic'>| August 2025</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Built a web application for organizing and managing personal subscriptions in a centralized interface.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<a
						className='font-bold font-sora underline'
						href='https://github.com/SebastianUrdaneguiBisalaya/emotify.ai'
						target='_blank'
					>
						emotify.ai
					</a>{' '}
					<span className='font-light italic'>| August 2025</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Built an AI-powered music recommendation platform integrating generative AI with Spotify to generate personalized recommendations based on user preferences and context.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<a
						className='font-bold font-sora underline'
						href='https://github.com/SebastianUrdaneguiBisalaya/kooko-ai-frontend'
						target='_blank'
					>
						kooko.ai
					</a>{' '}
					<span className='font-light italic'>| June 2025</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Built an AI-powered document processing workflow that allows users to send photos through Telegram, automatically extract structured information, and make the resulting data available through a web dashboard.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<a
						className='font-bold font-sora underline'
						href='https://drive.google.com/file/d/1m6yJws18WElIgCyvGVjreQMW86qtawWD/view'
						target='_blank'
					>
						1<sup>st</sup> Place — Hackathon Huancavelica Vida Segura
					</a>{' '}
					<span className='font-light italic'>| March 2025</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Developed an MVP focused on improving child health monitoring in Huancavelica.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					The solution connected parents and healthcare personnel through a mobile application, providing access to check-ups and vaccination records, automated alerts, and auditory translation into Quechua.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<span className='font-bold font-sora'>
						Full-Stack Developer — Make It Real Camp
					</span>{' '}
					<span className='font-light italic'>| August – December 2024</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Designed and developed a complete event discovery and ticketing platform covering both frontend and backend architecture.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Implemented event search, advanced filtering, date-based queries, and ticket purchasing through Stripe, using React, TypeScript, TailwindCSS, Node.js, Express, SQL, and REST APIs.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<a
						className='font-bold font-sora underline'
						href='https://drive.google.com/file/d/1PgR3nWq_D70cUymndbIIoMdnuadQaPiG/view'
						target='_blank'
					>
						4<sup>th</sup> Place — Datathon Exprésate Perú con Datos
					</a>{' '}
					<span className='font-light italic'>| September 2023</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Analyzed national-level data related to rest days resulting from occupational accidents as part of a competition organized by the Secretariat of Government and Digital Transformation of Peru.
				</p>
			</motion.div>
			<motion.div
				className='w-full mt-[1.25em] mb-[1.25em]'
				initial='hidden'
				variants={paragraphVariants}
				viewport={{ amount: 0.3, once: true }}
				whileInView="visible"
			>
				<p className='font-reddit-sans leading-7 text-white/85'>
					-{' '}
					<span className='font-bold font-sora'>
						Business Strategy Intern — Treasury, Banco de Crédito del Perú
					</span>{' '}
					<span className='font-light italic'>| January 2023 – May 2024</span>
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Designed and automated business processes within the Treasury area, focusing on client contactability, goal tracking, and financial operations.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Built automated workflows that monitored client exchange-rate targets and notified the team when targets were reached, supporting approximately PEN 500K in transaction volume over four months.
				</p>
				<p className='font-reddit-sans leading-7 text-white/85 mt-2'>
					Also designed an enablement workflow to validate client requirements for financial derivatives operations.
				</p>
			</motion.div>
		</main>
	);
}
