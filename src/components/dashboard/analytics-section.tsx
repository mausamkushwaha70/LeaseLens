import { ExpirationChart } from "@/components/dashboard/expiration-chart";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import type { ExpirationMonth, PortfolioSegment } from "@/types/dashboard.types";

export function AnalyticsSection({ portfolio, expirations }: { portfolio: PortfolioSegment[]; expirations: ExpirationMonth[] }) {
  return <section aria-label="Portfolio analytics" className="grid gap-4 xl:grid-cols-[0.92fr_1.38fr]"><PortfolioChart data={portfolio} /><ExpirationChart data={expirations} /></section>;
}
