import MarkdownRenderer from '@lefolio/engine/markdown'
import type { ContentManifest } from '@lefolio/engine/template'

interface CandyHomeProps {
  manifest: ContentManifest
}

export default function CandyHome({ manifest }: CandyHomeProps) {
  const body = manifest.home?.processedBody
  if (!body) {
    return (
      <div className="candy-container candy-empty">
        <p>No home page content.</p>
      </div>
    )
  }

  return (
    <div className="candy-home">
      <MarkdownRenderer content={body} />
    </div>
  )
}
