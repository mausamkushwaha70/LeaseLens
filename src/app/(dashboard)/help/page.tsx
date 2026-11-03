import Link from "next/link";
import { ArrowRight, CircleHelp, FileText, MessageCircle } from "lucide-react";

const topics = [
  { icon: FileText, title: "Working with lease records", text: "The library and deadlines currently use sample data. Upload selections stay in your browser and are not sent to a server." },
  { icon: CircleHelp, title: "Analysis and extracted terms", text: "Analysis content is a product preview. LeaseLens does not currently run AI extraction or provide legal advice." },
  { icon: MessageCircle, title: "Need help?", text: "Support contact and ticket handling will be connected when the workspace backend is available." },
];

export default function HelpPage() {
  return <div className="mx-auto max-w-3xl space-y-6"><section><div className="mb-2 inline-flex rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-900">Support center</div><h2 className="text-[26px] font-semibold tracking-[-0.045em] text-slate-950 sm:text-[30px]">Help & support</h2><p className="mt-1.5 text-sm text-slate-500">Quick answers about this LeaseLens preview.</p></section><section className="space-y-3">{topics.map(({ icon: Icon, title, text }) => <article key={title} className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600"><Icon size={17} /></span><div><h3 className="text-sm font-semibold text-slate-900">{title}</h3><p className="mt-1.5 text-xs leading-5 text-slate-500">{text}</p></div></article>)}</section><Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-950">Return to overview <ArrowRight size={14} /></Link></div>;
}
