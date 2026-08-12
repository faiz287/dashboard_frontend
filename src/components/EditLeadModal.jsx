"use client";

import { useState, useEffect } from "react";
import { X, Save, AlertCircle, Trash2 } from "lucide-react";

export default function EditLeadModal({ isOpen, onClose, onSave, lead }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    websiteName: "",
    sourcePage: "",
    status: "New",
    followUpDate: "",
    followUpCompleted: false,
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && lead) {
      setFormData({
        firstName: lead.firstName || "",
        lastName: lead.lastName || "",
        email: lead.email || "",
        phone: lead.phone || "",
        subject: lead.subject || "",
        message: lead.message || "",
        websiteName: lead.websiteName || "",
        sourcePage: lead.sourcePage || "",
        status: lead.status || "New",
        followUpDate: lead.followUpDate
          ? new Date(lead.followUpDate).toISOString().split("T")[0]
          : "",
        followUpCompleted: Boolean(lead.followUpCompleted),
      });
      setError("");
    }
  }, [isOpen, lead]);

  if (!isOpen || !lead) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "followUpCompleted") {
      setFormData((prev) => ({
        ...prev,
        followUpCompleted: checked,
        followUpDate: checked ? "" : prev.followUpDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleClearDate = () => {
    setFormData((prev) => ({ ...prev, followUpDate: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please enter both First Name and Last Name.");
      return;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setError("Please provide either an Email Address or a Phone Number.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        followUpDate: formData.followUpDate ? new Date(formData.followUpDate) : null,
      };
      await onSave(lead._id || lead.id, payload);
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to update lead. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-border-color rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-color">
          <div>
            <h3 className="text-base font-bold text-text-primary">
              Edit Lead Details
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Update information, lead pipeline status, or follow-up schedule.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase">
                First Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase">
                Last Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Pipeline & Follow-Up */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pipeline & Follow-Up Management
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Status Selector */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase">
                  Lead Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={saving}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-primary outline-hidden text-slate-900 font-semibold disabled:opacity-60"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Follow-Up Date Picker */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase flex items-center justify-between">
                  <span>Follow-Up Date</span>
                  {formData.followUpDate && (
                    <button
                      type="button"
                      onClick={handleClearDate}
                      disabled={saving}
                      className="text-rose-600 hover:underline text-[10px] lowercase font-normal flex items-center gap-0.5 disabled:opacity-50"
                    >
                      <Trash2 className="w-3 h-3" /> clear date
                    </button>
                  )}
                </label>
                <input
                  type="date"
                  name="followUpDate"
                  value={formData.followUpDate}
                  onChange={handleChange}
                  disabled={saving || formData.followUpCompleted}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-primary outline-hidden text-slate-900 font-medium disabled:opacity-50 disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* Follow Up Completed Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="editFollowUpCompleted"
                name="followUpCompleted"
                checked={formData.followUpCompleted}
                onChange={handleChange}
                disabled={saving}
                className="w-4 h-4 text-emerald-600 rounded-md border-slate-300 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
              />
              <label
                htmlFor="editFollowUpCompleted"
                className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
              >
                Mark Follow-Up as Completed (auto-clears date)
              </label>
            </div>
          </div>

          {/* Website Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase">
                Website Name
              </label>
              <input
                type="text"
                name="websiteName"
                value={formData.websiteName}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase">
                Source Page
              </label>
              <input
                type="text"
                name="sourcePage"
                value={formData.sourcePage}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-secondary uppercase">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={saving}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
            />
          </div>

          {/* Message Content */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-secondary uppercase">
              Message Content
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              disabled={saving}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 resize-none disabled:opacity-60"
            />
          </div>

          {/* Submit Action Block */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-color bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 border border-border-color rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary/95 disabled:opacity-50 rounded-lg shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
