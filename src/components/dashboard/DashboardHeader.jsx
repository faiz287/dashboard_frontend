"use client";

import { Globe } from "lucide-react";

export default function DashboardHeader({ activeWebsite }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Overview</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Real-time aggregate data for form submissions across tracking domains.
        </p>
      </div>

      {activeWebsite !== "all" && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-primary font-semibold">
          <Globe className="w-3.5 h-3.5" />
          Filtered by site: {activeWebsite}
        </div>
      )}
    </div>
  );
}
