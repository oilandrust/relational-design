'use client'

import { ArrowDown } from 'lucide-react'
import type { MarkdownBlockProps } from '@lefolio/engine/template'
import { MarkdownBody } from '@lefolio/engine/markdown'
import { candyEmail, useCandyManifest } from '../context'
import {
  extractLinks,
  firstHeading,
  firstPlainLine,
  prepareCandyMarkdown,
  stripFirstPlainLine,
  stripHeadings,
  stripImages,
  stripLinks,
} from '../../lib/parse'

export default function Hero({ content }: MarkdownBlockProps) {
  const manifest = useCandyManifest()
  const prepared = prepareCandyMarkdown(content)
  const title = firstHeading(prepared, 1)
  const links = extractLinks(prepared)
  let rest = stripLinks(stripHeadings(stripImages(prepared)))
  const eyebrow = firstPlainLine(rest)
  rest = stripFirstPlainLine(rest, eyebrow)
  const body = rest.trim()
  const email = candyEmail(manifest)
  const primary = links[0]
  const secondary = links[1]

  return (
    <section id="top" className="candy-hero">
      <div className="candy-hero-blob candy-hero-blob--clay" aria-hidden="true" />
      <div className="candy-hero-blob candy-hero-blob--forest" aria-hidden="true" />

      <div className="candy-container candy-hero-inner">
        {eyebrow ? <p className="candy-eyebrow">{eyebrow}</p> : null}
        {title ? <h1 className="candy-hero-title">{title}</h1> : null}
        {body ? (
          <div className="candy-hero-body">
            <MarkdownBody
              content={body}
              preprocessColumnBlocks={false}
              preprocessComponentBlocks={false}
            />
          </div>
        ) : null}

        <div className="candy-hero-actions">
          {primary ? (
            <a href={primary.href} className="candy-btn candy-btn-clay">
              {primary.text}
            </a>
          ) : (
            <a href={`mailto:${email}`} className="candy-btn candy-btn-clay">
              Start a conversation
            </a>
          )}
          {secondary ? (
            <a href={secondary.href} className="candy-btn candy-btn-outline candy-btn-with-icon">
              {secondary.text}
              <ArrowDown className="candy-icon-inline" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
