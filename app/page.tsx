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
      "position",
      "recommendation",
      "roadmap",
      "risks",
      "metrics",
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
                Solutions were tested at k = 2 through 5. More clusters always explain more variance; the honest test
                is whether the extra clusters mean anything a manager can act on.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-4">
              <ClusterSelection />
              <div className="flex justify-start">
                <EvidenceTrigger
                  label="Jamovi Clusters Output"
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IyZJwnlcnJNZXUPBMnZOweTGXTCbDz.png"
                  imageAlt="K-means clustering validation table showing cluster sizes and variance explained"
                  caption="k = 3 (highlighted) balances statistical power (54.5% variance explained) with managerial clarity. Three actionable segments with distinct profiles."
                  side="bottom"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 05 — Segments */}
      <Section id="segments" className="border-t border-border">
        <SectionHeading
          index="05"
          eyebrow="Customer Prioritisation"
          title="Three need-based segments, one clear commercial priority."
          lede="Each cluster maps to a distinct managerial archetype: Digital Convenience Seekers, Price-Sensitive Deal Seekers, and Trust & Premium Seekers. The labels translate statistical structure into language a board can act on."
        />
        <Segments />
        <Reveal delay={120}>
          <div className="mt-10 rounded-lg border border-border bg-card p-7">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-5 mb-5">
              <div className="font-mono text-[13px] uppercase tracking-editorial text-accent">
                Why Cluster 3 is the priority
              </div>
              <div className="flex gap-2">
                <EvidenceTrigger
                  label="Segments Plot"
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kRC0OtVd52CkIqFObBSQ6C7aSS8qBl.png"
                  imageAlt="3D cluster plot showing three distinct segments in dimensional space"
                  caption="Three visually distinct clusters in reduced dimensional space (38.1% + 30.2% variance). Spatial separation confirms segmentation robustness."
                  side="bottom"
                />
                <EvidenceTrigger
                  label="Centroid Table"
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U698WwELYF3JbxRTk7akByL0jimDK3.png"
                  imageAlt="Centroids of cluster table showing attribute values across all dimensions"
                  caption="Mean attribute values across all seven dimensions (price, convenience, service, premium, technology, loyalty, range). Each cluster shows distinct preference profiles."
                  side="bottom"
                />
              </div>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              The <span className="font-medium text-foreground">Trust &amp; Premium Seekers</span>{" "}
              segment is simultaneously the largest cluster (n=332, 37.7% of the base) and the most
              commercially attractive by every outcome measured — income, annual spend, loyalty
              points, NPS, and service perception. This directly confirms CFO Meera Kapoor&apos;s
              concern:{" "}
              <span className="font-medium text-foreground">
                Nova&apos;s highest-value customers are not the ones receiving proportionate
                attention.
              </span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Concentrating retention and premium-service investment on this segment is not a
              speculative bet — it is a reallocation toward where value already exists.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 06 — Validation */}
      <Section id="validation" className="border-t border-border bg-card/40">
        <SectionHeading
          index="06"
          eyebrow="Independent Validation"
          title="A second, independent model confirms the target — and names the levers."
          lede="Clustering describes; regression validates. A binomial logistic regression independently tests whether the target segment can be predicted from observable variables. It can — with 86.7% accuracy."
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
                Trust &amp; Premium Seekers segment. Each year of age adds a further 5%. These are the two most practical, observable targeting levers available to management.
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
                Gender and city tier are not significant — the target segment cannot be distinguished by either. That is a strategic gift: management can identify high-value customers with{" "}
                <span className="font-medium text-foreground">two simple, observable filters</span>{" "}
                rather than a complex profile. The analysis moves the Board from opinion to evidence-based targeting.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 07 — Brand position */}
      <Section id="position" className="border-t border-border">
        <SectionHeading
          index="07"
          eyebrow="Perceptual Mapping"
          title="The Middle-Market Trap — credible, but not chosen."
          lede={<>A perceptual map on six perception attributes answers the Board&apos;s sharpest question: <em className="not-italic font-medium text-foreground">what does Nova stand for?</em></>}
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <PerceptualMap />
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                On the full six-attribute map, Nova sits tightly clustered with{" "}
                <span className="font-medium text-foreground">Croma</span> and{" "}
                <span className="font-medium text-foreground">Reliance Digital</span> — three
                brands occupying virtually the same perceptual space. This is the{" "}
                <span className="font-medium text-foreground">Middle-Market Trap</span>: respected
                enough to be considered, but not differentiated enough to be chosen.
              </p>
              <div className="mb-5 flex gap-2">
                <EvidenceTrigger
                  label="Map"
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perceptual%20Mapping%20and%20Current%20Brand%20Position-MgyF2OLQqYedBjUIdjJuVZT6bgIHK9.svg"
                  imageAlt="Perceptual map showing brand positions"
                  caption="Nova clusters with Croma and Reliance Digital in the undifferentiated middle. Amazon and Flipkart own value/convenience; Apple occupies the premium extreme."
                  side="right"
                />
              </div>
              <p className="text-muted-foreground">
                A Principal Component Analysis (PCA) reducing brand perceptions to two key dimensions reveals that
                Dimension 1 alone explains <span className="font-medium text-foreground">89% of variance</span>,
                running from Value/Convenience (Amazon, Flipkart) to Premium/Trust (Apple, Samsung Stores). Amazon
                and Flipkart dominate the value/convenience side — a position Nova cannot realistically contest.
                Apple occupies the premium extreme alone. Nova is{" "}
                <span className="font-medium text-foreground">
                  not weak, but insufficiently differentiated
                </span>
                ; it is not occupying open space.
              </p>
              <p className="text-muted-foreground">
                A more focused view — using only Service &amp; Trust and Premium Status, Nova&apos;s
                two strongest relative attributes — is more encouraging: on these dimensions, Nova
                clusters with Apple and Samsung Stores, well separated from the convenience players.
                This suggests{" "}
                <span className="font-medium text-foreground">genuine, latent equity</span> on
                trust and premium positioning. But the broader six-attribute map confirms that this
                equity is currently diluted by weaker Price, Convenience, and Range scores — leaving
                Nova without sufficient overall separation.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={180}>
          <div className="mt-10 rounded-lg border border-border bg-card p-7">
            <div className="font-mono text-[13px] uppercase tracking-editorial text-accent">
              The positioning opportunity
            </div>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              The <span className="font-medium text-foreground">path of least resistance</span> is
              not building a new position from scratch — it is strengthening the trust and premium
              equity Nova already holds. The open space is upward, toward trusted advice and
              post-purchase support, where no competitor currently dominates and where the Trust
              &amp; Premium Seekers segment is already looking.
            </p>
          </div>
        </Reveal>
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
            <div className="mt-8 max-w-3xl space-y-4 text-pretty text-lg leading-relaxed text-background/70 md:text-xl">
              <p>
                Two independent methods point to the same target, and two observable levers — age and income — make it
                findable. The differentiation Nova lacks won&apos;t come from a price war, raw convenience, or premium
                imitation. It comes from <span className="font-medium text-background text-white">trust, advice, and
                post-purchase support.</span>
              </p>
              <p className="text-base text-background/60">
                This path is backed by regression evidence: store-level analysis shows Service Quality is the primary driver of revenue (β = 0.316, p &lt; .001), while customer-level spend analysis reveals delivered Service Score yields an additional ₹14,485 in annual spend per point (p &lt; .001). Stated preference is noise; actual experienced quality is revenue.
              </p>
            </div>
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
          eyebrow="Risks &amp; Limitations"
          title="Strategic &amp; Operational Risks"
          lede="Stated plainly, because a board decision deserves to know the execution risks accompanying this recommendation."
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              h: "Alienation Risk",
              b: "Shifting resources toward premium/trust positioning could underserve Price-Sensitive Deal Seekers, who still represent 221 customers (25.1% of the base).",
            },
            {
              h: "Execution & Pace Risk",
              b: "Service-led differentiation depends heavily on training and culture, which is slower to build and harder to measure than price/promo tactics, risking loss of executive patience.",
            },
            {
              h: "Competitive Contestability",
              b: "Croma and Reliance Digital occupy nearly the same perceptual space as Nova on the full 6-attribute map; either could contest the trust position, narrowing Nova's window to differentiate.",
            },
            {
              h: "Messaging-Execution Gap",
              b: "Regression shows stated preference does not drive spend — only delivered experience does (ServiceScore, NPS). Communication without actual service delivery changes will fail to move spend.",
            },
          ].map((r, i) => (
            <Reveal key={r.h} delay={i * 80}>
              <div className="flex h-full gap-5 rounded-lg border border-border bg-background p-7">
                <span className="font-serif text-2xl leading-none text-accent">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-xl tracking-tight text-foreground">{r.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 11 — Success Metrics */}
      <Section id="metrics" className="border-t border-border">
        <SectionHeading
          index="11"
          eyebrow="Success Metrics"
          title="Measuring Success: Four Levels of Accountability"
          lede="Success is not a blended average. We track performance where the store and customer regressions pointed."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {[
            {
              level: "Store-level",
              title: "Operating Drivers",
              desc: "Service Quality score, Conversion Rate, and Revenue per store.",
              context: "The three largest validated drivers of store revenue (model R² = 0.687).",
            },
            {
              level: "Customer-level",
              title: "Relationship Strength",
              desc: "Service Score, Digital Score, and Overall NPS.",
              context: "Tracked specifically within the Trust & Premium Seekers segment.",
            },
            {
              level: "Spend outcomes",
              title: "Commercial Value",
              desc: "Annual Spend and Transactions per customer.",
              context: "The significant predictors of annual spend in the customer model (R² = 0.666).",
            },
            {
              level: "Brand-level",
              title: "Perceptual Separation",
              desc: "Re-run brand perception mapping in 12–18 months.",
              context: "The ultimate test of whether Nova has pulled away from Croma and Reliance Digital.",
            },
          ].map((m, idx) => (
            <Reveal key={m.level} delay={idx * 80}>
              <div className="rounded-lg border border-border bg-card p-6 flex flex-col justify-between h-full">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-editorial text-accent block mb-3">
                    {m.level}
                  </span>
                  <h4 className="font-serif text-xl tracking-tight text-foreground mb-2">
                    {m.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                    {m.desc}
                  </p>
                </div>
                <p className="text-[12px] leading-relaxed text-muted-foreground border-t border-border pt-3">
                  {m.context}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 12 — Takeaway */}
      <Section id="takeaway" className="border-t border-border">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="font-mono text-[14px] uppercase tracking-editorial text-accent">
              12 · The Board Takeaway
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
