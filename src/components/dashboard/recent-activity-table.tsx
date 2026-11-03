"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight, FileText, Search, X } from "lucide-react";
import type { LeaseActivityRecord, LeaseActivityStatus } from "@/types/dashboard.types";

type StatusFilter = "All statuses" | LeaseActivityStatus;
const statuses: StatusFilter[] = ["All statuses", "Completed", "Processing", "Needs Review", "Failed"];
const badgeStyles: Record<LeaseActivityStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Processing: "bg-blue-50 text-blue-700 ring-blue-600/10",
  "Needs Review": "bg-amber-50 text-amber-800 ring-amber-600/10",
  Failed: "bg-rose-50 text-rose-700 ring-rose-600/10",
};
const pageSize = 5;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function TableSkeleton() {
  return <div role="status" aria-label="Loading lease activity" className="animate-pulse space-y-3 p-5"><span className="sr-only">Loading lease activity</span>{Array.from({ length: 5 }, (_, index) => <div key={index} className="flex items-center gap-4"><div className="h-8 w-8 rounded-lg bg-slate-100" /><div className="h-3 flex-1 rounded bg-slate-100" /><div className="hidden h-3 w-28 rounded bg-slate-100 sm:block" /><div className="h-6 w-20 rounded-full bg-slate-100" /></div>)}</div>;
}

export function RecentActivityTable({ records }: { records: LeaseActivityRecord[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All statuses");
  const [sortAscending, setSortAscending] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 320);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((record) => {
      const matchesQuery = !normalizedQuery || [record.documentName, record.tenant, record.property].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesStatus = status === "All statuses" || record.status === status;
      return matchesQuery && matchesStatus;
    }).sort((first, second) => sortAscending ? first.uploadDate.localeCompare(second.uploadDate) : second.uploadDate.localeCompare(first.uploadDate));
  }, [query, records, sortAscending, status]);

  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const resetFilters = () => { setQuery(""); setStatus("All statuses"); setPage(1); };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-5 md:flex-row md:items-center">
        <div><h3 className="text-sm font-semibold text-slate-900">Recent Lease Activity</h3><p className="mt-1 text-[11px] text-slate-500">Track the latest updates across your lease portfolio.</p></div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="relative block"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><span className="sr-only">Search activity</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search leases or tenants" className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[11px] outline-none transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-4 focus:ring-lime-100/60 sm:w-[210px]" /></label>
          <label className="relative"><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => { setStatus(event.target.value as StatusFilter); setPage(1); }} className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-[11px] font-medium text-slate-700 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100/60 sm:w-[145px]">{statuses.map((option) => <option key={option}>{option}</option>)}</select></label>
        </div>
      </div>
      <p className="px-4 pt-3 text-[9px] text-slate-400 sm:px-5">Sample lease data · {filteredRecords.length} {filteredRecords.length === 1 ? "record" : "records"}</p>
      <div className="overflow-x-auto">
        {loading ? <TableSkeleton /> : pageRecords.length === 0 ? (
          <div className="flex min-h-[230px] flex-col items-center justify-center px-5 text-center"><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500"><FileText size={18} /></span><h4 className="mt-3 text-xs font-semibold text-slate-900">No leases match those filters</h4><p className="mt-1 max-w-xs text-[10px] text-slate-500">Try another search term or clear the status filter.</p><button onClick={resetFilters} className="mt-3 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-100">Clear filters <X size={12} /></button></div>
        ) : (
          <table className="w-full min-w-[760px] text-left">
            <thead><tr className="border-y border-slate-100 bg-slate-50/70 text-[10px] font-medium text-slate-500"><th scope="col" className="px-5 py-3">Document Name</th><th scope="col" className="px-4 py-3">Tenant</th><th scope="col" className="px-4 py-3">Property</th><th scope="col" aria-sort={sortAscending ? "ascending" : "descending"} className="px-4 py-3"><button onClick={() => setSortAscending((value) => !value)} aria-label={`Sort upload date ${sortAscending ? "newest first" : "oldest first"}`} className="inline-flex items-center gap-1 hover:text-slate-900">Upload Date {sortAscending ? <ArrowUp size={12} /> : <ArrowDown size={12} />}</button></th><th scope="col" className="px-4 py-3">Status</th><th scope="col" className="px-4 py-3 text-right">Action</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{pageRecords.map((record) => <tr key={record.id} className="group transition-colors hover:bg-slate-50/70"><td className="px-5 py-3.5"><div className="flex items-center gap-2.5"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500"><FileText size={15} /></span><span className="max-w-[220px] truncate text-[11px] font-semibold text-slate-800">{record.documentName}</span></div></td><td className="px-4 py-3.5 text-[11px] text-slate-600">{record.tenant}</td><td className="px-4 py-3.5 text-[11px] text-slate-600">{record.property}</td><td className="whitespace-nowrap px-4 py-3.5 text-[11px] text-slate-500">{formatDate(record.uploadDate)}</td><td className="px-4 py-3.5"><span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-semibold ring-1 ring-inset ${badgeStyles[record.status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{record.status}</span></td><td className="px-4 py-3.5 text-right"><Link href={`/leases/${record.id}/analysis`} className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:bg-lime-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500">View Details <ArrowUpRight size={13} /></Link></td></tr>)}</tbody>
          </table>
        )}
      </div>
      {!loading && filteredRecords.length > 0 && <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 sm:px-5"><p className="text-[10px] text-slate-500">Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredRecords.length)}</span> of {filteredRecords.length}</p><div className="flex items-center gap-2"><button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button><button onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={currentPage === pageCount} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></div>}
      <p className="border-t border-slate-100 px-4 py-2 text-[9px] text-slate-400 sm:px-5">Swipe horizontally to see all columns on smaller screens.</p>
    </section>
  );
}
