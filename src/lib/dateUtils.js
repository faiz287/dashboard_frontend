/**
 * Formats an ISO date string into "Today", "Yesterday", or "DD MMM YYYY"
 * @param {string|Date} dateInput 
 * @returns {string}
 */
export const formatLeadDate = (dateInput) => {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";

  const now = new Date();
  
  // Set times to midnight for date-only comparison
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const targetMidnight = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffTime = todayMidnight.getTime() - targetMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    // Format: DD MMM YYYY
    const day = String(d.getDate()).padStart(2, "0");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }
};

/**
 * Checks if a date falls within a quick filter range
 * @param {string|Date} dateInput 
 * @param {string} filterRange - 'all' | 'today' | 'yesterday' | '7days' | '30days'
 * @returns {boolean}
 */
export const isDateInRange = (dateInput, filterRange) => {
  if (filterRange === "all") return true;

  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return false;

  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetMidnight = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffTime = todayMidnight.getTime() - targetMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  switch (filterRange) {
    case "today":
      return diffDays === 0;
    case "yesterday":
      return diffDays === 1;
    case "7days":
      return diffDays >= 0 && diffDays <= 6; // last 7 days including today
    case "30days":
      return diffDays >= 0 && diffDays <= 29; // last 30 days including today
    case "thisyear":
      return d.getFullYear() === now.getFullYear();
    default:
      return true;
  }
};

/**
 * Returns follow-up status string: 'completed' | 'no_followup' | 'today' | 'upcoming' | 'overdue'
 * @param {string|Date|null} followUpDate 
 * @param {boolean} followUpCompleted 
 * @returns {string}
 */
export const getFollowUpStatus = (followUpDate, followUpCompleted = false) => {
  if (followUpCompleted) return "completed";
  if (!followUpDate) return "no_followup";

  const d = new Date(followUpDate);
  if (isNaN(d.getTime())) return "no_followup";

  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const targetMidnight = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  if (targetMidnight === todayMidnight) {
    return "today";
  } else if (targetMidnight > todayMidnight) {
    return "upcoming";
  } else {
    return "overdue";
  }
};

/**
 * Formats a date into relative human readable string e.g. "2 hours ago", "3 days ago"
 * @param {string|Date} dateInput 
 * @returns {string}
 */
export const formatRelativeTime = (dateInput) => {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;

  return formatLeadDate(dateInput);
};

