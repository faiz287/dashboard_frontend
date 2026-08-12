import { Mail, Phone, Globe, Edit2, Trash2, ArrowRight } from "lucide-react";
import { formatLeadDate } from "@/lib/dateUtils";
import StatusBadge from "./StatusBadge";
import FollowUpBadge from "./FollowUpBadge";

export default function LeadRow({ lead, onRowClick, onEditClick, onDeleteClick }) {
  return (
    <tr
      onClick={() => onRowClick(lead)}
      className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
    >
      <td className="py-3.5 px-6 font-semibold text-text-primary whitespace-nowrap">
        {lead.firstName} {lead.lastName}
      </td>
      <td className="py-3.5 px-4 text-text-secondary font-medium">
        <span className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate max-w-[140px]">{lead.email}</span>
        </span>
      </td>
      <td className="py-3.5 px-4 text-text-secondary font-medium whitespace-nowrap">
        <span className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{lead.phone || "—"}</span>
        </span>
      </td>
      <td className="py-3.5 px-4 whitespace-nowrap">
        <StatusBadge status={lead.status} size="small" />
      </td>
      <td className="py-3.5 px-4 whitespace-nowrap">
        <FollowUpBadge
          followUpDate={lead.followUpDate}
          followUpCompleted={lead.followUpCompleted}
          size="small"
        />
      </td>
      <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-md text-xs border border-slate-200">
          <Globe className="w-3 h-3 text-slate-500" />
          {lead.websiteName}
        </span>
      </td>
      <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">
        <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-semibold">
          {lead.sourcePage}
        </span>
      </td>
      <td className="py-3.5 px-4 text-right text-text-secondary font-medium whitespace-nowrap">
        {formatLeadDate(lead.createdAt)}
      </td>
      <td className="py-3.5 px-6 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEditClick(lead)}
            title="Edit Lead"
            className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeleteClick(lead)}
            title="Delete Lead"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onRowClick(lead)}
            title="View Details"
            className="p-1.5 rounded-lg text-slate-400 group-hover:text-primary transition-colors"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </td>
    </tr>
  );
}
