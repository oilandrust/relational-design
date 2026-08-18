import { Bot, FileText, Layers } from 'lucide-react'
import { Reveal } from './Reveal'

const TOOLS = [
  {
    icon: Bot,
    name: 'AI-assisted design',
    body: 'For moving fast through mock-ups until the look is right.',
  },
  {
    icon: Layers,
    name: 'WordPress and other CMSs',
    body: 'When you need to edit everything yourself, in a familiar admin.',
  },
  {
    icon: FileText,
    name: 'Static site generators',
    body: 'When the site should be fast, cheap to host, and simple to keep.',
  },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-clay uppercase">
              About me
            </p>
            <h2 className="font-display text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
              A curious blend between Software Engineering and Relational Attunement.
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-relaxed text-ink-soft text-pretty">
            <p>
              I was a software engineer for 10 years, working in video games and other tech-heavy
              fields. In the past 10 years I have been interested in entrepreneurship, relationasl practices, coaching and
              therapy. I trained in somatic therapy, practiced many forms of mindfulness and developed a keen ability for attunement. Along the way I kept exploring how
              websites get built.
            </p>
            <p>
              I'm happy to sit with you in the language of your practice, and
              be your ally in working with technology.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <Reveal
              key={tool.name}
              delay={i * 90}
              className="rounded-2xl border border-line bg-card p-6"
            >
              <tool.icon className="h-6 w-6 text-clay" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-medium tracking-tight">{tool.name}</h3>
              <p className="mt-2 text-ink-soft">{tool.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
