import Link from "next/link";
import { ArrowRight, CircleAlert, ScanLine } from "lucide-react";
import type { LeaseRecord } from "@/types/lease.types";
import { LeaseStatusBadge } from "@/components/leases/lease-status-badge";
import { formatLeaseDate } from "@/utils/lease-format";

export function AnalysisStatusCard({ lease }: { lease: LeaseRecord }) {
  const progress = Math.max(0, Math.min(100, lease.analysisProgress));
  return <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-700"><ScanLine size={15} /></span><div><h2 className="text-xs font-semibold text-slate-900">Analysis Status</h2><p className="mt-0.5 text-[9px] text-slate-500">Document processing overview</p></div></div><LeaseStatusBadge status={lease.analysisStatus} /></div>
    <div className="mt-4"><div className="flex items-center justify-between text-[10px]"><span className="font-medium text-slate-700">Analysis progress</span><span className="tabular-nums text-slate-500">{progress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${lease.analysisStatus === "failed" ? "bg-rose-400" : "bg-lime-400"}`} style={{ width: `${progress}%` }} /></div></div>
    {lease.analysisStatus === "failed" && <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-rose-50 p-2.5 text-[9px] leading-4 text-rose-800"><CircleAlert size={12} className="mt-0.5 shrink-0" />The sample analysis did not complete. No real document processing has been run.</p>}
    <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4"><div><dt className="text-[9px] text-slate-500">Last analyzed</dt><dd className="mt-1 text-[10px] font-medium text-slate-800">{formatLeaseDate(lease.lastAnalyzedAt)}</dd></div><div><dt className="text-[9px] text-slate-500">Extracted clauses</dt><dd className="mt-1 text-[10px] font-medium text-slate-800">{lease.clausesExtracted}</dd></div><div><dt className="text-[9px] text-slate-500">Fields for review</dt><dd className="mt-1 text-[10px] font-medium text-slate-800">{lease.fieldsNeedingReview}</dd></div><div><dt className="text-[9px] text-slate-500">Analysis status</dt><dd className="mt-1 text-[10px] font-medium capitalize text-slate-800">{lease.analysisStatus.replace("_", " ")}</dd></div></dl>
    <Link href={`/leases/${lease.id}/analysis`} className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-700 hover:bg-slate-50">View AI Analysis <ArrowRight size={13} /></Link>
  </section>;
}
