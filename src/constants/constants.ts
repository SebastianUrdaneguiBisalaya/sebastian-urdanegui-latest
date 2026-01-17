import { type Project } from "@/components/projects/Card";

const navigationsPaths = [
    {
        name: "About",
        slug: "/"
    },
    {
        name: "Projects",
        slug: "/projects"
    },
    {
        name: "Blog",
        slug: "/blog"
    }
];

const projectsList: Project[] = [
    {
        description: "Modern, unopinionated React hooks with a focus on developer experience.",
        link: "https://vibehooks.sebastianurdanegui.com",
        name: "vibehooks",
        skills: ["React.js", "TypeScript", "Hooks", "Vite"],
        year: "2026"
    },
    {
        description: "A TypeScript library that provides two customizable React components inspired by GitHub's contribution tracker and Supabase's status tracking chart. Both components support light and dark themes out of the box, allowing you to easily adapt them to your design preferences.",
        link: "https://www.npmjs.com/package/uikitly-react",
        name: "uikitly",
        skills: ["React.js", "TypeScript", "Vite"],
        year: "2025"
    },
    {
        description: "A web platform to boost your conversations in any context. It understands, translates, and formulates clear and effective responses in real time, regardless of the situation. Ideal for sales, customer service, meetings, language learning, and more.",
        link: "https://aiblabla.com",
        name: "aiblabla",
        skills: ["React.js", "TailwindCSS", "TypeScript", "FastAPI", "Supabase", "Google Auth", "APIs"],
        year: "2025"
    },
    {
        description: "Back-end infrastructure that supports the kooko.ai front-end.",
        link: "https://github.com/SebastianUrdaneguiBisalaya/kooko-ai-backend",
        name: "kooko.ai",
        skills: ["Python", "Supabase", "Gemini AI"],
        year: "2025"
    },
    {
        description: "Front-end. Forget about paperwork. Send a photo to our Telegram bot, and our AI model will extract the data, making it available on the web dashboard.",
        link: "https://github.com/SebastianUrdaneguiBisalaya/kooko-ai-frontend",
        name: "kooko.ai",
        skills: ["React.js", "TailwindCSS", "TypeScript", "Supabase"],
        year: "2025"
    },
    {
        description: "Front-end & Back-end. An AI-powered web platform for music recommendations integrated with Spotify.",
        link: "https://github.com/SebastianUrdaneguiBisalaya/emotify.ai",
        name: "emotify.ai",
        skills: ["React.js", "TailwindCSS", "TypeScript", "AI SDK", "Spotify API", "Next.js"],
        year: "2025"
    },
    {
        description: "Front-end & Back-end. A web platform to organize all your subscriptions in one place.",
        link: "https://github.com/SebastianUrdaneguiBisalaya/suscripto.manager",
        name: "suscripto.manager",
        skills: ["React.js", "TailwindCSS", "TypeScript", "Route Handlers", "Supabase", "Google Auth", "Next.js"],
        year: "2025"
    },
    {
        description: "Back-end infrastructure that supports the exploryq front-end.",
        link: "https://github.com/SebastianUrdaneguiBisalaya/exploryq-backend",
        name: "exploryq",
        skills: ["Express.js", "TypeScript", "Supabase", "Prisma", "Render"],
        year: "2024"
    },
    {
        description: "Front-end. A web platform that allows users to view different events occuring in their area.",
        link: "https://github.com/SebastianUrdaneguiBisalaya/exploryq-platform",
        name: "exploryq",
        skills: ["React.js", "TailwindCSS", "TypeScript"],
        year: "2024"
    },
];

export { navigationsPaths, projectsList };