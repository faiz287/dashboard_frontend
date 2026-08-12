"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider, useApp } from "@/lib/context";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import LeadDetailsDrawer from "@/components/LeadDetailsDrawer";
import NewLeadModal from "@/components/NewLeadModal";
import EditLeadModal from "@/components/EditLeadModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CRM Dashboard | Centralized Lead Collection</title>
        <meta name="description" content="Centralized lead collection dashboard for tracking form submissions from multiple websites." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-app-bg text-text-primary antialiased min-h-screen">
        <AppProvider>
          <LayoutShell>{children}</LayoutShell>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: "500",
                borderRadius: "10px",
                padding: "12px 16px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              },
              success: {
                iconTheme: { primary: "#10b981", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}

function LayoutShell({ children }) {
  const {
    isMobileOpen,
    setIsMobileOpen,
    isCollapsed,
    setIsCollapsed,
    activeWebsite,
    setActiveWebsite,
    websites,
    isModalOpen,
    setIsModalOpen,
    selectedLead,
    isDrawerOpen,
    setIsDrawerOpen,
    setSelectedLead,
    editingLead,
    isEditModalOpen,
    setIsEditModalOpen,
    deletingLead,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    createLead,
    updateLead,
    deleteLead,
  } = useApp();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeWebsite={activeWebsite}
        onWebsiteChange={setActiveWebsite}
        websites={websites}
      />

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <Header
          onMenuClick={() => setIsMobileOpen(true)}
          onNewLeadClick={() => setIsModalOpen(true)}
          activeWebsite={activeWebsite}
        />

        <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global details drawer (slides out on row click) */}
      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedLead(null);
        }}
      />

      {/* Global new lead injection modal */}
      <NewLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createLead}
      />

      {/* Global edit lead modal */}
      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateLead}
        lead={editingLead}
      />

      {/* Global delete confirm modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteLead}
        lead={deletingLead}
      />
    </div>
  );
}
