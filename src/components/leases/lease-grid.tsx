"use client";

import { LeaseCard } from "@/components/leases/lease-card";
import type { LeaseRecord } from "@/types/lease.types";

type Props = { records: LeaseRecord[]; selectedIds: Set<string>; loading: boolean; onToggle: (id: string) => void; onDelete: (lease: LeaseRecord) => void };
export function LeaseGrid({ records, selectedIds, loading, onToggle, onDelete }: Props) {
  if (loading) return <div role="status" aria-label="Loading lease cards" className="grid animate-pulse gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3"><span className="sr-only">Loading sample lease records</span>{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-52 rounded-2xl bg-slate-100" />)}</div>;
  if (!records.length) return <div className="grid min-h-64 place-items-center px-5 text-center"><div><p className="text-sm font-semibold text-slate-900">No leases match your filters</p><p className="mt-1 text-[11px] text-slate-500">Try a different search or clear some filters.</p></div></div>;
  return <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">{records.map((lease) => <LeaseCard key={lease.id} lease={lease} selected={selectedIds.has(lease.id)} onToggle={onToggle} onDelete={onDelete} />)}</div>;
}
