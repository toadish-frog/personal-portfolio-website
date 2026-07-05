import { notFound } from 'next/navigation'

// Catch-all for any URL under [lang] that doesn't match a real page.
// Without this, Next's automatic 404 fallback for genuinely-unmatched paths
// doesn't reliably carry the x-locale header proxy.ts stamps on pass-through,
// so app/[lang]/not-found.tsx can't tell which language to render. Routing
// unmatched paths through a real page in the [lang] segment first (which then
// calls notFound() itself) fixes that.
export default function CatchAll() {
  notFound()
}
