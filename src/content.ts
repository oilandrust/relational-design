export const EMAIL = 'o.rouiller@gmail.com'

const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const NAV_LINKS = [
  { label: 'How I work', href: '#how-i-work' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
]

export const STEPS = [
  {
    title: 'Figure out why',
    body: 'We start by understanding with why you need a website, and what you are trying to achieve right now. That way we make sure your website is aligned with your business.',
  },
  {
    title: 'Find a style you like',
    body: 'We create mock-ups with AI and iterate on them together until we land on aesthetics that genuinely feel like you.',
  },
  {
    title: 'Design the content',
    body: 'We shape the pages, the content, and the templates you need — for your courses, your products, or your offering.',
  },
  {
    title: 'Break it into components',
    body: 'We break the pages into components that articulate your message and your values in the style we chose.',
  },
  {
    title: 'Make it yours to edit',
    body: 'We iterate, then turn the prototype into a real site you can update yourself while the style stays sharp.',
  },
]

export const PROJECTS = [
  {
    title: 'Re-connected',
    role: 'My first coaching page',
    href: 'https://www.re-connected.fr',
    display: 'www.re-connected.fr',
    image: publicAsset('work-re-connected.webp'),
    alt: 'Preview of the re-connected.fr coaching site: a calm, text-led page introducing somatic coaching sessions.',
  },
  {
    title: 'Reconnected, reworked',
    role: 'The same practice, rebuilt with AI',
    href: 'https://reconnected-coral.vercel.app/',
    display: 'reconnected-coral.vercel.app',
    image: publicAsset('work-reconnected-coral.webp'),
    alt: 'Preview of the reworked Reconnected site: a full-bleed misty forest hero with a centred headline and a booking button.',
  },
]
