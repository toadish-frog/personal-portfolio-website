'use client'
import Link from "next/link";
import React from "react";
import { useIsVisible } from "app/utils/isVisible";
import Particles from "./components/particles";
import { FadeText } from "app/utils/fadehovertext"
import { CurrentDateTime } from "app/utils/currentDateTime";
import { useRef } from "react";

const navigation = [
  { name: "About", href: "/aboutme" },
  { name: "Blog", href: "/blog" },
  { name: "Photo", href: "/photos" },
  { name: "Video", href: "/video" },

];

export default function Home() {
  const ref1 = useRef(null);
  const isVisible = useIsVisible(ref1);

  return (
    <div ref={ref1}
      className={`flex flex-col items-center justify-center w-screen h-screen overflow-hidden fade-section ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="hidden w-screen h-px md:block" />

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={300}
        color={{ r: 255, g: 10, b: 10 }}
      />

      <CurrentDateTime
        diyStyle="font-sans lg:text-7xl font-bold text-4xl text-red-600"
        year={true}
        hours={true}
        minutes={true}
        seconds={true} />

      <div className="mt-10 lg:mt-28 text-center">
        <div className="font-serif text-center font-bold 
        text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
        text-stone-800
        dark:text-stone-300
        mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 leading-tight">
          Had I not seen the Sun <br /> I could have borne the shade <br /> But Light a newer Wilderness <br /> My Wilderness has made
        </div>

      </div>

      {/* <div className="mt-8 lg:mb-8 mb-4 text-center ">
        <div className="font-serif text-center font-bold 
        text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl 
        text-stone-800
        dark:text-stone-300
        mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-14 leading-tight">
          “您是一个有趣的人吗？” <br />“我觉得我是”
        </div>
      </div> */}


      <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <div className="text-center ">
        <nav className="my-10 mb-24 ">
          <ul className="flex items-center justify-center gap-4 font-medium
              bg-gradient-to-tr text-transparent bg-clip-text
              from-zinc-800 via-zinc-600 to-stone-600
              dark:from-zinc-400 dark:via-zinc-100 dark:to-stone-300"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xl duration-500 hover:text-red-600"
              >
                {item.name}
              </Link>

            ))}
          </ul>
        </nav>
      </div>
    </div>
  );

}