"use client";

import { TrendingUp, Calendar } from "lucide-react";

export default function LeadCharts() {
  const charts = [
    {
      title: "Daily Lead Velocity",
      description: "Trend analysis tracking day-over-day lead volumes",
      icon: TrendingUp
    },
    {
      title: "Monthly Performance",
      description: "Monthly aggregations for long-term target planning",
      icon: Calendar
    }
  ];

  return (
    <>
      {charts.map((chart) => {
        const Icon = chart.icon;
        return (
          <div
            key={chart.title}
            className="bg-card-bg border border-border-color rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[180px]"
          >
            {/* Visual background graphs placeholder decoration */}
            <div className="absolute bottom-0 right-0 left-0 h-16 bg-gradient-to-t from-slate-50 to-transparent flex items-end gap-1.5 px-6">
              {[40, 25, 35, 60, 50, 75, 55, 90, 80, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/10 rounded-t-sm transition-all"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-500">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  {chart.title}
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
                {chart.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold text-primary uppercase tracking-widest pt-4 mt-auto border-t border-slate-100/50 relative z-10 select-none">
              <span>Ready for Ingestion</span>
              <span className="px-2 py-0.5 bg-primary/10 rounded-md">Coming Soon</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
