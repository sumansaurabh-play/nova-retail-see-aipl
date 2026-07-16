"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

type Keyframe = { x: number; y: number; opacity: number; scale: number }

type Card = {
  image: string
  initial: Keyframe
  descending: Keyframe
  exploded: Keyframe
  row: Keyframe
}

// Same choreography as the original template hero: a wall of imagery that
// fades in, descends, explodes outward, then settles into a drifting row —
// re-themed for the Nova Retail report and, crucially, without the scroll lock.
const cards: Card[] = [
  { image: "/images/1.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.75 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.95 }, exploded: { x: -3200, y: -280, opacity: 1, scale: 0.85 }, row: { x: -3200, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/2.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.8 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.9 }, exploded: { x: -2800, y: -200, opacity: 1, scale: 0.9 }, row: { x: -2800, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/3.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.85 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.88 }, exploded: { x: -2400, y: -150, opacity: 1, scale: 0.95 }, row: { x: -2400, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/4.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.8 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.85 }, exploded: { x: -2000, y: -100, opacity: 1, scale: 1.1 }, row: { x: -2000, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/5.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.78 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.82 }, exploded: { x: -1600, y: -120, opacity: 1, scale: 0.92 }, row: { x: -1600, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/6.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.82 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.8 }, exploded: { x: -1200, y: -180, opacity: 1, scale: 0.9 }, row: { x: -1200, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/7.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.8 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.78 }, exploded: { x: -800, y: -240, opacity: 1, scale: 0.88 }, row: { x: -800, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/9.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.8 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.72 }, exploded: { x: -400, y: 50, opacity: 1, scale: 0.83 }, row: { x: -400, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/10.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.7 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.68 }, exploded: { x: 0, y: -100, opacity: 1, scale: 0.82 }, row: { x: 0, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/11.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.8 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.65 }, exploded: { x: 400, y: -60, opacity: 1, scale: 0.8 }, row: { x: 400, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/12.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.72 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.5 }, exploded: { x: 800, y: 200, opacity: 1, scale: 0.78 }, row: { x: 800, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/13.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.74 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.6 }, exploded: { x: 1200, y: 150, opacity: 1, scale: 0.88 }, row: { x: 1200, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/16.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.8 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.58 }, exploded: { x: 1600, y: -120, opacity: 1, scale: 0.82 }, row: { x: 1600, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/17.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.8 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.52 }, exploded: { x: 2000, y: 180, opacity: 1, scale: 0.8 }, row: { x: 2000, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/18.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.72 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.5 }, exploded: { x: 2400, y: 100, opacity: 1, scale: 0.86 }, row: { x: 2400, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/19.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.8 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.48 }, exploded: { x: 2800, y: 140, opacity: 1, scale: 0.84 }, row: { x: 2800, y: 380, opacity: 1, scale: 1 } },
  { image: "/images/20.png", initial: { x: 0, y: 0, opacity: 0, scale: 0.68 }, descending: { x: 0, y: 250, opacity: 1, scale: 0.46 }, exploded: { x: 3200, y: 200, opacity: 1, scale: 0.82 }, row: { x: 3200, y: 380, opacity: 1, scale: 1 } },
]

const smoothstep = (t: number) => t * t * (3 - 2 * t)

export function DoomscrollIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const scrollProgressRef = useRef(0)
  const autoScrollOffsetRef = useRef(0)
  const animationRef = useRef<number>()

  useEffect(() => {
    const updateAnimations = () => {
      if (!containerRef.current) return

      // Update scroll progress
      const rect = containerRef.current.getBoundingClientRect()
      const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)
      scrollProgressRef.current = progress

      // Update card positions via direct DOM manipulation
      cardsRef.current.forEach((cardEl, index) => {
        if (!cardEl) return
        const card = displayCards[index]
        if (!card) return

        const style = getCardStyle(card, index)
        cardEl.style.transform = `translate(-50%, -50%) ${style.transform}`
        cardEl.style.opacity = String(style.opacity)
      })

      // Update auto-scroll offset
      autoScrollOffsetRef.current -= 0.5
      if (scrollProgress >= 0.9) {
        cardsRef.current.forEach((cardEl, index) => {
          if (!cardEl) return
          const card = displayCards[index]
          if (!card) return
          const loopWidth = 6800
          const minX = -3400
          const rawPos = card.row.x + autoScrollOffsetRef.current
          const wrapped = (((rawPos - minX) % loopWidth) + loopWidth) % loopWidth
          const x = wrapped + minX
        })
      }

      animationRef.current = requestAnimationFrame(updateAnimations)
    }

    animationRef.current = requestAnimationFrame(updateAnimations)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const displayCards = isMobile ? cards.slice(0, 7) : cards

  const getCardStyle = (card: Card, index: number) => {
    const scrollProgress = scrollProgressRef.current
    let x = card.initial.x
    let y = card.initial.y
    let opacity = 0
    let scale = card.initial.scale
    const isLateCard = index >= 8

    if (scrollProgress > 0 && scrollProgress <= 0.35) {
      const progress = Math.min(scrollProgress / 0.35, 1)
      const delay = index * 0.05
      const adjusted = Math.max(0, Math.min((progress - delay) * 2, 1))
      opacity = isLateCard ? 0 : adjusted
    }

    if (scrollProgress > 0.35 && scrollProgress <= 0.55) {
      const eased = smoothstep(Math.min((scrollProgress - 0.35) / 0.2, 1))
      x = 0
      y = card.descending.y * eased
      scale = card.initial.scale + (card.descending.scale - card.initial.scale) * eased
      opacity = isLateCard ? Math.min(eased * 2, 1) : 1
    }

    if (scrollProgress > 0.55) {
      const eased = smoothstep(Math.min((scrollProgress - 0.55) / 0.2, 1))
      x = card.descending.x + (card.exploded.x - card.descending.x) * eased
      y = card.descending.y + (card.exploded.y - card.descending.y) * eased
      scale = card.descending.scale + (card.exploded.scale - card.descending.scale) * eased
      opacity = 1
    }

    if (scrollProgress > 0.75) {
      const eased = smoothstep(Math.min((scrollProgress - 0.75) / 0.25, 1))
      x = card.exploded.x + (card.row.x - card.exploded.x) * eased
      y = card.exploded.y + (card.row.y - card.exploded.y) * eased
      scale = card.exploded.scale + (card.row.scale - card.exploded.scale) * eased
      opacity = card.row.opacity
    }

    if (scrollProgress >= 0.9 && !isMobile) {
      const loopWidth = 6800
      const minX = -3400
      const rawPos = card.row.x + autoScrollOffsetRef.current
      const wrapped = (((rawPos - minX) % loopWidth) + loopWidth) % loopWidth
      x = wrapped + minX
      const fadeEdge = 2800
      const fadeWidth = 400
      if (x < -fadeEdge) opacity = Math.max(0, 1 - (-fadeEdge - x) / fadeWidth)
      else if (x > fadeEdge) opacity = Math.max(0, 1 - (x - fadeEdge) / fadeWidth)
      else opacity = 1
    }

    return { transform: `translate(${x}px, ${y}px) scale(${scale})`, opacity }
  }

  const scrollProgress = scrollProgressRef.current
  const logoOpacity = scrollProgress < 0.5 ? 1 - (scrollProgress - 0.4) * 5 : 0
  const titleOpacity = scrollProgress > 0.5 ? (scrollProgress - 0.5) * 2 : 0

  return (
    <div className="bg-primary text-primary-foreground">
      <div ref={containerRef} className="relative" style={{ height: "760vh" }}>
        <div className="sticky top-0 flex items-center justify-center overflow-hidden bg-primary text-primary-foreground" style={{ height: "100vh" }}>
          {/* Center stage for cards */}
          <div className="relative" style={{ width: "600px", height: "600px", perspective: "1000px" }}>
            {displayCards.map((card, index) => (
              <figure
                key={card.image}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  opacity: 0,
                  width: "300px",
                  height: "300px",
                  transition: "none",
                }}
              >
                <img
                  src={card.image}
                  alt="report visual"
                  className="h-full w-full rounded-lg object-cover"
                />
              </figure>
            ))}

            {/* Center content */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              {/* Opening lockup */}
              <div
                className="absolute inset-0 flex items-center justify-center px-6 text-center"
                style={{
                  opacity: Math.max(0, logoOpacity),
                  transform: `scale(${scrollProgress < 0.5 ? 1 - scrollProgress * 0.2 : 0.8})`,
                  transition: "opacity 0.2s, transform 0.2s",
                }}
              >
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-editorial text-accent">
                    A Strategic Report
                  </span>
                  <h1 className="mt-5 font-serif text-6xl leading-none tracking-tight md:text-8xl">Nova Retail</h1>
                  <p className="mt-4 text-lg text-primary-foreground/50 md:text-xl">Customer Segmentation &amp; Targeting</p>
                </div>
              </div>

              {/* Resolved title + scroll cue */}
              <div
                className="absolute inset-0 flex items-center justify-center px-6 text-center"
                style={{
                  opacity: Math.max(0, titleOpacity),
                  transform: `scale(${scrollProgress > 0.5 ? 0.85 + (scrollProgress - 0.5) * 0.3 : 0.85}) translateY(-${scrollProgress > 0.75 ? (scrollProgress - 0.75) * 40 : 0}vh)`,
                  transition: "opacity 0.2s, transform 0.2s",
                }}
              >
                <div className="max-w-3xl">
                  <h2 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
                    880 customers. One question.
                  </h2>
                  <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/60">
                    Where should Nova concentrate its retention, loyalty, and premium-service investment? Scroll to
                    follow the evidence.
                  </p>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            {scrollProgress < 0.1 && (
              <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 animate-in fade-in duration-500">
                <div className="flex animate-bounce flex-col items-center gap-2 text-sm text-primary-foreground/50">
                  <span>Keep scrolling</span>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            )}
          </div>

          {/* Extra content sections (below hero) */}
          <div className="relative bg-primary text-primary-foreground">
            {/* Roadmap or additional content can be added here */}
          </div>
        </div>
      </div>
    </div>
  )
}
