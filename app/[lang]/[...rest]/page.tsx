import { notFound } from 'next/navigation'

// Catch-all for unmatched [lang] URLs. Without it, they fall through to the
// root app/not-found.tsx, which bypasses [lang]/layout.tsx (no nav/footer).
export default function CatchAll() {
  notFound()
}
