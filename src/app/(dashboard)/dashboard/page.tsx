import type { Metadata } from "next";
import { AnalyticsSection } from "@/components/dashboard/analytics-section";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivityTable } from "@/components/dashboard/recent-activity-table";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import { dashboardStatistics, expirationTimeline, leaseActivity, portfolioSegments, upcomingDeadlines } from "@/mock/dashboard.data";
import type { DashboardRange } from "@/types/dashboard.types";

export const metadata: Metadata = { title: "Overview" };
type DashboardPageProps = { searchParams: Promise<{ range?: string | string[] }> };
const validRanges: DashboardRange[] = ["30d", "90d", "year", "all"];

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const requestedRange = Array.isArray(params.range) ? params.range[0] : params.range;
  const range: DashboardRange = validRanges.includes(requestedRange as DashboardRange) ? requestedRange as DashboardRange : "90d";
  const now = new Date();
  const cutoff = new Date(now);
  if (range === "30d") cutoff.setDate(cutoff.getDate() - 30);
  else if (range === "90d") cutoff.setDate(cutoff.getDate() - 90);
  else if (range === "year") cutoff.setMonth(0, 1);
  else cutoff.setFullYear(1970);
  const filteredActivity = leaseActivity.filter((record) => new Date(`${record.uploadDate}T00:00:00`) >= cutoff);

  return (
    <div className="space-y-6 sm:space-y-7">
      <DashboardHeader range={range} />
      <StatsGrid statistics={dashboardStatistics} />
      <AnalyticsSection portfolio={portfolioSegments} expirations={expirationTimeline} />
      <RecentActivityTable records={filteredActivity} />
      <UpcomingDeadlines deadlines={upcomingDeadlines} />
      <QuickActions />
      <p className="text-center text-[9px] text-slate-400">Demo workspace · Dashboard figures and chart data are illustrative sample data.</p>
    </div>
  );
}
