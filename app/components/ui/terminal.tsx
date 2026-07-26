'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePrefersReducedMotion } from 'app/utils/usePrefersReducedMotion'

interface TerminalLine {
  command: string
  output: string[]
}

const USERNAME = 'guest@yxyang'
const TYPING_SPEED_MS = 45
const OUTPUT_LINE_DELAY_MS = 150
const DELAY_BETWEEN_COMMANDS_MS = 600
const CURSOR_BLINK_MS = 530

type Phase = 'typing' | 'executing' | 'outputting' | 'pausing' | 'done'

type TokenType =
  | 'command'
  | 'flag'
  | 'string'
  | 'number'
  | 'operator'
  | 'path'
  | 'default'

interface Token {
  type: TokenType
  value: string
}

function tokenizeBash(text: string): Token[] {
  const tokens: Token[] = []
  const words = text.split(/(\s+)/)
  let isFirstWord = true

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: 'default', value: word })
      continue
    }
    if (word.startsWith('--') || word.startsWith('-')) {
      tokens.push({ type: 'flag', value: word })
      isFirstWord = false
      continue
    }
    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: 'string', value: word })
      isFirstWord = false
      continue
    }
    if (/^\d+$/.test(word)) {
      tokens.push({ type: 'number', value: word })
      isFirstWord = false
      continue
    }
    if (/^[|>&<]+$/.test(word)) {
      tokens.push({ type: 'operator', value: word })
      isFirstWord = true
      continue
    }
    if (word.includes('/') || word.startsWith('.') || word.startsWith('~')) {
      tokens.push({ type: 'path', value: word })
      isFirstWord = false
      continue
    }
    if (isFirstWord) {
      tokens.push({ type: 'command', value: word })
      isFirstWord = false
      continue
    }
    tokens.push({ type: 'default', value: word })
  }
  return tokens
}

const tokenColors: Record<TokenType, string> = {
  command: 'text-red-600 dark:text-red-400',
  flag: 'text-amber-600 dark:text-amber-400',
  string: 'text-teal-600 dark:text-teal-400',
  number: 'text-purple-600 dark:text-purple-400',
  operator: 'text-rose-600 dark:text-rose-400',
  path: 'text-sky-600 dark:text-sky-400',
  default: 'text-neutral-700 dark:text-neutral-300',
}

function SyntaxHighlightedText({ text }: { text: string }) {
  const tokens = tokenizeBash(text)
  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={tokenColors[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  )
}

function CursorSpan({ dim = false }: { dim?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-neutral-800 transition-opacity duration-100 dark:bg-neutral-200 ${
        dim ? 'opacity-0' : ''
      }`}
    />
  )
}

interface RenderedLine {
  type: 'command' | 'output'
  content: string
}

export function Terminal({ lines }: { lines: TerminalLine[] }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const contentRef = useRef<HTMLDivElement>(null)

  const [rendered, setRendered] = useState<RenderedLine[]>([])
  const [currentText, setCurrentText] = useState('')
  const [commandIdx, setCommandIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [outputIdx, setOutputIdx] = useState(-1)
  const [phase, setPhase] = useState<Phase>('typing')
  const [cursorVisible, setCursorVisible] = useState(true)

  const currentLine = lines[commandIdx]
  const currentCommand = currentLine?.command ?? ''
  const currentOutputs = useMemo(
    () => currentLine?.output ?? [],
    [currentLine],
  )
  const isLastCommand = commandIdx === lines.length - 1

  useEffect(() => {
    if (prefersReducedMotion || phase !== 'typing') return
    if (charIdx < currentCommand.length) {
      const t = setTimeout(() => {
        setCurrentText(currentCommand.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, TYPING_SPEED_MS)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase('executing')
  }, [phase, charIdx, currentCommand, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || phase !== 'executing') return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRendered((prev) => [
      ...prev,
      { type: 'command', content: currentCommand },
    ])
    setCurrentText('')
    if (currentOutputs.length > 0) {
      setOutputIdx(0)
      setPhase('outputting')
    } else {
      setPhase(isLastCommand ? 'done' : 'pausing')
    }
  }, [
    phase,
    currentCommand,
    currentOutputs.length,
    isLastCommand,
    prefersReducedMotion,
  ])

  useEffect(() => {
    if (prefersReducedMotion || phase !== 'outputting') return
    if (outputIdx >= 0 && outputIdx < currentOutputs.length) {
      const t = setTimeout(() => {
        setRendered((prev) => [
          ...prev,
          { type: 'output', content: currentOutputs[outputIdx] },
        ])
        setOutputIdx((i) => i + 1)
      }, OUTPUT_LINE_DELAY_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setPhase(isLastCommand ? 'done' : 'pausing')
    }, OUTPUT_LINE_DELAY_MS)
    return () => clearTimeout(t)
  }, [phase, outputIdx, currentOutputs, isLastCommand, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || phase !== 'pausing') return
    const t = setTimeout(() => {
      setCharIdx(0)
      setOutputIdx(-1)
      setCommandIdx((c) => c + 1)
      setPhase('typing')
    }, DELAY_BETWEEN_COMMANDS_MS)
    return () => clearTimeout(t)
  }, [phase, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(
      () => setCursorVisible((v) => !v),
      CURSOR_BLINK_MS,
    )
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [rendered, phase])

  // prefers-reduced-motion skips the whole typed sequence and shows
  // everything at once instead.
  const finalRendered = useMemo<RenderedLine[]>(
    () =>
      lines.flatMap((line) => [
        { type: 'command' as const, content: line.command },
        ...line.output.map((content) => ({
          type: 'output' as const,
          content,
        })),
      ]),
    [lines],
  )
  const displayedLines = prefersReducedMotion ? finalRendered : rendered

  const prompt = (
    <span className="text-neutral-500">
      <span className="text-emerald-600 dark:text-emerald-400">
        {USERNAME}
      </span>
      <span> $</span>{' '}
    </span>
  )

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-neutral-100 shadow-lg dark:bg-neutral-900">
      <div className="flex items-center gap-1.5 border-b border-black/10 bg-neutral-200 px-4 py-3 dark:border-white/10 dark:bg-neutral-800">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
      </div>

      <div
        ref={contentRef}
        className="h-64 overflow-y-auto p-5 font-mono text-sm"
      >
        {displayedLines.map((line, i) => (
          <div key={i} className="leading-relaxed whitespace-pre-wrap">
            {line.type === 'command' ? (
              <span>
                {prompt}
                <SyntaxHighlightedText text={line.content} />
              </span>
            ) : (
              <span className="text-neutral-700 dark:text-neutral-300">
                {line.content}
              </span>
            )}
          </div>
        ))}

        {!prefersReducedMotion && phase === 'typing' && (
          <div className="leading-relaxed whitespace-pre-wrap">
            {prompt}
            <SyntaxHighlightedText text={currentText} />
            <CursorSpan />
          </div>
        )}

        {(prefersReducedMotion ||
          phase === 'done' ||
          phase === 'pausing' ||
          phase === 'outputting') && (
          <div className="leading-relaxed whitespace-pre-wrap">
            {prompt}
            <CursorSpan dim={!prefersReducedMotion && !cursorVisible} />
          </div>
        )}
      </div>
    </div>
  )
}
