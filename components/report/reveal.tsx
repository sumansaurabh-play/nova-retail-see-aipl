"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  /** delay in ms before the transition begins */
  delay?: number
  as?: "div" | "section" | "li" | "figure"
}

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as as "div"

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
