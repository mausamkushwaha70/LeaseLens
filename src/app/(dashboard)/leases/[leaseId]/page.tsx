import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnalysisStatusCard } from "@/components/leases/analysis-status-card";
import { DocumentInformation } from "@/components/leases/document-information";
import { LeaseDetailsHeader } from "@/components/leases/lease-details-header";
import { LeaseFinancialInfo } from "@/components/leases/lease-financial-info";
import { LeaseInformation } from "@/components/leases/lease-information";
import { LeaseOverview } from "@/components/leases/lease-overview";
import { findMockLease } from "@/mock/leases.data";

export const metadata: Metadata = { title: "Lease Details" };
type LeaseDetailsPageProps = { params: Promise<{ leaseId: string }> };

export default async function LeaseDetailsPage({ params }: LeaseDetailsPageProps) {
  const { leaseId } = await params;
  const lease = findMockLease(leaseId);
  if (!lease) notFound();
  return <div className="space-y-5 sm:space-y-6"><LeaseDetailsHeader lease={lease} /><LeaseOverview lease={lease} /><div className="grid items-start gap-4 xl:grid-cols-[1.1fr_0.9fr]"><div className="space-y-4"><LeaseInformation lease={lease} /><LeaseFinancialInfo lease={lease} /><DocumentInformation lease={lease} /></div><AnalysisStatusCard lease={lease} /></div><p className="text-center text-[9px] text-slate-400">Lease details are mock data for this frontend preview; verify all terms against the source agreement.</p></div>;
}