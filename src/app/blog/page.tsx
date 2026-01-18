import Card from '@/components/blog/Card';
import { blogList } from '@/constants/constants';

export default function Page() {
	return (
		<main className='pb-4'>
			<div className='flex flex-col items-start w-full gap-6'>
				{blogList.map((project, idx) => (
					<Card
						description={project.description}
						key={idx}
						link={project.link}
						name={project.name}
						skills={project.skills}
						year={project.year}
					/>
				))}
			</div>
		</main>
	);
}
