"use client";

/**
 * LoadingSkeleton renders placeholder UI blocks for cards, tables, or ranking listings
 * @param {Object} props
 * @param {'card'|'table'|'ranking'} props.variant 
 * @param {number} [props.count] - Number of skeleton blocks to repeat
 */
export default function LoadingSkeleton({ variant = "table", count = 4 }) {
  // 1. Stat Card Skeleton
  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="p-6 bg-card-bg border border-border-color rounded-2xl shadow-xs space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2.5 w-2/3">
                <div className="h-3 bg-slate-200 rounded-sm w-1/2 shimmer" />
                <div className="h-8 bg-slate-200 rounded-sm w-3/4 shimmer" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-200 border border-slate-300/35 shimmer shrink-0" />
            </div>
            <div className="h-3 bg-slate-100 rounded-sm w-3/4 shimmer pt-1" />
          </div>
        ))}
      </div>
    );
  }

  // 2. Ranking Sidebar/List Skeleton
  if (variant === "ranking") {
    return (
      <div className="p-6 bg-card-bg border border-border-color rounded-2xl shadow-xs space-y-5 h-full">
        <div className="flex justify-between items-center pb-2 border-b border-border-color">
          <div className="space-y-1.5 w-1/2">
            <div className="h-4 bg-slate-200 rounded-sm w-2/3 shimmer" />
            <div className="h-3 bg-slate-200 rounded-sm w-1/2 shimmer" />
          </div>
          <div className="w-4 h-4 rounded-sm bg-slate-200 shimmer" />
        </div>
        
        <div className="space-y-5">
          {[...Array(count)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3.5 bg-slate-200 rounded-sm w-5/12 shimmer" />
                <div className="h-3.5 bg-slate-200 rounded-sm w-1/6 shimmer" />
              </div>
              <div className="h-2 bg-slate-100 rounded-full w-full shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Main Data Table Skeleton
  return (
    <div className="bg-card-bg border border-border-color rounded-2xl shadow-xs overflow-hidden">
      {/* Filtering Header Skeleton */}
      <div className="flex items-center gap-2.5 p-4 border-b border-border-color bg-slate-50/50">
        <div className="h-4 bg-slate-200 rounded-sm w-16 shimmer" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-7 bg-slate-200 rounded-lg w-16 shimmer" />
          ))}
        </div>
      </div>

      {/* Table rows shimmer */}
      <div className="p-6 space-y-4.5">
        <div className="flex justify-between border-b border-border-color pb-3">
          <div className="h-4 bg-slate-200 rounded-sm w-1/6 shimmer" />
          <div className="h-4 bg-slate-200 rounded-sm w-1/5 shimmer" />
          <div className="h-4 bg-slate-200 rounded-sm w-1/8 shimmer" />
          <div className="h-4 bg-slate-200 rounded-sm w-1/8 shimmer" />
          <div className="h-4 bg-slate-200 rounded-sm w-1/10 shimmer" />
        </div>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="flex justify-between py-1 border-b border-slate-100">
            <div className="h-4.5 bg-slate-100 rounded-sm w-1/5 shimmer" />
            <div className="h-4.5 bg-slate-100 rounded-sm w-1/4 shimmer" />
            <div className="h-4.5 bg-slate-100 rounded-sm w-1/10 shimmer" />
            <div className="h-4.5 bg-slate-100 rounded-sm w-1/6 shimmer" />
            <div className="h-4.5 bg-slate-100 rounded-sm w-1/12 shimmer" />
          </div>
        ))}
      </div>

      {/* Footer controls skeleton */}
      <div className="flex items-center justify-between px-6 py-4.5 border-t border-border-color bg-slate-50/40">
        <div className="h-4 bg-slate-200 rounded-sm w-1/4 shimmer" />
        <div className="h-8 bg-slate-200 rounded-lg w-20 shimmer" />
      </div>
    </div>
  );
}
