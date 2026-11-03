"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Building2, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { AuthInput } from "@/components/auth/auth-input";
import { useAuth } from "@/context/auth-context";
import { forgotPasswordSchema, loginSchema, registerSchema, type ForgotPasswordFormValues, type LoginFormValues, type RegisterFormValues } from "@/lib/auth-schemas";
import { zodResolver } from "@/lib/zod-resolver";

const inputClass = "pr-3";
const submitClass = "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-70";

function PasswordVisibility({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  const Icon = visible ? EyeOff : Eye;
  return <button type="button" onClick={onToggle} aria-label={visible ? "Hide password" : "Show password"} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Icon size={15} /></button>;
}

export function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "", remember: true }, mode: "onBlur" });
  const onSubmit = handleSubmit(async (values) => {
    const user = signIn(values.email, values.remember);
    toast.success(`Welcome back, ${user.fullName}.`);
    router.replace("/dashboard");
  });

  return <form onSubmit={onSubmit} noValidate className="space-y-4">
    <AuthInput id="login-email" label="Work email" type="email" autoComplete="email" placeholder="you@company.com" icon={Mail} error={errors.email?.message} className={inputClass} {...register("email")} />
    <AuthInput id="login-password" label="Password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" icon={LockKeyhole} error={errors.password?.message} trailing={<PasswordVisibility visible={showPassword} onToggle={() => setShowPassword((value) => !value)} />} {...register("password")} />
    <div className="flex items-center justify-between pt-0.5"><label className="inline-flex cursor-pointer items-center gap-2 text-[10px] text-slate-600"><input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 accent-lime-600" {...register("remember")} />Remember me</label><Link href="/forgot-password" className="text-[10px] font-semibold text-slate-700 hover:text-lime-800">Forgot password?</Link></div>
    <button type="submit" disabled={isSubmitting} className={submitClass}>{isSubmitting ? "Opening workspace…" : "Sign in"}<ArrowRight size={14} /></button>
    <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[10px] leading-relaxed text-slate-500">Demo mode: any valid work email and password opens a browser-local preview session. No password is sent or stored.</p>
    <p className="pt-1 text-center text-[11px] text-slate-500">New to LeaseLens? <Link href="/register" className="font-semibold text-slate-900 hover:text-lime-800">Create an account</Link></p>
  </form>;
}

export function RegisterForm() {
  const router = useRouter();
  const { register: startDemoSession } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema), defaultValues: { fullName: "", email: "", company: "", password: "", confirmPassword: "" }, mode: "onBlur" });
  const onSubmit = handleSubmit(async (values) => {
    const user = startDemoSession({ fullName: values.fullName.trim(), email: values.email.trim().toLowerCase(), companyName: values.company.trim() });
    toast.success(`Demo workspace ready for ${user.fullName}.`);
    router.replace("/dashboard");
  });

  return <form onSubmit={onSubmit} noValidate className="space-y-3.5">
    <AuthInput id="register-name" label="Full name" type="text" autoComplete="name" placeholder="Jordan Davis" icon={UserRound} error={errors.fullName?.message} {...register("fullName")} />
    <AuthInput id="register-email" label="Work email" type="email" autoComplete="email" placeholder="you@company.com" icon={Mail} error={errors.email?.message} {...register("email")} />
    <AuthInput id="register-company" label="Company name" type="text" autoComplete="organization" placeholder="Northstar Properties" icon={Building2} error={errors.company?.message} {...register("company")} />
    <div className="grid gap-3 sm:grid-cols-2">
      <AuthInput id="register-password" label="Password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="8+ characters" icon={LockKeyhole} error={errors.password?.message} trailing={<PasswordVisibility visible={showPassword} onToggle={() => setShowPassword((value) => !value)} />} {...register("password")} />
      <AuthInput id="register-confirm" label="Confirm password" type={showConfirm ? "text" : "password"} autoComplete="new-password" placeholder="Re-enter password" icon={LockKeyhole} error={errors.confirmPassword?.message} trailing={<PasswordVisibility visible={showConfirm} onToggle={() => setShowConfirm((value) => !value)} />} {...register("confirmPassword")} />
    </div>
    <p className="text-[9px] leading-relaxed text-slate-500">This creates a local demo profile only. No server account is created, and your password is never stored.</p>
    <button type="submit" disabled={isSubmitting} className={submitClass}>{isSubmitting ? "Preparing workspace…" : "Create account"}<ArrowRight size={14} /></button>
    <p className="pt-1 text-center text-[11px] text-slate-500">Already have an account? <Link href="/login" className="font-semibold text-slate-900 hover:text-lime-800">Sign in</Link></p>
  </form>;
}

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: "" }, mode: "onBlur" });
  const onSubmit = handleSubmit(async () => {
    setSubmitted(true);
    toast.info("Password recovery is not connected. No email was sent.");
  });

  return <form onSubmit={onSubmit} noValidate className="space-y-4">
    {submitted && <div role="status" className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[10px] leading-relaxed text-amber-900"><Check size={14} className="mt-0.5 shrink-0" />This preview does not send recovery emails. Connect an authentication service to enable password reset.</div>}
    <AuthInput id="forgot-email" label="Work email" type="email" autoComplete="email" placeholder="you@company.com" icon={Mail} error={errors.email?.message} {...register("email")} />
    <button type="submit" disabled={isSubmitting} className={submitClass}>{isSubmitting ? "Checking…" : submitted ? "Try another email" : "Continue"}<ArrowRight size={14} /></button>
    <p className="pt-1 text-center text-[11px] text-slate-500"><Link href="/login" className="font-semibold text-slate-900 hover:text-lime-800">Back to sign in</Link></p>
  </form>;
}
