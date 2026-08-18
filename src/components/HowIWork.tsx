import { HOW_I_WORK } from '../content'
import { Reveal } from './Reveal'

export function HowIWork() {
  return (
    <section id="how-i-work" className="scroll-mt-20 border-t border-line px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-clay uppercase">
            {HOW_I_WORK.eyebrow}
          </p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
            {HOW_I_WORK.title}
          </h2>
        </Reveal>

        <ol className="mt-16 space-y-px border-t border-line">
          {HOW_I_WORK.steps.map((step, i) => (
            <li key={step.title} className="border-b border-line">
              <Reveal
                delay={i * 70}
                className="grid gap-3 py-8 md:grid-cols-[4rem_1fr_1.4fr] md:items-baseline md:gap-8"
              >
                <span className="font-display text-2xl font-medium text-clay tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-medium tracking-tight text-balance">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-ink-soft text-pretty">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
