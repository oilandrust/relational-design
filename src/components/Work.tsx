import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../content'
import { Reveal } from './Reveal'

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-line bg-card px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-clay uppercase">
            Some of my work
          </p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
            From hand-made WordPress sites to AI generated polished design.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.href} delay={i * 100}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl border border-line bg-paper">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="aspect-3/2 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-medium tracking-tight">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1 text-ink-soft">{project.role}</p>
                <p className="mt-3 text-sm text-clay">{project.display}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
