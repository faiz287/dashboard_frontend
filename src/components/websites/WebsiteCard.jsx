"use client";

import { Globe, CheckCircle2 } from "lucide-react";
import { formatWebsiteOriginUrl } from "@/lib/websiteUtils";
import WebsiteStats from "./WebsiteStats";

export default function WebsiteCard({ site, count, lastReceived }) {
  const originUrl = formatWebsiteOriginUrl(site);

  return (
    <div className="bg-card-bg border border-border-color rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
          <Globe className="w-6 h-6" />
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Active
        </span>
      </div>

      <h3 className="text-lg font-bold text-text-primary mt-4 tracking-tight">
        {site}
      </h3>
      
      <p className="text-xs text-text-secondary mt-1 truncate">
        Origin: {originUrl}
      </p>

      <WebsiteStats count={count} lastReceived={lastReceived} />
    </div>
  );
}
