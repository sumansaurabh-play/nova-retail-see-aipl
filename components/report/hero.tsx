import { Reveal } from "./reveal"

export function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col justify-between px-6 pb-14 pt-10 md:px-10">
      {/* Masthead */}
      <Reveal>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-border pb-5">
          <span className="font-serif text-lg tracking-tight text-foreground">Nova Retail</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-muted-foreground sm:block">
            Strategic Analysis · Confidential
          </span>
          <span className="font-mono text-[10px] uppercase tracking-editorial text-muted-foreground">
            Board Brief
          </span>
        </div>
      </Reveal>

      {/* Title block */}
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-editorial text-accent">
            Customer Segmentation &amp; Targeting
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-5xl text-balance font-serif text-[2.75rem] leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Stop treating every customer as equal.
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Nova&apos;s value is concentrated in a segment it has never named. This brief finds that segment,
            validates it with an independent model, and sets a three-year course toward one position:{" "}
            <span className="font-medium text-foreground">Trusted Technology Partner.</span>
          </p>
        </Reveal>
      </div>

      {/* Footer meta */}
      <Reveal delay={260}>
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-4">
          {[
            { k: "Dataset", v: "N = 880" },
            { k: "Method", v: "K-means + Logit" },
            { k: "Model AUC", v: "0.926" },
            { k: "The target", v: "Cluster 3" },
          ].map((m) => (
            <div key={m.k}>
              <div className="font-mono text-[10px] uppercase tracking-editorial text-muted-foreground">{m.k}</div>
              <div className="mt-1 font-serif text-xl tracking-tight text-foreground">{m.v}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </header>
  )
}
