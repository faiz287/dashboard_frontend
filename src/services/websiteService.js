/**
 * Calculates submission count and the last submission date for a given website name.
 * @param {Array} leads 
 * @param {string} siteName 
 * @returns {Object} { count: number, lastReceived: string }
 */
export function getWebsiteStats(leads = [], siteName = "") {
  const siteLeads = leads.filter((l) => l.websiteName === siteName);
  return {
    count: siteLeads.length,
    lastReceived: siteLeads.length > 0 
      ? new Date(Math.max(...siteLeads.map(l => new Date(l.createdAt)))).toLocaleDateString()
      : "No submissions"
  };
}
