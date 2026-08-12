"use client";

import { Mail, Phone, Globe } from "lucide-react";
import { formatLeadDate } from "@/lib/dateUtils";

export default function RecentLeadRow({ lead, onRowClick }) {
  return (
    <tr
      onClick={() => onRowClick(lead)}
      className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
    >
      <td className="py-3.5 px-6 font-semibold text-text-primary">
        {lead.firstName} {lead.lastName}
      </td>
      <td className="py-3.5 px-4 text-text-secondary font-medium">
        <span className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate max-w-[150px]">{lead.email}</span>
        </span>
      </td>
      <td className="py-3.5 px-4 text-text-secondary font-medium whitespace-nowrap">
        <span className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{lead.phone || "—"}</span>
        </span>
      </td>
      <td className="py-3.5 px-4 font-semibold text-slate-700">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded-md text-xs border border-slate-200">
          <Globe className="w-3 h-3 text-slate-500" />
          {lead.websiteName}
        </span>
      </td>
      <td className="py-3.5 px-4 text-text-secondary">
        <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-semibold">
          {lead.sourcePage}
        </span>
      </td>
      <td className="py-3.5 px-6 text-right text-text-secondary font-medium whitespace-nowrap">
        {formatLeadDate(lead.createdAt)}
      </td>
    </tr>
  );
}
