'use client'

import { Mail } from 'lucide-react'
import type { MarkdownBlockProps } from '@lefolio/engine/template'
import { MarkdownBody } from '@lefolio/engine/markdown'
import { candyEmail, useCandyManifest } from '../context'
import {
  firstHeading,
  firstPlainLine,
  prepareCandyMarkdown,
  stripFirstPlainLine,
} from '../../lib/parse'
import Reveal from './Reveal'

export default function Contact({ content }: MarkdownBlockProps) {
  const manifest = useCandyManifest()
  const prepared = prepareCandyMarkdown(content)
  const eyebrow = firstPlainLine(prepared)
  let rest = stripFirstPlainLine(prepared, eyebrow)
  const title = firstHeading(rest, 2)
  const body = title ? rest.replace(/^##\s+.+$/m, '').trim() : rest
  const email = candyEmail(manifest)

  return (
    <section id="contact" className="candy-section candy-section--contact">
      <div className="candy-container">
        <Reveal className="candy-contact-panel">
          <div className="candy-contact-blob" aria-hidden="true" />

          <div className="candy-contact-inner">
            {eyebrow ? <p className="candy-eyebrow candy-eyebrow--on-dark">{eyebrow}</p> : null}
            {title ? <h2 className="candy-contact-title">{title}</h2> : null}
            {body ? (
              <div className="candy-contact-body">
                <MarkdownBody
                  content={body}
                  preprocessColumnBlocks={false}
                  preprocessComponentBlocks={false}
                />
              </div>
            ) : null}

            <a href={`mailto:${email}`} className="candy-btn candy-btn-paper candy-btn-with-icon">
              <Mail className="candy-icon-inline candy-icon-inline--clay" aria-hidden="true" />
              {email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
