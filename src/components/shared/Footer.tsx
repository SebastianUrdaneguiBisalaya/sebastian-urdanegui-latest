export default function Footer() {
	return (
		<footer className='w-full flex flex-row items-center justify-between gap-4 py-6 mt-4 border-t border-white/10'>
			<span className='font-mono text-xs text-white/42'>Sebastian Urdanegui — Lima, PE</span>
			<a
				className='font-mono text-xs text-white/42 hover:text-white/70 transition-colors duration-300 ease-out'
				href='https://github.com/SebastianUrdaneguiBisalaya'
				rel='noopener noreferrer'
				target='_blank'
			>
				Source
			</a>
		</footer>
	);
}
