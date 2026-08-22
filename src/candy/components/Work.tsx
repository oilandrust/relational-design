'use client'

import { ArrowUpRight } from 'lucide-react'
import type { MarkdownBlockProps } from '@lefolio/engine/template'
import {
  firstHeading,
  firstPlainLine,
  parseWorkProjects,
  prepareCandyMarkdown,
  stripFirstPlainLine,
} from '../../lib/parse'
import Reveal from './Reveal'

export default function Work({ content }: MarkdownBlockProps) {
  const prepared = prepareCandyMarkdown(content)
  const eyebrow = firstPlainLine(prepared)
  let rest = stripFirstPlainLine(prepared, eyebrow)
  const title = firstHeading(rest, 2)
  const projectsBody = title ? rest.replace(/^##\s+.+$/m, '').trim() : rest
  const projects = parseWorkProjects(projectsBody)

  return (
    <section id="work" className="candy-section candy-section--border candy-section--card">
      <div className="candy-container">
        <Reveal>
          {eyebrow ? <p className="candy-eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="candy-section-title candy-section-title--narrow">{title}</h2> : null}
        </Reveal>

        <div className="candy-work-grid">
          {projects.map((project, i) => (
            <Reveal key={project.href} delay={i * 100}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="candy-work-card"
              >
                <div className="candy-work-image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="candy-work-image"
                  />
                </div>

                <div className="candy-work-meta">
                  <h3 className="candy-work-title">{project.title}</h3>
                  <ArrowUpRight className="candy-work-arrow" aria-hidden="true" />
                </div>
                <p className="candy-work-role">{project.role}</p>
                <p className="candy-work-display">{project.display}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
