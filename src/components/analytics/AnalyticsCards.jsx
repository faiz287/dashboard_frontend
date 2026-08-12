"use client";

import {
  Layers,
  Plus,
  Star,
  Trophy,
  XCircle,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Target,
  BarChart3,
  Globe,
} from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

function MetricCard({ title, value, subtext, icon: Icon, colorClass, highlight = false }) {
  return (
    <div
      className={`relative bg-white border rounded-2xl p-5 shadow-xs flex flex-col gap-3 transition-all hover:shadow-md ${
        highlight ? "border-primary/30 bg-primary/[0.02]" : "border-border-color"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl border ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        {highlight && (
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
            Key Metric
          </span>
        )}
      </div>
      <div>
        <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-text-primary mt-0.5">{value}</p>
        {subtext && <p className="text-xs text-text-secondary mt-1">{subtext}</p>}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest col-span-full pt-2 pb-1 border-b border-border-color">
      {children}
    </h3>
  );
}

export default function AnalyticsCards({ stats = {}, loading = false }) {
  if (loading) {
    return <LoadingSkeleton variant="card" count={11} />;
  }

  const sc = stats.statusCounts || {};
  const fu = stats.followUpStats || {};
  const leadsPerWebsite = stats.leadsPerWebsite || {};

  const websiteEntries = Object.entries(leadsPerWebsite).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">

      {/* ─── Pipeline Overview ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <SectionTitle>Pipeline Overview</SectionTitle>

        <MetricCard
          title="Total Leads"
          value={stats.totalLeads ?? 0}
          icon={Layers}
          colorClass="text-blue-600 bg-blue-50 border-blue-100"
          subtext="All collected entries"
          highlight
        />
        <MetricCard
          title="New Leads"
          value={sc.New ?? 0}
          icon={Plus}
          colorClass="text-sky-600 bg-sky-50 border-sky-100"
          subtext="Status = New"
        />
        <MetricCard
          title="Qualified Leads"
          value={sc.Qualified ?? 0}
          icon={Star}
          colorClass="text-purple-600 bg-purple-50 border-purple-100"
          subtext="Status = Qualified"
        />
        <MetricCard
          title="Won Leads"
          value={sc.Won ?? 0}
          icon={Trophy}
          colorClass="text-emerald-600 bg-emerald-50 border-emerald-100"
          subtext="Status = Won"
        />
        <MetricCard
          title="Lost Leads"
          value={sc.Lost ?? 0}
          icon={XCircle}
          colorClass="text-rose-600 bg-rose-50 border-rose-100"
          subtext="Status = Lost"
        />
      </div>

      {/* ─── Follow-Up Stats ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SectionTitle>Follow-Up Breakdown</SectionTitle>

        <MetricCard
          title="Upcoming"
          value={fu.totalUpcoming ?? 0}
          icon={Calendar}
          colorClass="text-blue-600 bg-blue-50 border-blue-100"
          subtext="Scheduled in the future"
        />
        <MetricCard
          title="Due Today"
          value={fu.totalDueToday ?? 0}
          icon={Clock}
          colorClass="text-orange-600 bg-orange-50 border-orange-100"
          subtext="Follow-up due today"
        />
        <MetricCard
          title="Overdue"
          value={fu.totalOverdue ?? 0}
          icon={AlertTriangle}
          colorClass="text-rose-600 bg-rose-50 border-rose-100"
          subtext="Past due — action needed"
        />
        <MetricCard
          title="Completed"
          value={fu.totalCompleted ?? 0}
          icon={CheckCircle2}
          colorClass="text-emerald-600 bg-emerald-50 border-emerald-100"
          subtext="Marked as done"
        />
      </div>

      {/* ─── Rates ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SectionTitle>Performance Rates</SectionTitle>

        <MetricCard
          title="Qualified Rate"
          value={`${stats.qualifiedRate ?? "0.0"}%`}
          icon={TrendingUp}
          colorClass="text-purple-600 bg-purple-50 border-purple-100"
          subtext={`${sc.Qualified ?? 0} of ${stats.totalLeads ?? 0} leads qualified`}
          highlight
        />
        <MetricCard
          title="Conversion Rate"
          value={`${stats.conversionRate ?? "0.0"}%`}
          icon={Target}
          colorClass="text-emerald-600 bg-emerald-50 border-emerald-100"
          subtext={`${sc.Won ?? 0} of ${stats.totalLeads ?? 0} leads won`}
          highlight
        />
        <MetricCard
          title="Follow-Up Completion"
          value={`${stats.followUpCompletionRate ?? "0.0"}%`}
          icon={CheckCircle2}
          colorClass="text-sky-600 bg-sky-50 border-sky-100"
          subtext={`${fu.totalCompleted ?? 0} completed out of all with follow-ups`}
        />
      </div>

      {/* ─── Leads Per Website ─── */}
      {websiteEntries.length > 0 && (
        <div className="bg-white border border-border-color rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
              <Globe className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary">Leads Per Website</h3>
              <p className="text-xs text-text-secondary">Total lead volume per tracked domain</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {websiteEntries.map(([site, count]) => {
              const pct = stats.totalLeads > 0 ? Math.round((count / stats.totalLeads) * 100) : 0;
              return (
                <div key={site}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-700 truncate max-w-[60%]">{site}</span>
                    <span className="text-xs font-bold text-text-primary">{count} <span className="text-text-secondary font-normal">({pct}%)</span></span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Full Status Breakdown ─── */}
      <div className="bg-white border border-border-color rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
            <BarChart3 className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary">Full Pipeline Breakdown</h3>
            <p className="text-xs text-text-secondary">All leads grouped by pipeline stage</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(sc).map(([status, count]) => {
            const pct = stats.totalLeads > 0 ? Math.round((count / stats.totalLeads) * 100) : 0;
            const colorMap = {
              New: "bg-blue-100 text-blue-700",
              Contacted: "bg-amber-100 text-amber-700",
              Qualified: "bg-purple-100 text-purple-700",
              "Proposal Sent": "bg-orange-100 text-orange-700",
              Won: "bg-emerald-100 text-emerald-700",
              Lost: "bg-rose-100 text-rose-700",
            };
            return (
              <div
                key={status}
                className={`flex flex-col items-center justify-center p-3 rounded-xl text-center ${colorMap[status] ?? "bg-slate-100 text-slate-700"}`}
              >
                <span className="text-xl font-bold">{count}</span>
                <span className="text-[11px] font-semibold mt-0.5">{status}</span>
                <span className="text-[10px] opacity-70">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
