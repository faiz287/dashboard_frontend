/**
 * Formats a website name into a standard origin URL.
 * @param {string} siteName 
 * @returns {string}
 */
export function formatWebsiteOriginUrl(siteName = "") {
  if (!siteName) return "";
  return `https://${siteName.toLowerCase().replace(/\s+/g, "")}.com`;
}
