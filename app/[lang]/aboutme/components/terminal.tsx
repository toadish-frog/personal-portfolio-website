'use client'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from 'app/utils/usePrefersReducedMotion'

interface TerminalLine {
  command: string
  output: string[]
}

export function Terminal({ lines }: { lines: TerminalLine[] }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-neutral-900 shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-neutral-800 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="space-y-3 p-5 font-mono text-sm">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.25 }}
          >
            <div className="flex gap-2 text-green-400">
              <span aria-hidden="true">$</span>
              <span>{line.command}</span>
            </div>
            {line.output.map((text, outputIndex) => (
              <div key={outputIndex} className="pl-4 text-neutral-300">
                {text}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
