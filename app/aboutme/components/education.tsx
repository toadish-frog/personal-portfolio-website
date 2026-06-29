import Image from "next/image"
import Link from "next/link";
import { useIsVisible } from "app/utils/isVisible";
import { Icon_CalendarIcon, Icon_LocationIcon } from "public/icon";
import educationData from "app/data/educationData.json"
import { useRef } from "react";

export function Education() {
    const refAll = useRef(null);
    const isVisibleComp = useIsVisible(refAll);

    return (
        <section
            ref={refAll}
            className={`flex flex-row justify-center w-full fade-section ${isVisibleComp ? "opacity-100" : "opacity-0"}`}>
            <div className="containter lg:mx-auto space-y-6 justify-center w-full">
                <h1 className='font-bond text-3xl text-left mb-4 mt-4'>
                    Education
                </h1>
                {educationData.map((edu, index) => (
                    // Card view for each education experience
                    <div
                        key={index}
                        className="flex flex-col lg:flex-row shawdow-md rounded-lg overflow-hidden w-full lg:card-hover shadow-lg">
                        {/* Image of the school */}
                        <Link href={edu.slug} className="w-full lg:w-1/2" target="_blank">
                            {edu.image && (
                                <div className="relative">
                                    <Image
                                        src={edu.image}
                                        alt={edu.school}
                                        width={300}
                                        height={200}
                                        className="w-full h-full object-cover grayscale z-0"
                                        style={{ aspectRatio: '3/2', width: '100%', height: '100%', maxHeight: '300px' }}

                                    />
                                    <Image
                                        src={edu.logo}
                                        alt={edu.school}
                                        width={250}
                                        height={150}
                                        className="z-10 bottom-5 left-5 absolute"
                                        style={{ width: 'auto' }}
                                    />
                                </div>
                            )}
                        </Link>
                        {/* School Info */}
                        <div className="lg:w-1/2 w-full p-4 flex flex-col justify-between">
                            {/* School Name */}
                            <h1 className="text-center font-bold text-2xl mb-2 lg:mb-0 lg:mt-0 
                            duration-500 hover:text-red-600">
                                <Link href={edu.slug} target="_blank">
                                    {edu.school}
                                </Link>
                            </h1>
                            {/* Education Achievment */}
                            <div className="text-sky-500 dark:text-red-500 text-center mb-2 lg:mb-0 text-sm">
                                {Array.isArray(edu.title) ? (
                                    edu.title.map((title, idx) => (
                                        <p key={idx}>{title}</p>
                                    ))
                                ) : (
                                    <p>{edu.title}</p>
                                )}
                            </div>
                            {/* time and location */}
                            <div className="flex justify-between mb-2">
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
                            <div className="overflow-hidden text-neutral-400 truncate text-center">
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
        </section >
    )
}