'use client'

import { useState } from 'react'
import { Maximize2, ChevronDown } from 'lucide-react'

interface EvidenceTriggerProps {
  label?: string
  imageUrl: string
  imageAlt: string
  caption?: string
  side?: 'bottom' | 'right'
}

export function EvidenceTrigger({
  label = 'Evidence',
  imageUrl,
  imageAlt,
  caption,
}: EvidenceTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-3 py-1.5 text-sm font-medium text-accent/80 transition-all hover:border-border hover:bg-background hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2"
        aria-label={`Show ${label}`}
        aria-expanded={isOpen}
      >
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Inline expandable content - always in DOM for hydration consistency */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-lg border border-border bg-background shadow-lg">
          {/* Image container */}
          <div className="relative w-full overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Caption */}
          {caption && (
            <div className="border-t border-border bg-card/50 px-4 py-3">
              <p className="text-sm leading-relaxed text-muted-foreground">{caption}</p>
            </div>
          )}

          {/* Footer with expand hint */}
          <div className="border-t border-border/50 bg-background px-4 py-2">
            <button
              onClick={() => window.open(imageUrl, '_blank')}
              className="flex w-full items-center justify-center gap-2 text-[13px] font-medium text-accent/60 transition-colors hover:text-accent"
            >
              <Maximize2 className="h-3 w-3" />
              <span>View full size</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
