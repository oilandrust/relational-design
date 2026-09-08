'use client'

import { Check } from 'lucide-react'
import type { MarkdownBlockProps } from '@lefolio/engine/template'
import { offerDiscountPercent, parseGoals } from '../../lib/parse'
import Reveal from './Reveal'

export default function Goals({ content }: MarkdownBlockProps) {
  const goals = parseGoals(content)
  const discount = offerDiscountPercent(goals.price)

  return (
    <section id="goals" className="candy-section candy-section--page-top">
      <div className="candy-container candy-goals">
        <Reveal className="candy-goals-pitch">
          {goals.title ? <h1 className="candy-goals-title">{goals.title}</h1> : null}

          {goals.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="candy-goals-intro">
              {paragraph}
            </p>
          ))}

          {goals.points.length > 0 ? (
            <ul className="candy-goals-points">
              {goals.points.map((point) => (
                <li key={point} className="candy-goals-point">
                  <Check className="candy-goals-check" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={120} className="candy-goals-aside">
          {goals.image ? (
            <div className="candy-goals-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={goals.image.src}
                alt={goals.image.alt || 'Offering preview'}
                width={720}
                height={900}
                className="candy-goals-media-image"
              />
            </div>
          ) : null}

          <div className="candy-goals-card">
            {goals.note.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="candy-goals-note">
                {paragraph}
              </p>
            ))}

            {goals.price ? (
              <p className="candy-goals-price">
                {goals.price.original ? (
                  <s className="candy-goals-price-original">{goals.price.original}</s>
                ) : null}
                <span className="candy-goals-price-current">{goals.price.current}</span>
                {discount ? <span className="candy-goals-badge">-{discount}%</span> : null}
              </p>
            ) : null}

            {goals.cta ? (
              <a href={goals.cta.href} className="candy-btn candy-btn-clay candy-goals-cta">
                {goals.cta.text}
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
