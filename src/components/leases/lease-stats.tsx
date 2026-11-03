import { AlertTriangle, Building2, CalendarClock, Files } from "lucide-react";
const stats = [
  { label: "Total Leases", value: "128", note: "Across your portfolio", icon: Files, tone: "bg-lime-100 text-lime-800" },
  { label: "Active Leases", value: "82", note: "Currently in term", icon: Building2, tone: "bg-emerald-50 text-emerald-700" },
  { label: "Needs Review", value: "16", note: "Require human attention", icon: AlertTriangle, tone: "bg-amber-50 text-amber-800" },
  { label: "Expiring Soon", value: "12", note: "Within the next 90 days", icon: CalendarClock, tone: "bg-blue-50 text-blue-700" },
];
export function LeaseStats() {
  return <section aria-label="Lease portfolio summary" className="grid grid-cols-2 gap-3 xl:grid-cols-4">{stats.map(({ label, value, note, icon: Icon, tone }) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">{value}</p></div><span className={`grid h-8 w-8 place-items-center rounded-lg ${tone}`}><Icon size={15} /></span></div><p className="mt-2 text-[9px] text-slate-400">{note}</p></article>)}</section>;
}
