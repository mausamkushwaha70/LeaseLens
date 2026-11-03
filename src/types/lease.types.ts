export type AnalysisStatus = "completed" | "processing" | "needs_review" | "failed";
export type LifecycleStatus = "active" | "expired" | "upcoming";
export type PropertyType = "Office" | "Retail" | "Warehouse" | "Industrial" | "Other";
export type LeaseStatusFilter = "all" | AnalysisStatus | "active" | "expired";
export type ExpirationFilter = "all" | "30d" | "60d" | "90d" | "expired" | "custom";
export type LeaseSortOption = "recent" | "oldest" | "expiration" | "tenant" | "property";

export interface LeaseRecord {
  id: string;
  documentName: string;
  tenantName: string;
  landlordName: string;
  propertyName: string;
  propertyAddress: string;
  propertyType: PropertyType;
  leaseStartDate: string;
  leaseEndDate: string;
  uploadDate: string;
  lastUpdated: string;
  analysisStatus: AnalysisStatus;
  lifecycleStatus: LifecycleStatus;
  monthlyRent: number;
  currency: string;
  securityDeposit: number;
  camCharges: number;
  escalationPercentage: number;
  analysisProgress: number;
  clausesExtracted: number;
  fieldsNeedingReview: number;
  lastAnalyzedAt: string | null;
  pageCount: number;
  fileSizeBytes: number;
  uploadedBy: string;
  paymentFrequency: "Monthly" | "Quarterly";
}

export interface LeaseFilters {
  search: string;
  status: LeaseStatusFilter;
  expiration: ExpirationFilter;
  propertyType: "all" | PropertyType;
  sort: LeaseSortOption;
  customStartDate: string;
  customEndDate: string;
}
