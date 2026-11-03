import { MapPin } from "lucide-react";
import type { LeaseRecord } from "@/types/lease.types";
import { formatLeaseDate, formatLeaseDuration } from "@/utils/lease-format";

export function LeaseInformation({ lease }: { lease: LeaseRecord }) {
  const fields = [
    ["Landlord", lease.landlordName], ["Tenant", lease.tenantName], ["Property", lease.propertyName], ["Property address", lease.propertyAddress], ["Property type", lease.propertyType], ["Lease start", formatLeaseDate(lease.leaseStartDate)], ["Lease end", formatLeaseDate(lease.leaseEndDate)], ["Lease duration", formatLeaseDuration(lease.leaseStartDate, lease.leaseEndDate)], ["Currency", lease.currency],
  ];
  return <section className="rounded-2xl border border-slate-200 bg-white"><div className="border-b border-slate-100 px-4 py-4 sm:px-5"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-600"><MapPin size={14} /></span><div><h2 className="text-xs font-semibold text-slate-900">Lease Information</h2><p className="mt-0.5 text-[9px] text-slate-500">Sample metadata for this agreement</p></div></div></div><dl className="grid gap-x-8 sm:grid-cols-2">{fields.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:px-5"><dt className="text-[10px] text-slate-500">{label}</dt><dd className="max-w-[65%] text-right text-[10px] font-medium text-slate-800">{value || "Not available"}</dd></div>)}</dl></section>;
}
