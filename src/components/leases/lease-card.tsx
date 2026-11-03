"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { LeaseActionsMenu } from "@/components/leases/lease-actions-menu";
import { LeaseStatusBadge } from "@/components/leases/lease-status-badge";
import type { LeaseRecord } from "@/types/lease.types";

function dateLabel(value: string) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`)); }
type Props = { lease: LeaseRecord; selected: boolean; onToggle: (id: string) => void; onDelete: (lease: LeaseRecord) => void };
export function LeaseCard({ lease, selected, onToggle, onDelete }: Props) {
  return <article className={`rounded-2xl border bg-white p-4 transition ${selected ? "border-lime-400 ring-2 ring-lime-100" : "border-slate-200 hover:border-slate-300"}`}><div className="flex items-start justify-between"><label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" checked={selected} onChange={() => onToggle(lease.id)} aria-label={`Select ${lease.documentName}`} className="h-3.5 w-3.5 rounded border-slate-300 accent-lime-600" /><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600"><FileText size={16} /></span></label><LeaseActionsMenu lease={lease} onDelete={onDelete} /></div><Link href={`/leases/${lease.id}`} className="mt-4 block truncate text-xs font-semibold text-slate-900 hover:text-lime-800">{lease.documentName}</Link><p className="mt-1 truncate text-[10px] text-slate-500">{lease.tenantName}</p><p className="mt-0.5 truncate text-[10px] text-slate-500">{lease.propertyName}</p><div className="mt-3 flex items-center justify-between"><span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-medium text-slate-600">{lease.propertyType}</span><p className="text-[9px] text-slate-500">Ends {dateLabel(lease.leaseEndDate)}</p></div><div className="mt-3 flex flex-wrap gap-1.5"><LeaseStatusBadge status={lease.analysisStatus} compact /><LeaseStatusBadge status={lease.lifecycleStatus} kind="lifecycle" compact /></div><Link href={`/leases/${lease.id}`} className="mt-4 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-700 hover:bg-slate-50">View Details <ArrowUpRight size={13} /></Link></article>;
}
