'use client'

import type { MarkdownBlockProps } from '@lefolio/engine/template'
import {
  firstHeading,
  firstPlainLine,
  prepareCandyMarkdown,
  splitByHeading,
  stripFirstPlainLine,
} from '../../lib/parse'
import Reveal from './Reveal'

export default function HowIWork({ content }: MarkdownBlockProps) {
  const prepared = prepareCandyMarkdown(content)
  const eyebrow = firstPlainLine(prepared)
  let rest = stripFirstPlainLine(prepared, eyebrow)
  const title = firstHeading(rest, 2)
  const stepsBody = title ? rest.replace(/^##\s+.+$/m, '').trim() : rest
  const steps = splitByHeading(stepsBody, 3)

  return (
    <section id="how-i-work" className="candy-section candy-section--border">
      <div className="candy-container">
        <Reveal>
          {eyebrow ? <p className="candy-eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="candy-section-title candy-section-title--narrow">{title}</h2> : null}
        </Reveal>

        <ol className="candy-steps">
          {steps.map((step, i) => (
            <li key={step.title} className="candy-step">
              <Reveal delay={i * 70} className="candy-step-grid">
                <span className="candy-step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="candy-step-title">{step.title}</h3>
                <p className="candy-step-body">{step.body.trim()}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
