export default function ProductSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-surface-2" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-surface-3 rounded w-1/3" />
        <div className="h-4 bg-surface-3 rounded w-full" />
        <div className="h-4 bg-surface-3 rounded w-3/4" />
        <div className="flex justify-between">
          <div className="h-5 bg-surface-3 rounded w-1/4" />
          <div className="h-4 bg-surface-3 rounded w-1/3" />
        </div>
        <div className="h-1.5 bg-surface-3 rounded-full w-full" />
        <div className="h-10 bg-surface-3 rounded-xl w-full" />
      </div>
    </div>
  )
}
