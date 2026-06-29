'use client'
import { Education } from 'app/(main)/aboutme/components/education'
import { Experience } from 'app/(main)/aboutme/components/experience'
import { AboutMe } from 'app/(main)/aboutme/components/aboutMe'

export default function Page() {

    return (
        <section className="page-section">
            <AboutMe />
            <section className='divide-y divide-neutral-400 my-4 snap-start'>
                <div className="section-content-col">
                    <Experience />
                </div>
                <div className="section-content-col">
                    <Education />
                </div>
                <div className="section-content-col">
                    {/* Projects */}
                </div>
            </section>

        </section>
    )
}
