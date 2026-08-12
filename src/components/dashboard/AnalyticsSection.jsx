"use client";

import LeadDistribution from "@/components/LeadDistribution";
import SourceRanking from "@/components/SourceRanking";

export default function AnalyticsSection({ leads, rankings, loading }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LeadDistribution leads={leads} loading={loading} />
      <SourceRanking rankings={rankings} loading={loading} />
    </div>
  );
}
