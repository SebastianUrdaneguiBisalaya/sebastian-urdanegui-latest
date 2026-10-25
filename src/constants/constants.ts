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
];

const projectsList: Project[] = [
	{
		description: 'Keyboard shortcuts for the web that stay out of your way: combos, scopes, priorities and conflict resolution, in a framework-agnostic core with React bindings.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/usehotkeys',
		name: 'usehotkeys',
		skills: ['Monorepo', 'Typescript', 'Tsup', 'SDK', 'Vitest', 'Github Actions'],
		year: '2026',
	},
	{
		description:
			'Framework-independent authorization engine for the frontend: RBAC, ABAC, and ReBAC behind one evaluation API, plus a small reactive store. Zero runtime dependencies; runs in the browser and in Node.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/useguardrail',
		name: 'useguardrail',
		skills: ['Monorepo', 'Typescript', 'Tsup', 'SDK', 'Vitest', 'Github Actions'],
		year: '2026',
	},
	{
		description:
			'Upflowi orchestrates uploads — concurrency, chunking, multipart, retries, progress, pause/resume, cancellation, and resumable persistence — without shipping a UI, without locking you into one storage backend, and without ever seeing your cloud credentials.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/upflowi',
		name: 'upflowi',
		skills: ['Monorepo', 'Typescript', 'Tsup', 'SDK', 'Vitest', 'Github Actions'],
		year: '2026',
	},
	{
		description: 'SaaS • B2B2C. Turn your customers into subscribers. Create subscription plans, track usage, and offer a complete experience to your customers from a single platform.',
		link: 'https://membi.dev',
		name: 'membi',
		skills: ['Nest.js', 'Next.js', 'React.js', 'TypeScript', 'TypeORM', 'Multi-Tenant', 'MercadoPago', 'Docker', 'DevOps'],
		year: '2026',
	},
	{
		description: 'A minimalist CLI password manager secured with local master key encryption and seamless clipboard integration.',
		link: 'https://www.npmjs.com/package/@stackvoid/vaultgen',
		name: 'vaultgen',
		skills: ['Node.js', 'TypeScript'],
		year: '2026',
	},
	{
		description: 'Modern React and Next.js hooks, unopinionated and focused on developer experience.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/vibehooks',
		name: 'vibehooks',
		skills: ['React.js', 'TypeScript', 'Hooks', 'Next.js', 'tsdown'],
		year: '2026',
	},
	{
		description:
			"A TypeScript library that provides two customizable React components inspired by GitHub's contribution tracker and Supabase's status tracking chart. Both components support light and dark themes out of the box, allowing you to easily adapt them to your design preferences.",
		link: 'https://www.npmjs.com/package/uikitly-react',
		name: 'uikitly',
		skills: ['React.js', 'TypeScript', 'Vite'],
		year: '2025',
	},
	{
		description: 'An AI-powered platform that understands, translates, and formulates real-time responses during conversations.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/ai-blabla-web-platform',
		name: 'aiblabla',
		skills: ['React.js', 'TailwindCSS', 'TypeScript', 'FastAPI', 'Supabase', 'Google Auth', 'APIs'],
		year: '2025',
	},
	{
		description: 'Back-end infrastructure that supports the kooko.ai front-end.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/kooko-ai-backend',
		name: 'kooko.ai',
		skills: ['Python', 'Supabase', 'Gemini AI'],
		year: '2025',
	},
	{
		description: 'Front-end. Forget about paperwork. Send a photo to our Telegram bot, and our AI model will extract the data, making it available on the web dashboard.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/kooko-ai-frontend',
		name: 'kooko.ai',
		skills: ['React.js', 'TailwindCSS', 'TypeScript', 'Supabase'],
		year: '2025',
	},
	{
		description: 'Front-end & Back-end. An AI-powered web platform for music recommendations integrated with Spotify.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/emotify.ai',
		name: 'emotify.ai',
		skills: ['React.js', 'TailwindCSS', 'TypeScript', 'AI SDK', 'Spotify API', 'Next.js'],
		year: '2025',
	},
	{
		description: 'Front-end & Back-end. A web platform to organize all your subscriptions in one place.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/suscripto.manager',
		name: 'suscripto.manager',
		skills: ['React.js', 'TailwindCSS', 'TypeScript', 'Route Handlers', 'Supabase', 'Google Auth', 'Next.js'],
		year: '2025',
	},
	{
		description: 'Back-end infrastructure that supports the exploryq front-end.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/exploryq-backend',
		name: 'exploryq',
		skills: ['Express.js', 'TypeScript', 'Supabase', 'Prisma', 'Render'],
		year: '2024',
	},
	{
		description: 'Front-end. A web platform that allows users to view different events occuring in their area.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/exploryq-platform',
		name: 'exploryq',
		skills: ['React.js', 'TailwindCSS', 'TypeScript'],
		year: '2024',
	},
	{
		description: 'Automate stock market analysis and portfolio performance reporting in Python, including price trends, returns, volatility, correlation matrices, and financial reports.',
		link: 'https://github.com/SebastianUrdaneguiBisalaya/py-portfolio-analytics',
		name: 'py-portfolio-analytics',
		skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'ReportLab'],
		year: '2022',
	},
	{
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
		description: 'A practical guide to RBAC, ABAC and ReBAC checks in React and Next.js with useguardrail, from first permission to server-side enforcement.',
		link: '/blog/frontend-authorization-with-useguardrail',
		name: 'Frontend authorization with useguardrail',
		skills: ['TypeScript', 'React', 'Next.js', 'RBAC', 'ABAC', 'ReBAC'],
		year: '2026',
	},
	{
		description: 'A practical guide to shortcuts, scopes, priorities and user-customizable keymaps in React and Next.js with usehotkeys.',
		link: '/blog/keyboard-shortcuts-with-usehotkeys',
		name: 'Keyboard shortcuts with usehotkeys',
		skills: ['TypeScript', 'React', 'Next.js', 'Hooks', 'Accessibility'],
		year: '2026',
	},
];

export { blogList, navigationsPaths, projectsList };
