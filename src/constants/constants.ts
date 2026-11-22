import { type Blog } from '@/components/blog/Card';
import { type Project } from '@/components/projects/Card';

const navigationsPaths = [
	{
		name: 'About',
		slug: '/',
	},
	{
		name: 'Projects',
		slug: '/projects',
	},
	{
		name: 'Blog',
		slug: '/blog',
	},
	{
		name: 'Activity',
		slug: '/activity',
	},
];

const projectsList: Project[] = [
	{
		category: 'Full-stack',
		description:
			'A local-first desktop calendar for macOS, Windows and Linux. No account, no cloud, no tracking: your calendars live in a database on your own computer, and Tempi works the same with or without a connection.',
		link: 'https://tempi.sebastianurdanegui.com',
		name: 'tempi',
		skills: ['Typescript', 'React.js', 'Next.js', 'Electron', 'SQLite', 'Bun', 'GitHub Actions', 'Google Calendar API', 'Monorepo'],
		year: '2026',
	},
	{
		category: 'Packages',
		description:
			'Animated weather backgrounds for the web. Drifting clouds, falling rain and snow, a glowing sun, a realistic moon and twinkling stars. Pass a condition through props and get a full-screen animated sky behind your UI.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/useweather',
		name: 'useweather',
		skills: ['Typescript', 'React.js', 'Weather Forecast', 'UI', 'GitHub Actions', 'Monorepo'],
		year: '2026',
	},
	{
		category: 'Packages',
		description: 'A personal hub of agent skills, designed for my own workflow and installable into several coding agents (Claude Code, Codex, Cursor, Gemini).',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/skillstack',
		name: 'skillstack',
		skills: ['Agents', 'Skills'],
		year: '2026',
	},
	{
		category: 'Packages',
		description: 'Typed, storage-free SDKs for third-party integrations, with authentication shared across all of them.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/usemeshly',
		name: 'usemeshly',
		skills: ['TypeScript', 'Zod', 'Sdk', 'Third Party Integrations', 'GitHub Actions', 'Monorepo'],
		year: '2026',
	},
	{
		category: 'Packages',
		description:
			'A prop-driven, Google Calendar-style calendar component for React, built with Tailwind CSS v4. Business-logic agnostic, fully customizable, and designed for seamless integration.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/usecalendar',
		name: 'usecalendar',
		skills: ['Typescript', 'React.js', 'TailwindCSS', 'GitHub Actions', 'Monorepo'],
		year: '2026',
	},
	{
		category: 'Packages',
		description: 'Tiny, synthesized UI sounds for React and the web. Ticks, pops, taps, toggles and success/error cues, generated live with the Web Audio API.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/usesounds',
		name: 'usesounds',
		skills: ['Typescript', 'React.js', 'Tsup', 'Bun', 'GitHub Actions', 'Monorepo'],
		year: '2026',
	},
	{
		category: 'Full-stack',
		description:
			'Get Organized, Never Compromise, Hustle Efficiently. A personal productivity app for a single user: it turns messy work into concrete, executable progress and helps decide what to do, when and how.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/usegonche',
		name: 'gonche',
		skills: ['Typescript', 'Hono.js', 'React.js', 'Vite', 'Vitest', 'Electron', 'Next.js', 'PostgreSQL', 'Docker', 'Monorepo'],
		year: '2026',
	},
	{
		category: 'Full-stack',
		description: 'An open source alternative to Bitly. Custom domains, click analytics, QR codes and password-protected links, with no plans, usage caps or third party holding your data.',
		link: 'https://useshortly.sebastianurdanegui.com/',
		name: 'shortly',
		skills: ['Go', 'Swagger', 'SQLite', 'Typescript', 'React.js', 'Vite', 'Vitest', 'Electron', 'Astro', 'MCP', 'Docker', 'Monorepo'],
		year: '2026',
	},
	{
		category: 'Packages',
		description: 'Keyboard shortcuts for the web that stay out of your way: combos, scopes, priorities and conflict resolution, in a framework-agnostic core with React bindings.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/usehotkeys',
		name: 'usehotkeys',
		skills: ['Monorepo', 'Typescript', 'Tsup', 'SDK', 'Vitest', 'Github Actions'],
		year: '2026',
	},
	{
		category: 'Packages',
		description:
			'Framework-independent authorization engine for the frontend: RBAC, ABAC, and ReBAC behind one evaluation API, plus a small reactive store. Zero runtime dependencies; runs in the browser and in Node.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/useguardrail',
		name: 'useguardrail',
		skills: ['Monorepo', 'Typescript', 'Tsup', 'SDK', 'Vitest', 'Github Actions'],
		year: '2026',
	},
	{
		category: 'Packages',
		description:
			'Upflowi orchestrates uploads — concurrency, chunking, multipart, retries, progress, pause/resume, cancellation, and resumable persistence — without shipping a UI, without locking you into one storage backend, and without ever seeing your cloud credentials.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/upflowi',
		name: 'upflowi',
		skills: ['Monorepo', 'Typescript', 'Tsup', 'SDK', 'Vitest', 'Github Actions'],
		year: '2026',
	},
	{
		category: 'Full-stack',
		description: 'SaaS • B2B2C. Turn your customers into subscribers. Create subscription plans, track usage, and offer a complete experience to your customers from a single platform.',
		link: 'https://membi.dev',
		name: 'membi',
		skills: ['Nest.js', 'Next.js', 'React.js', 'TypeScript', 'TypeORM', 'Multi-Tenant', 'MercadoPago', 'Docker', 'DevOps'],
		year: '2026',
	},
	{
		category: 'Packages',
		description: 'A minimalist CLI password manager secured with local master key encryption and seamless clipboard integration.',
		link: 'https://www.npmjs.com/package/@stackvoid/vaultgen',
		name: 'vaultgen',
		skills: ['Node.js', 'TypeScript'],
		year: '2026',
	},
	{
		category: 'Packages',
		description: 'Modern React and Next.js hooks, unopinionated and focused on developer experience.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/vibehooks',
		name: 'vibehooks',
		skills: ['React.js', 'TypeScript', 'Hooks', 'Next.js', 'tsdown'],
		year: '2026',
	},
	{
		category: 'Packages',
		description:
			"A TypeScript library that provides two customizable React components inspired by GitHub's contribution tracker and Supabase's status tracking chart. Both components support light and dark themes out of the box, allowing you to easily adapt them to your design preferences.",
		link: 'https://www.npmjs.com/package/uikitly-react',
		name: 'uikitly',
		skills: ['React.js', 'TypeScript', 'Vite'],
		year: '2025',
	},
	{
		category: 'Full-stack',
		description: 'An AI-powered platform that understands, translates, and formulates real-time responses during conversations.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/ai-blabla-web-platform',
		name: 'aiblabla',
		skills: ['React.js', 'TailwindCSS', 'TypeScript', 'FastAPI', 'Supabase', 'Google Auth', 'APIs'],
		year: '2025',
	},
	{
		category: 'Full-stack',
		description: 'Back-end infrastructure that supports the kooko.ai front-end.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/kooko-ai-backend',
		name: 'kooko.ai — backend',
		skills: ['Python', 'Supabase', 'Gemini AI'],
		year: '2025',
	},
	{
		category: 'Full-stack',
		description: 'Front-end. Forget about paperwork. Send a photo to our Telegram bot, and our AI model will extract the data, making it available on the web dashboard.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/kooko-ai-frontend',
		name: 'kooko.ai — frontend',
		skills: ['React.js', 'TailwindCSS', 'TypeScript', 'Supabase'],
		year: '2025',
	},
	{
		category: 'Full-stack',
		description: 'Front-end & Back-end. An AI-powered web platform for music recommendations integrated with Spotify.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/emotify.ai',
		name: 'emotify.ai',
		skills: ['React.js', 'TailwindCSS', 'TypeScript', 'AI SDK', 'Spotify API', 'Next.js'],
		year: '2025',
	},
	{
		category: 'Full-stack',
		description: 'Front-end & Back-end. A web platform to organize all your subscriptions in one place.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/suscripto.manager',
		name: 'suscripto.manager',
		skills: ['React.js', 'TailwindCSS', 'TypeScript', 'Route Handlers', 'Supabase', 'Google Auth', 'Next.js'],
		year: '2025',
	},
	{
		category: 'Full-stack',
		description: 'Back-end infrastructure that supports the exploryq front-end.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/exploryq-backend',
		name: 'exploryq — backend',
		skills: ['Express.js', 'TypeScript', 'Supabase', 'Prisma', 'Render'],
		year: '2024',
	},
	{
		category: 'Full-stack',
		description: 'Front-end. A web platform that allows users to view different events occuring in their area.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/exploryq-platform',
		name: 'exploryq — frontend',
		skills: ['React.js', 'TailwindCSS', 'TypeScript'],
		year: '2024',
	},
	{
		category: 'Data',
		description: 'Automate stock market analysis and portfolio performance reporting in Python, including price trends, returns, volatility, correlation matrices, and financial reports.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/py-portfolio-analytics',
		name: 'py-portfolio-analytics',
		skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'ReportLab'],
		year: '2022',
	},
	{
		category: 'Data',
		description:
			'A Python package for stock market analysis, providing company data, statistical metrics, interactive visualizations, and financial dashboards to support investment decisions with minimal code.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/py-financial-analysis',
		name: 'py-financial-analysis',
		skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
		year: '2022',
	},
];

