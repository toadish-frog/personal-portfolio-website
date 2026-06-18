'use client'
import { Education } from 'app/aboutme/components/education'
import { Experience } from 'app/aboutme/components/experience'
import { AboutMe } from 'app/aboutme/components/aboutMe'

export default function Page() {

    return (
        <section className="antialiased max-w-6xl mx-2 mt-8 lg:mx-auto flex-auto min-w-0 mt-6 flex flex-col lg:px-4 px-2">
            <AboutMe />
            <section className='divide-y divide-neutral-400 my-4 snap-start'>
                <div className={`my-8 flex justify-center flex-col`}>
                    <Experience />
                </div>
                <div className={`my-8 flex justify-center flex-col`}>
                    <Education />
                </div>
                <div className='my-8 flex justify-center flex-col'>
                    {/* Projects */}
                </div>
            </section>

        </section>
    )
}
