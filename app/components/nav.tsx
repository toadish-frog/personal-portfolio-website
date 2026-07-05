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
    name: 'video',
  },
  '/aboutme': {
    name: 'about',
  },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('')

  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIntersecting] = useState(true)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  })

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const handleMenuItemClick = () => {
    setIsOpen(false)
  }

  const refMiniBar = useRef(null)
  const isMiniVisible = useIsVisible(refMiniBar)
  return (
    <header ref={ref}>
      <nav id="nav" className="fade fixed top-0 z-50 w-full">
        <div
          className={`w-full border-b backdrop-blur backdrop-grayscale duration-200 lg:fixed lg:top-0 dark:backdrop-brightness-70 ${
            isIntersecting
              ? 'border-transparent bg-zinc-900/0 backdrop-grayscale-0'
              : 'border-zinc-800 bg-zinc-900/500 backdrop-grayscale'
          }`}
        >
          {/* toggle drop down menu */}
          <div className="flex items-center justify-between px-4 py-2 lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-zinc-600/0 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <Icon_CollapseIcon /> : <Icon_CrossIcon />}
            </button>
          </div>

          <div
            className={`space-x-4 pr-10 lg:flex lg:flex-row lg:pl-8 ${
              isOpen
                ? 'block opacity-100 transition-opacity duration-500 ease-in'
                : 'hidden lg:block'
            } container flex flex-row items-center pr-10 lg:block`}
          >
            {/* on collapsed or small screens */}
            <div
              ref={refMiniBar}
              className={`space-y-2 bg-gradient-to-tr from-zinc-800 via-zinc-600 to-stone-600 bg-clip-text text-transparent transition-opacity duration-700 ease-in lg:hidden dark:from-zinc-400 dark:via-zinc-100 dark:to-stone-300 ${isMiniVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  className="block px-4 py-2 text-lg transition-all duration-200 hover:text-neutral-800 dark:hover:text-neutral-200"
                  onClick={handleMenuItemClick}
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* on large screens */}
            <div className="hidden bg-gradient-to-b from-zinc-900 via-zinc-800 to-stone-50/50 bg-clip-text text-transparent lg:flex lg:items-center lg:space-x-4 dark:from-zinc-300 dark:via-zinc-100 dark:to-stone-800">
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  className="px-4 py-2 text-xl transition-all duration-500 hover:text-red-600 dark:hover:text-red-600"
                  onClick={handleMenuItemClick}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
