'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // next-themes' pre-hydration FOUC-prevention script triggers a React 19
      // warning; text/plain client-side (after it already ran as real JS
      // server-side) satisfies it without disabling the fix.
      scriptProps={{
        type: typeof window === 'undefined' ? 'text/javascript' : 'text/plain',
      }}
    >
      {children}
    </NextThemesProvider>
  )
}
