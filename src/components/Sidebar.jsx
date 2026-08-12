"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Layers, 
  Globe, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Zap
} from "lucide-react";

export default function Sidebar({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
  activeWebsite,
  onWebsiteChange,
  websites = []
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Leads", icon: Layers, href: "/leads" },
    { name: "Websites", icon: Globe, href: "/websites" },
    { name: "Analytics", icon: BarChart3, href: "/analytics" },
  ];

  const handleWebsiteSelect = (website) => {
    onWebsiteChange(website);
    setIsMobileOpen(false); // Close mobile drawer on selection
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar-bg text-white border-r border-border-color/10">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shrink-0 shadow-md shadow-primary/20">
            <Zap className="w-4 h-4 text-accent" />
          </div>
          {!isCollapsed && (
            <span className="text-base font-bold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent truncate">
              CRM Dashboard
            </span>
          )}
        </div>
        
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex items-center justify-center w-6 h-6 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Menu Navigation */}
      <div className="px-3 py-4 space-y-1 shrink-0">
        {!isCollapsed && (
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 select-none">
            Main Menu
          </p>
        )}
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-white text-sidebar-bg font-semibold shadow-sm"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : "text-slate-400 group-hover:text-white"}`} />
              {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Websites Tracked - Moved to bottom inside a compact card */}
      <div className="mt-auto p-4 shrink-0">
        {!isCollapsed ? (
          <div className="bg-slate-950/40 rounded-xl p-3 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest select-none">
                Websites Tracked
              </span>
              <Globe className="w-3 h-3 text-slate-500" />
            </div>
            
            <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
              <button
                onClick={() => handleWebsiteSelect("all")}
                className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  activeWebsite === "all"
                    ? "bg-primary text-white font-semibold"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <span className="truncate">All Websites</span>
                {activeWebsite === "all" && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </button>

              {websites.map((site) => (
                <button
                  key={site}
                  onClick={() => handleWebsiteSelect(site)}
                  className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    activeWebsite === site
                      ? "bg-primary text-white font-semibold"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <span className="truncate text-left">{site}</span>
                  {activeWebsite === site && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleWebsiteSelect(activeWebsite === "all" ? websites[0] || "all" : "all")}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-950/40 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 transition-all cursor-pointer relative"
              title="Filter website (Click to toggle)"
            >
              <Globe className="w-4 h-4 text-accent" />
              {activeWebsite !== "all" && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-sidebar-bg" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {!isCollapsed && (
        <div className="p-3 border-t border-white/5 text-center shrink-0">
          <p className="text-[9px] text-slate-500 font-medium">CRM Dashboard</p>
          <p className="text-[8px] text-slate-600">Tailwind v4 • Sandbox</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Drawer (Slide-out drawer) */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg transform transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button inside mobile drawer */}
          <div className="absolute top-4 right-4 lg:hidden">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {sidebarContent}
        </div>
      </div>

      {/* Desktop / Tablet Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden lg:block transition-all duration-300 h-screen shrink-0 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
