'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
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
  onNavigate,
}: {
  item: CandyNavItem
  onHome: boolean
  className: string
  onNavigate?: () => void
}) {
  if (item.kind === 'external') {
    return (
      <a href={item.href} className={className} onClick={onNavigate}>
        {item.label}
      </a>
    )
  }

  if (item.kind === 'anchor') {
    if (!onHome) {
      return (
        <Link href={`/${item.href}`} className={className} onClick={onNavigate}>
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
          onNavigate?.()
        }}
      >
        {item.label}
      </a>
    )
  }

  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  )
}

export default function Navbar({ manifest }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const pathname = usePathname()
  const onHome = (pathname ?? '/').replace(/\/$/, '') === ''
  const siteName = manifest.config.site.title
  const cta = manifest.config.cta
  const ctaHref = cta?.href ?? `mailto:${candyEmail(manifest)}`
  const ctaLabel = cta?.label ?? 'Get in touch'
  const items = navItems(manifest)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      className={`candy-header${scrolled || menuOpen ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}
    >
      <nav className="candy-container candy-header-inner" aria-label="Main">
        {onHome ? (
          <a
            href="#top"
            className={`candy-brand ${bricolage.className}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToHash('#top')
              closeMenu()
            }}
          >
            {siteName}
          </a>
        ) : (
          <Link href="/" className={`candy-brand ${bricolage.className}`} onClick={closeMenu}>
            {siteName}
          </Link>
        )}

        <button
          type="button"
          className="candy-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div id={menuId} className={`candy-nav-panel${menuOpen ? ' is-open' : ''}`}>
          <div className="candy-nav-links">
            {items.map((item) => (
              <NavLink
                key={`${item.label}-${item.href}`}
                item={item}
                onHome={onHome}
                className="candy-nav-link"
                onNavigate={closeMenu}
              />
            ))}
          </div>

          <a href={ctaHref} className="candy-nav-cta" onClick={closeMenu}>
            {ctaLabel}
          </a>
        </div>
      </nav>
    </header>
  )
}
