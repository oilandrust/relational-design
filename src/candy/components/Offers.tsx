'use client'

import { Check } from 'lucide-react'
import type { MarkdownBlockProps } from '@lefolio/engine/template'
import {
  firstHeading,
  firstPlainLine,
  paragraphs,
  parseOffers,
  prepareCandyMarkdown,
  splitByHeading,
  stripFirstPlainLine,
  stripHeading,
} from '../../lib/parse'
import Reveal from './Reveal'

/** Index of the card that gets the highlighted, slightly larger treatment. */
function featuredIndex(count: number): number {
  return count > 1 && count % 2 === 1 ? (count - 1) / 2 : -1
}

export default function Offers({ content }: MarkdownBlockProps) {
  const prepared = prepareCandyMarkdown(content)
  const { intro } = splitByHeading(prepared, 3)
  const offers = parseOffers(prepared)

  const heading = firstHeading(intro, 2)
  const plainLine = firstPlainLine(intro)
  const eyebrow = heading ? plainLine : null
  const title = heading ?? plainLine
  const lead = paragraphs(stripHeading(stripFirstPlainLine(intro, plainLine), heading))
  const featured = featuredIndex(offers.length)

  return (
    <section id="offers" className="candy-section candy-section--border candy-section--card">
      <div className="candy-container">
        <Reveal>
          {eyebrow ? <p className="candy-eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="candy-section-title candy-section-title--narrow">{title}</h2> : null}
          {lead.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="candy-offers-lead">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="candy-offers-grid">
          {offers.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 90} className="candy-offer-slot">
              <article
                className={`candy-offer-card${i === featured ? ' candy-offer-card--featured' : ''}`}
              >
                <h3 className="candy-offer-title">{offer.title}</h3>

                {offer.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="candy-offer-body">
                    {paragraph}
                  </p>
                ))}

                {offer.features.length > 0 ? (
                  <ul className="candy-offer-features">
                    {offer.features.map((feature) => (
                      <li key={feature} className="candy-offer-feature">
                        <Check className="candy-offer-check" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {offer.price || offer.more ? (
                  <div className="candy-offer-price-row">
                    {offer.price ? (
                      <p className="candy-offer-price">
                        {offer.price.original ? (
                          <s className="candy-offer-price-original">{offer.price.original}</s>
                        ) : null}
                        <span className="candy-offer-price-current">{offer.price.current}</span>
                      </p>
                    ) : null}

                    {offer.more ? (
                      <a href={offer.more.href} className="candy-offer-more">
                        {offer.more.text}
                      </a>
                    ) : null}
                  </div>
                ) : null}

                {offer.cta ? (
                  <a
                    href={offer.cta.href}
                    className={`candy-btn candy-offer-cta ${
                      i === featured ? 'candy-btn-clay' : 'candy-btn-outline'
                    }`}
                  >
                    {offer.cta.text}
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
