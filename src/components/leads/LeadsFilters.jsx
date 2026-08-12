import { Search, Globe, Compass, Calendar, Filter, Clock } from "lucide-react";

export default function LeadsFilters({
  localSearch,
  setLocalSearch,
  websiteFilter,
  setWebsiteFilter,
  sourceFilter,
  setSourceFilter,
  statusFilter = "all",
  setStatusFilter,
  followUpFilter = "all",
  setFollowUpFilter,
  dateFilter,
  setDateFilter,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
  uniqueWebsites = [],
  uniqueSources = []
}) {
  return (
    <div className="p-4 md:p-5 bg-white border border-border-color rounded-2xl shadow-xs space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 md:gap-4">
        
        {/* Filter: Search field */}
        <div className="space-y-1 sm:col-span-2 lg:col-span-1 xl:col-span-2">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            Search Queries
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by name, email, phone, subject..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg outline-hidden text-slate-900 transition-all font-medium"
            />
          </div>
        </div>

        {/* Filter: Website selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            Website Origin
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <select
              value={websiteFilter}
              onChange={(e) => setWebsiteFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg outline-hidden text-slate-900 transition-all font-medium appearance-none cursor-pointer"
            >
              <option value="all">All Websites</option>
              {uniqueWebsites.map((site) => (
                <option key={site} value={site}>{site}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter: Source Page selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            Source Page
          </label>
          <div className="relative">
            <Compass className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg outline-hidden text-slate-900 transition-all font-medium appearance-none cursor-pointer"
            >
              <option value="all">All Sources</option>
              {uniqueSources.map((src) => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter: Lead Status */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            Pipeline Status
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg outline-hidden text-slate-900 transition-all font-semibold appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>

        {/* Filter: Follow-Up Status */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            Follow-Up State
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <select
              value={followUpFilter}
              onChange={(e) => setFollowUpFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg outline-hidden text-slate-900 transition-all font-semibold appearance-none cursor-pointer"
            >
              <option value="all">All Follow-Ups</option>
              <option value="no_followup">No Follow-Up</option>
              <option value="upcoming">Upcoming</option>
              <option value="today">Due Today</option>
              <option value="overdue">Overdue</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Filter: Date Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            Date Range
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg outline-hidden text-slate-900 transition-all font-medium appearance-none cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="thisyear">This Year</option>
              <option value="custom">Custom Range...</option>
            </select>
          </div>
        </div>
      </div>

      {/* Custom Date Range Panel (Conditional) */}
      {dateFilter === "custom" && (
        <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-4 items-end animate-fade-in">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Start Date
            </label>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary rounded-lg outline-hidden text-slate-900 font-medium cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              End Date
            </label>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary rounded-lg outline-hidden text-slate-900 font-medium cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
