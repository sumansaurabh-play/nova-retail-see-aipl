import { Reveal } from "./reveal"

const SEGMENTS = [
  {
    tag: "Cluster 1",
    n: "327",
    name: "Digital Convenience Seekers",
    priority: "Secondary",
    summary: "Moderate value, digitally active — the nurture opportunity.",
    evidence: [
      "Higher website, app, and digital-score activity",
      "Stronger range-score exploration across channels",
      "Lower store visits, transactions, and loyalty points",
    ],
    move: "Nurture through app- and web-led engagement; migrate toward higher-value behaviour.",
    primary: false,
  },
  {
    tag: "Cluster 2",
    n: "221",
    name: "Price-Sensitive Deal Seekers",
    priority: "Deprioritise",
    summary: "Smallest segment, lowest value — serve efficiently, do not over-invest.",
    evidence: [
      "Price importance centroid of 1.440 — the single most extreme signal in the model",
      "Lowest income, visits, and transactions",
      "Weakest NPS, service, and digital scores",
    ],
    move: "Hold back premium investment; serve efficiently at controlled cost.",
    primary: false,
  },
  {
    tag: "Cluster 3",
    n: "332",
    name: "Trust & Premium Seekers",
    priority: "Primary Target",
    summary: "Largest and most commercially attractive — the defensible growth engine.",
    evidence: [
      "Highest income (₹17.8 LPA) and annual spend (₹700,339)",
      "Highest loyalty points (6,757) and NPS (8.32)",
      "Strongest service score (8.24); lowest price sensitivity",
    ],
    move: "Concentrate retention, loyalty, and premium-service investment here.",
    primary: true,
  },
]

export function Segments() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {SEGMENTS.map((s, i) => (
        <Reveal key={s.tag} delay={i * 90}>
          <article
            className={`flex h-full flex-col rounded-lg border p-7 transition-colors ${
              s.primary
                ? "border-accent bg-accent/[0.05] shadow-[0_1px_0_0_var(--color-accent)]"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-editorial text-muted-foreground">
                {s.tag} · n={s.n}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  s.primary
                    ? "bg-accent text-accent-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {s.priority}
              </span>
            </div>

            <h3 className="mt-5 font-serif text-2xl tracking-tight text-foreground">{s.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>

            <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-border pt-5">
              {s.evidence.map((e) => (
                <li key={e} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                  <span
                    className={`mt-2 size-1.5 shrink-0 rounded-full ${s.primary ? "bg-accent" : "bg-foreground/40"}`}
                  />
                  {e}
                </li>
              ))}
            </ul>

            <p
              className={`mt-6 border-t pt-4 text-sm font-medium ${
                s.primary ? "border-accent/30 text-accent" : "border-border text-foreground"
              }`}
            >
              {s.move}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
