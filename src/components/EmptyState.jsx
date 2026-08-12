"use client";

import { FileX, Inbox, AlertTriangle } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  description = "There are no records matching the selected parameters.",
  type = "default", // 'default' | 'search' | 'error'
  actionButton
}) {
  const getIcon = () => {
    switch (type) {
      case "search":
        return <FileX className="w-10 h-10 text-slate-400" />;
      case "error":
        return <AlertTriangle className="w-10 h-10 text-amber-500" />;
      default:
        return <Inbox className="w-10 h-10 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-card-bg border border-border-color border-dashed rounded-2xl shadow-xs">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 mb-4 shadow-inner">
        {getIcon()}
      </div>
      <h3 className="text-base font-bold text-text-primary tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-text-secondary mt-1.5 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionButton && (
        <div className="mt-5">
          {actionButton}
        </div>
      )}
    </div>
  );
}
