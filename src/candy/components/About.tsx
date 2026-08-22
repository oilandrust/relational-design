'use client'

import { Bot, FileText, Layers, type LucideIcon } from 'lucide-react'
import type { MarkdownBlockProps } from '@lefolio/engine/template'
import type { CandyToolIcon } from '../../content/home.d'
import {
  firstHeading,
  firstPlainLine,
  parseToolCards,
  prepareCandyMarkdown,
  splitParagraphs,
  stripFirstPlainLine,
} from '../../lib/parse'
import Reveal from './Reveal'

const TOOL_ICONS: Record<CandyToolIcon, LucideIcon> = {
  bot: Bot,
  layers: Layers,
  'file-text': FileText,
}

export default function About({ content }: MarkdownBlockProps) {
  const prepared = prepareCandyMarkdown(content)
  const eyebrow = firstPlainLine(prepared)
  let rest = stripFirstPlainLine(prepared, eyebrow)
  const title = firstHeading(rest, 2)
  let bodyRest = title ? rest.replace(/^##\s+.+$/m, '').trim() : rest
  const toolsStart = bodyRest.search(/^###\s+/m)
  const proseSource = toolsStart >= 0 ? bodyRest.slice(0, toolsStart).trim() : bodyRest
  const toolsSource = toolsStart >= 0 ? bodyRest.slice(toolsStart).trim() : ''
  const paragraphs = splitParagraphs(proseSource)
  const tools = toolsSource ? parseToolCards(toolsSource) : []

  return (
    <section id="about" className="candy-section candy-section--border">
      <div className="candy-container">
        <Reveal className="candy-about-intro">
          <div>
            {eyebrow ? <p className="candy-eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="candy-section-title">{title}</h2> : null}
          </div>

          <div className="candy-about-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {tools.length > 0 ? (
          <div className="candy-tools-grid">
            {tools.map((tool, i) => {
              const Icon = TOOL_ICONS[tool.icon] ?? Bot
              return (
                <Reveal key={tool.name} delay={i * 90} className="candy-tool-card">
                  <Icon className="candy-tool-icon" aria-hidden="true" />
                  <h3 className="candy-tool-title">{tool.name}</h3>
                  <p className="candy-tool-body">{tool.body}</p>
                </Reveal>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
