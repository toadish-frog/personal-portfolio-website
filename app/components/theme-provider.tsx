'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // next-themes injects an inline <script> before hydration to apply the
      // right theme class pre-paint (avoids a flash of the wrong theme).
      // React 19 warns about script tags in the component tree; setting
      // type="text/plain" client-side (after it already ran server-side as
      // real JS) satisfies both without disabling the FOUC prevention.
      scriptProps={{
        type: typeof window === 'undefined' ? 'text/javascript' : 'text/plain',
      }}
    >
      {children}
    </NextThemesProvider>
  )
}
