"use client";

import { useState, type FocusEvent } from "react";
import Link from "next/link";
import { ChevronDown, Download, FileSearch, FileText, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import type { LeaseRecord } from "@/types/lease.types";
import { exportLeasesCsv } from "@/utils/lease-export";

export function LeaseDetailActions({ lease }: { lease: LeaseRecord }) {
  const [open, setOpen] = useState(false);
  const onBlur = (event: FocusEvent<HTMLDivElement>) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); };
  return <div className="flex flex-wrap items-center gap-2">
    <Link href={`/leases/${lease.id}/analysis`} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-[10px] font-semibold text-white hover:bg-slate-700"><FileSearch size={13} />View Analysis</Link>
    <Link href={`/leases/${lease.id}/document`} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-700 hover:bg-slate-50"><FileText size={13} />View Document</Link>
    <button onClick={() => toast.info("No source PDF is attached to this sample record. Downloads are available after document storage is connected.")} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-700 hover:bg-slate-50"><Download size={13} /><span className="hidden sm:inline">Download</span></button>
    <div className="relative" onBlur={onBlur}><button onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-700 hover:bg-slate-50"><MoreHorizontal size={15} /><span className="hidden sm:inline">More</span><ChevronDown size={12} /></button>{open && <div role="menu" className="absolute right-0 top-10 z-20 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"><button role="menuitem" onClick={() => { exportLeasesCsv([lease], `leaselens-${lease.id}.csv`); toast.success("Sample lease details exported as CSV."); setOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] text-slate-700 hover:bg-slate-50"><Download size={13} />Export lease details</button><button role="menuitem" onClick={async () => { try { await navigator.clipboard.writeText(lease.id); toast.success("Lease ID copied."); } catch { toast.info(`Lease ID: ${lease.id}`); } setOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] text-slate-700 hover:bg-slate-50">Copy lease ID</button></div>}</div>
  </div>;
}
