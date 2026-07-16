"use client"

import { useEffect, useState } from "react"

const SECTIONS = [
  { id: "problem", label: "01 — Problem" },
  { id: "data", label: "02 — Data" },
  { id: "insights", label: "03 — Insights" },
  { id: "method", label: "04 — Method" },
  { id: "segments", label: "05 — Segments" },
  { id: "validation", label: "06 — Validation" },
  { id: "position", label: "07 — Position" },
  { id: "recommendation", label: "08 — Strategy" },
  { id: "roadmap", label: "09 — Roadmap" },
  { id: "risks", label: "10 — Risks" },
  { id: "takeaway", label: "11 — Verdict" },
]

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<string>("problem")

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? scrollTop / height : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Top hairline progress */}
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Left section rail — desktop only */}
      <nav
        aria-label="Report sections"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
            aria-current={active === s.id ? "true" : undefined}
          >
            <span
              className={`h-px transition-all duration-300 ${
                active === s.id ? "w-8 bg-accent" : "w-4 bg-border group-hover:w-6 group-hover:bg-foreground/40"
              }`}
            />
            <span
              className={`font-mono text-[10px] uppercase tracking-editorial transition-all duration-300 ${
                active === s.id
                  ? "text-foreground opacity-100"
                  : "text-muted-foreground opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
          </a>
        ))}
      </nav>
    </>
  )
}
