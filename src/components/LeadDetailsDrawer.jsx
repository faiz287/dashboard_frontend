"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Mail,
  Phone,
  Globe,
  FileText,
  Calendar,
  Compass,
  Clock,
  MessageSquare,
  Send,
  Edit2,
  Trash2,
  CheckCircle2,
  Activity,
  ChevronDown,
} from "lucide-react";
import { formatLeadDate, formatRelativeTime, getFollowUpStatus } from "@/lib/dateUtils";
import StatusBadge, { STATUS_CONFIG } from "@/components/leads/StatusBadge";
import FollowUpBadge from "@/components/leads/FollowUpBadge";
import { useApp } from "@/lib/context";

export default function LeadDetailsDrawer({ lead, isOpen, onClose }) {
  const drawerRef = useRef(null);
  const { updateLead, addNote, openEditModal, openDeleteModal } = useApp();

  // Local states for inline editing inside drawer
  const [noteText, setNoteText] = useState("");
  const [submittingNote, setSubmittingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Follow-up editing state
  const [followUpDateInput, setFollowUpDateInput] = useState("");
  const [followUpCompletedInput, setFollowUpCompletedInput] = useState(false);
  const [savingFollowUp, setSavingFollowUp] = useState(false);

  // Any operation in-flight — disables header Edit/Delete buttons
  const anyOperationPending = submittingNote || updatingStatus || savingFollowUp;

  useEffect(() => {
    if (lead) {
      setFollowUpDateInput(
        lead.followUpDate ? new Date(lead.followUpDate).toISOString().split("T")[0] : ""
      );
      setFollowUpCompletedInput(Boolean(lead.followUpCompleted));
    }
  }, [lead]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!lead) return null;

  const leadId = lead._id || lead.id;

  // ─── Handle Quick Status Change ────────────────────────────────────────────
  const handleStatusChange = async (newStatus) => {
    if (newStatus === lead.status) return;
    setUpdatingStatus(true);
    try {
      await updateLead(leadId, { status: newStatus });
    } catch (err) {
      // toast.error is handled in context
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ─── Handle Follow-Up Save ─────────────────────────────────────────────────
  const handleSaveFollowUp = async () => {
    setSavingFollowUp(true);
    try {
      await updateLead(leadId, {
        followUpDate: followUpDateInput ? new Date(followUpDateInput) : null,
        followUpCompleted: followUpCompletedInput,
      });
    } catch (err) {
      // toast.error is handled in context
    } finally {
      setSavingFollowUp(false);
    }
  };

  // ─── Handle Note Submission ────────────────────────────────────────────────
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSubmittingNote(true);
    try {
      await addNote(leadId, noteText.trim());
      setNoteText("");
    } catch (err) {
      // toast.error is handled in context
    } finally {
      setSubmittingNote(false);
    }
  };

  // ─── Derive Activity Timeline Events ──────────────────────────────────────
  const timelineEvents = [];

  if (lead.createdAt) {
    timelineEvents.push({
      id: "created",
      title: "Lead Created",
      subtitle: `Form submission via ${lead.sourcePage || "Direct"}`,
      date: lead.createdAt,
      icon: Calendar,
      color: "bg-blue-500",
    });
  }

  if (lead.status) {
    const statusTime = lead.statusUpdatedAt || lead.updatedAt || lead.createdAt;
    timelineEvents.push({
      id: "status",
      title: `Status: ${lead.status}`,
      subtitle: `Changed ${formatRelativeTime(statusTime)}`,
      date: statusTime,
      icon: Activity,
      color: "bg-purple-500",
    });
  }

  if (lead.followUpCompleted) {
    timelineEvents.push({
      id: "followup-completed",
      title: "Follow-Up Completed",
      subtitle: "Marked as completed",
      date: lead.updatedAt || lead.createdAt,
      icon: CheckCircle2,
      color: "bg-emerald-500",
    });
  } else if (lead.followUpDate) {
    const fuStatus = getFollowUpStatus(lead.followUpDate, lead.followUpCompleted);
    timelineEvents.push({
      id: "followup-scheduled",
      title: `Follow-Up Scheduled (${fuStatus === "today" ? "Due Today" : fuStatus === "overdue" ? "Overdue" : "Upcoming"})`,
      subtitle: `Scheduled for ${formatLeadDate(lead.followUpDate)}`,
      date: lead.followUpDate,
      icon: Clock,
      color: fuStatus === "overdue" ? "bg-rose-500" : fuStatus === "today" ? "bg-orange-500" : "bg-blue-500",
    });
  }

  if (lead.notes && Array.isArray(lead.notes)) {
    lead.notes.forEach((note, idx) => {
      timelineEvents.push({
        id: `note-${idx}`,
        title: "Note Added",
        subtitle: note.text.length > 50 ? `${note.text.substring(0, 50)}...` : note.text,
        date: note.createdAt,
        icon: MessageSquare,
        color: "bg-amber-500",
      });
    });
  }

  timelineEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

  const sortedNotes = lead.notes
    ? [...lead.notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sliding Sheet */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-[500px] h-full bg-white shadow-2xl border-l border-border-color transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-color bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Lead Overview
              </span>
              <span className="text-[10px] text-slate-400">• Updated {formatRelativeTime(lead.updatedAt || lead.createdAt)}</span>
            </div>
            <h2 className="text-xl font-bold text-text-primary mt-0.5">
              {lead.firstName} {lead.lastName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openEditModal(lead)}
              disabled={anyOperationPending}
              title="Edit Lead"
              className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-primary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => openDeleteModal(lead)}
              disabled={anyOperationPending}
              title="Delete Lead"
              className="p-2 rounded-lg hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-text-primary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Status Pipeline & Quick Selector */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pipeline Status
              </span>
              <StatusBadge status={lead.status} />
            </div>

            <div className="relative">
              <label className="text-[11px] text-slate-500 font-medium block mb-1">
                Change Lead Status:
              </label>
              <div className="relative">
                <select
                  value={lead.status || "New"}
                  disabled={updatingStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg outline-hidden focus:border-primary appearance-none cursor-pointer text-slate-900 disabled:opacity-50"
                >
                  {Object.keys(STATUS_CONFIG).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
              {updatingStatus && (
                <p className="text-[10px] text-primary mt-1 font-medium">Updating status...</p>
              )}
              {lead.statusUpdatedAt && !updatingStatus && (
                <p className="text-[10px] text-slate-400 mt-1">
                  Status last updated {formatRelativeTime(lead.statusUpdatedAt)}
                </p>
              )}
            </div>
          </div>

          {/* Follow-Up Management Section */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Follow-Up Schedule
              </span>
              <FollowUpBadge
                followUpDate={lead.followUpDate}
                followUpCompleted={lead.followUpCompleted}
              />
            </div>

            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={followUpDateInput}
                    onChange={(e) => setFollowUpDateInput(e.target.value)}
                    disabled={followUpCompletedInput || savingFollowUp}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-hidden focus:border-primary text-slate-900 font-medium disabled:opacity-50 disabled:bg-slate-100"
                  />
                </div>

                <div className="flex items-end pb-1">
                  <button
                    type="button"
                    onClick={handleSaveFollowUp}
                    disabled={savingFollowUp}
                    className="w-full py-1.5 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 disabled:opacity-50 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    {savingFollowUp ? "Saving..." : "Save Schedule"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={followUpCompletedInput}
                    disabled={savingFollowUp}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFollowUpCompletedInput(checked);
                      if (checked) setFollowUpDateInput("");
                    }}
                    className="w-4 h-4 text-emerald-600 rounded-md border-slate-300 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                  />
                  Mark as Completed
                </label>

                {followUpDateInput && (
                  <button
                    type="button"
                    disabled={savingFollowUp}
                    onClick={() => setFollowUpDateInput("")}
                    className="text-[11px] text-rose-600 hover:underline font-semibold disabled:opacity-50"
                  >
                    Clear Date
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-color pb-1.5">
              Contact Details & Origin
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-xs font-semibold text-primary hover:underline break-all"
                >
                  {lead.email}
                </a>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</p>
                <p className="text-xs font-semibold text-slate-800">
                  {lead.phone || "Not provided"}
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Website Origin</p>
                <p className="text-xs font-semibold text-slate-800">{lead.websiteName}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Source Page</p>
                <p className="text-xs font-semibold text-accent">{lead.sourcePage}</p>
              </div>
            </div>
          </div>

          {/* Message Content Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-color pb-1.5">
              Form Message
            </h3>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
              <p className="text-xs font-bold text-slate-800">{lead.subject || "No Subject"}</p>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {lead.message || "No message content provided."}
              </p>
            </div>
          </div>

          {/* Internal Notes Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border-color pb-1.5">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Internal Notes ({sortedNotes.length})
              </h3>
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write an internal team note..."
                rows={2}
                disabled={submittingNote}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary rounded-xl outline-hidden text-slate-900 resize-none font-medium disabled:opacity-60"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingNote || !noteText.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary/95 disabled:opacity-50 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  {submittingNote ? "Saving..." : "Add Note"}
                </button>
              </div>
            </form>

            {/* Notes List (Sorted Newest First) */}
            <div className="space-y-2 mt-3 max-h-56 overflow-y-auto pr-1">
              {sortedNotes.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2 text-center">
                  No internal notes added yet.
                </p>
              ) : (
                sortedNotes.map((note, index) => (
                  <div
                    key={index}
                    className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1"
                  >
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">
                      {note.text}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{formatLeadDate(note.createdAt)}</span>
                      <span>{new Date(note.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Timeline Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-color pb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Activity Timeline
            </h3>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timelineEvents.map((event) => {
                const IconComponent = event.icon;
                return (
                  <div key={event.id} className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full ${event.color} text-white flex items-center justify-center shadow-xs`}
                    >
                      <IconComponent className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{event.title}</p>
                      <p className="text-[11px] text-slate-500">{event.subtitle}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {formatLeadDate(event.date)} at {new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 px-6 border-t border-border-color bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">ID: {leadId}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openEditModal(lead)}
              disabled={anyOperationPending}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-border-color hover:border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Edit Lead
            </button>
            <button
              onClick={() => openDeleteModal(lead)}
              disabled={anyOperationPending}
              className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
