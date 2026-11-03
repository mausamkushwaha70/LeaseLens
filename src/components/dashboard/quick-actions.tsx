import Link from "next/link";
import { ArrowRight, BarChart3, FileUp, Files, ScanSearch } from "lucide-react";

const actions = [
  { label: "Upload New Lease", description: "Add a document to your portfolio", href: "/leases/upload", icon: FileUp },
  { label: "View All Leases", description: "Search your lease library", href: "/leases", icon: Files },
  { label: "Review Pending Analysis", description: "Open a lease that needs review", href: "/leases/westlake-820/analysis", icon: ScanSearch },
  { label: "Generate Report", description: "Explore portfolio reporting", href: "/reports", icon: BarChart3 },
];

export function QuickActions() {
  return <section aria-label="Quick actions"><div className="mb-3 flex items-end justify-between gap-3"><div><h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3><p className="mt-1 text-[11px] text-slate-500">Common portfolio tasks</p></div><ArrowRight size={15} className="mb-0.5 text-slate-400" /></div><div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">{actions.map(({ label, description, href, icon: Icon }) => <Link key={label} href={href} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-lime-300 hover:bg-lime-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-lime-100 group-hover:text-lime-900"><Icon size={16} /></span><span className="min-w-0 flex-1"><span className="block truncate text-[11px] font-semibold text-slate-800">{label}</span><span className="mt-1 block truncate text-[9px] text-slate-500">{description}</span></span><ArrowRight size={13} className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-600" /></Link>)}</div></section>;
}
