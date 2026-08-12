"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";
import RecentLeadRow from "./RecentLeadRow";

export default function RecentLeadsTable({ recentLeads, label, loading, onRowClick }) {
  return (
    <div className="bg-card-bg border border-border-color rounded-2xl shadow-xs overflow-hidden">
      {/* Table Header block */}
      <div className="flex items-center justify-between p-5 border-b border-border-color bg-slate-50/50">
        <div>
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Recent Leads
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">{label}</p>
        </div>
        <Link
          href="/leads"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline hover:gap-1.5 transition-all"
        >
          View All Leads
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table layout */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6">
            <LoadingSkeleton variant="table" count={5} />
          </div>
        ) : recentLeads.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyState
              title="No Recent Leads"
              description="We haven't received any form submissions in the last 7 days."
              type="default"
            />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-color text-[11px] font-bold text-text-secondary uppercase tracking-wider bg-slate-50/30">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-4">Source Page</th>
                <th className="py-3 px-6 text-right">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color text-sm">
              {recentLeads.map((lead) => (
                <RecentLeadRow key={lead._id || lead.id} lead={lead} onRowClick={onRowClick} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
