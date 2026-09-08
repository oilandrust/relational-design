'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { slugify, type ContentManifest } from '@lefolio/engine/template'
import { bricolage } from '../../fonts'
import { candyEmail } from '../context'

interface NavbarProps {
  manifest: ContentManifest
}

interface CandyNavItem {
  label: string
  href: string
  /** Anchors scroll within the home page; routes are real pages. */
  kind: 'anchor' | 'route' | 'external'
}

function configEntries(manifest: ContentManifest): Array<[string, string | null]> {
  const raw = manifest.config.navigation
  if (!raw) return []

  const entries = Array.isArray(raw)
    ? raw
    : Object.entries(raw).map(([label, href]) => ({ [label]: href }))

  return entries.flatMap((entry) => {
    if (typeof entry === 'string') return [[entry, null] as [string, string | null]]
    const pair = Object.entries(entry)[0]
    if (!pair) return []
    const [label, href] = pair
    return [[label, href ? String(href) : null] as [string, string | null]]
  })
}

/** Resolve a bare `- Offering` entry against the pages the engine generated. */
function routeForLabel(manifest: ContentManifest, label: string): string | null {
  const slug = slugify(label)
  const page = manifest.standalonePages.find((entry) => entry.sectionSlug === slug)
  if (page) return page.href
  const section = manifest.sections.find((entry) => entry.sectionSlug === slug)
  if (section) return `/${section.sectionSlug}/`
  return null
}

function navItems(manifest: ContentManifest): CandyNavItem[] {
  return configEntries(manifest).map(([label, href]) => {
    if (href?.startsWith('#')) return { label, href, kind: 'anchor' }
    if (href && /^(https?:|mailto:|tel:)/i.test(href)) return { label, href, kind: 'external' }
    if (href) return { label, href, kind: 'route' }

    const route = routeForLabel(manifest, label)
    return route
      ? { label, href: route, kind: 'route' }
      : { label, href: `#${slugify(label)}`, kind: 'anchor' }
  })
}

function scrollToHash(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function NavLink({
  item,
  onHome,
  className,
}: {
  item: CandyNavItem
  onHome: boolean
  className: string
}) {
  if (item.kind === 'external') {
    return (
      <a href={item.href} className={className}>
        {item.label}
      </a>
    )
  }

  if (item.kind === 'anchor') {
    if (!onHome) {
      return (
        <Link href={`/${item.href}`} className={className}>
          {item.label}
        </Link>
      )
    }
    return (
      <a
        href={item.href}
        className={className}
        onClick={(e) => {
          e.preventDefault()
          scrollToHash(item.href)
        }}
      >
        {item.label}
      </a>
    )
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  )
}

export default function Navbar({ manifest }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const onHome = (pathname ?? '/').replace(/\/$/, '') === ''
  const siteName = manifest.config.site.title
  const cta = manifest.config.cta
  const ctaHref = cta?.href ?? `mailto:${candyEmail(manifest)}`
  const ctaLabel = cta?.label ?? 'Get in touch'
  const items = navItems(manifest)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`candy-header${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="candy-container candy-header-inner" aria-label="Main">
        {onHome ? (
          <a
            href="#top"
            className={`candy-brand ${bricolage.className}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToHash('#top')
            }}
          >
            {siteName}
          </a>
        ) : (
          <Link href="/" className={`candy-brand ${bricolage.className}`}>
            {siteName}
          </Link>
        )}

        <div className="candy-nav-links">
          {items.map((item) => (
            <NavLink
              key={`${item.label}-${item.href}`}
              item={item}
              onHome={onHome}
              className="candy-nav-link"
            />
          ))}
        </div>

        <a href={ctaHref} className="candy-nav-cta">
          {ctaLabel}
        </a>
      </nav>
    </header>
  )
}
