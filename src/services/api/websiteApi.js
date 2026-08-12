import { fetchLeads } from "./leadApi";

export async function fetchWebsitesBaseData() {
  return fetchLeads();
}
