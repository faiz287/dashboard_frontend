"use client";

import React from "react";

export const STATUS_CONFIG = {
  New: {
    label: "New",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80",
    dotClass: "bg-blue-500",
  },
  Contacted: {
    label: "Contacted",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80",
    dotClass: "bg-amber-500",
  },
  Qualified: {
    label: "Qualified",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200/80",
    dotClass: "bg-purple-500",
  },
  "Proposal Sent": {
    label: "Proposal Sent",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200/80",
    dotClass: "bg-orange-500",
  },
  Won: {
    label: "Won",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotClass: "bg-emerald-500",
  },
  Lost: {
    label: "Lost",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80",
    dotClass: "bg-rose-500",
  },
};

export default function StatusBadge({ status = "New", size = "normal" }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.New;

  const sizeClasses = size === "small" 
    ? "px-2 py-0.5 text-[11px]" 
    : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.badgeClass} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
}
