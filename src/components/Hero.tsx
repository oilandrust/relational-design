import { ArrowDown } from 'lucide-react'
import { EMAIL, HERO } from '../content'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -right-40 h-[34rem] w-[34rem] rounded-full bg-clay-soft/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 -left-48 h-[30rem] w-[30rem] rounded-full bg-forest-soft/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <p className="mb-6 text-sm font-medium tracking-[0.2em] text-clay uppercase">
          {HERO.eyebrow}
        </p>

        <h1 className="max-w-4xl font-display text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
          {HERO.title}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty md:text-xl">
          {HERO.body}
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full bg-clay px-7 py-3.5 font-medium text-paper transition-transform hover:scale-105"
          >
            {HERO.primaryCta}
          </a>
          <a
            href={HERO.secondaryHref}
            className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-medium transition-colors hover:bg-card"
          >
            {HERO.secondaryCta}
            <ArrowDown
              className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
