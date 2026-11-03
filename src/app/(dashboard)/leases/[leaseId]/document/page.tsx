import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentPreview } from "@/components/leases/document-preview";
import { findMockLease } from "@/mock/leases.data";

export const metadata: Metadata = { title: "Document Viewer" };
type DocumentPageProps = { params: Promise<{ leaseId: string }> };
export default async function LeaseDocumentPage({ params }: DocumentPageProps) {
  const { leaseId } = await params;
  const lease = findMockLease(leaseId);
  if (!lease) notFound();
  return <DocumentPreview lease={lease} />;
}