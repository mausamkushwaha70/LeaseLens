"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { PortfolioSegment } from "@/types/dashboard.types";

const tooltipStyle = { border: "1px solid #E5E7EB", borderRadius: "12px", fontSize: "11px", boxShadow: "0 8px 24px rgba(15,23,42,.08)" };

export function PortfolioChart({ data }: { data: PortfolioSegment[] }) {
  const total = data.reduce((sum, segment) => sum + segment.value, 0);
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div><h3 className="text-sm font-semibold text-slate-900">Lease Portfolio Overview</h3><p className="mt-1 text-[11px] text-slate-500">Current status across your portfolio</p></div>
      <div className="mt-4 grid items-center gap-3 sm:grid-cols-[minmax(150px,0.9fr)_1.1fr]">
        <div className="relative mx-auto h-[190px] w-full max-w-[230px]" role="img" aria-label={`Portfolio status donut chart showing ${total} leases`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius="66%" outerRadius="91%" paddingAngle={3} stroke="#ffffff" strokeWidth={3}>
                {data.map((segment) => <Cell key={segment.name} fill={segment.color} />)}
              </Pie>
              <Tooltip formatter={(value) => [`${value} leases`, "Count"]} contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-[28px] font-semibold tracking-[-0.06em] text-slate-900">{total}</span><span className="text-[9px] text-slate-500">Total leases</span></div>
        </div>
        <ul className="space-y-3" aria-label="Chart legend">{data.map((segment) => <li key={segment.name} className="flex items-center justify-between gap-3"><span className="flex min-w-0 items-center gap-2 text-[11px] text-slate-600"><span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ backgroundColor: segment.color }} />{segment.name}</span><span className="shrink-0 text-xs font-semibold tabular-nums text-slate-900">{segment.value}</span></li>)}</ul>
      </div>
      <p className="mt-2 text-[9px] text-slate-400">Illustrative portfolio distribution</p>
    </article>
  );
}
