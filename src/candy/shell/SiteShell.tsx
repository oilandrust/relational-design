'use client'

import type { ContentManifest } from '@lefolio/engine/template'
import { archivo, bricolage } from '../../fonts'
import { CandyProvider } from '../context'
import Footer from '../components/Footer'
import Navbar from './Navbar'

interface SiteShellProps {
  manifest: ContentManifest
  children: React.ReactNode
}

export default function SiteShell({ manifest, children }: SiteShellProps) {
  return (
    <CandyProvider manifest={manifest}>
      <div
        className={`candy-shell ${archivo.className} ${bricolage.variable} ${archivo.variable}`}
      >
        <Navbar manifest={manifest} />
        <main>{children}</main>
        <Footer manifest={manifest} />
      </div>
    </CandyProvider>
  )
}
