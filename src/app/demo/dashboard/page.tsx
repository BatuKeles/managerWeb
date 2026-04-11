'use client'

import dynamic from 'next/dynamic'

const DashboardDemo = dynamic(
  () => import('@/app/demo/components/DashboardDemo'),
  { ssr: false, loading: () => <DemoSkeleton /> }
)

function DemoSkeleton() {
  return (
    <div className="p-6">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-6" />
      <div className="h-20 bg-white/5 rounded-xl animate-pulse mb-6" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-48 bg-white/5 rounded-xl animate-pulse mb-6" />
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return <DashboardDemo />
}
