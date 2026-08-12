"use client";

import { PieChart, Globe } from "lucide-react";

export default function LeadDistribution({ leads = [], loading = false }) {
  // Aggregate website data
  const totalLeads = leads.length;
  const websiteCounts = {};

  leads.forEach((lead) => {
    const site = lead.websiteName || "Unknown";
    websiteCounts[site] = (websiteCounts[site] || 0) + 1;
  });

  // Convert to sorted array
  const rawData = Object.entries(websiteCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);

  // Group top 3 and combine others
  let chartData = [];
  if (rawData.length > 4) {
    const top3 = rawData.slice(0, 3);
    const othersCount = rawData.slice(3).reduce((sum, item) => sum + item.count, 0);
    const othersPercentage = totalLeads > 0 ? Math.round((othersCount / totalLeads) * 100) : 0;
    
    chartData = [
      ...top3,
      { name: "Others", count: othersCount, percentage: othersPercentage }
    ];
  } else {
    chartData = rawData;
  }

  // Predefined harmonious color scheme
  const colors = [
    { stroke: "stroke-blue-600", fill: "bg-blue-600", text: "text-blue-600" },
    { stroke: "stroke-accent", fill: "bg-accent", text: "text-accent" },
    { stroke: "stroke-indigo-600", fill: "bg-indigo-600", text: "text-indigo-600" },
    { stroke: "stroke-slate-400", fill: "bg-slate-400", text: "text-slate-400" }
  ];

  // Calculate SVG stroke parameters
  let accumulatedPercentage = 0;
  const donutData = chartData.map((item, index) => {
    const percent = item.percentage;
    const offset = 100 - accumulatedPercentage + 25; // 25 unit offset rotates start point to top (12 o'clock)
    accumulatedPercentage += percent;
    return {
      ...item,
      dashoffset: offset % 100,
      color: colors[index % colors.length]
    };
  });

  if (loading) {
    return (
      <div className="p-6 bg-card-bg border border-border-color rounded-2xl shadow-xs space-y-4">
        <div className="h-4 bg-slate-200 rounded-sm w-1/3 shimmer" />
        <div className="flex justify-center items-center py-6">
          <div className="w-36 h-36 rounded-full border-12 border-slate-200 shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 bg-card-bg border border-border-color rounded-2xl shadow-xs h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Lead Distribution
          </h3>
          <p className="text-xs text-text-secondary">Distribution by Website</p>
        </div>
        <PieChart className="w-4 h-4 text-text-secondary" />
      </div>

      {totalLeads === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm text-text-secondary font-medium">No lead data to display</p>
          <p className="text-xs text-slate-400 mt-1">Submit leads to generate graph</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          {/* SVG Donut Chart */}
          <div className="relative w-36 h-36 shrink-0 select-none">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              {/* Donut Background Circle */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                className="stroke-slate-100"
                strokeWidth="3.2"
              />
              
              {/* Segments */}
              {donutData.map((item) => (
                <circle
                  key={item.name}
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  className={`${item.color.stroke} transition-all duration-500`}
                  strokeWidth="3.4"
                  strokeDasharray={`${item.percentage} ${100 - item.percentage}`}
                  strokeDashoffset={item.dashoffset}
                  strokeLinecap="round"
                />
              ))}
            </svg>

            {/* Centered label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-text-primary tracking-tight">
                {totalLeads}
              </span>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider leading-none">
                Leads
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="flex-1 space-y-2.5 w-full min-w-0">
            {donutData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.color.fill}`} />
                  <span className="font-semibold text-slate-700 truncate">{item.name}</span>
                </div>
                <div className="text-right shrink-0 font-medium whitespace-nowrap">
                  <span className="font-bold text-text-primary">{item.count}</span>
                  <span className="text-slate-400 text-[10px] mx-1">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