const blogList: Blog[] = [
	{
		description: 'A practical guide to animated weather backgrounds in React and Next.js with useweather, from a single condition prop to live forecasts, reduced motion and performance.',
		link: '/blog/weather-backgrounds-with-useweather',
		name: 'Weather backgrounds with useweather',
		project: 'useweather',
		skills: ['TypeScript', 'React', 'Next.js', 'Canvas', 'Performance'],
		year: '2026',
	},
	{
		description: 'What usemeshly is and how it works: typed, storage-free SDKs for third-party APIs, with one shared authentication package and one error type across every integration.',
		link: '/blog/third-party-integrations-with-usemeshly',
		name: 'Third-party integrations with usemeshly',
		project: 'usemeshly',
		skills: ['TypeScript', 'Node.js', 'OAuth 2.0', 'Zod', 'SDK'],
		year: '2026',
	},
	{
		description: 'A practical guide to month, week and day calendars in React and Next.js with usecalendar, from the first render to drag-to-edit, theming and real benchmark numbers.',
		link: '/blog/calendar-ui-with-usecalendar',
		name: 'Calendar UIs with usecalendar',
		project: 'usecalendar',
		skills: ['TypeScript', 'React', 'Next.js', 'Temporal', 'Performance'],
		year: '2026',
	},
	{
		description: 'A practical guide to synthesized interface sounds in React and Next.js with usesounds, from a single data-sound attribute to custom voices, samples and SSR.',
		link: '/blog/ui-sounds-with-usesounds',
		name: 'UI sounds with usesounds',
		project: 'usesounds',
		skills: ['TypeScript', 'React', 'Next.js', 'Web Audio API', 'Accessibility'],
		year: '2026',
	},
	{
		description: 'A practical guide to RBAC, ABAC and ReBAC checks in React and Next.js with useguardrail, from first permission to server-side enforcement.',
		link: '/blog/frontend-authorization-with-useguardrail',
		name: 'Frontend authorization with useguardrail',
		project: 'useguardrail',
		skills: ['TypeScript', 'React', 'Next.js', 'RBAC', 'ABAC', 'ReBAC'],
		year: '2026',
	},
	{
		description: 'A practical guide to shortcuts, scopes, priorities and user-customizable keymaps in React and Next.js with usehotkeys.',
		link: '/blog/keyboard-shortcuts-with-usehotkeys',
		name: 'Keyboard shortcuts with usehotkeys',
		project: 'usehotkeys',
		skills: ['TypeScript', 'React', 'Next.js', 'Hooks', 'Accessibility'],
		year: '2026',
	},
	{
		description: 'A walkthrough of pyFinancialAnalysis, a Python package that turns stock prices into growth, risk metrics, charts and a financial dashboard in a few lines.',
		link: '/blog/stock-analysis-with-pyfinancialanalysis',
		name: 'Stock analysis with pyFinancialAnalysis',
		project: 'py-financial-analysis',
		skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
		year: '2022',
	},
	{
		description: 'A walkthrough of pyportfolioanalytics, from closing prices and log returns to correlation matrices, a buy and sell simulation and an automatic PDF report.',
		link: '/blog/portfolio-reports-with-pyportfolioanalytics',
		name: 'Portfolio reports with pyportfolioanalytics',
		project: 'py-portfolio-analytics',
		skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'ReportLab'],
		year: '2022',
	},
];

