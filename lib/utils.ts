import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fisher-Yates, in place. `array.sort(() => Math.random() - 0.5)` is a
// common but statistically biased shuffle — sort comparators aren't called a
// uniform number of times per pair (V8's TimSort makes fewer comparisons on
// partially-ordered runs), so some permutations end up far likelier than
// others. This is O(n) and provably uniform.
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
