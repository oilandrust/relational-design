'use client'

import type { MarkdownBlockProps } from '@lefolio/engine/template'
import { parseTimeline } from '../../lib/parse'
import Reveal from './Reveal'

export default function Timeline({ content }: MarkdownBlockProps) {
  const timeline = parseTimeline(content)

  return (
    <section id="timeline" className="candy-section candy-section--border candy-section--card">
      <div className="candy-container">
        <Reveal>
          {timeline.title ? (
            <h2 className="candy-section-title candy-section-title--narrow">{timeline.title}</h2>
          ) : null}
          {timeline.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="candy-timeline-intro">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <ol className="candy-timeline">
          {timeline.steps.map((step, i) => (
            <li key={step.title} className="candy-timeline-step">
              <Reveal delay={i * 90} className="candy-timeline-grid">
                <div className="candy-timeline-rail" aria-hidden="true">
                  <span className="candy-timeline-dot" />
                </div>

                <div className="candy-timeline-content">
                  <h3 className="candy-timeline-title">{step.title}</h3>
                  <ul className="candy-timeline-list">
                    {step.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
