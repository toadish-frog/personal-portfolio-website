'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Home, User, BookOpen, Camera, Video, Sun, Moon } from 'lucide-react'
import { LOCALE_NAMES, LOCALE_NAMES_COMPACT, type Locale } from '@/i18n'
import type { Dictionary } from '@/dictionaries'
import { cn } from 'lib/utils'

// Module scope, not component state: switching locale changes the [lang]
// route segment's value, which makes Next.js remount everything under
// app/[lang]/layout.tsx — including this component — even though visually
// nothing but translated text should change. That remount replayed the
// entrance animation on every single locale switch. A plain module-level
// flag (not React state) survives that remount, since navigating
// client-side never re-evaluates this module — only a hard page reload
// would reset it, which is exactly when the animation should play again.
let hasNavAnimatedOnce = false

export function Navbar({
  lang,
  labels,
}: {
  lang: Locale
  labels: Dictionary['nav']
}) {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  // Hydration-safe mount flag: resolvedTheme is unknown until after the
  // client mounts, so this deliberately renders a fallback icon on the
  // server and corrects it client-side — the standard next-themes pattern.
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  const shouldAnimateIn = !hasNavAnimatedOnce
  useEffect(() => {
    hasNavAnimatedOnce = true
  }, [])

  const otherLocale: Locale = lang === 'en' ? 'zh' : 'en'
  const otherLocalePath = pathname
    ? pathname.replace(`/${lang}`, `/${otherLocale}`)
    : `/${otherLocale}`

  const links = [
    { href: `/${lang}/aboutme`, label: labels.about, icon: User },
    { href: `/${lang}/blog`, label: labels.blog, icon: BookOpen },
    { href: `/${lang}/photos`, label: labels.photo, icon: Camera },
    { href: `/${lang}/video`, label: labels.video, icon: Video },
  ]

  return (
    // Mobile-first: floats near the bottom of the viewport on small screens
    // (below Tailwind's `md`, 768px — phones and portrait tablets), same as
    // this exact pill restored to the top on `md:` and up. Large-screen
    // design/behavior is untouched by these responsive overrides.
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:top-4 md:bottom-auto">
      <motion.nav
        initial={shouldAnimateIn ? { opacity: 0, y: -12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2 py-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/50"
      >
        <Link
          href={`/${lang}`}
          aria-label={labels.home}
          aria-current={pathname === `/${lang}` ? 'page' : undefined}
          className={cn(
            'rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10',
            pathname === `/${lang}` && 'text-red-600',
          )}
        >
          <Home className="h-5 w-5" />
        </Link>

        <div className="mx-1 h-5 w-px bg-black/10 dark:bg-white/10" />

        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={pathname === href ? 'page' : undefined}
            className={cn(
              'rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10',
              pathname === href && 'text-red-600',
            )}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}

        <div className="mx-1 h-5 w-px bg-black/10 dark:bg-white/10" />

        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          {mounted && resolvedTheme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <Link
          href={otherLocalePath}
          aria-label={`Switch to ${LOCALE_NAMES[otherLocale]}`}
          scroll={false}
          className="rounded-full px-2 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-black/5 sm:px-3 dark:hover:bg-white/10"
        >
          <span className="md:hidden">{LOCALE_NAMES_COMPACT[otherLocale]}</span>
          <span className="hidden md:inline">{LOCALE_NAMES[otherLocale]}</span>
        </Link>
      </motion.nav>
    </div>
  )
}
