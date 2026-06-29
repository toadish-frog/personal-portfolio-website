'use client'
import { useRef, useState } from "react"
import Image from "next/image"
import aboutMe from "app/data/aboutMe.json"
import { useIsVisible } from "app/utils/isVisible"

export function AboutMe() {

    const [isEnglish, setIsEnglish] = useState(true);

    //Toggle EN and CH
    const toggleEN = () => {
        setIsEnglish(prevState => !prevState);
    }

    const refAll = useRef(null);
    const isVisibleAll = useIsVisible(refAll);

    return (
        <section ref={refAll}
            className={`relative w-full fade-section ${isVisibleAll ? "opacity-100" : "opacity-0"}`}>

            <div className={`mt-20 w-32 h-32 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 flex-shrink-0 mr-8 relative
            `}>
                {/* Headshot photos */}
                <Image
                    src={"/profile/profile_pic_1.png"}
                    alt='Headshot'
                    fill={true}
                    style={{ aspectRatio: '1/1', objectFit: "cover" }}
                    sizes='50%'
                    priority={true}
                    onContextMenu={(e) => e.preventDefault()}
                />
            </div>
            <div className="flex justify-between items-start">
                <h1 className="mb-8 mt-8 text-2xl font-semibold tracking-tighter">
                    {/* Conditionally rending text based on language */}
                    {isEnglish ? "Hello" : "▶︎•၊၊||၊|။||||။ ၊|• 6:07"}
                </h1>

                <button
                    onClick={toggleEN}
                    className="px-2 py-1 
                    bg-zinc-500
                    text-white text-sm rounded-md shadow-md hover:bg-red-600">
                    {isEnglish ? "Unrender Reality" : "back"}
                </button>
            </div>

            <div className="mb-4">
                {/* Introduction */}
                {aboutMe.map((line, idx) => (
                    <div key={idx}>
                        {isEnglish ? (
                            line.front.split('*').map((sentence, index) => (
                                <p key={index}>{sentence.trim()}</p>
                            ))
                        ) : (
                            line.back.split("*").map((sentence, index) => (
                                <p key={index}>{sentence.trim()}</p>
                            ))
                        )}
                    </div>
                ))}
            </div>

        </section>
    )


}