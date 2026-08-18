import { EMAIL } from '../content'

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-ink-soft sm:flex-row">
        <p className="font-display font-medium text-ink">Olivier Rouiller</p>
        <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-ink">
          {EMAIL}
        </a>
      </div>
    </footer>
  )
}
