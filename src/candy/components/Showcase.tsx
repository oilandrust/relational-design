'use client'

import { ArrowUpRight } from 'lucide-react'
import type { MarkdownBlockProps } from '@lefolio/engine/template'
import { parseShowcase } from '../../lib/parse'
import Reveal from './Reveal'

export default function Showcase({ content }: MarkdownBlockProps) {
  const showcase = parseShowcase(content)

  return (
    <section id="showcase" className="candy-section candy-section--border">
      <div className="candy-container">
        <Reveal>
          {showcase.title ? (
            <h2 className="candy-section-title candy-section-title--narrow">{showcase.title}</h2>
          ) : null}
          {showcase.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="candy-showcase-intro">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div
          className="candy-showcase-scroller"
          role="region"
          aria-label="Website screenshots"
          tabIndex={0}
        >
          {showcase.shots.map((shot) => (
            <figure key={shot.src} className="candy-showcase-item">
              <div className="candy-showcase-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt || shot.display || 'Website screenshot'}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="candy-showcase-image"
                />
              </div>

              {shot.href ? (
                <figcaption>
                  <a
                    href={shot.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="candy-showcase-link"
                  >
                    {shot.display}
                    <ArrowUpRight className="candy-icon-inline" aria-hidden="true" />
                  </a>
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
