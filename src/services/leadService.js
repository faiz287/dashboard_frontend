import { isDateInRange, getFollowUpStatus } from "@/lib/dateUtils";

/**
 * Filter leads by keyword search, website, source, status, followUp, and date range on client-side.
 * @param {Array} leads 
 * @param {Object} filters 
 * @returns {Array}
 */
export function filterAndSearchLeads(leads = [], filters = {}) {
  const {
    search = "",
    website = "all",
    source = "all",
    status = "all",
    followUp = "all",
    dateRange = "all",
    customStart = "",
    customEnd = ""
  } = filters;

  return leads.filter((lead) => {
    // 1. Website filter
    if (website !== "all" && lead.websiteName?.toLowerCase() !== website.toLowerCase()) {
      return false;
    }

    // 2. Source filter
    if (source !== "all" && lead.sourcePage?.toLowerCase() !== source.toLowerCase()) {
      return false;
    }

    // 3. Status filter
    const leadStatus = lead.status || "New";
    if (status !== "all" && leadStatus.toLowerCase() !== status.toLowerCase()) {
      return false;
    }

    // 4. Follow-up filter
    if (followUp !== "all") {
      const fuStatus = getFollowUpStatus(lead.followUpDate, lead.followUpCompleted);
      if (fuStatus !== followUp) {
        return false;
      }
    }

    // 5. Date filter
    if (dateRange === "custom") {
      const leadTime = new Date(lead.createdAt).getTime();
      if (customStart) {
        const startLimit = new Date(customStart).getTime();
        if (leadTime < startLimit) return false;
      }
      if (customEnd) {
        const endLimit = new Date(customEnd);
        endLimit.setHours(23, 59, 59, 999);
        if (leadTime > endLimit.getTime()) return false;
      }
    } else {
      if (!isDateInRange(lead.createdAt, dateRange)) {
        return false;
      }
    }

    // 6. Search query filter (First Name, Last Name, Full Name, Email, Phone, Subject, Website Name, Source Page)
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      const firstName = lead.firstName || "";
      const lastName = lead.lastName || "";
      const fullName = `${firstName} ${lastName}`.toLowerCase();

      const matchFirstName = firstName.toLowerCase().includes(query);
      const matchLastName = lastName.toLowerCase().includes(query);
      const matchFullName = fullName.includes(query);
      const matchEmail = lead.email?.toLowerCase().includes(query);
      const matchPhone = lead.phone?.includes(query);
      const matchSubject = lead.subject?.toLowerCase().includes(query);
      const matchMessage = lead.message?.toLowerCase().includes(query);
      const matchWebsite = lead.websiteName?.toLowerCase().includes(query);
      const matchSource = lead.sourcePage?.toLowerCase().includes(query);

      if (
        !matchFirstName &&
        !matchLastName &&
        !matchFullName &&
        !matchEmail &&
        !matchPhone &&
        !matchSubject &&
        !matchMessage &&
        !matchWebsite &&
        !matchSource
      ) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Extracts unique website names from a list of leads.
 * @param {Array} leads 
 * @returns {Array<string>}
 */
export function getUniqueWebsites(leads = []) {
  const websites = leads.map((l) => l.websiteName).filter(Boolean);
  return Array.from(new Set(websites)).sort();
}

/**
 * Extracts unique source pages/channels from a list of leads.
 * @param {Array} leads 
 * @returns {Array<string>}
 */
export function getUniqueSources(leads = []) {
  const sources = leads.map((l) => l.sourcePage).filter(Boolean);
  return Array.from(new Set(sources)).sort();
}
