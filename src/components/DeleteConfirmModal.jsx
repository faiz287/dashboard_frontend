"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, lead }) {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !lead) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onConfirm(lead._id || lead.id);
      onClose();
    } catch (err) {
      // Toast error is already handled in context — just stop the loading state
      console.error("Delete failure:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={!deleting ? onClose : undefined}
    >
      <div
        className="relative w-full max-w-md bg-white border border-border-color rounded-2xl shadow-2xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Delete Lead?</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={deleting}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
          <p className="font-semibold text-slate-800">
            {lead.firstName} {lead.lastName}
          </p>
          <p className="text-slate-500">{lead.email || lead.phone}</p>
          <p className="text-slate-400 text-[11px]">{lead.websiteName} • {lead.sourcePage}</p>
        </div>

        <p className="text-xs text-slate-600">
          Are you sure you want to permanently delete this lead entry from the database?
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 border border-border-color rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {deleting ? "Deleting..." : "Delete Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}
