"use client";

import { useState, type FocusEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Download, FileSearch, FileText, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { LeaseRecord } from "@/types/lease.types";

export function LeaseActionsMenu({ lease, onDelete }: { lease: LeaseRecord; onDelete: (lease: LeaseRecord) => void }) {
  const [open, setOpen] = useState(false);
  const closeOnBlur = (event: FocusEvent<HTMLDivElement>) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); };
  const itemClass = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[10px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950";
  return <div className="relative" onBlur={closeOnBlur}>
    <button type="button" onClick={() => setOpen((value) => !value)} aria-label={`Actions for ${lease.documentName}`} aria-haspopup="menu" aria-expanded={open} className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"><MoreHorizontal size={17} /></button>
    {open && <div role="menu" className="absolute right-0 top-9 z-30 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
      <Link role="menuitem" href={`/leases/${lease.id}`} onClick={() => setOpen(false)} className={itemClass}><ArrowUpRight size={14} />View Details</Link>
      <Link role="menuitem" href={`/leases/${lease.id}/analysis`} onClick={() => setOpen(false)} className={itemClass}><FileSearch size={14} />View Analysis</Link>
      <Link role="menuitem" href={`/leases/${lease.id}/document`} onClick={() => setOpen(false)} className={itemClass}><FileText size={14} />View Document</Link>
      <button role="menuitem" type="button" onClick={() => { setOpen(false); toast.info("No sample PDF is attached. Document downloads will be available when storage is connected."); }} className={itemClass}><Download size={14} />Download PDF</button>
      <div className="my-1 border-t border-slate-100" />
      <button role="menuitem" type="button" onClick={() => { setOpen(false); onDelete(lease); }} className={`${itemClass} text-rose-700 hover:bg-rose-50 hover:text-rose-800`}><Trash2 size={14} />Delete Lease</button>
    </div>}
  </div>;
}
