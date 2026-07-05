import Image from 'next/image'
import Link from 'next/link'
import experienceData from 'app/data/experienceData.json'
import { Icon_CalendarHero, Icon_LocationIcon } from 'public/icon'
import { useIsVisible } from 'app/utils/isVisible'
import { useRef } from 'react'

interface ExperienceItem {
  orgName: string
  title: string
  location: string
  duration: string
  summary: string
  slug: string
  logo?: string
  image?: string
}

export function Experience() {
  const yearsWihMostRecentProjects: Record<string, ExperienceItem> = {}
  experienceData.forEach((exp) => {
    const year = exp.duration.split('-')[0].trim()
    if (!yearsWihMostRecentProjects[year]) {
      yearsWihMostRecentProjects[year] = exp as ExperienceItem
    }
  })

  // Extract years and group experiences by year
  const experienceByYear = experienceData.reduce(
    (acc: Record<string, ExperienceItem[]>, exp) => {
      const year = exp.duration.split('-')[0].trim()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(exp as ExperienceItem)
      return acc
    },
    {},
  )

  const refAll = useRef(null)
  const isVisibleComp = useIsVisible(refAll)

  return (
    <section
      ref={refAll}
      className={`fade-section flex w-full flex-row justify-center ${isVisibleComp ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="containter w-full justify-center space-y-6 lg:mx-auto">
        <h1 className="font-bond mt-4 mb-4 text-left text-3xl">Experience</h1>
        {experienceData.map((exp, index) => {
          const year = exp.duration.split('-')[0].trim()
          const isMostRecentProject = yearsWihMostRecentProjects[year] === exp
          const isNotFirstInYear = experienceByYear[year].indexOf(exp) !== 0
          return (
            // Card view for each experience item
            <div
              key={index}
              className="card-hover my-8 flex w-full flex-col overflow-hidden rounded-lg lg:flex-row"
            >
              {/* Timeline */}
              <div className="flex w-1/8 flex-col items-center">
                {isMostRecentProject && (
                  <>
                    <div className="flex-shrink text-lg font-bold">{year}</div>
                    <div className="w-px flex-1 bg-gray-300"></div>
                  </>
                )}
                {isNotFirstInYear && (
                  <div className="w-px flex-1 bg-gray-300"></div>
                )}
              </div>
              {/* Experience Info */}
              <div className="flex flex-col justify-between p-4 lg:w-1/2 lg:pr-8">
                {/* Title */}
                <h1 className="mb-1 text-2xl font-bold duration-500 hover:text-red-600">
                  {exp.title}
                </h1>
                {/* Organization Name */}
                <p className="text-light mb-1">{exp.orgName}</p>
                {/* Duration */}
                {/* Location */}
                <div className="mb-2 flex justify-between">
                  <p className="flex items-center">
                    <Icon_CalendarHero />
                    {exp.duration}
                  </p>
                  <p className="flex items-center">
                    <Icon_LocationIcon />
                    {exp.location}
                  </p>
                </div>
                {/* Summary */}
                <div className="text-neutral-400">{exp.summary}</div>
              </div>
              {/* Image */}
              <Link href={exp.slug} className="w-full lg:w-1/2" target="_blank">
                {exp.image && (
                  <div className="relative">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      width={300}
                      height={300}
                      style={{
                        aspectRatio: '3/2',
                        width: '100%',
                        height: '100%',
                        maxHeight: '300px',
                      }}
                      className="z-0 grayscale"
                      priority={index === 0}
                    />
                    <Image
                      src={exp.logo}
                      alt={exp.title}
                      width={100}
                      height={150}
                      className="absolute bottom-3 left-10 z-10"
                      style={{ width: 'auto' }}
                      priority={index === 0}
                    />
                  </div>
                )}
              </Link>
              <hr className="lg:none mt-4 text-zinc-700 dark:text-zinc-400" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
