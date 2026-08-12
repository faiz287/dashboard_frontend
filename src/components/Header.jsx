"use client";

import { Plus, Menu } from "lucide-react";

export default function Header({
  onMenuClick,
  onNewLeadClick,
  activeWebsite
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-border-color shadow-xs backdrop-blur-md bg-white/95">
      {/* Left section: Hamburger (mobile) and Active view Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg lg:hidden hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-slate-900">CRM Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">
            {activeWebsite === "all" ? "Tracking All Sites" : `Filtering: ${activeWebsite}`}
          </p>
        </div>
      </div>

      {/* Right section: Quick action button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNewLeadClick}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary/95 rounded-lg shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer active:scale-97"
        >
          <Plus className="w-4 h-4" />
          <span>New Lead</span>
        </button>
      </div>
    </header>
  );
}
