import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { LeaseDetailActions } from "@/components/leases/lease-detail-actions";
import { LeaseStatusBadge } from "@/components/leases/lease-status-badge";
import type { LeaseRecord } from "@/types/lease.types";
import { formatLeaseDate } from "@/utils/lease-format";

export function LeaseDetailsHeader({ lease }: { lease: LeaseRecord }) {
  return <section className="space-y-4"><nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10px] text-slate-500"><Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link><ChevronRight size={12} /><Link href="/leases" className="hover:text-slate-900">All Leases</Link><ChevronRight size={12} /><span aria-current="page" className="text-slate-700">Lease Details</span></nav><div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end"><div className="min-w-0"><div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime-100 text-lime-800"><FileText size={18} /></span><div className="min-w-0"><h1 className="truncate text-[22px] font-semibold tracking-[-0.045em] text-slate-950 sm:text-[26px]">{lease.documentName}</h1><p className="mt-1 truncate text-xs text-slate-500">{lease.tenantName} <span className="px-1 text-slate-300">·</span> {lease.propertyName}</p></div></div><div className="mt-3 flex flex-wrap items-center gap-2"><LeaseStatusBadge status={lease.analysisStatus} /><LeaseStatusBadge status={lease.lifecycleStatus} kind="lifecycle" /><span className="text-[9px] text-slate-400">Uploaded {formatLeaseDate(lease.uploadDate)}</span></div></div><LeaseDetailActions lease={lease} /></div></section>;
}
