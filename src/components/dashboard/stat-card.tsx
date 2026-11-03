import { ArrowUpRight, CalendarClock, FileCheck2, Files, LoaderCircle, type LucideIcon } from "lucide-react";
import type { DashboardStatistic } from "@/types/dashboard.types";

const icons: Record<DashboardStatistic["icon"], LucideIcon> = {
  files: Files,
  analyzed: FileCheck2,
  processing: LoaderCircle,
  expiring: CalendarClock,
};
const iconTones: Record<DashboardStatistic["icon"], string> = {
  files: "bg-lime-100 text-lime-800",
  analyzed: "bg-emerald-50 text-emerald-700",
  processing: "bg-blue-50 text-blue-700",
  expiring: "bg-amber-50 text-amber-800",
};

export function StatCard({ stat }: { stat: DashboardStatistic }) {
  const Icon = icons[stat.icon];
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">{stat.label}</p>
          <p className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.055em] text-slate-900">{stat.value}</p>
        </div>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${iconTones[stat.icon]}`}><Icon size={17} strokeWidth={1.8} aria-hidden /></span>
      </div>
      <p className="mt-3 text-[10px] leading-4 text-slate-500">{stat.description}</p>
      {stat.change && <p className="mt-2 inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700"><ArrowUpRight size={12} />{stat.change}</p>}
    </article>
  );
}
