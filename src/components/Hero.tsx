import { ArrowDown } from 'lucide-react'
import { EMAIL } from '../content'

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
          Relational Web Design
        </p>

        <h1 className="max-w-4xl font-display text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
          Let&rsquo;s build your website together
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty md:text-xl">
          I help people build their websites by carefully listening to their needs and picking
          tools that get the job done.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full bg-clay px-7 py-3.5 font-medium text-paper transition-transform hover:scale-105"
          >
            Start a conversation
          </a>
          <a
            href="#how-i-work"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-medium transition-colors hover:bg-card"
          >
            See how I work
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
