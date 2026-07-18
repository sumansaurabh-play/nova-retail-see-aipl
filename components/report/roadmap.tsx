import { Reveal } from "./reveal"

const PHASES = [
  {
    year: "Year 1",
    title: "Anchor the target",
    focus: "Prove the segment, secure the base",
    actions: [
      "Score the full base with the age × income model to flag Trust & Premium Seekers and look-alikes",
      "Reallocate retention and loyalty budget toward the high-value segment to focus resources",
      "Launch store-level Service Quality training and staffing (1-point improvement adds ₹5.87L/month in store revenue; model R² = 0.687)",
    ],
  },
  {
    year: "Year 2",
    title: "Build the difference",
    focus: "Own trust, advice, and post-purchase",
    actions: [
      "Stand up expert product guidance and assisted-buying journeys in-store and in-app",
      "Proactively build post-purchase support (extended consultations, advisory tiers for high-value customers)",
      "Maintain Local Marketing Spend (proven ~30% ROI: ₹1.295L returned per ₹1L spent to drive traffic)",
    ],
  },
  {
    year: "Year 3",
    title: "Compound the position",
    focus: "Separate from Croma & Reliance Digital",
    actions: [
      "Extend trusted-advisor model to digital channels (DigitalScore B = ₹6,502/point, p < .001 in customer regression)",
      "Evaluate a leaner, lower-cost service format for Price-Sensitive Deal Seekers to protect margins without abandonment",
      "Repeat perceptual mapping study in 12-18 months to verify brand separation and check trust/premium equity",
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
              <span className="font-mono text-[13px] uppercase tracking-editorial text-accent">{p.year}</span>
              <span className="font-serif text-4xl leading-none text-border">0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-serif text-3xl tracking-tight text-foreground">{p.title}</h3>
            <p className="mt-1 text-base text-muted-foreground">{p.focus}</p>
            <ul className="mt-6 flex flex-1 flex-col gap-4 border-t border-border pt-5">
              {p.actions.map((a) => (
                <li key={a} className="flex gap-3 text-base leading-relaxed text-foreground/90">
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
