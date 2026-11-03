import Link from "next/link";
import { ArrowUpRight, CalendarClock, CircleAlert } from "lucide-react";
import { leases } from "@/mock/leases";

const attention = [
  { leaseId: "pinecrest-12", event: "Lease expiration", date: "Dec 3, 2026", days: 30, tone: "rose" },
  { leaseId: "oak-commons", event: "Renewal decision", date: "Feb 28, 2027", days: 117, tone: "amber" },
  { leaseId: "westlake-820", event: "Lease expiration", date: "Dec 31, 2027", days: 423, tone: "lime" },
];
const tones: Record<string, string> = { rose: "bg-rose-50 text-rose-700", amber: "bg-amber-50 text-amber-800", lime: "bg-lime-50 text-lime-800" };

export default function ExpiringLeasesPage() {
  return <div className="space-y-6">
    <section><div className="mb-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-900">Dates & obligations</div><h2 className="text-[26px] font-semibold tracking-[-0.045em] text-slate-950 sm:text-[30px]">Expiring leases</h2><p className="mt-1.5 text-sm text-slate-500">Keep upcoming expiration and renewal dates in view.</p></section>
    <section className="grid gap-3 sm:grid-cols-3">{[{ label: "Next 30 days", value: "1", note: "Needs attention" }, { label: "Next 90 days", value: "1", note: "Upcoming milestone" }, { label: "Tracked dates", value: "3", note: "Illustrative sample" }].map((card) => <article key={card.label} className="rounded-2xl border border-slate-200/80 bg-white p-5"><p className="text-xs text-slate-500">{card.label}</p><p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{card.value}</p><p className="mt-2 text-[10px] text-slate-400">{card.note}</p></article>)}</section>
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white"><div className="border-b border-slate-100 px-5 py-4"><h3 className="text-sm font-semibold text-slate-900">Upcoming portfolio dates</h3><p className="mt-1 text-[11px] text-slate-500">Dates shown are mock data for this product preview.</p></div><div className="divide-y divide-slate-100">{attention.map((item) => { const lease = leases.find((entry) => entry.id === item.leaseId); if (!lease) return null; return <div key={item.leaseId} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tones[item.tone]}`}><CalendarClock size={17} /></span><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-slate-800">{item.event}</p><p className="mt-1 text-[11px] text-slate-500">{lease.tenant} Â· {lease.property}</p></div><div className="sm:w-32"><p className="text-xs font-semibold text-slate-800">{item.date}</p><p className="mt-1 text-[10px] text-slate-500">{item.days} days away</p></div><span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600"><CircleAlert size={12} /> Review date</span><Link href={`/leases/${lease.id}/analysis`} aria-label={`Review ${lease.name}`} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"><ArrowUpRight size={15} /></Link></div>; })}</div></section>
  </div>;
}
