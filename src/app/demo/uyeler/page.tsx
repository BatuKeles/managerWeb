'use client'

import dynamic from 'next/dynamic'

const UyelerDemo = dynamic(
  () => import('@/app/demo/components/UyelerDemo'),
  { ssr: false, loading: () => <DemoSkeleton /> }
)

function DemoSkeleton() {
  return (
    <div className="p-6">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-96 bg-white/5 rounded-xl animate-pulse" />
    </div>
  )
}

export default function UyelerPage() {
  return <UyelerDemo />
}
