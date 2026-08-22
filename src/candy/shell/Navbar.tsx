'use client'

import { useEffect, useState } from 'react'
import type { ContentConfig, ContentManifest, NavItem } from '@lefolio/engine/template'
import { bricolage } from '../../fonts'
import { candyEmail } from '../context'

interface NavbarProps {
  manifest: ContentManifest
}

function navItemsFromConfig(config: ContentConfig): NavItem[] {
  const raw = config.navigation
  if (!raw) return []

  const entries = Array.isArray(raw)
    ? raw
    : Object.entries(raw).map(([label, href]) => ({ [label]: href }))

  return entries.flatMap((entry) => {
    if (typeof entry === 'string') {
      return [{ label: entry, href: `#${entry.toLowerCase()}`, type: 'external' as const }]
    }
    const pair = Object.entries(entry)[0]
    if (!pair) return []
    const [label, href] = pair
    return [
      {
        label,
        href: href ? String(href) : `#${label.toLowerCase()}`,
        type: 'external' as const,
      },
    ]
  })
}

function scrollToHash(href: string) {
  if (!href.startsWith('#')) return
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function NavLink({ item, className }: { item: NavItem; className: string }) {
  if (item.href.startsWith('#')) {
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
    <a href={item.href} className={className}>
      {item.label}
    </a>
  )
}

export default function Navbar({ manifest }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const siteName = manifest.config.site.title
  const cta = manifest.config.cta
  const ctaHref = cta?.href ?? `mailto:${candyEmail(manifest)}`
  const ctaLabel = cta?.label ?? 'Get in touch'
  const navItems = navItemsFromConfig(manifest.config)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`candy-header${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="candy-container candy-header-inner" aria-label="Main">
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

        <div className="candy-nav-links">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} className="candy-nav-link" />
          ))}
        </div>

        <a href={ctaHref} className="candy-nav-cta">
          {ctaLabel}
        </a>
      </nav>
    </header>
  )
}
