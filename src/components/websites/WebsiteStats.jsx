"use client";

import { Layers, Calendar } from "lucide-react";

export default function WebsiteStats({ count, lastReceived }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100 text-xs">
      <div className="space-y-1">
        <p className="text-slate-400 font-medium">Total Leads</p>
        <p className="text-base font-bold text-text-primary flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-primary" /> {count}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-slate-400 font-medium">Last Entry</p>
        <p className="text-xs font-semibold text-text-primary truncate flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {lastReceived}
        </p>
      </div>
    </div>
  );
}
