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
  firstHeading,
  firstPlainLine,
  paragraphs,
  splitByHeadingSections,
  stripFirstPlainLine,
  stripHeadings,
  stripImages,
  stripLinks,
  type MdLink as EngineMdLink,
} from '@lefolio/engine/parse'

export type { MdImage } from '@lefolio/engine/parse'
export {
  escapeRegExp,
  extractFirstImage,
  firstHeading,
  firstPlainLine,
  paragraphs,
  splitByHeadingSections,
  splitParagraphs,
  stripFirstPlainLine,
  stripHeadings,
  stripImages,
  stripLinks,
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
