"use client";

import { useState, useEffect } from "react";
import { X, Send, AlertCircle } from "lucide-react";

export default function NewLeadModal({ isOpen, onClose, onSubmit }) {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    websiteName: "",
    sourcePage: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
      setError("");
    }
  }, [isOpen]);

  // Prevent background scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please enter both First Name and Last Name.");
      return;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setError("Please provide either an Email Address or a Phone Number.");
      return;
    }
    if (!formData.websiteName.trim()) {
      setError("Please specify the Website Name where this lead originated.");
      return;
    }
    if (!formData.sourcePage.trim()) {
      setError("Please specify the Source Page (e.g. Contact Page, Landing Page).");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      // Show the actual server/API error message
      setError(err?.message || "Failed to create lead. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div
          className="relative w-full max-w-lg bg-white border border-border-color rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border-color">
            <div>
              <h3 className="text-base font-bold text-text-primary">
                Add New Lead
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Simulate a web form contact submission in real-time.
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={submitting}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
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
                  placeholder="John"
                  disabled={submitting}
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
                  placeholder="Doe"
                  disabled={submitting}
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
                  placeholder="john.doe@example.com"
                  disabled={submitting}
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
                  placeholder="+92 300 1234567"
                  disabled={submitting}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Website Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase">
                  Website Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="websiteName"
                  value={formData.websiteName}
                  onChange={handleChange}
                  placeholder="e.g. Oxmite Digital"
                  disabled={submitting}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase">
                  Source Page <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="sourcePage"
                  value={formData.sourcePage}
                  onChange={handleChange}
                  placeholder="e.g. Contact Page"
                  disabled={submitting}
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
                placeholder="How can we help?"
                disabled={submitting}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 disabled:opacity-60"
              />
            </div>

            {/* Message Body */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase">
                Message Content
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write message details..."
                rows={3}
                disabled={submitting}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary outline-hidden transition-all text-slate-900 resize-none disabled:opacity-60"
              />
            </div>

            {/* Submit Action Block */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-color bg-white">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 border border-border-color hover:border-slate-300 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-primary hover:bg-primary/95 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-97"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? "Submitting..." : "Add Lead"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
