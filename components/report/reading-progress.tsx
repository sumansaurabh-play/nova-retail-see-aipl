"use client"

import { useEffect, useRef } from "react"

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
  const progressRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!progressRef.current) return
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? scrollTop / height : 0
      progressRef.current.style.width = `${progress * 100}%`
    }
    
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update aria-current on all links
            if (navRef.current) {
              const links = navRef.current.querySelectorAll("a")
              links.forEach((link) => {
                const href = link.getAttribute("href")?.slice(1)
                if (href === entry.target.id) {
                  link.setAttribute("aria-current", "true")
                } else {
                  link.removeAttribute("aria-current")
                }
              })
            }
          }
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
          ref={progressRef}
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: "0%" }}
        />
      </div>

      {/* Left section rail — desktop only */}
      <nav
        ref={navRef}
        aria-label="Report sections"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
          >
            <span className="h-px w-4 transition-all duration-300 bg-border group-hover:w-6 group-hover:bg-foreground/40 aria-current:w-8 aria-current:bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-editorial transition-all duration-300 text-muted-foreground opacity-0 group-hover:opacity-100 aria-current:text-foreground aria-current:opacity-100">
              {s.label}
            </span>
          </a>
        ))}
      </nav>
    </>
  )
}
