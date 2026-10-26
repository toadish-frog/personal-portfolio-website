import type { CSSProperties } from 'react'
import { thumbHashToAverageRGBA, thumbHashToDataURL } from 'thumbhash'

function decode(hash: string): Uint8Array | null {
  try {
    return Uint8Array.from(atob(hash), (c) => c.charCodeAt(0))
  } catch {
    return null
  }
}

const urls = new Map<string, string>()

// The prerendered HTML gets only the average colour: a full preview is a
// ~4 KB data URL, so 24 grid tiles would add ~100 KB to the page. The
// browser swaps in the full preview after hydration (`detailed`).
export function thumbHashStyle(
  hash: string | undefined,
  fit: 'cover' | 'contain',
  detailed: boolean,
): CSSProperties | undefined {
  const bytes = hash ? decode(hash) : null
  if (!hash || !bytes) return undefined
  try {
    const { r, g, b } = thumbHashToAverageRGBA(bytes)
    const color = `rgb(${[r, g, b].map((c) => Math.round(c * 255)).join(' ')})`
    if (!detailed) return { backgroundColor: color }
    let url = urls.get(hash)
    if (!url) {
      url = thumbHashToDataURL(bytes)
      urls.set(hash, url)
    }
    return {
      backgroundColor: fit === 'cover' ? color : undefined,
      backgroundImage: `url(${url})`,
      backgroundSize: fit,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  } catch {
    return undefined
  }
}
