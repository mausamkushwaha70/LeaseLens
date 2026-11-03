export const dashboardStats = [
  { label: "Total leases", value: "128", change: "+12.8%", note: "vs. last quarter", icon: "files", tone: "lime" },
  { label: "Analyzed leases", value: "96", change: "+8.4%", note: "vs. last quarter", icon: "scan", tone: "blue" },
  { label: "Processing", value: "08", change: "3 in queue", note: "Typically under 2 min", icon: "clock", tone: "amber" },
  { label: "Expiring soon", value: "12", change: "Next 90 days", note: "4 need attention", icon: "calendar", tone: "rose" },
] as const;

export const recentActivity = [
  { name: "Riverside Plaza — Suite 410.pdf", tenant: "Northstar Wellness", property: "Riverside Plaza", date: "Oct 28, 2026", status: "Completed" },
  { name: "Market Street Retail Lease.pdf", tenant: "Juniper & Co.", property: "Market Street Center", date: "Oct 27, 2026", status: "Processing" },
  { name: "Westlake Office — Renewal.pdf", tenant: "Alder Financial Group", property: "Westlake Tower", date: "Oct 26, 2026", status: "Needs review" },
] as const;

export const upcomingDeadlines = [
  { title: "Renewal notice deadline", property: "Westlake Tower · Suite 820", date: "Nov 14, 2026", days: "11 days", tone: "amber" },
  { title: "Rent escalation", property: "Riverside Plaza · Suite 410", date: "Nov 21, 2026", days: "18 days", tone: "lime" },
  { title: "Lease expiration", property: "Pinecrest Commons · Unit 12", date: "Dec 03, 2026", days: "30 days", tone: "rose" },
] as const;
