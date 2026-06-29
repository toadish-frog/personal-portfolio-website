import Image from "next/image"
import Link from "next/link";
import experienceData from 'app/data/experienceData.json'
import { Icon_CalendarHero, Icon_LocationIcon } from "public/icon";
import { useIsVisible } from "app/utils/isVisible";
import { useRef } from "react";

export function Experience() {

    const yearsWihMostRecentProjects: { [key: string]: any } = {};
    experienceData.forEach((exp) => {
        const year = exp.duration.split('-')[0].trim();
        if (!yearsWihMostRecentProjects[year]) {
            yearsWihMostRecentProjects[year] = exp;
        }
    })

    // Extract years and group experiences by year
    const experienceByYear = experienceData.reduce((acc: { [key: string]: any[] }, exp) => {
        const year = exp.duration.split('-')[0].trim();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(exp);
        return acc;
    }, {});

    const refAll = useRef(null);
    const isVisibleComp = useIsVisible(refAll);

    return (
        <section ref={refAll}
            className={`flex flex-row justify-center w-full fade-section ${isVisibleComp ? "opacity-100" : "opacity-0"}`}>
            <div className="containter lg:mx-auto space-y-6 justify-center w-full ">
                <h1 className='font-bond text-3xl text-left mb-4 mt-4'>
                    Experience
                </h1>
                {experienceData.map((exp, index) => {
                    const year = exp.duration.split('-')[0].trim();
                    const isMostRecentProject = yearsWihMostRecentProjects[year] === exp;
                    const isNotFirstInYear = experienceByYear[year].indexOf(exp) !== 0;
                    return (
                        // Card view for each experience item
                        <div key={index}
                            className="flex flex-col lg:flex-row overflow-hidden rounded-lg w-full card-hover my-8">
                            {/* Timeline */}
                            <div className="w-1/8 flex flex-col items-center">
                                {isMostRecentProject && (
                                    <>
                                        <div className="text-lg font-bold flex-shrink">{year}</div>
                                        <div className="flex-1 w-px bg-gray-300"></div>
                                    </>
                                )}
                                {isNotFirstInYear && (
                                    < div className='flex-1 w-px bg-gray-300'></div>
                                )}
                            </div>
                            {/* Experience Info */}
                            <div className="lg:w-1/2 p-4 flex flex-col justify-between lg:pr-8">
                                {/* Title */}
                                <h1 className="font-bold text-2xl mb-1 duration-500 hover:text-red-600">
                                    {exp.title}
                                </h1>
                                {/* Organization Name */}
                                <p className="mb-1 text-light">
                                    {exp.orgName}
                                </p>
                                {/* Duration */}
                                {/* Location */}
                                <div className="flex justify-between mb-2">
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
                                <div className="text-neutral-400">
                                    {exp.summary}
                                </div>
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
                                            style={{ aspectRatio: '3/2', width: '100%', height: '100%', maxHeight: '300px' }}
                                            className="grayscale z-0"
                                        />
                                        <Image
                                            src={exp.logo}
                                            alt={exp.title}
                                            width={100}
                                            height={150}
                                            className="absolute z-10 bottom-3 left-10"
                                            style={{ width: 'auto' }}
                                        />
                                    </div>
                                )}

                            </Link>
                            <hr className="lg:none text-zinc-700 dark:text-zinc-400 mt-4" />
                        </div>
                    )

                })}
            </div>
        </section >
    )
}