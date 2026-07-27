'use client'

// Adapted from Aceternity UI's Encrypted Text effect
// (https://ui.aceternity.com/components/encrypted-text).
//
// The original seeds its initial scramble via Math.random() in a useRef
// initializer, which also runs during SSR — since the server and the
// client's independent first render would each roll different random
// characters, that's a guaranteed hydration mismatch (mismatched text in
// every character span). Fixed here by starting fully revealed (the real
// text — deterministic on both server and client) and only kicking off the
// scramble/reveal cycle in an effect, which runs client-side only, post-
// mount.

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { cn } from '@/lib/utils'

interface EncryptedTextProps {
  text: string
  className?: string
  /** Ms between revealing each subsequent real character. Lower = faster. */
  revealDelayMs?: number
  /** Custom character set for the gibberish effect. */
  charset?: string
  /** Ms between gibberish flips for unrevealed characters. Lower = jitterier. */
  flipDelayMs?: number
  /** Class applied to still-scrambled characters. */
  encryptedClassName?: string
  /** Class applied to already-revealed characters. */
  revealedClassName?: string
}

const DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?'

function generateRandomCharacter(charset: string): string {
  return charset.charAt(Math.floor(Math.random() * charset.length))
}

function generateGibberishPreservingSpaces(
  original: string,
  charset: string,
): string {
  let result = ''
  for (let i = 0; i < original.length; i += 1) {
    result += original[i] === ' ' ? ' ' : generateRandomCharacter(charset)
  }
  return result
}

export function EncryptedText({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  // Both start deterministic on the server and the client's first render
  // alike (fully revealed, no scramble chars generated yet) — the effect
  // below resets them and starts scrambling, but only once mounted
  // client-side. scrambleChars is state, not a ref, since it directly
  // drives rendered output (react-hooks/refs disallows reading ref values
  // during render).
  const [revealCount, setRevealCount] = useState(text.length)
  const [scrambleChars, setScrambleChars] = useState<string[]>(() =>
    Array(text.length).fill(' '),
  )
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef(0)
  const lastFlipTimeRef = useRef(0)

  useEffect(() => {
    if (!isInView) return

    startTimeRef.current = performance.now()
    lastFlipTimeRef.current = startTimeRef.current
    // Synchronizing local state with visibility becoming true, not a
    // response to a props/state change React could derive during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrambleChars(generateGibberishPreservingSpaces(text, charset).split(''))
    setRevealCount(0)

    let isCancelled = false

    const update = (now: number) => {
      if (isCancelled) return

      const elapsedMs = now - startTimeRef.current
      const totalLength = text.length
      const currentRevealCount = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
      )

      setRevealCount(currentRevealCount)

      if (currentRevealCount >= totalLength) {
        return
      }

      const timeSinceLastFlip = now - lastFlipTimeRef.current
      if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
        setScrambleChars((prev) =>
          prev.map((existing, index) =>
            index < currentRevealCount
              ? existing
              : text[index] === ' '
                ? ' '
                : generateRandomCharacter(charset),
          ),
        )
        lastFlipTimeRef.current = now
      }

      animationFrameRef.current = requestAnimationFrame(update)
    }

    animationFrameRef.current = requestAnimationFrame(update)

    return () => {
      isCancelled = true
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isInView, text, revealDelayMs, charset, flipDelayMs])

  if (!text) return null

  return (
    <span ref={ref} className={cn(className)} aria-label={text} role="text">
      {text.split('').map((char, index) => {
        const isRevealed = index < revealCount
        const displayChar = isRevealed ? char : (scrambleChars[index] ?? char)

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayChar}
          </span>
        )
      })}
    </span>
  )
}
