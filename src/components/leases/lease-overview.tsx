import { Banknote, CalendarDays, Coins, Wallet } from "lucide-react";
import type { LeaseRecord } from "@/types/lease.types";
import { formatLeaseCurrency, formatLeaseDuration } from "@/utils/lease-format";

export function LeaseOverview({ lease }: { lease: LeaseRecord }) {
  const items = [
    { label: "Monthly Base Rent", value: formatLeaseCurrency(lease.monthlyRent, lease.currency), note: `${lease.paymentFrequency} payment frequency`, icon: Banknote, tone: "bg-lime-100 text-lime-800" },
    { label: "Annual Base Rent", value: formatLeaseCurrency(lease.monthlyRent * 12, lease.currency), note: "Based on current base rent", icon: Coins, tone: "bg-emerald-50 text-emerald-700" },
    { label: "Lease Duration", value: formatLeaseDuration(lease.leaseStartDate, lease.leaseEndDate), note: `${formatLeaseDateShort(lease.leaseStartDate)} – ${formatLeaseDateShort(lease.leaseEndDate)}`, icon: CalendarDays, tone: "bg-blue-50 text-blue-700" },
    { label: "Security Deposit", value: formatLeaseCurrency(lease.securityDeposit, lease.currency), note: "Illustrative lease value", icon: Wallet, tone: "bg-amber-50 text-amber-800" },
  ];
  return <section aria-label="Lease financial summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{items.map(({ label, value, note, icon: Icon, tone }) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4"><span className={`grid h-8 w-8 place-items-center rounded-lg ${tone}`}><Icon size={15} /></span><p className="mt-3 text-[10px] font-medium text-slate-500">{label}</p><p className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-900">{value}</p><p className="mt-1.5 text-[9px] text-slate-400">{note}</p></article>)}</section>;
}
function formatLeaseDateShort(date: string) { return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)); }
