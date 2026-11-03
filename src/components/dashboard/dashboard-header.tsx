"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarRange, ChevronDown, FileUp } from "lucide-react";
import type { DashboardRange } from "@/types/dashboard.types";

const ranges: { value: DashboardRange; label: string }[] = [
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "year", label: "This year" },
  { value: "all", label: "All time" },
];

export function DashboardHeader({ range }: { range: DashboardRange }) {
  const router = useRouter();
  const pathname = usePathname();
  const changeRange = (nextRange: DashboardRange) => {
    const query = nextRange === "90d" ? "" : `?range=${nextRange}`;
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  return (
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-lime-800">Portfolio overview</p>
        <h2 className="text-[26px] font-semibold tracking-[-0.045em] text-slate-950 sm:text-[30px]">Overview</h2>
        <p className="mt-1.5 max-w-xl text-sm text-slate-500">Monitor your lease portfolio and stay on top of important contractual obligations.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="relative inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white pl-3 text-[11px] text-slate-500 focus-within:border-lime-500 focus-within:ring-4 focus-within:ring-lime-100/70">
          <CalendarRange size={15} className="text-slate-400" />
          <span className="sr-only">Date range</span>
          <select value={range} onChange={(event) => changeRange(event.target.value as DashboardRange)} className="h-full appearance-none bg-transparent pr-8 font-medium text-slate-700 outline-none">
            {ranges.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 text-slate-400" />
        </label>
        <Link href="/leases/upload" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white transition hover:bg-slate-700"><FileUp size={15} /> Upload New Lease</Link>
      </div>
    </section>
  );
}
