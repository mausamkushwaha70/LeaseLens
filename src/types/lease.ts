export type LeaseProcessingStatus = "completed" | "processing" | "failed" | "needs_review";

export interface LeaseSummary {
  id: string;
  documentName: string;
  tenantName: string;
  propertyName: string;
  leaseStartDate: string | null;
  leaseEndDate: string | null;
  status: LeaseProcessingStatus;
  updatedAt: string;
}
