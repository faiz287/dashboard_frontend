"use client";

import { Calendar, Globe, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import LeadRow from "./LeadRow";

export default function LeadsTable({
  leads = [],
  loading = false,
  activeDateRange = "all",
  onDateRangeChange,
  onRowClick,
  onEditClick,
  onDeleteClick,
  currentPage = 1,
  onPageChange,
  leadsPerPage = 10
}) {
  const dateFilters = [
    { label: "All Leads", value: "all" },
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "7days" },
    { label: "Last 30 Days", value: "30days" },
  ];

  // Pagination Math
  const totalLeads = leads.length;
  const totalPages = Math.max(1, Math.ceil(totalLeads / leadsPerPage));
  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = Math.min(startIndex + leadsPerPage, totalLeads);
  const displayedLeads = leads.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // If loading, render shimmer placeholders
  const renderLoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-border-color">
          <div className="h-4 bg-slate-200 rounded-sm w-1/4 shimmer" />
          <div className="h-4 bg-slate-200 rounded-sm w-1/6 shimmer" />
          <div className="h-4 bg-slate-200 rounded-sm w-1/12 shimmer" />
          <div className="h-4 bg-slate-200 rounded-sm w-1/8 shimmer" />
          <div className="h-4 bg-slate-200 rounded-sm w-1/12 shimmer" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card-bg border border-border-color rounded-2xl shadow-xs overflow-hidden flex flex-col h-full">
      {/* Date Quick Filters Panel */}
      <div className="flex flex-wrap items-center gap-2 p-4 md:p-5 border-b border-border-color bg-slate-50/50">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mr-2">
          Filter Date:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {dateFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onDateRangeChange(filter.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeDateRange === filter.value
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-text-secondary hover:text-text-primary border border-border-color hover:border-slate-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto min-h-[300px]">
        {loading ? (
          <div className="p-6">{renderLoadingSkeleton()}</div>
        ) : displayedLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-text-primary">No leads found</h4>
            <p className="text-xs text-text-secondary mt-1 max-w-xs mx-auto">
              There are no form entries matching your selected criteria. Try adjusting your filters or adding a new lead.
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-color text-[11px] font-bold text-text-secondary uppercase tracking-wider bg-slate-50/70 select-none">
                <th className="py-3.5 px-6">Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Follow-Up</th>
                <th className="py-3.5 px-4">Website</th>
                <th className="py-3.5 px-4">Source Page</th>
                <th className="py-3.5 px-4 text-right">Received</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color text-sm">
              {displayedLeads.map((lead) => (
                <LeadRow
                  key={lead._id || lead.id}
                  lead={lead}
                  onRowClick={onRowClick}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && totalLeads > 0 && (
        <div className="flex items-center justify-between px-6 py-4.5 border-t border-border-color bg-slate-50/40">
          <span className="text-xs text-text-secondary font-medium">
            Showing <strong className="font-semibold text-text-primary">{startIndex + 1}</strong> to{" "}
            <strong className="font-semibold text-text-primary">{endIndex}</strong> of{" "}
            <strong className="font-semibold text-text-primary">{totalLeads}</strong> entries
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1.5 border border-border-color rounded-lg bg-white text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-text-primary select-none px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-border-color rounded-lg bg-white text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
