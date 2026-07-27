import { notFound } from 'next/navigation'

// Catch-all for unmatched [lang] URLs. Without it, Next's automatic 404
// fallback doesn't reliably carry the x-locale header proxy.ts stamps, so
// not-found.tsx can't tell which language to render.
export default function CatchAll() {
  notFound()
}
