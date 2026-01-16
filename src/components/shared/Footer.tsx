export default function Footer() {
    return (
        <footer
            className="w-full flex flex-row items-center justify-between gap-4 py-4 border-t border-gray-500"
        >
            <span className="font-sora text-gray-400 text-xs">
                Sebastian Marat Urdanegui Bisalaya
            </span>
            <span className="font-sora text-gray-400 text-xs hover:text-gray-300 hover:underline cursor-pointer transition-all duration-500 ease-out">
                Source
            </span>
        </footer>
    )
}