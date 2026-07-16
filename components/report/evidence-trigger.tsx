'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Maximize2 } from 'lucide-react'

interface EvidenceTriggerProps {
  label?: string
  imageUrl: string
  imageAlt: string
  caption?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export function EvidenceTrigger({
  label = 'Evidence',
  imageUrl,
  imageAlt,
  caption,
  side = 'top',
}: EvidenceTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Track if component is mounted to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle positioning
  const updatePosition = useCallback(() => {
    if (!isMounted || !isOpen || !triggerRef.current || !popoverRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popoverRect = popoverRef.current.getBoundingClientRect()
    const gap = 12

    let top = 0
    let left = 0

    // Calculate position based on side
    switch (side) {
      case 'top':
        top = triggerRect.top - popoverRect.height - gap
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
        break
      case 'bottom':
        top = triggerRect.bottom + gap
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
        break
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
        left = triggerRect.left - popoverRect.width - gap
        break
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
        left = triggerRect.right + gap
        break
    }

    // Prevent viewport overflow
    const padding = 16
    if (left < padding) left = padding
    if (left + popoverRect.width > window.innerWidth - padding) {
      left = window.innerWidth - popoverRect.width - padding
    }
    if (top < padding) top = padding
    if (top + popoverRect.height > window.innerHeight - padding) {
      top = window.innerHeight - popoverRect.height - padding
    }

    setPosition({ top, left })
  }, [isMounted, isOpen, side])

  // Update position when opening or window resizes
  useEffect(() => {
    if (!isMounted || !isOpen) return

    // Use requestAnimationFrame to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      updatePosition()
    }, 0)

    window.addEventListener('resize', updatePosition)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isMounted, isOpen, updatePosition])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-2.5 py-1 text-xs font-medium text-accent/80 transition-all hover:border-border hover:bg-background hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2"
        aria-label={`Show ${label}`}
        title={label}
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
      </button>

      {/* Popover - only render after hydration to avoid mismatch */}
      {isMounted && isOpen && (
        <div
          ref={popoverRef}
          style={{
            position: 'fixed',
            top: position ? `${position.top}px` : '0',
            left: position ? `${position.left}px` : '0',
            zIndex: 50,
          }}
          className="w-80 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-lg">
            {/* Image container */}
            <div className="relative aspect-auto max-h-96 w-full overflow-hidden bg-muted">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Caption */}
            {caption && (
              <div className="border-t border-border bg-card/50 px-4 py-3">
                <p className="text-xs leading-relaxed text-muted-foreground">{caption}</p>
              </div>
            )}

            {/* Footer with expand hint */}
            <div className="border-t border-border/50 bg-background px-4 py-2">
              <button
                onClick={() => {
                  // Open in modal/fullscreen
                  window.open(imageUrl, '_blank')
                }}
                className="flex w-full items-center justify-center gap-2 text-[11px] font-medium text-accent/60 transition-colors hover:text-accent"
              >
                <Maximize2 className="h-3 w-3" />
                <span>View full size</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
