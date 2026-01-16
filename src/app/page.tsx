import Image from 'next/image';

export default function Page() {
  return (
    <main className='py-4'>
      <a
        className="flex justify-center sm:block cursor-pointer"
        href="https://www.linkedin.com/in/sebastianurdaneguibisalaya/"
        target="_blank"
      >
        <Image
          alt="Profile image"
          className="sm:float-right self-center mb-4 sm:ml-4 rounded-full"
          height={130}
          src="/image-profile.webp"
          width={130}
        />
      </a>
      <p className='font-reddit-sans mt-[1.25em] mb-[1.25em] text-gray-300'>
        I am a Full-Stack Developer, Data Analyst & Scientist from Lima, Peru.
        Currently, I specialize in creating web and mobile applications using
        modern stacks: React, React Native, Node.js and Python. My goal is clear:
        create products that impact a large number of people, combining my
        technical vision with a user-oriented mindset.
      </p>
      <p className='font-reddit-sans mt-[1.25em] mb-[1.25em] text-gray-300'>
        My journey began with analytics and data science in Python, where I gained
        a solid foundation in logic and algorithms. This experience inspired me to
        create my first two open-source libraries: <a
          className="underline"
          href="https://github.com/SebastianUrdaneguiBisalaya/py-portfolio-analytics"
          target="_blank">pyportfolioanalytics
        </a>
        <span className="font-bold">with over 2K downloads</span>, and <a
          className="underline"
          href="https://github.com/SebastianUrdaneguiBisalaya/py-financial-analysis"
          target="_blank">pyFinancialAnalysis</a>
        <span className="font-bold">with over 1.6K downloads</span>, tools designed to
        simplify financial analysis.
      </p>
      <p className='font-reddit-sans mt-[1.25em] mb-[1.25em] text-gray-300'>
        Driven by the desire to build comprehensive solutions, I expanded my skills through self-taught mobile development. This path of constant learning not only allowed me to master key technologies like JavaScript and React, but also led me to obtain a Full-Stack Developer scholarship, consolidating my training and my ability to adapt and grow in a constantly evolving technology environment.
      </p>
    </main>
  )
}