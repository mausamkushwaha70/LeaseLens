import type { DashboardStatistic, ExpirationMonth, LeaseActivityRecord, PortfolioSegment, UpcomingDeadlineRecord } from "@/types/dashboard.types";

export const dashboardStatistics: DashboardStatistic[] = [
  { label: "Total Leases", value: "128", description: "Total documents in your portfolio", icon: "files", change: "+12.8% this quarter" },
  { label: "Analyzed Leases", value: "96", description: "Successfully analyzed documents", icon: "analyzed", change: "+8.4% this quarter" },
  { label: "Processing", value: "08", description: "Documents currently being analyzed", icon: "processing" },
  { label: "Expiring Soon", value: "12", description: "Leases expiring within 90 days", icon: "expiring" },
];

export const portfolioSegments: PortfolioSegment[] = [
  { name: "Active Leases", value: 82, color: "#A3E635" },
  { name: "Expired Leases", value: 18, color: "#CBD5E1" },
  { name: "Pending Review", value: 16, color: "#FBBF24" },
  { name: "Processing", value: 12, color: "#93C5FD" },
];

export const expirationTimeline: ExpirationMonth[] = [
  { month: "Jan", expirations: 4 }, { month: "Feb", expirations: 7 },
  { month: "Mar", expirations: 5 }, { month: "Apr", expirations: 9 },
  { month: "May", expirations: 6 }, { month: "Jun", expirations: 12 },
  { month: "Jul", expirations: 8 }, { month: "Aug", expirations: 5 },
  { month: "Sep", expirations: 10 }, { month: "Oct", expirations: 7 },
  { month: "Nov", expirations: 11 }, { month: "Dec", expirations: 6 },
];

export const leaseActivity: LeaseActivityRecord[] = [
  { id: "riverside-410", documentName: "Office Lease Agreement.pdf", tenant: "Northstar Wellness", property: "Riverside Plaza · Suite 410", uploadDate: "2026-11-03", status: "Completed" },
  { id: "market-retail", documentName: "Retail Space Lease.pdf", tenant: "Juniper & Co.", property: "Market Street Center", uploadDate: "2026-11-02", status: "Processing" },
  { id: "westlake-820", documentName: "Commercial Building Agreement.pdf", tenant: "Alder Financial Group", property: "Westlake Tower · Suite 820", uploadDate: "2026-10-30", status: "Needs Review" },
  { id: "pinecrest-12", documentName: "Shopping Mall Lease.pdf", tenant: "Pine & Peak Outfitters", property: "Pinecrest Commons · Unit 12", uploadDate: "2026-10-28", status: "Completed" },
  { id: "harbor-205", documentName: "Warehouse Rental Agreement.pdf", tenant: "Bluewater Analytics", property: "Harbor Point · Suite 205", uploadDate: "2026-10-25", status: "Failed" },
  { id: "oak-commons", documentName: "Corporate Office Lease.pdf", tenant: "Everyday Dental", property: "Oak Commons", uploadDate: "2026-10-22", status: "Needs Review" },
  { id: "cedar-park", documentName: "Cedar Park Retail Lease.pdf", tenant: "Fieldwork Supply Co.", property: "Cedar Park Shops", uploadDate: "2026-09-18", status: "Completed" },
  { id: "union-square-300", documentName: "Union Square Office Lease.pdf", tenant: "Meridian Legal Partners", property: "Union Square · Floor 3", uploadDate: "2026-09-04", status: "Processing" },
];

export const upcomingDeadlines: UpcomingDeadlineRecord[] = [
  { id: "pinecrest-12", leaseName: "Pinecrest Commons · Unit 12", tenant: "Pine & Peak Outfitters", deadlineType: "Lease expiration", deadlineDate: "2026-11-07", remainingDays: 4, priority: "Urgent" },
  { id: "westlake-820", leaseName: "Westlake Tower · Suite 820", tenant: "Alder Financial Group", deadlineType: "Renewal notice deadline", deadlineDate: "2026-11-15", remainingDays: 12, priority: "Approaching" },
  { id: "riverside-410", leaseName: "Riverside Plaza · Suite 410", tenant: "Northstar Wellness", deadlineType: "Rent escalation date", deadlineDate: "2026-11-28", remainingDays: 25, priority: "Approaching" },
  { id: "oak-commons", leaseName: "Oak Commons", tenant: "Everyday Dental", deadlineType: "Termination notice deadline", deadlineDate: "2026-12-12", remainingDays: 39, priority: "Upcoming" },
  { id: "harbor-205", leaseName: "Harbor Point · Suite 205", tenant: "Bluewater Analytics", deadlineType: "Renewal option opens", deadlineDate: "2026-12-25", remainingDays: 52, priority: "Upcoming" },
];
