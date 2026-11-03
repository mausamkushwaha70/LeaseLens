"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ExpirationMonth } from "@/types/dashboard.types";

const tooltipStyle = { border: "1px solid #E5E7EB", borderRadius: "12px", fontSize: "11px", boxShadow: "0 8px 24px rgba(15,23,42,.08)" };

export function ExpirationChart({ data }: { data: ExpirationMonth[] }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold text-slate-900">Lease Expiration Timeline</h3><p className="mt-1 text-[11px] text-slate-500">Upcoming expirations by month</p></div><span className="rounded-lg bg-lime-50 px-2 py-1 text-[9px] font-medium text-lime-900">2026</span></div>
      <div className="mt-4 h-[208px] w-full" role="img" aria-label="Bar chart showing lease expirations from January through December">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 2, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 9 }} tickMargin={9} interval={0} />
            <YAxis allowDecimals={false} domain={[0, 14]} axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 9 }} width={30} />
            <Tooltip formatter={(value) => [`${value} leases`, "Expiring"]} contentStyle={tooltipStyle} cursor={{ fill: "#F8FAFC" }} />
            <Bar dataKey="expirations" name="Expiring leases" fill="#A3E635" radius={[5, 5, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-[9px] text-slate-400">Illustrative sample expiration counts</p>
    </article>
  );
}
