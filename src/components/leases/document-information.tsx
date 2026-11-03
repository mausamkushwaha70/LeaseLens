import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import type { LeaseRecord } from "@/types/lease.types";
import { formatFileSize, formatLeaseDate } from "@/utils/lease-format";

export function DocumentInformation({ lease }: { lease: LeaseRecord }) {
  const items = [["Original filename", lease.documentName], ["File size", formatFileSize(lease.fileSizeBytes)], ["Upload date", formatLeaseDate(lease.uploadDate)], ["Document type", "PDF agreement"], ["Number of pages", String(lease.pageCount)], ["Uploaded by", lease.uploadedBy]];
  return <section className="rounded-2xl border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-600"><FileText size={14} /></span><div><h2 className="text-xs font-semibold text-slate-900">Document Information</h2><p className="mt-0.5 text-[9px] text-slate-500">File details for this workspace sample</p></div></div><Link href={`/leases/${lease.id}/document`} className="inline-flex items-center gap-1 text-[9px] font-semibold text-slate-600 hover:text-slate-950">View Document <ArrowUpRight size={12} /></Link></div><dl className="grid gap-x-8 sm:grid-cols-2">{items.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:px-5"><dt className="text-[10px] text-slate-500">{label}</dt><dd className="max-w-[65%] truncate text-right text-[10px] font-medium text-slate-800">{value || "Not available"}</dd></div>)}</dl></section>;
}
