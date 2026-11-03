import type { InputHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: LucideIcon;
  trailing?: ReactNode;
};

export function AuthInput({ label, error, icon: Icon, trailing, className = "", ...inputProps }: AuthInputProps) {
  return (
    <div>
      <label htmlFor={inputProps.id} className="mb-1.5 block text-[11px] font-semibold text-slate-700">{label}</label>
      <div className={`group flex min-h-11 items-center rounded-xl border bg-white transition focus-within:border-lime-500 focus-within:ring-4 focus-within:ring-lime-100/70 ${error ? "border-rose-300" : "border-slate-200"}`}>
        {Icon && <Icon size={15} className="ml-3.5 shrink-0 text-slate-400 transition group-focus-within:text-lime-700" />}
        <input {...inputProps} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputProps.id}-error` : undefined} className={`min-w-0 flex-1 bg-transparent px-3.5 py-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 ${Icon ? "pl-2.5" : ""} ${className}`} />
        {trailing && <span className="mr-2.5 shrink-0">{trailing}</span>}
      </div>
      {error && <p id={`${inputProps.id}-error`} role="alert" className="mt-1.5 text-[10px] text-rose-600">{error}</p>}
    </div>
  );
}
