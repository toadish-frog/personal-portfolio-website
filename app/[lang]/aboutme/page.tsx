'use client'
import { Education } from 'app/[lang]/aboutme/components/education'
import { Experience } from 'app/[lang]/aboutme/components/experience'
import { AboutMe } from 'app/[lang]/aboutme/components/aboutMe'

export default function Page() {
  return (
    <section className="page-section">
      <AboutMe />
      <section className="my-4 snap-start divide-y divide-neutral-400">
        <div className="section-content-col">
          <Experience />
        </div>
        <div className="section-content-col">
          <Education />
        </div>
        <div className="section-content-col">{/* Projects */}</div>
      </section>
    </section>
  )
}
