/**
 * Candy template — markdown helpers built on `@lefolio/engine/parse`.
 *
 * Template-specific preprocessors and composite parsers stay here;
 * shared primitives live in the engine.
 */

import type { CandyToolIcon } from '../content/home.d'
import {
  escapeRegExp,
  extractFirstImage,
  extractLinks as extractLinksBase,
  extractListItems,
  firstHeading,
  firstPlainLine,
  mdImageRegExp,
  paragraphs,
  splitByHeading,
  splitByHeadingSections,
  stripFirstPlainLine,
  stripHeadings,
  stripImages,
  stripLinks,
  stripList,
  type MdLink as EngineMdLink,
} from '@lefolio/engine/parse'

export type { MdImage } from '@lefolio/engine/parse'
export {
  escapeRegExp,
  extractFirstImage,
  extractListItems,
  firstHeading,
  firstPlainLine,
  paragraphs,
  splitByHeading,
  splitByHeadingSections,
  splitParagraphs,
  stripFirstPlainLine,
  stripHeading,
  stripHeadings,
  stripImages,
  stripLinks,
  stripList,
} from '@lefolio/engine/parse'

export interface MdLink {
  text: string
  href: string
  variant: 'primary' | 'secondary'
}

export function preprocessLinkAttrs(markdown: string): string {
  return markdown.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)\{(\w+)\}/g,
    (_m, text: string, href: string, attr: string) => `[${text}](${href} "${attr}")`,
  )
}

export function preprocessIconShortcodes(markdown: string): string {
  return markdown.replace(/:icon-([\w-]+):/g, (_m, name: string) => {
    return `<span class="candy-icon" data-icon="${name.toLowerCase()}" aria-hidden="true"></span>`
  })
}

export function prepareCandyMarkdown(markdown: string): string {
  return preprocessIconShortcodes(preprocessLinkAttrs(markdown))
}

function toCandyLink(link: EngineMdLink): MdLink {
  return {
    text: link.text,
    href: link.href,
    variant: link.title?.toLowerCase() === 'secondary' ? 'secondary' : 'primary',
  }
}

export function extractLinks(markdown: string): MdLink[] {
  return extractLinksBase(preprocessLinkAttrs(markdown)).map(toCandyLink)
}

