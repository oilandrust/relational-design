/**
 * Markdown helpers for the candy landing blocks.
 */

import type { CandyToolIcon } from '../content/home.d'

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

const LINK_RE = /(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g

export function extractLinks(markdown: string): MdLink[] {
  const prepared = preprocessLinkAttrs(markdown)
  const links: MdLink[] = []
  let match: RegExpExecArray | null
  LINK_RE.lastIndex = 0
  while ((match = LINK_RE.exec(prepared)) !== null) {
    const variant = match[3]?.toLowerCase() === 'secondary' ? 'secondary' : 'primary'
    links.push({ text: match[1] ?? '', href: match[2] ?? '', variant })
  }
  return links
}

export function extractFirstImage(markdown: string): { src: string; alt: string } | null {
  const mdMatch = markdown.match(/!\[([^\]]*)\]\(([^)\s]+)\)/)
  if (mdMatch?.[2]) {
    return { alt: mdMatch[1] ?? '', src: mdMatch[2] }
  }
  const imgMatch = markdown.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
  if (imgMatch?.[1]) {
    const altMatch = markdown.match(/<img[^>]+alt=["']([^"']*)["']/i)
    return { alt: altMatch?.[1] ?? '', src: imgMatch[1] }
  }
  return null
}

export function stripImages(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .trim()
}

export function stripLinks(markdown: string): string {
  return preprocessLinkAttrs(markdown)
    .replace(/(?<!!)\[([^\]]+)\]\([^)]+\)/g, '')
    .trim()
}

export function splitByHeading(
  markdown: string,
  level: number,
): Array<{ title: string; body: string }> {
  const re = new RegExp(`^#{${level}}\\s+(.+)$`, 'gm')
  const indices: Array<{ title: string; index: number; endTitle: number }> = []
  let match: RegExpExecArray | null
  while ((match = re.exec(markdown)) !== null) {
    indices.push({
      title: (match[1] ?? '').trim(),
      index: match.index,
      endTitle: match.index + match[0].length,
    })
  }
  if (indices.length === 0) return []

  return indices.map((item, i) => {
    const bodyStart = item.endTitle
    const bodyEnd = i + 1 < indices.length ? indices[i + 1]!.index : markdown.length
    return {
      title: item.title,
      body: markdown.slice(bodyStart, bodyEnd).trim(),
    }
  })
}

export function firstHeading(markdown: string, level?: number): string | null {
  const re = level ? new RegExp(`^#{${level}}\\s+(.+)$`, 'm') : /^#{1,6}\s+(.+)$/m
  const match = markdown.match(re)
  return match?.[1]?.trim() ?? null
}

export function stripHeadings(markdown: string): string {
  return markdown.replace(/^#{1,6}\s+.+$/gm, '').trim()
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function firstPlainLine(markdown: string): string | null {
  const line = markdown
    .split('\n')
    .map((l) => l.trim())
    .find(
      (l) =>
        l &&
        !l.startsWith('#') &&
        !l.startsWith('!') &&
        !l.startsWith('[') &&
        !l.startsWith('<') &&
        !l.startsWith(':icon-'),
    )
  return line ?? null
}

export function stripFirstPlainLine(markdown: string, line: string | null): string {
  if (!line) return markdown
  return markdown.replace(new RegExp(`^\\s*${escapeRegExp(line)}\\s*$`, 'm'), '').trim()
}

export function splitParagraphs(markdown: string): string[] {
  return markdown
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
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
  return splitByHeading(prepareCandyMarkdown(markdown), 3).map((section) => {
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
  return splitByHeading(prepareCandyMarkdown(markdown), 3).map((section) => ({
    name: section.title,
    icon: parseToolIcon(section.body),
    body: stripIconShortcodes(stripHeadings(section.body)),
  }))
}
