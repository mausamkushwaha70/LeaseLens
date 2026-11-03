import type { AnalysisStatus, LifecycleStatus } from "@/types/lease.types";

type Props = { status: AnalysisStatus | LifecycleStatus; kind?: "analysis" | "lifecycle"; compact?: boolean };
const analysisStyles: Record<AnalysisStatus, string> = {
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  processing: "bg-blue-50 text-blue-700 ring-blue-600/10",
  needs_review: "bg-amber-50 text-amber-800 ring-amber-600/10",
  failed: "bg-rose-50 text-rose-700 ring-rose-600/10",
};
const lifecycleStyles: Record<LifecycleStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  expired: "bg-slate-100 text-slate-600 ring-slate-500/10",
  upcoming: "bg-blue-50 text-blue-700 ring-blue-600/10",
};
const labels: Record<AnalysisStatus | LifecycleStatus, string> = { completed: "Completed", processing: "Processing", needs_review: "Needs Review", failed: "Failed", active: "Active", expired: "Expired", upcoming: "Upcoming" };

export function LeaseStatusBadge({ status, kind = "analysis", compact = false }: Props) {
  const style = kind === "lifecycle" ? lifecycleStyles[status as LifecycleStatus] : analysisStyles[status as AnalysisStatus];
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-semibold ring-1 ring-inset ${style} ${compact ? "px-1.5" : ""}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{labels[status]}</span>;
}
