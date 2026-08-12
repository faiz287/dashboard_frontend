"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import {
  fetchLeads,
  addLead as apiAddLead,
  updateLead as apiUpdateLead,
  deleteLead as apiDeleteLead,
  addNoteToLead as apiAddNoteToLead,
} from "@/services/api/leadApi";
import { getUniqueWebsites } from "@/services/leadService";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Sidebar state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Global website filter (driven by sidebar selection)
  const [activeWebsite, setActiveWebsite] = useState("all");

  // API Data
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Drawers
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add Lead Modal
  const [editingLead, setEditingLead] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingLead, setDeletingLead] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ─── Fetch Logic ───────────────────────────────────────────────────────────
  const refetchLeads = useCallback(async () => {
    try {
      const fetchedLeads = await fetchLeads();
      setLeads(fetchedLeads);
      // Sync selectedLead if drawer is open — use functional ref to avoid stale closure
      setSelectedLead((prev) => {
        if (!prev) return prev;
        const leadId = prev._id || prev.id;
        return fetchedLeads.find((l) => (l._id || l.id) === leadId) ?? prev;
      });
    } catch (error) {
      console.error("Context data load failure:", error);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      await refetchLeads();
      setLoading(false);
    };
    initialLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Create Lead ───────────────────────────────────────────────────────────
  const createLead = async (leadData) => {
    try {
      const newLead = await apiAddLead(leadData);
      // Optimistic prepend
      setLeads((prev) => [newLead, ...prev]);
      toast.success("Lead created successfully!");
    } catch (err) {
      console.error("Failed to add lead:", err);
      toast.error(err.message || "Failed to create lead.");
      throw err;
    }
  };

  // ─── Update Lead ───────────────────────────────────────────────────────────
  const updateLead = async (id, leadData) => {
    try {
      const updated = await apiUpdateLead(id, leadData);

      // Optimistic update local leads array
      setLeads((prev) =>
        prev.map((l) => (l._id === id || l.id === id ? updated : l))
      );

      // Sync selectedLead if it's the one being edited
      setSelectedLead((prev) => {
        if (!prev) return prev;
        return prev._id === id || prev.id === id ? updated : prev;
      });

      toast.success("Lead updated successfully!");
      return updated;
    } catch (err) {
      console.error("Failed to update lead:", err);
      toast.error(err.message || "Failed to update lead.");
      // Refetch to restore correct state on error
      refetchLeads();
      throw err;
    }
  };

  // ─── Delete Lead ───────────────────────────────────────────────────────────
  const deleteLead = async (id) => {
    try {
      await apiDeleteLead(id);

      // Optimistic removal
      setLeads((prev) => prev.filter((l) => l._id !== id && l.id !== id));

      // Close drawer if deleted lead was open
      setSelectedLead((prev) => {
        if (prev && (prev._id === id || prev.id === id)) {
          setIsDrawerOpen(false);
          return null;
        }
        return prev;
      });

      toast.success("Lead deleted successfully.");
    } catch (err) {
      console.error("Failed to delete lead:", err);
      toast.error(err.message || "Failed to delete lead.");
      refetchLeads();
      throw err;
    }
  };

  // ─── Add Note ──────────────────────────────────────────────────────────────
  const addNote = async (id, text) => {
    try {
      const updated = await apiAddNoteToLead(id, text);

      // Optimistic update local leads array
      setLeads((prev) =>
        prev.map((l) => (l._id === id || l.id === id ? updated : l))
      );

      // Update selectedLead notes immediately
      setSelectedLead((prev) => {
        if (!prev) return prev;
        return prev._id === id || prev.id === id ? updated : prev;
      });

      toast.success("Note added.");
      return updated;
    } catch (err) {
      console.error("Failed to add note:", err);
      toast.error(err.message || "Failed to add note.");
      throw err;
    }
  };

  // ─── UI Handlers ───────────────────────────────────────────────────────────
  const handleRowClick = (lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (lead) => {
    setDeletingLead(lead);
    setIsDeleteModalOpen(true);
  };

  // Derived unique website names — memoized
  const websites = useMemo(() => getUniqueWebsites(leads), [leads]);

  return (
    <AppContext.Provider
      value={{
        // Sidebar
        isMobileOpen,
        setIsMobileOpen,
        isCollapsed,
        setIsCollapsed,
        // Website filter
        activeWebsite,
        setActiveWebsite,
        // Data
        leads,
        websites,
        loading,
        // Drawer
        selectedLead,
        setSelectedLead,
        isDrawerOpen,
        setIsDrawerOpen,
        // Modals
        isModalOpen,
        setIsModalOpen,
        editingLead,
        setEditingLead,
        isEditModalOpen,
        setIsEditModalOpen,
        deletingLead,
        setDeletingLead,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        // CRUD
        createLead,
        updateLead,
        deleteLead,
        addNote,
        // UI helpers
        handleRowClick,
        openEditModal,
        openDeleteModal,
        refetch: refetchLeads,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
