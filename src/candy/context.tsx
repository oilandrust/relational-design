'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { ContentManifest } from '@lefolio/engine/template'

const CandyContext = createContext<ContentManifest | null>(null)

export function CandyProvider({
  manifest,
  children,
}: {
  manifest: ContentManifest
  children: ReactNode
}) {
  return <CandyContext.Provider value={manifest}>{children}</CandyContext.Provider>
}

export function useCandyManifest(): ContentManifest {
  const ctx = useContext(CandyContext)
  if (!ctx) {
    throw new Error('useCandyManifest must be used within CandyProvider')
  }
  return ctx
}

export function candyEmail(manifest: ContentManifest): string {
  return manifest.config.author.links?.email ?? 'o.rouiller@gmail.com'
}
