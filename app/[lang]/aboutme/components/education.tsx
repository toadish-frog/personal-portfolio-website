import Image from 'next/image'
import Link from 'next/link'
import { useIsVisible } from 'app/utils/isVisible'
import { Icon_CalendarIcon, Icon_LocationIcon } from 'public/icon'
import educationData from 'app/data/educationData.json'
import { useRef } from 'react'

export function Education() {
  const refAll = useRef(null)
  const isVisibleComp = useIsVisible(refAll)

  return (
    <section
      ref={refAll}
      className={`fade-section flex w-full flex-row justify-center ${isVisibleComp ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="containter w-full justify-center space-y-6 lg:mx-auto">
        <h1 className="font-bond mt-4 mb-4 text-left text-3xl">Education</h1>
        {educationData.map((edu, index) => (
          // Card view for each education experience
          <div
            key={index}
            className="shawdow-md lg:card-hover flex w-full flex-col overflow-hidden rounded-lg shadow-lg lg:flex-row"
          >
            {/* Image of the school */}
            <Link href={edu.slug} className="w-full lg:w-1/2" target="_blank">
              {edu.image && (
                <div className="relative">
                  <Image
                    src={edu.image}
                    alt={edu.school}
                    width={300}
                    height={200}
                    className="z-0 h-full w-full object-cover grayscale"
                    style={{
                      aspectRatio: '3/2',
                      width: '100%',
                      height: '100%',
                      maxHeight: '300px',
                    }}
                  />
                  <Image
                    src={edu.logo}
                    alt={edu.school}
                    width={250}
                    height={150}
                    className="absolute bottom-5 left-5 z-10"
                    style={{ width: 'auto' }}
                  />
                </div>
              )}
            </Link>
            {/* School Info */}
            <div className="flex w-full flex-col justify-between p-4 lg:w-1/2">
              {/* School Name */}
              <h1 className="mb-2 text-center text-2xl font-bold duration-500 hover:text-red-600 lg:mt-0 lg:mb-0">
                <Link href={edu.slug} target="_blank">
                  {edu.school}
                </Link>
              </h1>
              {/* Education Achievment */}
              <div className="mb-2 text-center text-sm text-sky-500 lg:mb-0 dark:text-red-500">
                {Array.isArray(edu.title) ? (
                  edu.title.map((title, idx) => <p key={idx}>{title}</p>)
                ) : (
                  <p>{edu.title}</p>
                )}
              </div>
              {/* time and location */}
              <div className="mb-2 flex justify-between">
                <p className="flex items-center">
                  <Icon_CalendarIcon />
                  {edu.year}
                </p>
                <p className="flex items-center">
                  <Icon_LocationIcon />
                  {edu.location}
                </p>
              </div>
              {/* Summary */}
              <div className="truncate overflow-hidden text-center text-neutral-400">
                <ul>
                  {edu.summary.split(',').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
