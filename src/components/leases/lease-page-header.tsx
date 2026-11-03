"use client";

import Link from "next/link";
import { Download, FileUp } from "lucide-react";

type Props = { onExport: () => void; recordCount: number };
export function LeasePageHeader({ onExport, recordCount }: Props) {
  return <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-lime-800">Lease library</p><h2 className="text-[26px] font-semibold tracking-[-0.045em] text-slate-950 sm:text-[30px]">All Leases</h2><p className="mt-1.5 max-w-xl text-sm text-slate-500">Manage, organize, and monitor all your commercial lease agreements.</p><p className="mt-2 text-[9px] text-slate-400">Showing a local sample of {recordCount} lease records; portfolio totals include additional illustrative records.</p></div><div className="flex flex-wrap items-center gap-2"><button onClick={onExport} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"><Download size={14} /> Export Data</button><Link href="/leases/upload" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white transition hover:bg-slate-700"><FileUp size={15} /> Upload New Lease</Link></div></section>;
}
