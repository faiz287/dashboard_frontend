import { filterAndSearchLeads } from "./leadService";
import { getFollowUpStatus } from "@/lib/dateUtils";

/**
 * Computes dashboard statistics for dynamic cards.
 * Respects current filters.
 * @param {Array} leads 
 * @param {Object} filters 
 * @returns {Object}
 */
export function getStats(leads = [], filters = {}) {
  const filteredLeads = filterAndSearchLeads(leads, filters);
  const totalLeads = filteredLeads.length;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  let todayLeads = 0;
  let monthLeads = 0;
  const uniqueWebsites = new Set();

  const statusCounts = {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    "Proposal Sent": 0,
    Won: 0,
    Lost: 0,
  };

  const followUpStats = {
    totalUpcoming: 0,
    totalDueToday: 0,
    totalOverdue: 0,
    totalCompleted: 0,
  };

  filteredLeads.forEach((lead) => {
    const leadTime = new Date(lead.createdAt).getTime();

    if (leadTime >= startOfToday) {
      todayLeads++;
    }
    if (leadTime >= startOfMonth) {
      monthLeads++;
    }
    if (lead.websiteName) {
      uniqueWebsites.add(lead.websiteName);
    }

    // Status tallying
    const st = lead.status || "New";
    if (statusCounts[st] !== undefined) {
      statusCounts[st]++;
    } else {
      statusCounts.New++;
    }

    // Follow-up tallying
    const fu = getFollowUpStatus(lead.followUpDate, lead.followUpCompleted);
    if (fu === "upcoming") followUpStats.totalUpcoming++;
    else if (fu === "today") followUpStats.totalDueToday++;
    else if (fu === "overdue") followUpStats.totalOverdue++;
    else if (fu === "completed") followUpStats.totalCompleted++;
  });

  const totalWon = statusCounts.Won;
  const totalQualified = statusCounts.Qualified;
  const totalNew = statusCounts.New;

  const qualifiedRate = totalLeads > 0 ? ((totalQualified / totalLeads) * 100).toFixed(1) : "0.0";
  const conversionRate = totalLeads > 0 ? ((totalWon / totalLeads) * 100).toFixed(1) : "0.0";

  // Follow-up completion rate: completed / (all leads that have/had a follow-up)
  const totalWithFollowUp =
    followUpStats.totalUpcoming +
    followUpStats.totalDueToday +
    followUpStats.totalOverdue +
    followUpStats.totalCompleted;
  const followUpCompletionRate =
    totalWithFollowUp > 0
      ? ((followUpStats.totalCompleted / totalWithFollowUp) * 100).toFixed(1)
      : "0.0";

  // Leads per website breakdown
  const leadsPerWebsite = {};
  filteredLeads.forEach((lead) => {
    const site = lead.websiteName || "Unknown";
    leadsPerWebsite[site] = (leadsPerWebsite[site] || 0) + 1;
  });

  return {
    totalLeads,
    newLeads: totalNew,
    todayLeads,
    monthLeads,
    totalWebsites: uniqueWebsites.size,
    statusCounts,
    followUpStats,
    qualifiedRate,
    conversionRate,
    followUpCompletionRate,
    leadsPerWebsite,
  };
}

/**
 * Aggregates website data for donut chart, grouping elements outside top 3 as "Others".
 * @param {Array} leads 
 * @returns {Array}
 */
export function getLeadDistribution(leads = []) {
  const totalLeads = leads.length;
  const websiteCounts = {};

  leads.forEach((lead) => {
    const site = lead.websiteName || "Unknown";
    websiteCounts[site] = (websiteCounts[site] || 0) + 1;
  });

  const rawData = Object.entries(websiteCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);

  if (rawData.length > 4) {
    const top3 = rawData.slice(0, 3);
    const othersCount = rawData.slice(3).reduce((sum, item) => sum + item.count, 0);
    const othersPercentage = totalLeads > 0 ? Math.round((othersCount / totalLeads) * 100) : 0;
    
    return [
      ...top3,
      { name: "Others", count: othersCount, percentage: othersPercentage }
    ];
  }
  
  return rawData;
}

/**
 * Aggregates sources (website + page) and computes lead counts, percentages, and sorts desc.
 * @param {Array} leads 
 * @param {Object} filters 
 * @returns {Array}
 */
export function getSourceRankings(leads = [], filters = {}) {
  const filteredLeads = filterAndSearchLeads(leads, filters);
  const totalFilteredLeads = filteredLeads.length;

  const aggregationMap = {};

  filteredLeads.forEach((lead) => {
    const website = lead.websiteName || "Unknown Website";
    const source = lead.sourcePage || "Direct";
    const key = `${website}::${source}`;

    if (!aggregationMap[key]) {
      aggregationMap[key] = {
        websiteName: website,
        sourcePage: source,
        count: 0
      };
    }
    aggregationMap[key].count += 1;
  });

  return Object.values(aggregationMap)
    .map((item) => ({
      ...item,
      percentage: totalFilteredLeads > 0 ? Math.round((item.count / totalFilteredLeads) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);
}
