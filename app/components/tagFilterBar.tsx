'use client'

// Shared by photo/video/blog listings (was copy-pasted 3x). Selection-model
// agnostic — photos/video multi-select, blog single-select — the caller owns
// that logic; this only owns how a tag pill looks and behaves.
export function TagFilterBar({
  tags,
  isActive,
  onToggle,
  leadingButton,
}: {
  tags: string[]
  isActive: (tag: string) => boolean
  onToggle: (tag: string) => void
  leadingButton?: { label: string; active: boolean; onClick: () => void }
}) {
  return (
    <div className="mb-8 flex w-full justify-center">
      <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-1 rounded-full bg-stone-50 p-0.5 dark:bg-stone-900">
        {leadingButton && (
          <TagPill
            label={leadingButton.label}
            active={leadingButton.active}
            onClick={leadingButton.onClick}
          />
        )}
        {tags.map((tag) => (
          <TagPill
            key={tag}
            label={tag}
            active={isActive(tag)}
            onClick={() => onToggle(tag)}
          />
        ))}
      </div>
    </div>
  )
}

function TagPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`text-md flex-1 rounded-full px-4 py-2 font-semibold transition duration-300 ease-in-out ${
        active
          ? 'bg-red-600 text-white'
          : 'bg-transparent text-stone-800 hover:text-stone-600 dark:text-amber-50 dark:hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}
