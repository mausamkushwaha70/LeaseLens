"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { BulkActionToolbar } from "@/components/leases/bulk-action-toolbar";
import { DeleteLeaseDialog } from "@/components/leases/delete-lease-dialog";
import { LeaseFilters } from "@/components/leases/lease-filters";
import { LeaseGrid } from "@/components/leases/lease-grid";
import { LeasePageHeader } from "@/components/leases/lease-page-header";
import { LeasePagination } from "@/components/leases/lease-pagination";
import { LeaseStats } from "@/components/leases/lease-stats";
import { LeaseTable } from "@/components/leases/lease-table";
import { useLeases } from "@/hooks/useLeases";
import { exportLeasesCsv } from "@/utils/lease-export";
import type { LeaseFilters as LeaseFilterState, LeaseRecord } from "@/types/lease.types";

const pageSize = 10;
const defaultFilters: LeaseFilterState = { search: "", status: "all", expiration: "all", propertyType: "all", sort: "recent", customStartDate: "", customEndDate: "" };

function matchesExpiration(lease: LeaseRecord, filters: LeaseFilterState) {
  if (filters.expiration === "all") return true;
  if (filters.expiration === "expired") return lease.lifecycleStatus === "expired";
  if (filters.expiration === "custom") return (!filters.customStartDate || lease.leaseEndDate >= filters.customStartDate) && (!filters.customEndDate || lease.leaseEndDate <= filters.customEndDate);
  const days = Number(filters.expiration.replace("d", ""));
  const end = new Date(`${lease.leaseEndDate}T00:00:00Z`).getTime();
  const today = new Date(); today.setUTCHours(0, 0, 0, 0);
  const remaining = Math.ceil((end - today.getTime()) / 86_400_000);
  return remaining >= 0 && remaining <= days;
}

function sortLeases(records: LeaseRecord[], sort: LeaseFilterState["sort"]) {
  return [...records].sort((first, second) => {
    if (sort === "recent") return second.uploadDate.localeCompare(first.uploadDate);
    if (sort === "oldest") return first.uploadDate.localeCompare(second.uploadDate);
    if (sort === "expiration") return first.leaseEndDate.localeCompare(second.leaseEndDate);
    if (sort === "tenant") return first.tenantName.localeCompare(second.tenantName);
    return first.propertyName.localeCompare(second.propertyName);
  });
}

type ViewMode = "table" | "grid";

export function LeaseManagement() {
  const { records, isLoading, error, deleteLeases, retry } = useLeases();
  const [filters, setFilters] = useState<LeaseFilterState>(defaultFilters);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<ViewMode>("table");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<LeaseRecord[]>([]);

  const filteredRecords = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return sortLeases(records.filter((lease) => {
      const matchesQuery = !query || [lease.documentName, lease.tenantName, lease.propertyName].some((value) => value.toLowerCase().includes(query));
      const matchesStatus = filters.status === "all" || (filters.status === "active" ? lease.lifecycleStatus === "active" : filters.status === "expired" ? lease.lifecycleStatus === "expired" : lease.analysisStatus === filters.status);
      const matchesProperty = filters.propertyType === "all" || lease.propertyType === filters.propertyType;
      return matchesQuery && matchesStatus && matchesProperty && matchesExpiration(lease, filters);
    }), filters.sort);
  }, [filters, records]);

  const pageCount = Math.ceil(filteredRecords.length / pageSize);
  const currentPage = pageCount ? Math.min(page, pageCount) : 1;
  const visibleRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const selectedRecords = records.filter((lease) => selectedIds.has(lease.id));
  const allVisibleSelected = visibleRecords.length > 0 && visibleRecords.every((lease) => selectedIds.has(lease.id));

  function updateFilter<K extends keyof LeaseFilterState>(key: K, value: LeaseFilterState[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
    setSelectedIds(new Set());
  }
  function clearFilters() {
    setFilters(defaultFilters);
    setPage(1);
    setSelectedIds(new Set());
  }
  function toggleLease(id: string) {
    setSelectedIds((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }
  function toggleVisiblePage() {
    setSelectedIds((current) => { const next = new Set(current); if (allVisibleSelected) visibleRecords.forEach((lease) => next.delete(lease.id)); else visibleRecords.forEach((lease) => next.add(lease.id)); return next; });
  }
  function exportRecords(exportThese: LeaseRecord[], filename?: string) {
    if (!exportThese.length) { toast.info("There are no lease records to export."); return; }
    exportLeasesCsv(exportThese, filename);
    toast.success(`${exportThese.length} sample ${exportThese.length === 1 ? "lease" : "leases"} exported as CSV.`);
  }
  function confirmDelete() {
    const ids = pendingDelete.map((lease) => lease.id);
    deleteLeases(ids);
    setSelectedIds((current) => { const next = new Set(current); ids.forEach((id) => next.delete(id)); return next; });
    setPage((current) => Math.max(1, Math.min(current, Math.ceil((records.length - ids.length) / pageSize))));
    toast.success(`${ids.length} ${ids.length === 1 ? "lease" : "leases"} removed from this local preview.`);
    setPendingDelete([]);
  }

  return <div className="space-y-5 sm:space-y-6">
    <LeasePageHeader recordCount={records.length} onExport={() => exportRecords(filteredRecords)} />
    <LeaseStats />
    <LeaseFilters filters={filters} resultCount={filteredRecords.length} onFilterChange={updateFilter} onClear={clearFilters} />
    {error && <section role="alert" className="flex flex-col items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold text-rose-800">Lease list could not be loaded</p><p className="mt-1 text-[10px] text-rose-700">{error}</p></div><button onClick={retry} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 text-[10px] font-semibold text-rose-700 hover:bg-rose-100"><RefreshCw size={12} />Retry</button></section>}
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:px-5"><div><h3 className="text-xs font-semibold text-slate-900">Lease records</h3><p className="mt-1 text-[9px] text-slate-500">Analysis progress and lease lifecycle are shown separately.</p></div><div className="flex items-center justify-between gap-3"><p className="text-[9px] text-slate-500">{filteredRecords.length} matching · sample data</p><div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5"><button onClick={() => setView("table")} aria-label="Table view" aria-pressed={view === "table"} className={`grid h-7 w-8 place-items-center rounded-md ${view === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}><List size={15} /></button><button onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"} className={`grid h-7 w-8 place-items-center rounded-md ${view === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}><LayoutGrid size={14} /></button></div></div></div>
      <BulkActionToolbar count={selectedIds.size} onExport={() => exportRecords(selectedRecords, "leaselens-selected-leases.csv")} onDelete={() => setPendingDelete(selectedRecords)} onClear={() => setSelectedIds(new Set())} />
      {view === "table" ? <LeaseTable records={visibleRecords} selectedIds={selectedIds} loading={isLoading} onToggle={toggleLease} onTogglePage={toggleVisiblePage} onDelete={(lease) => setPendingDelete([lease])} /> : <LeaseGrid records={visibleRecords} selectedIds={selectedIds} loading={isLoading} onToggle={toggleLease} onDelete={(lease) => setPendingDelete([lease])} />}
      {!isLoading && !error && <LeasePagination page={currentPage} pageCount={pageCount} total={filteredRecords.length} pageSize={pageSize} onPageChange={setPage} />}
    </section>
    <p className="text-center text-[9px] text-slate-400">Mock lease data is stored in this browser session only; no documents are connected to a backend.</p>
    <DeleteLeaseDialog open={pendingDelete.length > 0} leases={pendingDelete.map((lease) => lease.documentName)} onCancel={() => setPendingDelete([])} onConfirm={confirmDelete} />
  </div>;
}
