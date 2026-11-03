import type { LeaseRecord } from "@/types/lease.types";

const columns: { label: string; value: (lease: LeaseRecord) => string }[] = [
  { label: "Document Name", value: (lease) => lease.documentName },
  { label: "Tenant", value: (lease) => lease.tenantName },
  { label: "Property", value: (lease) => lease.propertyName },
  { label: "Property Type", value: (lease) => lease.propertyType },
  { label: "Lease Start Date", value: (lease) => lease.leaseStartDate },
  { label: "Lease End Date", value: (lease) => lease.leaseEndDate },
  { label: "Analysis Status", value: (lease) => lease.analysisStatus },
  { label: "Lifecycle Status", value: (lease) => lease.lifecycleStatus },
  { label: "Monthly Rent", value: (lease) => String(lease.monthlyRent) },
  { label: "Currency", value: (lease) => lease.currency },
];

const escapeCsv = (value: string) => `"${value.replaceAll('"', '""')}"`;

export function exportLeasesCsv(records: LeaseRecord[], filename = "leaselens-leases.csv") {
  const rows = [columns.map((column) => escapeCsv(column.label)).join(","), ...records.map((record) => columns.map((column) => escapeCsv(column.value(record))).join(","))];
  const blob = new Blob(["\uFEFF", rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}
