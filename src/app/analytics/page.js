"use client";

import { useMemo } from "react";
import { useApp } from "@/lib/context";
import { getStats } from "@/services/analyticsService";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsCards from "@/components/analytics/AnalyticsCards";

export default function AnalyticsPage() {
  const { leads, loading, activeWebsite } = useApp();

  const stats = useMemo(
    () => getStats(leads, { website: activeWebsite }),
    [leads, activeWebsite]
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <AnalyticsHeader />
      <AnalyticsCards stats={stats} loading={loading} />
    </div>
  );
}
