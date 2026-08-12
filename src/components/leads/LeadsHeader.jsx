"use client";

import { RefreshCw } from "lucide-react";

export default function LeadsHeader({ onResetFilters }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Leads Management</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Query, filter, and review all form collection entries in a centralized workspace.
        </p>
      </div>
      <button
        onClick={onResetFilters}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary bg-white border border-border-color hover:border-slate-300 rounded-lg shadow-sm transition-colors cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Clear Filters
      </button>
    </div>
  );
}
