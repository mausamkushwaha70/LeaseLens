"use client";

import { Download, Trash2, X } from "lucide-react";

type Props = { count: number; onExport: () => void; onDelete: () => void; onClear: () => void };
export function BulkActionToolbar({ count, onExport, onDelete, onClear }: Props) {
  if (!count) return null;
  return <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-lime-200 bg-lime-50 px-3 py-2.5"><p className="text-[11px] font-semibold text-slate-800">{count} {count === 1 ? "lease" : "leases"} selected</p><div className="flex items-center gap-1.5"><button onClick={onExport} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-lime-200 bg-white px-2.5 text-[10px] font-semibold text-slate-700 hover:bg-lime-100"><Download size={13} />Export Selected</button><button onClick={onDelete} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-rose-600 px-2.5 text-[10px] font-semibold text-white hover:bg-rose-700"><Trash2 size={13} />Delete Selected</button><button onClick={onClear} aria-label="Clear selection" className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-white"><X size={14} /></button></div></div>;
}
