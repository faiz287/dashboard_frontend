"use client";

import { useApp } from "@/lib/context";
import { getRecentLeads } from "@/lib/leadUtils";
import { getStats, getSourceRankings } from "@/services/analyticsService";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import RecentLeadsTable from "@/components/dashboard/RecentLeadsTable";

export default function DashboardPage() {
  const {
    leads,
    loading,
    handleRowClick,
    activeWebsite,
    activeDateRange
  } = useApp();

  // Process data using service layer
  const filters = { website: activeWebsite, dateRange: activeDateRange };
  const stats = getStats(leads, filters);
  const rankings = getSourceRankings(leads, filters);
  const { data: recentLeads, label: recentLeadsLabel } = getRecentLeads(leads);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <DashboardHeader activeWebsite={activeWebsite} />
      
      <DashboardStats stats={stats} loading={loading} />
      
      <AnalyticsSection leads={leads} rankings={rankings} loading={loading} />
      
      <RecentLeadsTable
        recentLeads={recentLeads}
        label={recentLeadsLabel}
        loading={loading}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
