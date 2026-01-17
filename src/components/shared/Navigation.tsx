import Link from "next/link"

export default function Navigation() {
    return (
        <div className="fixed z-50 inset-x bottom-4 bg-[rgba(255,255,255,0.045)] border-t border-t-[rgba(255,255,255,0.4)] border-l border-l-[rgba(255,255,255,0.3)] shadow-[3px_3px_3px_rgba(0,0,0,0.089)] backdrop-blur-[10px] rounded-full w-fit self-center h-fit">
            <div className="flex flex-row items-center py-2 px-4 gap-2">
                <Link
                    className="font-sora font-medium text-sm leading-7 px-3 py-1 cursor-pointer hover:scale-[1.05] transition-all duration-500 ease-out text-gray-300 hover:text-white"
                    href='/'
                >
                    About
                </Link>
                <Link
                    className="font-sora font-medium text-sm leading-7 px-3 py-1 cursor-pointer hover:scale-[1.05] transition-all duration-500 ease-out text-gray-300 hover:text-white"
                    href='/projects'
                >
                    Projects
                </Link>
                <Link
                    className="font-sora font-medium text-sm leading-7 px-3 py-1 cursor-pointer hover:scale-[1.05] transition-all duration-500 ease-out text-gray-300 hover:text-white"
                    href='/blog'
                >
                    Blog
                </Link>
            </div>
        </div>
    )
}