'use client'

import dynamic from 'next/dynamic'

const OnaylarDemo = dynamic(
  () => import('@/app/demo/components/OnaylarDemo'),
  { ssr: false, loading: () => <DemoSkeleton /> }
)

function DemoSkeleton() {
  return (
    <div className="p-6">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-6" />
      {[1, 2, 3].map((section) => (
        <div key={section} className="mb-8">
          <div className="h-5 w-56 bg-white/5 rounded animate-pulse mb-4" />
          {[1, 2].map((row) => (
            <div key={row} className="h-20 bg-white/5 rounded-xl animate-pulse mb-3" />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function OnaylarPage() {
  return <OnaylarDemo />
}
