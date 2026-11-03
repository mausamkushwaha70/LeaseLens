import { leaseRecords } from "@/mock/leases.data";

/** Compatibility shape for the existing analysis, reports, and deadlines screens. */
export type LeaseStatus = "Completed" | "Processing" | "Needs review" | "Failed";
export type Lease = { id: string; name: string; tenant: string; property: string; type: string; uploaded: string; status: LeaseStatus; expires: string; rent: string };
const formatDate = (value: string) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
const statusLabel = { completed: "Completed", processing: "Processing", needs_review: "Needs review", failed: "Failed" } as const;
export const leases: Lease[] = leaseRecords.map((lease) => ({
  id: lease.id,
  name: lease.documentName,
  tenant: lease.tenantName,
  property: lease.propertyName,
  type: lease.propertyType,
  uploaded: formatDate(lease.uploadDate),
  status: statusLabel[lease.analysisStatus],
  expires: formatDate(lease.leaseEndDate),
  rent: new Intl.NumberFormat("en-US", { style: "currency", currency: lease.currency, maximumFractionDigits: 0 }).format(lease.monthlyRent) + " / mo",
}));
