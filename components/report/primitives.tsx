import type { ReactNode } from "react"
import { Reveal } from "./reveal"

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-editorial text-accent">
      {children}
    </span>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
}) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-muted-foreground">{index}</span>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-5 max-w-4xl text-balance font-serif text-3xl leading-[1.08] tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{lede}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Stat({
  value,
  label,
  sub,
}: {
  value: string
  label: string
  sub?: string
}) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-4xl leading-none tracking-tight text-foreground md:text-5xl">{value}</span>
      <span className="mt-3 text-sm font-medium text-foreground">{label}</span>
      {sub && <span className="mt-1 text-sm leading-relaxed text-muted-foreground">{sub}</span>}
    </div>
  )
}

export function Divider() {
  return <div className="mx-auto h-px w-full max-w-6xl bg-border" />
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-6 py-24 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
