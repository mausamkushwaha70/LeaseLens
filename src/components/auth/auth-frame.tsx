import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CalendarClock, FileSearch, FileText, ShieldCheck } from "lucide-react";

type AuthFrameProps = { eyebrow: string; title: string; description: string; children: ReactNode };

export function AuthFrame({ eyebrow, title, description, children }: AuthFrameProps) {
  return (
    <main className="min-h-screen bg-[#f8faf7] lg:grid lg:grid-cols-[minmax(410px,0.95fr)_1.05fr]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#111827] px-10 py-9 text-white lg:flex lg:flex-col xl:px-14">
        <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-2.5" aria-label="LeaseLens home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime-300 text-slate-900"><FileSearch size={19} /></span>
          <span className="text-lg font-semibold tracking-[-0.05em]">Lease<span className="text-lime-300">Lens</span></span>
        </Link>
        <div className="relative z-10 my-auto max-w-[500px] pb-8 pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-lime-200"><span className="h-1.5 w-1.5 rounded-full bg-lime-300" /> Lease intelligence, made clear</span>
          <h1 className="mt-6 text-[42px] font-semibold leading-[1.08] tracking-[-0.06em] xl:text-[50px]">The details that matter, <span className="text-lime-300">in view.</span></h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">A calmer way to organize lease terms, important dates, and the source language behind them.</p>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-xl shadow-black/10">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3"><div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-lg bg-lime-300/15 text-lime-300"><FileText size={16} /></span><div><p className="text-[11px] font-semibold">Riverside Plaza — Suite 410</p><p className="mt-1 text-[9px] text-slate-400">Illustrative sample lease</p></div></div><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-medium text-emerald-300">Reviewed</span></div>
            <div className="grid grid-cols-2 gap-3 py-4"><div className="rounded-xl border border-white/[0.06] bg-black/10 p-3"><p className="text-[9px] text-slate-400">Monthly base rent</p><p className="mt-1.5 text-lg font-semibold tracking-tight">$42,500</p><p className="mt-1 text-[9px] text-slate-500">Source-linked term</p></div><div className="rounded-xl border border-white/[0.06] bg-black/10 p-3"><p className="text-[9px] text-slate-400">Next key date</p><div className="mt-2 flex items-center gap-1.5 text-xs font-semibold"><CalendarClock size={13} className="text-lime-300" /> Nov 14, 2026</div><p className="mt-1 text-[9px] text-slate-500">Renewal notice deadline</p></div></div>
            <div className="flex items-start gap-2.5 rounded-xl bg-lime-300/[0.08] p-3"><ShieldCheck size={14} className="mt-0.5 shrink-0 text-lime-300" /><p className="text-[9px] leading-relaxed text-slate-300">Keep extracted details beside the document language and page reference for review.</p></div>
          </div>
          <Link href="/dashboard" className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 transition hover:text-white">Preview the sample workspace <ArrowRight size={13} /></Link>
        </div>
        <p className="relative z-10 text-[10px] text-slate-500">LeaseLens <span className="mx-1.5 text-slate-700">·</span> Every Lease. Clearly Understood.</p>
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-28 h-80 w-80 rounded-full border border-white/[0.045]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-14 -right-18 h-64 w-64 rounded-full border border-lime-300/[0.08]" />
      </aside>
      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between lg:justify-end"><Link href="/" className="inline-flex items-center gap-2 lg:hidden"><span className="grid h-8 w-8 place-items-center rounded-lg bg-lime-300 text-slate-900"><FileSearch size={17} /></span><span className="text-sm font-semibold tracking-tight">Lease<span className="text-lime-700">Lens</span></span></Link><p className="text-[10px] text-slate-400">Secure workspace access</p></div>
        <div className="mx-auto my-auto w-full max-w-[430px] py-12"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-lime-700">{eyebrow}</p><h2 className="mt-3 text-[28px] font-semibold tracking-[-0.05em] text-slate-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p><div className="mt-7">{children}</div></div>
        <footer className="mx-auto flex w-full max-w-[430px] items-center justify-between border-t border-slate-200/80 pt-4 text-[9px] text-slate-400"><span>© 2026 LeaseLens</span><span>Frontend preview · Authentication not connected</span></footer>
      </section>
    </main>
  );
}
