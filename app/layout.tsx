import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from 'app/components/theme-provider'
import { baseUrl } from './sitemap'

// Locale-specific title/description/OpenGraph metadata is set per-request in
// app/[lang]/layout.tsx (via generateMetadata reading the dictionary). This
// root layout only owns the parts that are truly locale-independent.
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(GeistSans.variable, GeistMono.variable)}
    >
      <body className="bg-white text-black antialiased dark:bg-black dark:text-white">
        {/* No <main> wrapper here — app/[lang]/layout.tsx owns it, wrapping
            only the actual per-page content (not the nav/footer chrome it
            renders alongside). app/not-found.tsx (the one page that bypasses
            [lang]/layout.tsx entirely) provides its own <main>. */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
