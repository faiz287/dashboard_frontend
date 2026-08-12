import { fetchLeads } from "./leadApi";

export async function fetchAnalyticsBaseData() {
  return fetchLeads();
}
