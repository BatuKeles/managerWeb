import { prisma } from '@/lib/db'
import LandingClient from './LandingClient'
import type { ContentBlock, Package } from '@/types'

export const dynamic = 'force-dynamic'

async function getData() {
  try {
    const [contentBlocks, packages] = await Promise.all([
      prisma.contentBlock.findMany(),
      prisma.package.findMany({ where: { isActive: true }, orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }] }),
    ])
    return {
      contentBlocks: contentBlocks.map((b) => ({
        ...b,
        type: b.type as ContentBlock['type'],
        updatedAt: b.updatedAt.toISOString(),
      })) as ContentBlock[],
      packages: packages.map((p) => ({
        ...p,
        type: p.type as Package['type'],
        price: p.price ? Number(p.price) : null,
      })) as Package[],
    }
  } catch {
    return { contentBlocks: [] as ContentBlock[], packages: [] as Package[] }
  }
}

export default async function HomePage() {
  const { contentBlocks, packages } = await getData()

  return <LandingClient contentBlocks={contentBlocks} packages={packages} />
}
