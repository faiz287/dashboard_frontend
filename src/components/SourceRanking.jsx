"use client";

import { Globe, ArrowUpRight } from "lucide-react";
import RankingSkeleton from "./LoadingSkeleton";

export default function SourceRanking({ rankings = [], loading = false }) {
  if (loading) {
    return (
      <div className="p-6 bg-card-bg border border-border-color rounded-2xl shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Top Lead Sources
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-slate-200 rounded-sm w-1/3 shimmer" />
                <div className="h-4 bg-slate-200 rounded-sm w-12 shimmer" />
              </div>
              <div className="h-2 bg-slate-200 rounded-full w-full shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 bg-card-bg border border-border-color rounded-2xl shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Top Lead Sources
          </h3>
          <p className="text-xs text-text-secondary">Website + Landing Page combinations</p>
        </div>
        <Globe className="w-4 h-4 text-text-secondary" />
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4.5 max-h-[360px]">
        {rankings.map((rank, index) => {
          // Dynamic colors for progress bars based on position for a premium look
          const barColor =
            index === 0
              ? "bg-primary" // Top source gets primary Blue
              : index === 1
              ? "bg-accent" // Second gets Cyan Accent
              : "bg-slate-400"; // Others get muted slate

          return (
            <div key={`${rank.websiteName}-${rank.sourcePage}`} className="space-y-1.5 group">
              <div className="flex items-start justify-between text-xs">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 truncate">
                    <span className="truncate">{rank.websiteName}</span>
                    <span className="text-slate-400">/</span>
                    <span className="font-medium text-text-secondary truncate">{rank.sourcePage}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 font-medium">
                  <span className="font-semibold text-slate-800">{rank.count}</span>
                  <span className="text-slate-400"> leads</span>
                  <span className="text-slate-400 mx-1">•</span>
                  <span className="font-semibold text-primary">{rank.percentage}%</span>
                </div>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
                  style={{ width: `${rank.percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        {rankings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-text-secondary font-medium">No lead source metrics found</p>
            <p className="text-xs text-slate-400 mt-1">Adjust filters or search parameters</p>
          </div>
        )}
      </div>
    </div>
  );
}