/** Stack by area, with where each one is used in practice. Grouped so the reader sees how the tools fit together. */
const stackGroups: { label: string; note: string; items: string[] }[] = [
	{
		items: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Vite', 'React Native', 'Electron'],
		label: 'Frontend',
		note: 'Production apps with SSR and SSG for performance and SEO, plus mobile and desktop builds.',
	},
	{
		items: ['Node.js', 'Nest.js', 'Express.js', 'Hono.js', 'FastAPI', 'Go', 'Python'],
		label: 'Backend',
		note: 'REST APIs, auth, integrations, real-time features, and multi-tenant SaaS architecture.',
	},
	{
		items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'n8n', 'LLM APIs'],
		label: 'Data & automation',
		note: 'Pipelines and internal tools that cut the time spent on manual data extraction.',
	},
	{
		items: ['PostgreSQL', 'Supabase', 'Prisma', 'TypeORM', 'SQLite', 'Docker'],
		label: 'Data & infrastructure',
		note: 'Schema design, authentication, and containerized deployments.',
	},
	{
		items: ['Vitest', 'Monorepo', 'tsup', 'Swagger', 'GitHub Actions'],
		label: 'Testing & tooling',
		note: 'Monorepos, SDKs, and CI pipelines that keep the code tested before it ships.',
	},
];

export { blogList, navigationsPaths, projectsList, stackGroups };
