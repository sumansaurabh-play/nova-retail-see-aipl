import { Reveal } from "./reveal"

const SEGMENTS = [
  {
    tag: "Cluster 1",
    n: "335",
    name: "Digitally Engaged",
    priority: "Secondary",
    summary: "Moderate value, high on channels.",
    evidence: [
      "Higher website, app, and digital-score activity",
      "Stronger range-score exploration",
      "Lower store visits, transactions, and loyalty points",
    ],
    move: "Nurture through app- and web-led engagement.",
    primary: false,
  },
  {
    tag: "Cluster 2",
    n: "216",
    name: "Price-Sensitive",
    priority: "Deprioritise",
    summary: "Low engagement, price-led.",
    evidence: [
      "Price importance centroid of +1.44 — the single most extreme signal in the model",
      "Lowest income, visits, and transactions",
      "Weakest NPS, service, and digital scores",
    ],
    move: "Hold back premium investment; serve efficiently.",
    primary: false,
  },
  {
    tag: "Cluster 3",
    n: "329",
    name: "High-Value Loyal",
    priority: "Primary Target",
    summary: "The defensible growth engine.",
    evidence: [
      "Highest income (₹17.0 LPA) and annual spend (₹688,601)",
      "Highest loyalty points (6,509) and NPS",
      "Strongest service score (8.2); lowest price sensitivity",
    ],
    move: "Concentrate retention, loyalty, and premium service here.",
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
