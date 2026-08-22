'use client'

import type { ContentManifest } from '@lefolio/engine/template'

export default function Footer({ manifest }: { manifest: ContentManifest }) {
  const siteName = manifest.config.site.title
  const email = manifest.config.author.links?.email ?? ''

  return (
    <footer className="candy-footer">
      <div className="candy-container candy-footer-inner">
        <p className="candy-footer-brand">{siteName}</p>
        {email ? (
          <a href={`mailto:${email}`} className="candy-footer-email">
            {email}
          </a>
        ) : null}
      </div>
    </footer>
  )
}
