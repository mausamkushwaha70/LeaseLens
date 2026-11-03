export type LeaseActivityStatus = "Completed" | "Processing" | "Needs Review" | "Failed";
export type DeadlinePriority = "Urgent" | "Approaching" | "Upcoming";
export type DashboardRange = "30d" | "90d" | "year" | "all";

export interface DashboardStatistic {
  label: string;
  value: string;
  description: string;
  icon: "files" | "analyzed" | "processing" | "expiring";
  change?: string;
}

export interface LeaseActivityRecord {
  id: string;
  documentName: string;
  tenant: string;
  property: string;
  uploadDate: string;
  status: LeaseActivityStatus;
}

export interface PortfolioSegment {
  name: string;
  value: number;
  color: string;
}

export interface ExpirationMonth {
  month: string;
  expirations: number;
}

export interface UpcomingDeadlineRecord {
  id: string;
  leaseName: string;
  tenant: string;
  deadlineType: string;
  deadlineDate: string;
  remainingDays: number;
  priority: DeadlinePriority;
}
