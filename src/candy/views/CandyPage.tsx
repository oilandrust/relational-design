import MarkdownRenderer from '@lefolio/engine/markdown'
import type { TemplateStandalonePageProps } from '@lefolio/engine/template'

export default function CandyPage({ page }: TemplateStandalonePageProps) {
  return (
    <div className="candy-page" id="top">
      <MarkdownRenderer content={page.processedBody} />
    </div>
  )
}
