'use client'

import dynamic from 'next/dynamic'

const SeanslarDemo = dynamic(
  () => import('@/app/demo/components/SeanslarDemo'),
  { ssr: false, loading: () => <DemoSkeleton /> }
)

function DemoSkeleton() {
  return (
    <div className="p-6">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-6" />
      <div className="flex gap-3 mb-6">
        <div className="h-8 w-56 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-8 w-20 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-8 w-20 bg-white/5 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 56 }).map((_, i) => (
          <div key={i} className="h-[70px] bg-white/5 rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function SeanslarPage() {
  return <SeanslarDemo />
}
