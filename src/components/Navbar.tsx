import { useEffect, useState } from 'react'
import { EMAIL, NAV_LINKS } from '../content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Olivier Rouiller
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={`mailto:${EMAIL}`}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform hover:scale-105"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
