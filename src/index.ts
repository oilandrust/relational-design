import SiteShell from './candy/shell/SiteShell'
import CandyHome from './candy/views/CandyHome'
import CandyPage from './candy/views/CandyPage'
import Hero from './candy/components/Hero'
import HowIWork from './candy/components/HowIWork'
import Work from './candy/components/Work'
import About from './candy/components/About'
import Offers from './candy/components/Offers'
import Goals from './candy/components/Goals'
import Timeline from './candy/components/Timeline'
import Showcase from './candy/components/Showcase'
import Contact from './candy/components/Contact'
import type { TemplateModule } from '@lefolio/engine/template'

export const candyTemplate: TemplateModule = {
  id: 'candy',
  routing: 'singlepage',
  Shell: SiteShell,
  loadStyles: () => import('./candy/styles.css'),
  Home: CandyHome,
  StandalonePage: CandyPage,
  markdownComponents: {
    hero: Hero,
    'how-i-work': HowIWork,
    work: Work,
    about: About,
    offers: Offers,
    goals: Goals,
    timeline: Timeline,
    showcase: Showcase,
    contact: Contact,
  },
}

export const template = candyTemplate
export default candyTemplate
