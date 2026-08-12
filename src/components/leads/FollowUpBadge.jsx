"use client";

import React from "react";
import { getFollowUpStatus, formatLeadDate } from "@/lib/dateUtils";
import { CheckCircle2, Clock, AlertTriangle, Calendar, Minus } from "lucide-react";

export const FOLLOWUP_CONFIG = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  no_followup: {
    label: "No Follow-Up",
    icon: Minus,
    badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
  },
  today: {
    label: "Due Today",
    icon: Clock,
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200 animate-pulse-subtle",
  },
  upcoming: {
    label: "Upcoming",
    icon: Calendar,
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  overdue: {
    label: "Overdue",
    icon: AlertTriangle,
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

export default function FollowUpBadge({ followUpDate, followUpCompleted = false, showDate = false, size = "normal" }) {
  const statusKey = getFollowUpStatus(followUpDate, followUpCompleted);
  const config = FOLLOWUP_CONFIG[statusKey] || FOLLOWUP_CONFIG.no_followup;
  const Icon = config.icon;

  const sizeClasses = size === "small" 
    ? "px-2 py-0.5 text-[11px]" 
    : "px-2.5 py-1 text-xs";

  const dateText = followUpDate ? formatLeadDate(followUpDate) : "";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.badgeClass} ${sizeClasses}`}
      title={followUpDate ? `Follow-up: ${dateText}` : "No follow-up set"}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
      {showDate && dateText && statusKey !== "completed" && (
        <span className="opacity-75 text-[10px]">({dateText})</span>
      )}
    </span>
  );
}
