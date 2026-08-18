import home from '../content/pages/home.json'

const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const SITE_NAME = home.siteName
export const EMAIL = home.email
export const NAV_LINKS = home.nav
export const HERO = home.hero
export const HOW_I_WORK = home.howIWork
export const ABOUT = home.about
export const CONTACT = home.contact

export const PROJECTS = home.work.projects.map((project) => ({
  ...project,
  image: publicAsset(project.image),
}))

export const WORK = {
  ...home.work,
  projects: PROJECTS,
}

export type ToolIcon = 'bot' | 'layers' | 'file-text'
