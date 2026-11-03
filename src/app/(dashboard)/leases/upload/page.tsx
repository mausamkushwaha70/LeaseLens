"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, FileUp, FileText, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

export default function UploadLeasePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const chooseFile = (selected?: File) => {
    if (!selected) return;
    if (!/[.]pdf$/i.test(selected.name)) {
      toast.error("Choose a PDF lease document.");
      return;
    }
    if (selected.size > 20 * 1024 * 1024) {
      toast.error("The file must be smaller than 20 MB.");
      return;
    }
    setFile(selected);
  };

  return <div className="mx-auto max-w-3xl space-y-6">
    <Link href="/leases" className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900"><ArrowLeft size={14} /> Back to all leases</Link>
    <section><div className="mb-2 inline-flex rounded-full border border-lime-200 bg-lime-50 px-2.5 py-1 text-[10px] font-semibold text-lime-900">Document intake</div><h2 className="text-[26px] font-semibold tracking-[-0.045em] text-slate-950 sm:text-[30px]">Upload a lease</h2><p className="mt-1.5 text-sm text-slate-500">Add a PDF to your workspace to prepare it for review.</p></section>
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.025)] sm:p-7">
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} />
      {!file ? <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]); }} className={`flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed px-5 text-center transition ${dragging ? "border-lime-500 bg-lime-50" : "border-slate-300 bg-slate-50/60 hover:border-lime-400 hover:bg-lime-50/40"}`}><span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-100 text-lime-800"><FileUp size={21} /></span><span className="mt-4 text-sm font-semibold text-slate-800">Drop your lease PDF here</span><span className="mt-1 text-xs text-slate-500">or <span className="font-semibold text-slate-800">browse files</span></span><span className="mt-3 text-[10px] text-slate-400">PDF only Â· up to 20 MB</span></button> : <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-slate-500"><FileText size={18} /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-800">{file.name}</p><p className="mt-1 text-[10px] text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB Â· Ready to add</p></div><button type="button" onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ""; }} aria-label="Remove selected file" className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-700"><X size={16} /></button></div>}
      <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#f8faf6] p-3.5"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-lime-700" /><p className="text-[11px] leading-relaxed text-slate-600">This preview stores no files. Upload processing and secure document storage will be available when the backend is connected.</p></div>
      <div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row"><Link href="/leases" className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50">Cancel</Link><button disabled={!file} onClick={() => toast.info("Document upload will be available when the backend is connected.")} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"><CheckCircle2 size={14} /> Add to workspace</button></div>
    </section>
  </div>;
}
