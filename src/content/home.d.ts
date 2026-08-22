/** Site-wide content types extracted from the original olivier-web `home.json`. */

export type CandyToolIcon = 'bot' | 'layers' | 'file-text'

export interface CandyNavLink {
  label: string
  href: string
}

export interface CandyHero {
  eyebrow: string
  title: string
  body: string
  primaryCta: string
  secondaryCta: string
  secondaryHref: string
}

export interface CandyStep {
  title: string
  body: string
}

export interface CandyHowIWork {
  eyebrow: string
  title: string
  steps: CandyStep[]
}

export interface CandyProject {
  title: string
  role: string
  href: string
  display: string
  image: string
  alt: string
}

export interface CandyWork {
  eyebrow: string
  title: string
  projects: CandyProject[]
}

export interface CandyTool {
  name: string
  body: string
  icon: CandyToolIcon
}

export interface CandyAbout {
  eyebrow: string
  title: string
  paragraphs: string[]
  tools: CandyTool[]
}

export interface CandyContact {
  eyebrow: string
  title: string
  body: string
}

/** Full homepage document shape (formerly `content/pages/home.json`). */
export interface CandyHomeContent {
  siteName: string
  email: string
  nav: CandyNavLink[]
  hero: CandyHero
  howIWork: CandyHowIWork
  work: CandyWork
  about: CandyAbout
  contact: CandyContact
}