export function parseToolIcon(markdown: string): CandyToolIcon {
  const shortcode = markdown.match(/:icon-([\w-]+):/)
  const id = shortcode?.[1]?.toLowerCase()
  if (id === 'layers' || id === 'file-text' || id === 'bot') return id

  const dataIcon = markdown.match(/data-icon=["']([\w-]+)["']/i)
  const fromSpan = dataIcon?.[1]?.toLowerCase()
  if (fromSpan === 'layers' || fromSpan === 'file-text' || fromSpan === 'bot') return fromSpan

  return 'bot'
}

export function stripIconShortcodes(markdown: string): string {
  return markdown
    .replace(/:icon-[\w-]+:\s*/g, '')
    .replace(/<span class="candy-icon"[^>]*><\/span>\s*/gi, '')
    .trim()
}

export interface ParsedWorkProject {
  title: string
  role: string
  href: string
  display: string
  image: string
  alt: string
}

export function parseWorkProjects(markdown: string): ParsedWorkProject[] {
  return splitByHeadingSections(prepareCandyMarkdown(markdown), 3).map((section) => {
    const prepared = section.body
    const image = extractFirstImage(prepared)
    const links = extractLinks(prepared)
    const link = links[0]
    let rest = stripLinks(stripImages(prepared))
    const role = firstPlainLine(rest) ?? ''
    rest = stripFirstPlainLine(rest, role)
    return {
      title: section.title,
      role,
      href: link?.href ?? '#',
      display: link?.text ?? link?.href ?? '',
      image: image?.src ?? '',
      alt: image?.alt ?? section.title,
    }
  })
}

export interface ParsedToolCard {
  name: string
  body: string
  icon: CandyToolIcon
}

export function parseToolCards(markdown: string): ParsedToolCard[] {
  return splitByHeadingSections(prepareCandyMarkdown(markdown), 3).map((section) => ({
    name: section.title,
    icon: parseToolIcon(section.body),
    body: stripIconShortcodes(stripHeadings(section.body)),
  }))
}

export interface ParsedOfferPrice {
  /** Crossed-out price when written as `~~500€~~ 300€`. */
  original: string | null
  current: string
}

export interface ParsedOffer {
  title: string
  body: string[]
  features: string[]
  price: ParsedOfferPrice | null
  /** Optional text link shown next to the price (first of two links). */
  more: MdLink | null
  /** Primary button CTA (last link, or the only link). */
  cta: MdLink | null
}

function parseOfferPrice(line: string | null): ParsedOfferPrice | null {
  if (!line) return null
  const discounted = line.match(/~~\s*(.+?)\s*~~\s*(.*)$/)
  if (discounted) {
    const current = discounted[2].trim()
    return { original: discounted[1], current: current || discounted[1] }
  }
  return { original: null, current: line.trim() }
}

/** Percentage saved between the crossed-out and current price, when both are numeric. */
export function offerDiscountPercent(price: ParsedOfferPrice | null): number | null {
  if (!price?.original) return null
  const toNumber = (value: string) => Number(value.replace(/[^\d.,]/g, '').replace(',', '.'))
  const before = toNumber(price.original)
  const after = toNumber(price.current)
  if (!Number.isFinite(before) || !Number.isFinite(after) || before <= 0 || after >= before) {
    return null
  }
  return Math.round(((before - after) / before) * 100)
}

/**
 * `### Offer title` cards, each with optional intro lines, a `-` feature list,
 * a `#### price` (or call-to-action label) and optional links.
 * With two links, the first is a "Learn more" text link and the second is the CTA button.
 */
export function parseOffers(markdown: string): ParsedOffer[] {
  return splitByHeadingSections(prepareCandyMarkdown(markdown), 3).map((section) => {
    const priceLine = firstHeading(section.body, 4)
    const links = extractLinks(section.body)
    const more = links.length > 1 ? links[0] : null
    const cta = links.length > 1 ? links[1] : (links[0] ?? null)
    const rest = stripLinks(stripHeadings(section.body))
    return {
      title: section.title,
      body: paragraphs(stripList(rest)),
      features: extractListItems(rest),
      price: parseOfferPrice(priceLine),
      more,
      cta,
    }
  })
}

export interface ParsedGoals {
  title: string | null
  intro: string[]
  points: string[]
  /** Image shown above the price card (after the `---` separator). */
  image: { src: string; alt: string } | null
  /** Everything after the `---` separator. */
  note: string[]
  price: ParsedOfferPrice | null
  cta: MdLink | null
}

function isPriceLine(line: string): boolean {
  if (!line) return false
  return /~~/.test(line) || /^[^a-z]*\d[\d\s.,]*\s*(€|\$|£|chf|eur|usd)\s*$/i.test(line)
}

/**
 * A pitch split by `---`: headline, intro and checklist on one side,
 * image, closing note, price and call to action on the other.
 */
export function parseGoals(markdown: string): ParsedGoals {
  const prepared = prepareCandyMarkdown(markdown)
  // Allow `---![[image]]` on one line as well as a bare `---` separator.
  const [pitch, offer = ''] = prepared.split(/^\s*-{3,}\s*/m)

  const headline = firstHeading(pitch, 1) ?? firstHeading(pitch, 2)
  const pitchBody = stripHeadings(pitch)

  const image = extractFirstImage(offer)
  const offerWithoutImage = stripImages(offer)
  const offerLines = offerWithoutImage.split('\n').map((line) => line.trim())
  const priceLine = offerLines.find(isPriceLine) ?? null
  const noteSource = stripLinks(offerLines.filter((line) => !isPriceLine(line)).join('\n'))

  return {
    title: headline,
    intro: paragraphs(stripList(pitchBody)),
    points: extractListItems(pitchBody),
    image: image ? { src: image.src, alt: image.alt } : null,
    note: paragraphs(noteSource),
    price: parseOfferPrice(priceLine),
    cta: extractLinks(offer)[0] ?? null,
  }
}

export interface ParsedTimelineStep {
  title: string
  items: string[]
}

export interface ParsedTimeline {
  title: string | null
  intro: string[]
  steps: ParsedTimelineStep[]
}

/** `## title` plus one `### step` per phase, each holding a `-` list. */
export function parseTimeline(markdown: string): ParsedTimeline {
  const prepared = prepareCandyMarkdown(markdown)
  const { intro, sections } = splitByHeading(prepared, 3)

  return {
    title: firstHeading(intro, 2),
    intro: paragraphs(stripHeadings(intro)),
    steps: sections.map((section) => ({
      title: section.title,
      items: extractListItems(section.body),
    })),
  }
}

export interface ParsedShowcaseShot {
  src: string
  alt: string
  href: string | null
  display: string | null
}

export interface ParsedShowcase {
  title: string | null
  intro: string[]
  shots: ParsedShowcaseShot[]
}

const BARE_URL = /^(?:https?:\/\/|www\.)\S+$/i

/** Screenshots, each optionally followed by the URL of the live site. */
export function parseShowcase(markdown: string): ParsedShowcase {
  const prepared = prepareCandyMarkdown(markdown)
  const shots: ParsedShowcaseShot[] = []
  const intro: string[] = []

  for (const raw of prepared.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue

    const image = line.match(mdImageRegExp())
    if (image?.[2]) {
      shots.push({ src: image[2], alt: image[1] ?? '', href: null, display: null })
      continue
    }

    if (BARE_URL.test(line)) {
      const last = shots[shots.length - 1]
      if (last && !last.href) {
        last.href = /^https?:/i.test(line) ? line : `https://${line}`
        last.display = line.replace(/^https?:\/\//i, '').replace(/\/$/, '')
      }
      continue
    }

    intro.push(line)
  }

  return { title: firstHeading(prepared, 2), intro, shots }
}
