"use client";

import { Link as LinkIcon } from "lucide-react";
import { getWebsiteStats } from "@/services/websiteService";
import WebsiteCard from "./WebsiteCard";

export default function WebsitesGrid({ websites = [], leads = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {websites.map((site) => {
        const stats = getWebsiteStats(leads, site);
        return (
          <WebsiteCard
            key={site}
            site={site}
            count={stats.count}
            lastReceived={stats.lastReceived}
          />
        );
      })}

      {/* Add Website card helper placeholder */}
      <div className="bg-slate-50 border border-border-color border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center group select-none min-h-[220px]">
        <div className="p-3 bg-white border border-slate-200 rounded-full text-slate-400 mb-3 group-hover:scale-105 transition-transform">
          <LinkIcon className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-text-primary">Add Website Endpoint</h4>
        <p className="text-xs text-text-secondary mt-1 max-w-[200px] leading-relaxed mx-auto">
          Endpoints are registered automatically when form payloads contain a new website identifier.
        </p>
      </div>
    </div>
  );
}
