"use client"

import { ReadingProgress } from "@/components/report/reading-progress"
import { DoomscrollIntro } from "@/components/report/doomscroll-intro"
import { Hero } from "@/components/report/hero"
import { Reveal } from "@/components/report/reveal"
import { Section, SectionHeading, Stat } from "@/components/report/primitives"
import {
  AttitudeBars,
  ClusterSelection,
  OddsRatios,
  PerceptualMap,
} from "@/components/report/data-viz"
import { Segments } from "@/components/report/segments"
import { Roadmap } from "@/components/report/roadmap"
import { EvidenceTrigger } from "@/components/report/evidence-trigger"
import { useEffect } from "react"

export default function NovaReport() {
  useEffect(() => {
    const sections = [
      "top",
      "problem",
      "data",
      "insights",
      "method",
      "segments",
      "validation",
      "recommendation",
      "roadmap",
      "risks",
      "takeaway",
    ]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        const currentSection = sections.find((id) => {
          const element = document.getElementById(id)
          if (!element) return false
          const rect = element.getBoundingClientRect()
          return rect.top >= -100 && rect.top < window.innerHeight / 2
        })

        const currentIndex = sections.indexOf(currentSection || "top")
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1)
        const nextSection = sections[nextIndex]

        if (nextSection) {
          document.getElementById(nextSection)?.scrollIntoView({ behavior: "smooth" })
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        const currentSection = sections.find((id) => {
          const element = document.getElementById(id)
          if (!element) return false
          const rect = element.getBoundingClientRect()
          return rect.top >= -100 && rect.top < window.innerHeight / 2
        })

        const currentIndex = sections.indexOf(currentSection || "top")
        const prevIndex = Math.max(currentIndex - 1, 0)
        const prevSection = sections[prevIndex]

        if (prevSection) {
          document.getElementById(prevSection)?.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <main className="relative">
      <DoomscrollIntro />
      <ReadingProgress />
      <div id="top">
        <Hero />
      </div>

      {/* 01 — Business problem */}
      <Section id="problem" className="border-t border-border">
        <SectionHeading
          index="01"
          eyebrow="The Business Problem"
          title="Nova spends as if every customer is worth the same. Its own data says otherwise."
          lede="CFO Meera Kapoor's concern is a resource-allocation problem in disguise: retention, loyalty, and service budgets are spread evenly across a base that is anything but even."
        />
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                Broad allocation feels fair, but it quietly subsidises low-value customers at the expense of the
                ones who actually generate value and stay. The question is not whether to segment — it is where to
                concentrate the next planning cycle&apos;s investment.
              </p>
              <p>
                This brief answers that in four moves: understand the base, find its natural segments, describe them
                in business terms, and then{" "}
                <span className="font-medium text-foreground">
                  independently validate the most valuable one with a statistical model
                </span>{" "}
                — not a descriptive impression.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-lg border border-border bg-card p-7">
              <div className="font-mono text-[13px] uppercase tracking-editorial text-accent">
                The decision on the table
              </div>
              <p className="mt-4 font-serif text-2xl leading-snug tracking-tight text-foreground">
                &ldquo;Where should Nova concentrate retention, loyalty, and premium-service investment?&rdquo;
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Every section that follows builds toward a single, defensible answer.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 02 — Data */}
      <Section id="data" className="border-t border-border bg-card/40">
        <SectionHeading
          index="02"
          eyebrow="The Evidence Base"
          title="One survey, three kinds of signal."
          lede="The Nova Retail customer survey (N = 880) captures who customers are, what they value, and how they behave — across a full 12 months."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              h: "Demographic",
              items: ["Age", "Income (LPA)", "City Tier", "Gender"],
              role: "Describe segments after the fact",
            },
            {
              h: "Attitudinal",
              items: ["Price", "Convenience", "Service", "Premium", "Technology", "Loyalty", "Range"],
              role: "Form the segments",
            },
            {
              h: "Behavioral",
              items: ["Visits (store · web · app)", "Transactions", "Loyalty points", "NPS · Spend"],
              role: "Form the segments",
            },
          ].map((g, i) => (
            <Reveal key={g.h} delay={i * 90}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-background p-7">
                <h3 className="font-serif text-2xl tracking-tight text-foreground overflow-hidden text-ellipsis">{g.h}</h3>
                <ul className="mt-4 flex flex-1 flex-wrap gap-3">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-border pt-4 font-mono text-[12px] uppercase tracking-editorial text-accent">
                  {g.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            Segments are built from needs and behavior — never demographics. Age, income, gender, and city tier are
            held back and used only to <span className="font-medium text-foreground">describe</span> and{" "}
            <span className="font-medium text-foreground">validate</span> the result. This sequence is what keeps
            the segmentation methodologically clean.
          </p>
        </Reveal>
      </Section>

      {/* 03 — Exploratory insights */}
      <Section id="insights" className="border-t border-border">
        <SectionHeading
          index="03"
          eyebrow="Exploratory Insights"
          title="A middle-aged, middle-income, convenience-led base — with a valuable tail."
          lede="Clean, symmetric distributions mean the averages can be trusted. The interesting story is in the spread."
        />
        <div className="mb-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          <Reveal><Stat value="45.2" label="Mean age (yrs)" sub="Symmetric, 18–68 range" /></Reveal>
          <Reveal delay={70}><Stat value="₹13.4L" label="Mean income" sub="Middle-income, higher tail" /></Reveal>
          <Reveal delay={140}><Stat value="Tier 2" label="Dominant city tier" sub="All three represented" /></Reveal>
          <Reveal delay={210}><Stat value="7" label="Attitudes rated" sub="Heterogeneous priorities" /></Reveal>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                Convenience and range command broad agreement. But price, service, and premium expectations pull
                customers apart — and that divergence is the whole point.
              </p>
              <p className="text-muted-foreground">
                A base this varied cannot be served by one blanket strategy. The dispersion is not noise; it is the
                map of distinct segments waiting to be drawn.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AttitudeBars />
          </Reveal>
        </div>
      </Section>

      {/* 04 — Methodology */}
      <Section id="method" className="border-t border-border bg-card/40">
        <SectionHeading
          index="04"
          eyebrow="Segmentation Method"
          title="Why three segments — and not four, or five."
          lede="K-means on standardised, continuous variables. The real discipline is in choosing k for meaning, not just for variance."
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                Variables were z-scored so that annual spend in rupees couldn&apos;t drown out a 1–7 importance
                rating. K-means fits because the basis variables are continuous — no mixed-type distance needed.
              </p>
              <p className="text-muted-foreground">
                Solutions were tested at k = 2 through 5. <EvidenceTrigger
                  label="Proof"
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Determining%20the%20number%20of%20clusters-MTi6eRYgCyAwKr63r67xxBgpMevS4I.jpg"
                  imageAlt="Determining number of clusters table"
                  caption="Testing k = 2 through 5. k = 3 (selected) balances explanatory power with managerial usefulness: 24.5% of total variance with three distinct, actionable clusters."
                  side="bottom"
                /> More clusters always explain more variance; the honest test is whether the extra clusters mean anything a manager can act on.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ClusterSelection />
          </Reveal>
        </div>
      </Section>

      {/* 05 — Segments */}
      <Section id="segments" className="border-t border-border">
        <SectionHeading
          index="05"
          eyebrow="The Three Segments"
          title="Three archetypes, one clear priority."
          lede="Profiled after clustering, each segment maps to a distinct managerial story. Only one is the defensible growth engine."
        />
        <div className="mb-10 flex gap-2">
          <EvidenceTrigger
            label="Clusters"
            imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cluster%20Plot-Dsnfok3Go302CT2EY77mC0YeED13sp.svg"
            imageAlt="Cluster plot showing three distinct segments"
            caption="Three distinct clusters in two-dimensional projection. Clear separation validates the segmentation structure."
            side="bottom"
          />
          <EvidenceTrigger
            label="Profiles"
            imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/centroid%20table-pNTE5zyqlvYrGOIoI5tiK1loDmh6ba.svg"
            imageAlt="Centroid table with segment characteristics"
            caption="Cluster centroids across all variables. Each row represents a segment's mean values, revealing distinct preference and behavioral patterns."
            side="bottom"
          />
        </div>
        <Segments />
      </Section>

      {/* 06 — Validation */}
      <Section id="validation" className="border-t border-border bg-card/40">
        <SectionHeading
          index="06"
          eyebrow="Independent Validation"
          title="A second, independent model agrees — and names the levers."
          lede="Clustering is unsupervised and descriptive. A binomial logistic regression tests whether the target segment can be predicted from a handful of observable variables. It can."
        />
        <div className="mb-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          <Reveal><Stat value="0.926" label="AUC" sub="Excellent separation" /></Reveal>
          <Reveal delay={70}><Stat value="86.7%" label="Accuracy" sub="Classification" /></Reveal>
          <Reveal delay={140}><Stat value="0.495" label="McFadden R²" sub="Strong for a logit" /></Reveal>
          <Reveal delay={210}><Stat value="p<.001" label="Model χ² = 576" sub="Highly significant" /></Reveal>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <OddsRatios />
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                Each additional lakh of income roughly{" "}
                <span className="font-medium text-foreground">doubles the odds</span> of belonging to the
                high-value segment. Each year of age adds a further 5%.
              </p>
              <div className="mb-5 flex gap-2">
                <EvidenceTrigger
                  label="Model"
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Statistical%20Validation%20Binomial%20Logistic%20Regression%20%20Coefficients%20and%20interpretation-FN8w8kfCTsSEjylla76KBwjRk4OIkp.svg"
                  imageAlt="Logistic regression coefficients"
                  caption="Age and income are significant predictors (p < 0.001). Gender and city tier are not significant, confirming the two-lever targeting strategy."
                  side="right"
                />
                <EvidenceTrigger
                  label="Fit"
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Statistical%20Validation%20Binomial%20Logistic%20Regression%20%20Model%20fit-QfDMY4eUpomQU3ri9Ibfd5tWdhlgsG.svg"
                  imageAlt="Model fit statistics"
                  caption="ROC curve (AUC = 0.926) and model diagnostics. Excellent discrimination between target and non-target segments."
                  side="right"
                />
              </div>
              <p className="text-muted-foreground">
                Gender and city tier don&apos;t move the needle. That is a gift to management: the target can be found with two simple, observable filters rather than a complex profile.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 07 — Brand position */}
      <Section id="position" className="border-t border-border">
        <SectionHeading
          index="07"
          eyebrow="Current Brand Position"
          title="Credible company — in a crowded room."
          lede="A perceptual map on six perception attributes shows where Nova lives in customers' minds today."
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <PerceptualMap />
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                Nova sits shoulder-to-shoulder with <span className="font-medium text-foreground">Croma</span> and{" "}
                <span className="font-medium text-foreground">Reliance Digital</span>. Respected, familiar — and
                interchangeable.
              </p>
              <div className="mb-5 flex gap-2">
                <EvidenceTrigger
                  label="Map"
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perceptual%20Mapping%20and%20Current%20Brand%20Position-MgyF2OLQqYedBjUIdjJuVZT6bgIHK9.svg"
                  imageAlt="Perceptual map showing brand positions"
                  caption="Nova clusters with Croma and Reliance Digital, all positioned in the credible-but-undifferentiated middle. Apple owns premium; convenience-led players own their space."
                  side="right"
                />
              </div>
              <p className="text-muted-foreground">
                Amazon and Flipkart own convenience together; Apple Store owns premium alone. Nova&apos;s risk isn&apos;t
                credibility. It&apos;s the absence of a reason to be chosen. The implication is unambiguous: sharpen a
                position rather than drift in the undifferentiated middle.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 08 — Recommendation (the peak) */}
      <section
        id="recommendation"
        className="scroll-mt-24 border-t border-foreground bg-foreground px-6 py-28 text-background md:py-40"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <span className="font-mono text-[14px] uppercase tracking-editorial text-accent">
              The Recommendation
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 max-w-5xl text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Nova should become the Trusted Technology Partner — and build the whole business around Cluster 3.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-background/70 md:text-xl">
              Two independent methods point to the same target, and two observable levers — age and income — make it
              findable. The differentiation Nova lacks won&apos;t come from a price war, raw convenience, or premium
              imitation. It comes from <span className="font-medium text-background">trust, advice, and
              post-purchase support.</span>
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-background/20 bg-background/20 md:grid-cols-3">
            {[
              {
                h: "The position",
                b: "Trusted Technology Partner — advice-led, not discount-led or convenience-led.",
              },
              {
                h: "The target",
                b: "Cluster 3: highest income, spend, loyalty, NPS, and service perception.",
              },
              {
                h: "The levers",
                b: "Age and income identify the target; trust and support differentiate the brand.",
              },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 90}>
                <div className="h-full bg-foreground p-7">
                  <div className="font-mono text-[13px] uppercase tracking-editorial text-accent">{c.h}</div>
                  <p className="mt-4 text-lg leading-relaxed text-background/90">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-14 border-t border-background/20 pt-8">
              <p className="max-w-3xl text-pretty leading-relaxed text-background/60">
                Cluster 1 is a secondary opportunity to nurture through digital engagement. Cluster 2 stays a low
                priority for premium investment — unless Nova deliberately chooses a value-led strategy instead.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 09 — Roadmap */}
      <Section id="roadmap" className="border-t border-border">
        <SectionHeading
          index="09"
          eyebrow="Three-Year Roadmap"
          title="From naming the target to owning the position."
          lede="A sequenced path: prove the segment, build the differentiation, then compound it into distance from the pack."
        />
        <Roadmap />
      </Section>

      {/* 10 — Risks */}
      <Section id="risks" className="border-t border-border bg-card/40">
        <SectionHeading
          index="10"
          eyebrow="Risks & Limitations"
          title="What would change this conclusion."
          lede="Stated plainly, because a board decision deserves to know where the evidence is thin."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              h: "Cluster shape",
              b: "K-means assumes roughly spherical, similar-sized clusters. Irregular true shapes could favour hierarchical clustering.",
            },
            {
              h: "Unreported fit check",
              b: "The silhouette index for the 3-cluster solution wasn't numerically reported; it should be added to confirm assignment quality.",
            },
            {
              h: "Untested assumptions",
              b: "Logit assumptions — linearity of the logit, multicollinearity (VIF) — weren't formally tested. Treat as indicative until verified.",
            },
            {
              h: "No causality, one wave",
              b: "Cross-sectional data can't prove income or age cause loyalty, and single-wave data can't confirm segment stability over time.",
            },
          ].map((r, i) => (
            <Reveal key={r.h} delay={i * 80}>
              <div className="flex h-full gap-5 rounded-lg border border-border bg-background p-7">
                <span className="font-serif text-2xl leading-none text-border">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-foreground">{r.h}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{r.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 11 — Takeaway */}
      <Section id="takeaway" className="border-t border-border">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="font-mono text-[14px] uppercase tracking-editorial text-accent">
              The Board Takeaway
            </span>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-balance font-serif text-3xl leading-[1.15] tracking-tight text-foreground md:text-5xl">
              Nova&apos;s most valuable customers are defined by age and income — not gender or geography. That gives
              management a simple, statistically validated basis for the single decision that matters:{" "}
              <span className="text-accent">concentrate on Cluster 3, and lead with trust.</span>
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Success is measured where the model pointed: rising share of spend, loyalty, and NPS within the
              high-value segment — and measurable separation from Croma and Reliance Digital.
            </p>
          </Reveal>
        </div>
      </Section>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="font-serif text-base tracking-tight text-foreground">Nova Retail</span>
          <span className="font-mono text-[10px] uppercase tracking-editorial text-muted-foreground">
            Customer Segmentation &amp; Targeting Analysis · N = 880
          </span>
          <span className="font-mono text-[10px] uppercase tracking-editorial text-muted-foreground">
            Board Brief · Confidential
          </span>
        </div>
      </footer>
    </main>
  )
}
