import type { Dictionary } from '@/dictionaries'

export default function Footer({ labels }: { labels: Dictionary['footer'] }) {
  return (
    <footer className="page-section mt-8 mb-16 border-t border-black/10 pt-8 dark:border-white/10">
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {labels.license}
      </p>
    </footer>
  )
}
