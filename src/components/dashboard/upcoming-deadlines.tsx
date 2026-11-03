import Link from "next/link";
import { ArrowUpRight, CalendarClock, Clock3 } from "lucide-react";
import type { DeadlinePriority, UpcomingDeadlineRecord } from "@/types/dashboard.types";

const priorityStyles: Record<DeadlinePriority, string> = {
  Urgent: "bg-rose-50 text-rose-700 ring-rose-600/10",
  Approaching: "bg-amber-50 text-amber-800 ring-amber-600/10",
  Upcoming: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
};
const markerStyles: Record<DeadlinePriority, string> = { Urgent: "bg-rose-500", Approaching: "bg-amber-400", Upcoming: "bg-emerald-500" };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function UpcomingDeadlines({ deadlines }: { deadlines: UpcomingDeadlineRecord[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5"><div><h3 className="text-sm font-semibold text-slate-900">Upcoming Deadlines</h3><p className="mt-1 text-[11px] text-slate-500">Important dates across your leases</p></div><CalendarClock size={17} className="text-slate-400" /></div>
      <ul className="divide-y divide-slate-100">{deadlines.map((deadline) => <li key={`${deadline.id}-${deadline.deadlineType}`} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5"><span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${markerStyles[deadline.priority]}`} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="truncate text-xs font-semibold text-slate-800">{deadline.leaseName}</p><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ring-1 ring-inset ${priorityStyles[deadline.priority]}`}>{deadline.priority}</span></div><p className="mt-1 truncate text-[10px] text-slate-500">{deadline.tenant}</p></div><div className="grid grid-cols-2 gap-3 sm:w-[310px] sm:grid-cols-[1.4fr_1fr] sm:items-center"><div><p className="text-[10px] font-medium text-slate-700">{deadline.deadlineType}</p><p className="mt-1 text-[9px] text-slate-400">{formatDate(deadline.deadlineDate)}</p></div><span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600"><Clock3 size={12} className="text-slate-400" />{deadline.remainingDays} days</span></div><Link href={`/leases/${deadline.id}/analysis`} aria-label={`Review ${deadline.leaseName}`} className="hidden h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 sm:grid"><ArrowUpRight size={15} /></Link></li>)}</ul>
      <Link href="/expiring-leases" className="inline-flex items-center gap-1 border-t border-slate-100 px-4 py-3 text-[10px] font-semibold text-slate-700 hover:text-slate-950 sm:px-5">View all deadlines <ArrowUpRight size={13} /></Link>
    </section>
  );
}
