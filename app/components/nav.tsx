'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Icon_CollapseIcon, Icon_CrossIcon } from 'public/icon'
import { useIsVisible } from 'app/utils/isVisible'

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/photos': {
    name: 'photo',
  },
  '/video': {
    name: 'video'
  },
  '/aboutme': {
    name: 'about'
  },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');

  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),);

    observer.observe(ref.current);
    return () => observer.disconnect();
  })

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleMenuItemClick = () => {
    setIsOpen(false);
  }

  const refMiniBar = useRef(null);
  const isMiniVisible = useIsVisible(refMiniBar);
  return (
    <header ref={ref}>
      <nav
        id='nav'
        className='fixed top-0 z-50 w-full fade'
      >
        <div
          className={`lg:fixed lg:top-0 w-full backdrop-blur backdrop-grayscale dark:backdrop-brightness-70 duration-200 border-b 
        ${isIntersecting
              ? "bg-zinc-900/0 border-transparent backdrop-grayscale-0"
              : "bg-zinc-900/500 border-zinc-800 backdrop-grayscale"}`}>
          {/* toggle drop down menu */}
          <div className="flex justify-between items-center px-4 py-2 lg:hidden">
            <button
               onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-zinc-600/0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Icon_CollapseIcon />
              ) : (
                <Icon_CrossIcon />
              )}
            </button>
          </div>


          <div
            className={`lg:pl-8 lg:flex lg:flex-row space-x-4 pr-10 
            ${isOpen
                ? 'block opacity-100 transition-opacity duration-500 ease-in'
                : 'hidden lg:block'} 
            lg:block container flex flex-row items-center pr-10
            `}>

            {/* on collapsed or small screens */}
            <div
              ref={refMiniBar}
              className={`lg:hidden space-y-2
              bg-gradient-to-tr text-transparent bg-clip-text
              from-zinc-800 via-zinc-600 to-stone-600
              dark:from-zinc-400 dark:via-zinc-100 dark:to-stone-300
              transition-opacity ease-in duration-700 ${isMiniVisible ? "opacity-100" : "opacity-0"}`}>
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  className="block text-lg transition-all hover:text-neutral-800 dark:hover:text-neutral-200 duration-200 py-2 px-4"
                  onClick={handleMenuItemClick}
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* on large screens */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4
            bg-gradient-to-b text-transparent bg-clip-text
            from-zinc-900 via-zinc-800 to-stone-50/50
            dark:from-zinc-300 dark:via-zinc-100 dark:to-stone-800
            ">
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  className="text-xl transition-all hover:text-red-600 dark:hover:text-red-600 duration-500 py-2 px-4"
                  onClick={handleMenuItemClick}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav >
    </header >
  )
}
