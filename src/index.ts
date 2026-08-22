import SiteShell from './candy/shell/SiteShell'
import CandyHome from './candy/views/CandyHome'
import Hero from './candy/components/Hero'
import HowIWork from './candy/components/HowIWork'
import Work from './candy/components/Work'
import About from './candy/components/About'
import Contact from './candy/components/Contact'
import type { TemplateModule } from '@lefolio/engine/template'

export const candyTemplate: TemplateModule = {
  id: 'candy',
  routing: 'singlepage',
  Shell: SiteShell,
  loadStyles: () => import('./candy/styles.css'),
  Home: CandyHome,
  markdownComponents: {
    hero: Hero,
    'how-i-work': HowIWork,
    work: Work,
    about: About,
    contact: Contact,
  },
}

export const template = candyTemplate
export default candyTemplate
