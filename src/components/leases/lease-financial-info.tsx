import { Banknote, CircleDollarSign } from "lucide-react";
import type { LeaseRecord } from "@/types/lease.types";
import { formatLeaseCurrency } from "@/utils/lease-format";

export function LeaseFinancialInfo({ lease }: { lease: LeaseRecord }) {
  const fields = [
    ["Monthly base rent", formatLeaseCurrency(lease.monthlyRent, lease.currency)], ["Annual base rent", formatLeaseCurrency(lease.monthlyRent * 12, lease.currency)], ["Rent escalation", `${lease.escalationPercentage.toFixed(2).replace(/\.00$/, "")}% annually`], ["CAM charges", formatLeaseCurrency(lease.camCharges, lease.currency)], ["Security deposit", formatLeaseCurrency(lease.securityDeposit, lease.currency)], ["Payment frequency", lease.paymentFrequency],
  ];
  return <section className="rounded-2xl border border-slate-200 bg-white"><div className="border-b border-slate-100 px-4 py-4 sm:px-5"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-lime-50 text-lime-800"><CircleDollarSign size={14} /></span><div><h2 className="text-xs font-semibold text-slate-900">Financial Information</h2><p className="mt-0.5 text-[9px] text-slate-500">Illustrative values for preview only</p></div></div></div><dl>{fields.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:px-5"><dt className="flex items-center gap-2 text-[10px] text-slate-500">{label === "Monthly base rent" && <Banknote size={12} className="text-slate-400" />}{label}</dt><dd className="text-right text-[10px] font-semibold text-slate-800">{value}</dd></div>)}</dl></section>;
}
