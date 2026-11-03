import { StatCard } from "@/components/dashboard/stat-card";
import type { DashboardStatistic } from "@/types/dashboard.types";

export function StatsGrid({ statistics }: { statistics: DashboardStatistic[] }) {
  return <section aria-label="Lease portfolio statistics" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{statistics.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>;
}
