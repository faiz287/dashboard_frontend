"use client";

import { useApp } from "@/lib/context";
import WebsitesHeader from "@/components/websites/WebsitesHeader";
import WebsitesGrid from "@/components/websites/WebsitesGrid";

export default function WebsitesPage() {
  const { leads, websites } = useApp();

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <WebsitesHeader />
      
      <WebsitesGrid websites={websites} leads={leads} />
    </div>
  );
}
