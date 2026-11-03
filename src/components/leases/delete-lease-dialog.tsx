"use client";

import { AlertTriangle, X } from "lucide-react";

type Props = { open: boolean; leases: string[]; onCancel: () => void; onConfirm: () => void };
export function DeleteLeaseDialog({ open, leases, onCancel, onConfirm }: Props) {
  if (!open) return null;
  const bulk = leases.length > 1;
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-6">
      <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-700"><AlertTriangle size={18} /></span><button type="button" onClick={onCancel} aria-label="Close confirmation" className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={16} /></button></div>
      <h2 id="delete-dialog-title" className="mt-4 text-lg font-semibold tracking-tight text-slate-900">Delete {bulk ? `${leases.length} leases` : "this lease"}?</h2>
      <p className="mt-2 text-xs leading-5 text-slate-500">{bulk ? `You are about to remove ${leases.length} selected records from this local preview.` : "You are about to remove this record from the local preview."} This action cannot be undone here.</p>
      <div className="mt-4 max-h-32 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">{leases.slice(0, 4).map((name) => <p key={name} className="truncate py-1 text-[10px] font-medium text-slate-700">{name}</p>)}{leases.length > 4 && <p className="py-1 text-[10px] text-slate-500">and {leases.length - 4} more</p>}</div>
      <div className="mt-5 flex justify-end gap-2"><button type="button" onClick={onCancel} className="h-9 rounded-lg border border-slate-200 px-3.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="button" onClick={onConfirm} className="h-9 rounded-lg bg-rose-600 px-3.5 text-[11px] font-semibold text-white hover:bg-rose-700">Delete {bulk ? "selected" : "lease"}</button></div>
    </section>
  </div>;
}
