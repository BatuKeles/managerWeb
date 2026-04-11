'use client'
import dynamic from 'next/dynamic'

const MesajlarDemo = dynamic(
  () => import('@/app/demo/components/MesajlarDemo'),
  { ssr: false, loading: () => <DemoSkeleton /> }
)

function DemoSkeleton() {
  return (
    <div className="p-6">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-6" />
      <div className="space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />)}
      </div>
    </div>
  )
}

export default function MesajlarPage() {
  return <MesajlarDemo />
}
