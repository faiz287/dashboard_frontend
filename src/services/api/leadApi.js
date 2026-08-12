const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dashboard-ocsi8da14-faiz-287.vercel.app/api";

export async function fetchLeads() {
  try {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      cache: "no-store",
    });

    console.log("Response Status:", response.status);

    const data = await response.json();

    console.log("Leads Data:", data);

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addLead(leadData) {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) {
    throw new Error("Failed to add lead");
  }
  return response.json();
}

export async function updateLead(id, leadData) {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update lead");
  }
  return response.json();
}

export async function deleteLead(id) {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete lead");
  }
  return response.json();
}

export async function addNoteToLead(id, text) {
  const response = await fetch(`${API_BASE_URL}/leads/${id}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add note");
  }
  return response.json();
}


