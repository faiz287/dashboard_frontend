/**
 * Filters leads to the last 7 days, or falls back to the 10 most recent leads.
 * @param {Array} leads 
 * @returns {Object} { data: Array, label: string }
 */
export function getRecentLeads(leads = []) {
  const now = new Date();
  const startOf7DaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime();
  
  // Sort all leads by date descending
  const sortedLeads = [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const leadsLast7Days = sortedLeads.filter(
    (lead) => new Date(lead.createdAt).getTime() >= startOf7DaysAgo
  );

  if (leadsLast7Days.length === 0) {
    return { data: sortedLeads.slice(0, 10), label: "Showing Most Recent 10 Leads" };
  }
  return { data: leadsLast7Days, label: "Showing Leads from Last 7 Days" };
}
