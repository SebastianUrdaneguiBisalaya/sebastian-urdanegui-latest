export default function Navbar() {
	return (
		<nav className='w-full py-4 flex flex-col gap-2'>
			<h1 className='text-lg text-white font-sora text-center font-medium'>
				Sebastian Marat Urdanegui Bisalaya
			</h1>
			<h2 className='font-reddit-sans text-center text-gray-400 font-medium'>
				Full-Stack Developer & Data Analyst
			</h2>
			<div className='flex flex-row items-center justify-center gap-1 w-full pt-4'>
				<a
					className='opacity-50 flex flex-col items-center justify-center h-6 w-auto cursor-pointer hover:opacity-100 text-gray-300 transition-all duration-500 ease-out'
					href='https://www.linkedin.com/in/sebastianurdaneguibisalaya/'
					target='_blank'
				>
					<svg
						height='35'
						viewBox='0 0 20 20'
						width='35'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531c-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54c3.001 0 3.556 1.974 3.556 4.545zM4.447 6.194c-.954 0-1.72-.771-1.72-1.72s.767-1.72 1.72-1.72a1.72 1.72 0 0 1 0 3.44m1.484 10.85h-2.97V7.5h2.97zM18.522 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.44V1.44C20 .646 19.333 0 18.518 0z'
							fill='currentColor'
						></path>
					</svg>
				</a>
				<a
					className='opacity-50 flex flex-col items-center justify-center h-8 w-auto cursor-pointer hover:opacity-100 text-gray-300 transition-all duration-500 ease-out'
					href='https://github.com/SebastianUrdaneguiBisalaya'
					target='_blank'
				>
					<svg
						height='35'
						viewBox='0 0 24 24'
						width='35'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2'
							fill='currentColor'
						></path>
					</svg>
				</a>
				<a
					className='opacity-50 flex flex-col items-center justify-center h-6 w-auto cursor-pointer hover:opacity-100 text-gray-300 transition-all duration-500 ease-out'
					href='https://x.com/sebasurdaneguib'
					target='_blank'
				>
					<svg
						height='35'
						viewBox='0 0 14 14'
						width='35'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g fill='none'>
							<g clipPath='url(#IconifyId198beeb14fada8c171)'>
								<path
									d='M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z'
									fill='currentColor'
								></path>
							</g>
							<defs>
								<clipPath id='IconifyId198beeb14fada8c171'>
									<path d='M0 0h14v14H0z' fill='currentColor'></path>
								</clipPath>
							</defs>
						</g>
					</svg>
				</a>
				<a
					className='opacity-50 flex flex-col items-center justify-center h-6 w-auto cursor-pointer hover:opacity-100 text-gray-300 transition-all duration-500 ease-out'
					href='https://public.tableau.com/app/profile/sebastian.marat.urdanegui.bisalaya/vizzes'
					target='_blank'
				>
					<svg
						height='35'
						viewBox='0 0 24 24'
						width='35'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M11.654.174v2.203H9.682v.58h1.972V5.16h.696V2.957h1.97v-.58h-1.97V.174h-.348zm6.03 2.262l-.002 1.623v1.623h-2.957v.927h2.957v3.188h1.043l.011-1.582l.02-1.576l1.465-.02l1.46-.01v-.927h-2.953V2.436h-.522zm-12.407.06v3.19H2.291v.925h2.986v3.19h.985V6.61h3.013v-.925H6.262V2.496H5.77zm6.086 5.27v3.593H8.06v1.188h3.304v3.596h1.28v-3.596h3.309v-1.188h-3.31V7.766h-.637zm9.721 1.55v2.221h-2.012v.811h2.012v2.261h.887v-2.261H24v-.811h-2.029v-2.22h-.422zm-19.111.131v2.174H0v.621h1.973v2.194h.667v-2.194h2v-.62H2.609V9.446h-.318zm15.709 4.516v3.254h-3.016v.927h3.016v3.217h1.072v-3.216h2.986v-.928h-2.986v-3.254h-.533zm-12.463.008v3.246H2.262v.928h2.957v3.189H6.32v-3.189h2.955v-.928H6.32V13.97h-.55zm6.316 4.578l.002 1.103v1.1H9.566v.812h1.971v2.262h.928l.012-1.119l.017-1.143h1.969v-.812h-2v-2.203h-.465z'
							fill='currentColor'
						></path>
					</svg>
				</a>
				<a
					className='opacity-50 flex flex-col items-center justify-center h-6 w-auto cursor-pointer hover:opacity-100 text-gray-300 transition-all duration-500 ease-out'
					href='https://medium.com/@sebasurdanegui'
					target='_blank'
				>
					<svg
						height='35'
						viewBox='0 0 8 8'
						width='35'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M2 6C-.5 6-.5 2 2 2s2.5 4 0 4m3.5 0C4 6 4 2 5.5 2s1.5 4 0 4m2 0C7 6 7 2 7.5 2s.5 4 0 4'
							fill='currentColor'
						></path>
					</svg>
				</a>
			</div>
		</nav>
	);
}
