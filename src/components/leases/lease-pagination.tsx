"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = { page: number; pageCount: number; total: number; pageSize: number; onPageChange: (page: number) => void };
export function LeasePagination({ page, pageCount, total, pageSize, onPageChange }: Props) {
  if (pageCount <= 1) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return <nav aria-label="Lease list pages" className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="text-[10px] text-slate-500">Showing <span className="font-semibold text-slate-700">{start}–{end}</span> of {total} leases</p><div className="flex items-center gap-1"><button onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="Previous page" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"><ChevronLeft size={14} /></button>{pages.map((pageNumber) => <button key={pageNumber} onClick={() => onPageChange(pageNumber)} aria-label={`Page ${pageNumber}`} aria-current={page === pageNumber ? "page" : undefined} className={`h-8 min-w-8 rounded-lg px-2 text-[10px] font-semibold ${page === pageNumber ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{pageNumber}</button>)}<button onClick={() => onPageChange(page + 1)} disabled={page === pageCount} aria-label="Next page" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"><ChevronRight size={14} /></button></div></nav>;
}
