import { Reveal } from "./reveal"

const PHASES = [
  {
    year: "Year 1",
    title: "Anchor the target",
    focus: "Prove the segment, secure the base",
    actions: [
      "Score the full base with the age × income model to flag Cluster 3 members and look-alikes",
      "Reallocate retention and loyalty budget toward the high-value segment",
      "Launch concierge-grade service and advisory touchpoints for top-decile customers",
    ],
  },
  {
    year: "Year 2",
    title: "Build the difference",
    focus: "Own trust, advice, and post-purchase",
    actions: [
      "Stand up expert product guidance and assisted-buying journeys in-store and in-app",
      "Formalise post-purchase support as the signature of the Nova relationship",
      "Convert Cluster 1 look-alikes with technology-led, advice-first engagement",
    ],
  },
  {
    year: "Year 3",
    title: "Compound the position",
    focus: "Separate from Croma & Reliance Digital",
    actions: [
      "Extend the trusted-advisor model across categories and life-stage journeys",
      "Institutionalise the model into the operating rhythm and quarterly board review",
      "Measure and defend the trust premium against the mid-market cluster",
    ],
  },
]

export function Roadmap() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
      {PHASES.map((p, i) => (
        <Reveal key={p.year} delay={i * 90}>
          <div className="flex h-full flex-col bg-card p-7">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-editorial text-accent">{p.year}</span>
              <span className="font-serif text-3xl leading-none text-border">0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-serif text-2xl tracking-tight text-foreground">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.focus}</p>
            <ul className="mt-6 flex flex-1 flex-col gap-4 border-t border-border pt-5">
              {p.actions.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
