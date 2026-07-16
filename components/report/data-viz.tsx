import { Reveal } from "./reveal"

/* ------------------------------------------------------------------ */
/* Attitudinal importance — ranked bars (relative, ordinal)            */
/* ------------------------------------------------------------------ */

const ATTITUDES = [
  { label: "Convenience", weight: 94, dispersion: false },
  { label: "Range", weight: 86, dispersion: false },
  { label: "Technology", weight: 77, dispersion: false },
  { label: "Loyalty", weight: 71, dispersion: false },
  { label: "Service", weight: 63, dispersion: true },
  { label: "Premium", weight: 54, dispersion: true },
  { label: "Price", weight: 43, dispersion: true },
]

export function AttitudeBars() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 md:p-8">
      <div className="mb-6 flex items-end justify-between">
        <h3 className="font-serif text-2xl tracking-tight text-foreground">
          Relative importance, by attribute
        </h3>
        <span className="font-mono text-[13px] uppercase tracking-editorial text-muted-foreground">
          ranked mean
        </span>
      </div>
      <ul className="flex flex-col gap-4">
        {ATTITUDES.map((a, i) => (
          <Reveal as="li" key={a.label} delay={i * 50}>
            <div className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-base font-medium text-foreground">{a.label}</span>
              <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-foreground/80"
                  style={{ width: `${a.weight}%` }}
                />
              </div>
              {a.dispersion && (
                <span className="shrink-0 rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
                  high spread
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        Price, Service, and Premium show the widest dispersion — customer priorities are heterogeneous, not
        uniform. That variance is the direct mandate for segmentation over a single blanket strategy.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cluster-count selection table (k = 2..5)                            */
/* ------------------------------------------------------------------ */

const K_ROWS = [
  { k: "k = 2", sizes: "361 · 519", ratio: 17.6, selected: false },
  { k: "k = 3", sizes: "325 · 227 · 328", ratio: 24.5, selected: true },
  { k: "k = 4", sizes: "198 · 221 · 132 · 464", ratio: 27.5, selected: false },
  { k: "k = 5", sizes: "177 · 219 · 163 · 158 · 189", ratio: 29.9, selected: false },
]

export function ClusterSelection() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 border-b border-border px-6 py-3 font-mono text-[12px] uppercase tracking-editorial text-muted-foreground">
        <span>Solution</span>
        <span>Cluster sizes</span>
        <span className="text-right">Between / Total SS</span>
      </div>
      {K_ROWS.map((row) => (
        <div
          key={row.k}
          className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 ${
            row.selected ? "bg-accent/[0.06]" : ""
          } ${row.k !== "k = 5" ? "border-b border-border" : ""}`}
        >
          <span className="flex items-center gap-2 font-mono text-base text-foreground">
            {row.k}
            {row.selected && (
              <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
                selected
              </span>
            )}
          </span>
          <span className="text-sm text-muted-foreground">{row.sizes}</span>
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-secondary sm:block">
              <div
                className={`h-full rounded-full ${row.selected ? "bg-accent" : "bg-foreground/40"}`}
                style={{ width: `${(row.ratio / 30) * 100}%` }}
              />
            </div>
            <span
              className={`w-14 text-right font-mono text-sm ${
                row.selected ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {row.ratio.toFixed(1)}%
            </span>
          </div>
        </div>
      ))}
      <p className="border-t border-border px-6 py-4 text-base leading-relaxed text-muted-foreground">
        Explained variance keeps rising as clusters multiply — but the gain beyond{" "}
        <span className="font-medium text-foreground">k = 3</span> fragments three clean business stories without
        adding managerial meaning. Three balanced, interpretable segments win.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Logistic regression — odds ratios                                   */
/* ------------------------------------------------------------------ */

const PREDICTORS = [
  { label: "Income (per ₹1 LPA)", or: 2.0, p: "< .001", sig: true, note: "+100% odds" },
  { label: "Age (per year)", or: 1.05, p: "< .001", sig: true, note: "+5% odds" },
  { label: "Gender (M – F)", or: 1.17, p: ".447", sig: false, note: "not significant" },
  { label: "City Tier (2 – 1)", or: 1.12, p: ".652", sig: false, note: "not significant" },
  { label: "City Tier (3 – 1)", or: 1.09, p: ".747", sig: false, note: "not significant" },
]

export function OddsRatios() {
  const max = 2.2
  return (
    <div className="rounded-lg border border-border bg-card p-6 md:p-8">
      <div className="mb-6 flex items-end justify-between">
        <h3 className="font-serif text-2xl tracking-tight text-foreground">
          What predicts the high-value segment
        </h3>
        <span className="font-mono text-[13px] uppercase tracking-editorial text-muted-foreground">
          odds ratio
        </span>
      </div>
      <ul className="flex flex-col gap-5">
        {PREDICTORS.map((p, i) => (
          <Reveal as="li" key={p.label} delay={i * 50}>
            <div className="flex items-baseline justify-between gap-4">
              <span className={`text-base ${p.sig ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {p.label}
              </span>
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-[13px] text-muted-foreground">p {p.p}</span>
                <span
                  className={`font-mono text-base ${p.sig ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                >
                  {p.or.toFixed(2)}×
                </span>
              </span>
            </div>
            <div className="relative mt-2 h-2.5 overflow-hidden rounded-full bg-secondary">
              {/* baseline marker at OR = 1 */}
              <div
                className="absolute inset-y-0 z-10 w-px bg-foreground/30"
                style={{ left: `${(1 / max) * 100}%` }}
              />
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${p.sig ? "bg-accent" : "bg-foreground/25"}`}
                style={{ width: `${(p.or / max) * 100}%` }}
              />
            </div>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 border-t border-border pt-4 text-base leading-relaxed text-muted-foreground">
        The vertical marker is the no-effect line (1.0×). Only{" "}
        <span className="font-medium text-foreground">age and income</span> clear it decisively — geography and
        gender do not. Targeting can rest on two observable, defensible filters.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Perceptual map — brand positioning                                  */
/* ------------------------------------------------------------------ */

const BRANDS = [
  { name: "Nova", x: 46, y: 52, self: true },
  { name: "Croma", x: 52, y: 46 },
  { name: "Reliance Digital", x: 40, y: 44 },
  { name: "Amazon", x: 70, y: 70 },
  { name: "Flipkart", x: 74, y: 64 },
  { name: "Apple Store", x: 26, y: 20 },
]

export function PerceptualMap() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 md:p-8">
      <div className="mb-6 flex items-end justify-between">
        <h3 className="font-serif text-2xl tracking-tight text-foreground">Where Nova sits in the mind</h3>
        <span className="font-mono text-[13px] uppercase tracking-editorial text-muted-foreground">
          illustrative
        </span>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-lg">
        {/* quadrant grid */}
        <div className="absolute inset-0 rounded-md border border-border" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-border" />

        {/* axis labels */}
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full pb-2 font-mono text-[12px] uppercase tracking-editorial text-muted-foreground">
          Trust &amp; advice
        </span>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full pt-2 font-mono text-[12px] uppercase tracking-editorial text-muted-foreground">
          Transactional
        </span>
        <span className="absolute top-1/2 -left-2 -translate-x-full -translate-y-1/2 -rotate-90 font-mono text-[12px] uppercase tracking-editorial text-muted-foreground">
          Value
        </span>
        <span className="absolute top-1/2 -right-2 translate-x-full -translate-y-1/2 rotate-90 font-mono text-[12px] uppercase tracking-editorial text-muted-foreground">
          Premium
        </span>

        {BRANDS.map((b) => (
          <div
            key={b.name}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            <span
              className={`block rounded-full ${
                b.self
                  ? "size-4 bg-accent ring-4 ring-accent/20"
                  : "size-2.5 bg-foreground/45"
              }`}
            />
            <span
              className={`mt-2 whitespace-nowrap text-sm ${
                b.self ? "font-semibold text-accent" : "text-muted-foreground"
              }`}
            >
              {b.name}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-border pt-4 text-base leading-relaxed text-muted-foreground">
        Nova clusters tightly with <span className="font-medium text-foreground">Croma</span> and{" "}
        <span className="font-medium text-foreground">Reliance Digital</span> — credible, but crowded and
        undifferentiated. The open ground is upward: toward trust and advice.
      </p>
    </div>
  )
}
