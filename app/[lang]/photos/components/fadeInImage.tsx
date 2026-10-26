'use client'
import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from 'lib/utils'

// Stays transparent (showing the parent's neutral tile) until the bytes
// arrive, then fades and un-blurs in, instead of popping in all at once.
export function FadeInImage({ alt, className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      {...props}
      alt={alt}
      // Blocks dragging to the desktop and iOS long-press save (Copyright
      // Protection); screenshots and developer tools still work.
      draggable={false}
      onLoad={(event) => {
        setLoaded(true)
        onLoad?.(event)
      }}
      className={cn(
        'transition-[opacity,filter,scale] duration-700 ease-out [-webkit-touch-callout:none] motion-reduce:transition-none',
        loaded
          ? 'blur-0 scale-100 opacity-100'
          : 'scale-[1.02] opacity-0 blur-md',
        className,
      )}
    />
  )
}
