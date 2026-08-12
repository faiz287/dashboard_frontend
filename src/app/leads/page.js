"use client";

import { useState, useEffect, useMemo } from "react";
import { useApp } from "@/lib/context";
import { filterAndSearchLeads, getUniqueWebsites, getUniqueSources } from "@/services/leadService";

import LeadsHeader from "@/components/leads/LeadsHeader";
import LeadsFilters from "@/components/leads/LeadsFilters";
import LeadsTable from "@/components/leads/LeadsTable";

export default function LeadsPage() {
  const {
    leads: rawLeads,
    loading,
    handleRowClick,
    openEditModal,
    openDeleteModal,
    activeWebsite,
  } = useApp();

  // Local filter states
  const [localSearch, setLocalSearch] = useState("");
  const [websiteFilter, setWebsiteFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [followUpFilter, setFollowUpFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Custom date range limits
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const LEADS_PER_PAGE = 10;

  // Sync page website filter to global sidebar website filter if it changes
  useEffect(() => {
    setWebsiteFilter(activeWebsite);
  }, [activeWebsite]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    localSearch,
    websiteFilter,
    sourceFilter,
    statusFilter,
    followUpFilter,
    dateFilter,
    customStart,
    customEnd,
  ]);

  // Memoized filtering for high performance
  const filteredLeads = useMemo(() => {
    const filters = {
      search: localSearch,
      website: websiteFilter,
      source: sourceFilter,
      status: statusFilter,
      followUp: followUpFilter,
      dateRange: dateFilter,
      customStart,
      customEnd,
    };
    return filterAndSearchLeads(rawLeads, filters);
  }, [
    rawLeads,
    localSearch,
    websiteFilter,
    sourceFilter,
    statusFilter,
    followUpFilter,
    dateFilter,
    customStart,
    customEnd,
  ]);

  // Memoized unique website and source lists
  const uniqueWebsites = useMemo(() => getUniqueWebsites(rawLeads), [rawLeads]);
  const uniqueSources = useMemo(() => getUniqueSources(rawLeads), [rawLeads]);

  const resetAllFilters = () => {
    setLocalSearch("");
    setWebsiteFilter("all");
    setSourceFilter("all");
    setStatusFilter("all");
    setFollowUpFilter("all");
    setDateFilter("all");
    setCustomStart("");
    setCustomEnd("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <LeadsHeader onResetFilters={resetAllFilters} />

      <LeadsFilters
        localSearch={localSearch}
        setLocalSearch={setLocalSearch}
        websiteFilter={websiteFilter}
        setWebsiteFilter={setWebsiteFilter}
        sourceFilter={sourceFilter}
        setSourceFilter={setSourceFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        followUpFilter={followUpFilter}
        setFollowUpFilter={setFollowUpFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        customStart={customStart}
        setCustomStart={setCustomStart}
        customEnd={customEnd}
        setCustomEnd={setCustomEnd}
        uniqueWebsites={uniqueWebsites}
        uniqueSources={uniqueSources}
      />

      <div className="space-y-4">
        <LeadsTable
          leads={filteredLeads}
          loading={loading}
          activeDateRange={dateFilter}
          onDateRangeChange={(val) => {
            setDateFilter(val);
            if (val !== "custom") {
              setCustomStart("");
              setCustomEnd("");
            }
          }}
          onRowClick={handleRowClick}
          onEditClick={openEditModal}
          onDeleteClick={openDeleteModal}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          leadsPerPage={LEADS_PER_PAGE}
        />
      </div>
    </div>
  );
}
