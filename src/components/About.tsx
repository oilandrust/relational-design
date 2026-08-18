import { Bot, FileText, Layers, type LucideIcon } from 'lucide-react'
import { ABOUT, type ToolIcon } from '../content'
import { Reveal } from './Reveal'

const TOOL_ICONS: Record<ToolIcon, LucideIcon> = {
  bot: Bot,
  layers: Layers,
  'file-text': FileText,
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-clay uppercase">
              {ABOUT.eyebrow}
            </p>
            <h2 className="font-display text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
              {ABOUT.title}
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-relaxed text-ink-soft text-pretty">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {ABOUT.tools.map((tool, i) => {
            const Icon = TOOL_ICONS[tool.icon as ToolIcon] ?? Bot
            return (
              <Reveal
                key={tool.name}
                delay={i * 90}
                className="rounded-2xl border border-line bg-card p-6"
              >
                <Icon className="h-6 w-6 text-clay" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-medium tracking-tight">{tool.name}</h3>
                <p className="mt-2 text-ink-soft">{tool.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
