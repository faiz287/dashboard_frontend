"use client";

import React from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  subtext,
  colorClass = "text-primary bg-primary/10 border-primary/20"
}) {
  return (
    <div className="relative overflow-hidden p-6 bg-card-bg border border-border-color rounded-2xl shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 group hover:-translate-y-0.5">
      {/* Decorative gradient corner overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            {title}
          </span>
          <h3 className="text-3xl font-bold text-text-primary tracking-tight tabular-nums">
            {typeof value === "number" ? value.toLocaleString() : value}
          </h3>
        </div>

        <div className={`p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110 ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {subtext && (
        <div className="mt-4 flex items-center gap-1.5">
          <span className="text-xs font-medium text-text-secondary">{subtext}</span>
        </div>
      )}
    </div>
  );
}
