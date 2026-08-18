import { Mail } from 'lucide-react'
import { CONTACT, EMAIL } from '../content'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="relative overflow-hidden rounded-3xl bg-forest px-8 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-clay/25 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-clay-soft uppercase">
              {CONTACT.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-snug font-semibold tracking-tight text-paper text-balance md:text-4xl">
              {CONTACT.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/80 text-pretty">
              {CONTACT.body}
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 font-medium text-ink transition-transform hover:scale-105"
            >
              <Mail className="h-5 w-5 text-clay" aria-hidden="true" />
              {EMAIL}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
