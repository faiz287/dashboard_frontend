"use client";

import { Layers, TrendingUp, CheckCircle, Clock, AlertTriangle, Plus } from "lucide-react";
import StatCard from "@/components/StatCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import StatusBadge from "@/components/leads/StatusBadge";

export default function DashboardStats({ stats, loading }) {
  if (loading) {
    return <LoadingSkeleton variant="card" count={4} />;
  }

  const fu = stats.followUpStats || {};
  const dueAndOverdue = (fu.totalDueToday || 0) + (fu.totalOverdue || 0);

  const statusCounts = stats.statusCounts || {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    "Proposal Sent": 0,
    Won: 0,
    Lost: 0,
  };

  return (
    <div className="space-y-4">
      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads || 0}
          icon={Layers}
          subtext={`${stats.newLeads || 0} new • ${stats.monthLeads || 0} this month`}
          colorClass="text-blue-600 bg-blue-50 border-blue-100"
        />
        <StatCard
          title="Qualified Rate"
          value={`${stats.qualifiedRate || "0.0"}%`}
          icon={TrendingUp}
          subtext={`${statusCounts.Qualified || 0} qualified leads`}
          colorClass="text-purple-600 bg-purple-50 border-purple-100"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate || "0.0"}%`}
          icon={CheckCircle}
          subtext={`${statusCounts.Won || 0} won deals`}
          colorClass="text-emerald-600 bg-emerald-50 border-emerald-100"
        />
        <StatCard
          title="Actionable Follow-Ups"
          value={dueAndOverdue}
          icon={dueAndOverdue > 0 ? AlertTriangle : Clock}
          subtext={`${fu.totalOverdue || 0} overdue • ${fu.totalDueToday || 0} due today • ${fu.totalUpcoming || 0} upcoming`}
          colorClass={
            dueAndOverdue > 0
              ? "text-rose-600 bg-rose-50 border-rose-100"
              : "text-amber-600 bg-amber-50 border-amber-100"
          }
        />
      </div>

      {/* Pipeline Status Breakdown Bar */}
      <div className="p-4 bg-white border border-border-color rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Pipeline Breakdown:
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(statusCounts).map(([st, count]) => (
            <div
              key={st}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <StatusBadge status={st} size="small" />
              <span className="text-xs font-bold text-slate-800">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
